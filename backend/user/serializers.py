from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from user.utils import Utils
from . import models
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError

class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = models.User
        fields = ['email', 'name', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, attrs):
        password = attrs['password'],
        password2 = attrs['password2'],
        if password != password2:
            raise serializers.ValidationError("password and confirm password not match")
        return attrs

    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, validated_data):
        return models.User.objects.create_user(**validated_data)


class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=200)

    class Meta:
        model = models.User
        fields = ['id', 'email', 'password']


class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = "__all__"


class UserProfileSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.name', required=False)
    email = serializers.CharField(source='user.email', required=False)

    class Meta:
        model = models.Profile
        fields = "__all__"

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

            # Save the instance with updated fields
        instance.save()

        return instance
    
class UserPasswordResetEmailSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        model = models.User
        fields = ["email"] 

    def validate(self, attrs):
        email = attrs.get("email")
        # print("validating email",email)
        if models.User.objects.filter(email=email).exists():
            print("called.......................")
            user = models.User.objects.get(email=email)
            # using this so in url safe id is shown not the actual one
            uid = urlsafe_base64_encode(force_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            link = (
                "http://localhost:3000/reset-password/"
                + uid
                + "/"
                + token
                + "/"
            )

            body = "This is your reset password link " + link
            data = {"subject": "Reset Password", "body": body, "to_email": user.email}

            print("reset ", link)
            print("Data.....",data)

            Utils.send_mail(data)
            return attrs
        else:
            raise serializers.ValidationError("Provided email is not valid user")
