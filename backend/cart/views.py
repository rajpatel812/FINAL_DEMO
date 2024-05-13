from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import CartItem
from courses.models import Course
from .serializers import CartItemSerializer

class CartAddAPIView(APIView):
    def post(self, request, id):
        user = request.user
        course = get_object_or_404(Course, id=id)
        
        # Check if the user already has the course in the cart
        if CartItem.objects.filter(user=user, course=course).exists():
            print("You already have the course in the cart")
            return Response({'status': 'error', 'message': 'This course is already in your cart.'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = CartItemSerializer(data={'user': user.id, 'course': course.id})
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success', 'message': 'Course added to cart.'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class CartRemoveAPIView(APIView):
    def delete(self, request, id):
        user = request.user
        course = get_object_or_404(Course, id=id)
        cart_item = get_object_or_404(CartItem, user=user, course=course)
        cart_item.delete()
        return Response({'status': 'success', 'message': 'Course removed from cart.'}, status=status.HTTP_204_NO_CONTENT)

class CartListAPIView(APIView):
    def get(self, request):
        user = request.user.id
        cart_items = CartItem.objects.filter(user=user)
        serializer = CartItemSerializer(cart_items, many=True)
        return Response(serializer.data)

class CartCheckoutAPIView(APIView):
    def post(self, request, id):
        user = request.user
        cart_item = get_object_or_404(CartItem, id=id, user=user)
        # Implement your checkout logic here for the specific cart item
        total_price = cart_item.course.price
        # Assuming you have a payment gateway integration, you can call it here
        # For now, let's just remove the item from the cart
        cart_item.delete()
        return Response({'status': 'success', 'message': f'Checkout completed. Total amount: {total_price} INR.'}, status=status.HTTP_200_OK)