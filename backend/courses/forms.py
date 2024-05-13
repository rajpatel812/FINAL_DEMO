# forms.py
from django import forms
from user.models import User
from .models import Course

class AdminUserModelChoiceField(forms.ModelChoiceField):
    def label_from_instance(self, obj):
        return f"{obj.name}"

class CourseForm(forms.ModelForm):
    user = AdminUserModelChoiceField(queryset=User.objects.filter(is_staff=True), required=False)

    class Meta:
        model = Course
        fields = '__all__'
