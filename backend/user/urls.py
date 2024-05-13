from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from . import views

urlpatterns = [
    # simplejwt token urls
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    # login register urls
    path('register', views.RegistrationView.as_view(), name='registration'),
    path('login', views.LoginView.as_view(), name="login"),
    # path('data', views.UserDataView.as_view(), name="user-data"),
    path('profile', views.UserProfileView.as_view(), name="user-profile"),
    path('reset/email/', views.UserPasswordResetEmailView.as_view(), name="user-reset-email-api-view"),
    path('reset-password/<uid>/<token>/',views.UserPasswordResetView.as_view(),name='user-reset-password-uid-token-api-view'),
    # path('profile', views.ProfileView.as_view(), name="profile")
]
