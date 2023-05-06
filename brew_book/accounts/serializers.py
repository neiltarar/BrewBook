from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from rest_framework import serializers

User = get_user_model()

class UserRegistrationSerialiser(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'password', 'password2')
        extra_kwargs = {
            'password': {'write_only' : True}
        }

    def save(self, *args, **kwargs):
        user = User(
            email = self.validated_data['email'],
            first_name = self.validated_data['first_name'],
            last_name = self.validated_data['last_name'],
            username = self.validated_data['email']
        )

        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'passord' : 'Passwords must match.'})

        user.set_password(password)
        user.save()
        return user

class UserLoginSerialiser(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username', '')
        password = data.get('password', '')

        if username and password:
            print(username)
            user = authenticate(username=username, password=password)
            if user:
                if user.is_active:
                    data['user'] = user
                else:
                    raise serializers.ValidationError('User is not active')
            else:
                raise serializers.ValidationError('Incorrect username or password')
        else:
            raise serializers.ValidationError('Username and password are required')
        return data