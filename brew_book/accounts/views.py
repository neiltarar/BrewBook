from datetime import datetime
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.tokens import AccessToken
from .serialisers import UserRegistrationSerialiser, UserLoginSerialiser

class UserRegistrationView(generics.GenericAPIView):
    serializer_class = UserRegistrationSerialiser

    def post(self, request):
        serialiser = self.get_serializer(data=request.data)
        serialiser.is_valid(raise_exception=True)
        user = serialiser.save()
        refresh = RefreshToken.for_user(user)

        access_token_expires = api_settings.ACCESS_TOKEN_LIFETIME
        expires_in = (datetime.now() + access_token_expires) - datetime.now()

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'expires_in': expires_in.total_seconds(),
        })


class UserLoginView(generics.GenericAPIView):
    serializer_class = UserLoginSerialiser

    def post(self, request):
        serialiser = self.get_serializer(data=request.data)
        serialiser.is_valid(raise_exception=True)
        user = serialiser.validated_data['user']
        refresh = RefreshToken.for_user(user)

        access_token_expires = api_settings.ACCESS_TOKEN_LIFETIME
        expires_in = (datetime.now() + access_token_expires) - datetime.now()

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'expires_in': expires_in.total_seconds(),
        }, status=status.HTTP_200_OK)


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        access_token = response.data['access']
        access = AccessToken(access_token)
        expires_in = access.lifetime.total_seconds()
        response.data['expires_in'] = expires_in
        return response
