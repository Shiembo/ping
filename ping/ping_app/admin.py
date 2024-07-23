from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model

# Get the custom user model
User = get_user_model()

# Register the custom user model with the UserAdmin
admin.site.register(User, UserAdmin)
