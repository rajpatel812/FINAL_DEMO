from django.urls import path
from .views import ProcessPaymentAPIView ,StripeWebhookView, PaymentSuccessView
urlpatterns = [
    path('', PaymentSuccessView.as_view(), name='PaymentSuccessView'),
    path('process_payment/', ProcessPaymentAPIView.as_view(), name='process_payment'),
    path('webhook', StripeWebhookView.as_view(), name='stripe_webhook'),
]
