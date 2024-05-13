from django.urls import path
from .views import CartAddAPIView, CartRemoveAPIView, CartListAPIView, CartCheckoutAPIView

urlpatterns = [
    path('add/<int:id>/', CartAddAPIView.as_view(), name='cart-add'),
    path('remove/<int:id>/', CartRemoveAPIView.as_view(), name='cart-remove'),
    path('list/', CartListAPIView.as_view(), name='cart-list'),
    path('checkout/<int:id>/', CartCheckoutAPIView.as_view(), name='cart-checkout'),
]