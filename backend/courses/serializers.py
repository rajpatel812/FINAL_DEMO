from rest_framework import serializers
from .models import Course, Lesson, Category, Review
from user.serializers import UserProfileSerializer
# from cloudinary_storage.storage import VideoMediaCloudinaryStorage

class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = Category
    fields = ['id','title','slug']

class LessonSerializer(serializers.ModelSerializer):
    # video_url = serializers.FileField(storage=VideoMediaCloudinaryStorage())

    class Meta:
        model = Lesson
        fields = "__all__"
        # ['id','title', 'duration', 'video_url']

class CourseSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)
    
    class Meta:
        model = Course
        fields = "__all__"
       
class ReviewSerializer(serializers.ModelSerializer):
    user= UserProfileSerializer(source='user.profile', read_only=True)

    class Meta:
        model = Review
        fields = "__all__"
