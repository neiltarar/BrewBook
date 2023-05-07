from datetime import datetime
from django.conf import settings
from django.middleware import csrf
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework import exceptions as rest_exceptions, response, decorators as rest_decorators, permissions as rest_permissions
from rest_framework_simplejwt import tokens, views as jwt_views, serializers as jwt_serializers, exceptions as jwt_exceptions
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
        print(request.data)
        serialiser = self.get_serializer(data=request.data)
        serialiser.is_valid(raise_exception=True)
        user = serialiser.validated_data['user']
        refresh = RefreshToken.for_user(user)
        tokens = {
            'refresh_token': str(refresh),
            'access_token': str(refresh.access_token),
        }
        res = Response(
            {"message": "Successfully logged in"},
            status=status.HTTP_200_OK
        )
        # set response headers and cookies
        res.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE'],
            value=tokens['access_token'],
            expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )

        res.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
            value=tokens['refresh_token'],
            expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )

        # res.data = tokens
        res['X-CSRFToken']=csrf.get_token(request)
        return res


class UserLogoutView(generics.GenericAPIView):
    permission_classes = [rest_permissions.IsAuthenticated]
    def post(self, request):
        try:
            refresh_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
            token = tokens.RefreshToken(refresh_token)

            res = Response(
                {"message": "Logged out successfully"},
                status=status.HTTP_200_OK
            )

            # Delete access_token and refresh_token cookies
            # And blacklist the refresh_token
            token.blacklist()
            res.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
            res.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
            res.delete_cookie('X-CSRFToken')
            return res
        except:
            raise rest_exceptions.ParseError('Invalid token')


class CookieTokenRefreshSerializer(jwt_serializers.TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        attrs['refresh'] =self.context['request'].COOKIES.get('refresh')
        if attrs['refresh']:
            return super().validate(attrs)
        else:
            return jwt_exceptions


class CookieTokenRefreshView(jwt_views.TokenRefreshView):
    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get('refresh'):
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
                value=tokens['refresh_token'],
                expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
            )

            del response.data['refresh']
        response['X-CSRFToken']=request.COOKIES.get('csrftoken')
        return super().finalize_response(request, response, *args, **kwargs)