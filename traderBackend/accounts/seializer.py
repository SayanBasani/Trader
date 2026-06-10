from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User

        fields = [
            "id",
            "username",
            "email",
            "phone",
            "referral_code"
        ]


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField( write_only=True, min_length=6 )

    class Meta:
        model = User

        fields = [ "username","first_name","last_name", "email", "password", "phone" ]

    def validate_email(self, value):

        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "Email already exists"
            )
        return value

    def create(self, validated_data):

        password = validated_data.pop("password")

        user = User(**validated_data)

        user.set_password(password)

        user.save()

        return user
    
