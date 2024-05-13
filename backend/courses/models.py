from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.utils.text import slugify
from django.utils.timezone import now
from user.models import User  # Update this import path if necessary
from djongo.models.fields import ObjectIdField
from cloudinary.models import CloudinaryField
from cloudinary_storage.storage import VideoMediaCloudinaryStorage
from cloudinary_storage.validators import validate_video



class Category(models.Model):
 
    title = models.CharField(max_length=50)
    slug = models.SlugField(max_length=200, unique=True)

    def __str__(self):
        return (f"{self.id} - {self.title}")

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class Course(models.Model):
    LEVEL_CHOICES = [
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Advanced', 'Advanced'),
    ]
    
    title = models.CharField(max_length=30)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    created_by = models.CharField(max_length=200, null=True)
    slug = models.SlugField(max_length=200, unique=True)
    short_description = models.TextField(blank=False, max_length=110)
    description = models.TextField(blank=False)
    outcome = models.CharField(max_length=200)
    requirements = models.CharField(max_length=200)
    language = models.CharField(max_length=200)
    price = models.FloatField(validators=[MinValueValidator(9.99)])
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0, validators=[MinValueValidator(0), MaxValueValidator(5)])
    thumbnail = CloudinaryField('image', blank=True, folder="Images")
    video_url = models.FileField(upload_to='intro', blank=True, storage=VideoMediaCloudinaryStorage(),
                             validators=[validate_video])
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=now, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title}"
    
    def update_ratings(self):
        reviews = Review.objects.filter(course=self)
        rating_sum = reviews.aggregate(models.Sum('rating')).get('rating__sum')
        review_count = reviews.count()

        if rating_sum is not None and review_count > 0:
            self.rating = round(rating_sum / review_count, 2)

        else:
            self.rating = 0

        self.save()

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
        

class Lesson(models.Model):
    
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=100)
    duration = models.FloatField(validators=[MinValueValidator(0.30), MaxValueValidator(30.00)])
    video_url = models.FileField(upload_to="", blank=True, storage=VideoMediaCloudinaryStorage(),
                             validators=[validate_video])
    created_at = models.DateTimeField(default=now, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.course} - {self.title}"
    
    def save(self, *args, **kwargs):
        if not self.pk:  # Only execute if the instance is not yet saved
            self.video_url.name = f'{self.course.id}/{self.video_url.name}'
        super().save(*args, **kwargs)


class Review(models.Model):
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0, validators=[MinValueValidator(0), MaxValueValidator(5)])
    comment = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    

    class Meta:
        unique_together = ['course', 'user']

    def __str__(self):
        return f"{self.course.title} - {self.user.name}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.course.update_ratings()
