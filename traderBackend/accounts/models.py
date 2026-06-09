from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    phone = models.CharField(max_length=20, blank=True)

    referral_code = models.CharField(
        max_length=50,
        unique=True,
        null=True,
        blank=True
    )

    referred_by = models.CharField(
        max_length=50,
        null=True,
        blank=True
    )