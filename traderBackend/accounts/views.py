from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .seializer import RegisterSerializer
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework import status
from django.contrib.auth import authenticate

from rest_framework_simplejwt.tokens import RefreshToken
from .models import User

class TestView(APIView):

    permission_classes = []

    def get(self, request):

        return Response({
            "message": "API Working"
        })

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profile(request):

    return Response({

        "id": request.user.id,

        "username": request.user.username,

        "email": request.user.email

    })


@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    print(request.data)

    email = request.data.get("email")
    password = request.data.get("password")

    if not email:
        return Response({"message": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)
    if not password:
        return Response({"message": "Password are required"}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user_obj = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"message":"Invalid email!"},status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username = user_obj.username,password=password)

    if user is None:
        return Response({"message":"Invalid password", }, status=status.HTTP_400_BAD_REQUEST )
    
    refresh = RefreshToken.for_user(user)

    return Response(
        {
            "message": "Login Successfully",
            "access":str(refresh.access_token),
            "refresh":str(refresh),
            "user": {
                "id": user.id,
                "username": user.username,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "phone": user.phone
            }
        },
        status=status.HTTP_200_OK
    )
    
@api_view(["POST"])
@permission_classes([AllowAny])
def RegistationView(request):
    print(request.data)
    serializer = RegisterSerializer(data = request.data)
    if not serializer.is_valid():
        print(serializer.errors)
        return Response(
            {
                "message":"Sompthing Error Occer!",
                "error":serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    user = serializer.save()
    print(user)
    if not user:
        return Response(
            {
                "error": "Invalid Credentials"
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    
    refresh = RefreshToken.for_user(user)
    return Response({

        "access": str(refresh.access_token),

        "refresh": str(refresh),

        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }

    })

