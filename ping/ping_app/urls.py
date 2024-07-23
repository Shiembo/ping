from django.urls import path
from .views import UserCreate, CustomAuthToken

urlpatterns = [
    path('register/', UserCreate.as_view(), name='register'),
    path('login/', CustomAuthToken.as_view(), name='login'),
]
