from django.contrib import admin

from .models import Category, Course, Lesson, Review
from .forms import CourseForm

# class CourseAdmin(admin.ModelAdmin):
#     exclude = ('slug',)


class CategoryAdmin(admin.ModelAdmin):
    exclude = ('slug',)

class CourseAdmin(admin.ModelAdmin):
    exclude = ('slug','rating')
    form = CourseForm

admin.site.register(Course, CourseAdmin)

admin.site.register(Category, CategoryAdmin)
# admin.site.register(Course, CourseAdmin)
admin.site.register(Lesson)

admin.site.register(Review)