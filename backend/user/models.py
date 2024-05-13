# import datetime

# from django.core.validators import RegexValidator
# from django.db import models
# from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
# from django.db.models.signals import post_save
# from rest_framework.exceptions import ValidationError

# # Create your models here.
# class UserManager(BaseUserManager):
#     def create_user(self, email, name, password=None,  password2=None):
#         if not email:
#             raise ValueError("Users must have an email address")

#         user = self.model(
#             email=self.normalize_email(email),
#             name=name,
#         )

#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, email, name, password=None, **extra_fields):
#         extra_fields.setdefault('is_admin', True)
#         extra_fields.setdefault('is_superuser', True)
#         extra_fields.setdefault('role', 1)

#         if extra_fields.get('role') != 1:
#             raise ValueError('Superuser must have role of Global Admin')

#         return self.create_user(email, name, password, **extra_fields)


# class User(AbstractBaseUser):
#     email = models.EmailField(
#         verbose_name="email",
#         max_length=255,
#         unique=True,
#     )

#     name = models.CharField(max_length=200)
#     is_active = models.BooleanField(default=True)
#     is_admin = models.BooleanField(default=False)
#     crated_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     objects = UserManager()

#     USERNAME_FIELD = "email"
#     REQUIRED_FIELDS = ['name']

#     def __str__(self):
#         return (self.name)

#     def has_perm(self, perm, obj=None):
#         return self.is_admin

#     def has_module_perms(self, app_label):
#         return True

#     @property
#     def is_staff(self):
#         return self.is_admin



# class Profile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)

#     PHONE_REGEX = r'^\+?91\d{10}$'
#     contact_no = models.CharField(max_length=20,
#                                   validators=[RegexValidator(PHONE_REGEX, 'Enter a valid phone number.')], blank=True)


#     profile_image = models.URLField(blank=True)  # Allow blank image URLs
#     occupation = models.CharField(max_length=255, blank=True)

#     def __str__(self):
#         return str(self.user.name) + "'s Profile"

#     def create_profile(sender, instance, created, **kwargs):
#         if created:
#             user = instance
#             profile = Profile.objects.create(user=user)
#             profile.save()

#     post_save.connect(create_profile, sender=User)


import datetime
from django.core.validators import RegexValidator
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.db.models.signals import post_save
from rest_framework.exceptions import ValidationError

class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None, password2=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, name, password, **extra_fields)


class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name="email",
        max_length=255,
        unique=True,
    )

    name = models.CharField(max_length=200)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email 

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return True


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    PHONE_REGEX = r'^\+?91\d{10}$'
    contact_no = models.CharField(max_length=20,
                                  validators=[RegexValidator(PHONE_REGEX, 'Enter a valid phone number.')], blank=True)


    profile_image = models.URLField(blank=True)  # Allow blank image URLs
    occupation = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return str(self.user.name) + "'s Profile"

    def create_profile(sender, instance, created, **kwargs):
        if created:
            user = instance
            profile = Profile.objects.create(user=user)
            profile.save()

    post_save.connect(create_profile, sender=User)
