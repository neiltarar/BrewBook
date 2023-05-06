from django.urls import path
from .views import UserRegistrationView, UserLoginView, CustomTokenRefreshView


urlpatterns = [
    path('register', UserRegistrationView.as_view(), name='register'),
    path('login', UserLoginView.as_view(), name='login'),
    path('token/refresh', CustomTokenRefreshView.as_view(), name='token_refresh')
]
