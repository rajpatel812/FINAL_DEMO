from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Category, Course, Lesson, Review
from .serializers import CategorySerializer, CourseSerializer, LessonSerializer, ReviewSerializer
from django.http import Http404
from django.http import JsonResponse
import cloudinary.uploader
from user.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes




# Category CRUD Views
class CategoryListCreateView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CategoryDetailView(APIView):
    def get_object(self, pk):
        try:
            return Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        category = self.get_object(pk)
        serializer = CategorySerializer(category)
        return Response(serializer.data)

    def patch(self, request, pk):  # Using update method instead of put
        category = self.get_object(pk)
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        category = self.get_object(pk)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Course CRUD Views
class CourseListCreateView(APIView):
    def get(self, request):
        page= request.GET.get('category')
        # print('category==>',page)
        if page:
            courses = Course.objects.filter(category_id=page)
        else:
            courses = Course.objects.all()
            
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class CourseDetailView(APIView):
    def get_object(self, pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        course = self.get_object(pk)
        serializer = CourseSerializer(course)
        return Response(serializer.data)

    def patch(self, request, pk):  
        course = self.get_object(pk)
        serializer = CourseSerializer(course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        course = self.get_object(pk)
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Lesson CRUD Views
class LessonListCreateView(APIView):
    def get(self, request):
        lessons = Lesson.objects.all()
        serializer = LessonSerializer(lessons, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = LessonSerializer(data=request.data)
        if serializer.is_valid():
            # Save video URL along with other lesson details
            serializer.save(video_url=request.data.get('video_url'))
            print("video.........",serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LessonDetailView(APIView):
    def get_object(self, pk):
        try:
            return Lesson.objects.get(pk=pk)
        except Lesson.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        lesson = self.get_object(pk)
        serializer = LessonSerializer(lesson)
        return Response(serializer.data)

    def patch(self, request, pk):
        lesson = self.get_object(pk)
        serializer = LessonSerializer(lesson, data=request.data, partial=True)
        if serializer.is_valid():
            # Update video URL along with other lesson details
            serializer.save(video_url=request.data.get('video_url'))
            print("video.........",serializer.data)
            print("video..url.......",request.data.get('video_url'))
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        lesson = self.get_object(pk)
        lesson.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class ReviewListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        reviews = Review.objects.all()
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({"msg": "You Have already given a Review"}, status=status.HTTP_400_BAD_REQUEST)

class ReviewDetailAPIView(APIView):

    def get_reviews(self, course):
        return Review.objects.filter(course=course)

    def get(self, request, pk, format=None):
        reviews = self.get_reviews(pk)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    @permission_classes([IsAuthenticated])
    def put(self, request, pk, format=None):
        review = self.get_reviews(pk)
        serializer = ReviewSerializer(review, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @permission_classes([IsAuthenticated])
    def delete(self, request, pk, format=None):
        review = self.get_reviews(pk)
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
