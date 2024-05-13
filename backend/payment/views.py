# views.py

import stripe
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Payment
from django.http import HttpResponse
from user.models import User
from decimal import Decimal
from datetime import datetime
from .models import Course  # Importing the Course model
from cart.models import CartItem
from rest_framework import permissions
from .serializers import PaymentSerializer

class ProcessPaymentAPIView(APIView):
    def post(self, request):
        # print("Processing payment=====> ", request.data)
        try:
            # Extract data from request
            total_price = request.data['totalPrice']
            user_data = request.data['userData']
            user_id = user_data['id']
            checked_courses = request.data['checkedCourses']
            
            # print("checking", checked_courses)

            # Convert amount to cents
            amount = total_price * 100

            # Get the User object
            user = User.objects.get(pk=user_id)

            line_items = []
            for course_id in checked_courses:
                try:
                    # print("checking", course_id)
                    cart_item = Course.objects.get(pk=course_id)
                    # print("checking 2", cart_item)
                    line_items.append({
                        'price_data': {
                            'currency': 'inr',
                            'product_data': {
                                'name': cart_item.title,
                                'images':["http://res.cloudinary.com/dgdumobsz/"+str(cart_item.thumbnail)]
                            },
                            'unit_amount': int(cart_item.price * 100),  # Convert to cents
                        },
                        'quantity': 1,
                    })
                except CartItem.DoesNotExist:
                    return Response({'error': f'CartItem with ID {course_id} does not exist'}, status=400)
            # print("Check 3" , line_items)


            # Create payment intent with Stripe
            stripe.api_key = settings.STRIPE_SECRET_KEY
            intent = stripe.PaymentIntent.create(
                amount=amount,
                currency='inr',
                receipt_email=user_data['email'],
                metadata={
                    'user_id': str(user_id),
                    'checked_courses': ','.join(map(str, checked_courses)),
                    'total_price': str(total_price)
                }
            )

            # Create session for Stripe checkout
            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=line_items,
                metadata= { 
                    'user_id': str(user_id),
                    'checked_courses': ','.join(map(str, checked_courses)),
                    'total_price': str(total_price)
                },
                mode='payment',
                success_url='http://localhost:3000/payment/success',
                cancel_url='http://localhost:3000/payment/fails',
                customer_email=user_data['email'],
            )

            return Response({'sessionId': session.id})
         

        except Exception as e:
            return Response({'error': str(e)}, status=500)


class StripeWebhookView(APIView):
    def __init__(self):
        super().__init__()
        self.meta = {} 
        
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        payload = request.body
        sig_header = request.headers['Stripe-Signature']
        event = None
        # print("$$$44$$$$$==", payload, "sig_HEADER==" ,sig_header, "EVENT==",event)
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, settings.STRIPE_ENDPOINT_SECRET
            )
        except ValueError as e:
            return HttpResponse(status=400)
        except stripe.error.SignatureVerificationError as e:
            return HttpResponse(status=400)

        # print("event = " , event)
        
        
        # Handle the event
        if event['type'] == 'checkout.session.completed':
            payment_intent = event['data']['object']
            # print("payment_intent==> ", payment_intent)
            payment_id = payment_intent['payment_intent']
            amount = payment_intent['amount_total'] / 100  # Stripe amounts are in cents
            # user_email = payment_intent['receipt_email']
            try:
                # # Retrieve the user ID and checked courses from metadata
                # metadata = payment_intent.get('metadata', {})
                metadata = payment_intent['metadata']
                # print("metadata = " , metadata)
                user_id = metadata.get('user_id')
                checked_courses = metadata.get('checked_courses', '').split(',')
                
                # print("userid=", user_id, "checkedCourses=", checked_courses)
                
                # Retrieve the user object
                user = User.objects.get(pk=user_id)
                
                # Iterate over checked courses and create Payment objects
                for course_id in checked_courses:
                    # print("called")
                    course = Course.objects.get(pk=course_id)
                    payment = Payment.objects.create(
                        user=user,
                        course=course,
                        amount=amount,  # You may want to adjust this based on your requirements
                        payment_date=datetime.now(),  # Set payment date to current date and time
                        payment_intent=payment_id
                    )
            except (User.DoesNotExist, Course.DoesNotExist) as e:
                return HttpResponse(status=400)  # Handle user or course not found

        return HttpResponse(status=200)



class PaymentSuccessView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        payments = Payment.objects.filter(user=user)
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data)