import cloudinary.uploader
from django.contrib.auth import authenticate, login
from django.shortcuts import render
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.authtoken.models import Token

from .models import User, Profile
from .serializers import UserPasswordResetEmailSerializer, UserRegistrationSerializer, UserLoginSerializer, UserDataSerializer, UserProfileSerializer


# generating jwt token from the simple-jwt
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


# Create your views here.
class RegistrationView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            print(serializer)
            serializer.save()
            
            return Response({"message": "registration successfull"},
                            status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data.get('email')
            # print(email)
            password = serializer.data.get('password')
            # print(password)
            user = authenticate(email=email, password=password)
            # print(user)
            # login(request=request, user=user)

            if user is not None:
                user = User.objects.get(email=email)
                # token, _ = Token.objects.get_or_create(user=user)
                refresh_token = RefreshToken.for_user(user)
                return Response(
                    {"tokens": {"refresh": str(refresh_token), "access": str(refresh_token.access_token)},
                     "message": "Login success"}, status=status.HTTP_200_OK)
            else:
                return Response({'errors': "Email password not valid"},
                                status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDataView(APIView):
    def get(self, request):
        user_data = User.objects.all()
        serializer = UserDataSerializer(user_data)
        print("usseeeeeeeeeeerrrrrrrrrr........",serializer.data)
        return Response(serializer.data, status.HTTP_200_OK)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_id = request.user.id
        user_data = Profile.objects.get(user_id=user_id)
        serializer = UserProfileSerializer(user_data)
        return Response(serializer.data, status.HTTP_200_OK)

    def post(self, request):
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status.HTTP_200_OK)

    def patch(self, request):
        try:
            profile = Profile.objects.get(user=request.user)
            user = User.objects.get(id=request.user.id)
        except Profile.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        data = request.data
        # print(data)
        user.name = data.get("name", user.name)
        profile.contact_no = data.get("contact_no", profile.contact_no)
        profile.profile_image = data.get("profile_image", profile.profile_image)
        profile.occupation = data.get("occupation", profile.occupation)
        if data.get('password'):
            user.set_password(data.get('password'))

        if 'profile_image' in request.FILES:
            file = request.FILES['profile_image']
            upload_data = cloudinary.uploader.upload(file)
            url = upload_data['url']
            profile.profile_image = url

        profile.save()
        user.save()

        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)
    
class UserPasswordResetView(APIView):
    # permission_classes=[IsAuthenticated,IsUser]
    def post(self, request, uid, token, format=None):
        serializers = UserPasswordResetEmailSerializer(
            data=request.data, context={"uid": uid, "token": token}
        )
        if serializers.is_valid():
            return Response(
                {"Message": "Password reset successfully"},
                status=status.HTTP_204_NO_CONTENT,
            )
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserPasswordResetEmailView(APIView):
    # permission_classes=[IsAuthenticated,IsUser]
    def post(self, request, format=None):
        # print("email reset -> ", request.data)
        # print("os email", os.environ.get("EMAIL_USER"))

        serializer = UserPasswordResetEmailSerializer(data=request.data)
        if serializer.is_valid():
            return Response(
                {"Message": "Reset password email has been sent to you"},
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)