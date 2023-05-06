from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserRegistrationSerialiser, UserLoginSerialiser


class UserRegistrationView(generics.GenericAPIView):
    serializer_class = UserRegistrationSerialiser

    def post(self, request):
        serialiser = self.get_serializer(data=request.data)
        serialiser.is_valid(raise_exception=True)
        user = serialiser.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })

class UserLoginView(generics.GenericAPIView):
    serializer_class = UserLoginSerialiser

    def post(self, request):
        serialiser = self.get_serializer(data=request.data)
        serialiser.is_valid(raise_exception=True)
        user = serialiser.validated_data['user']
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh' : str(refresh),
            'access' : str(refresh.access_token),
        }, status=status.HTTP_200_OK)