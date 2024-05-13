from django.urls import path
from . import views

urlpatterns = [
    # Category URLs
    path('categories/', views.CategoryListCreateView.as_view(), name='category-list'),
    path('categories/<int:pk>/', views.CategoryDetailView.as_view(), name='category-detail'),

    # Course URLs
    path('courses/', views.CourseListCreateView.as_view(), name='course-list'),
    path('courses/<int:pk>/', views.CourseDetailView.as_view(), name='course-detail'),

    # Lesson URLs
    path('lessons/', views.LessonListCreateView.as_view(), name='lesson-list'),
    path('lessons/<int:pk>/', views.LessonDetailView.as_view(), name='lesson-detail'),
    
    #Review URLs
    path('reviews/', views.ReviewListCreateAPIView.as_view(), name='review-list-create'),
    path('reviews/<int:pk>/', views.ReviewDetailAPIView.as_view(), name='review-detail'),
]
