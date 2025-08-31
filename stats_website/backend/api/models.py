from django.db import models
from django.contrib.auth.models import AbstractUser

class Role(models.Model):
    """Role model for user permissions"""
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('user', 'User'),
    ]
    role_name = models.CharField(max_length=10, choices=ROLE_CHOICES, unique=True)
    
    def __str__(self):
        return self.role_name

class User(models.Model):
    """User model for system users"""
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"

class Country(models.Model):
    """Country model for vacation destinations"""
    country_name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.country_name
    
    class Meta:
        verbose_name_plural = "countries"

class Vacation(models.Model):
    """Vacation model for vacation packages"""
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image_file = models.CharField(max_length=255)
    
    def __str__(self):
        return f"{self.description} - {self.country.country_name}"

class Like(models.Model):
    """Like model for tracking user likes on vacations"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    vacation = models.ForeignKey(Vacation, on_delete=models.CASCADE)
    
    class Meta:
        unique_together = ('user', 'vacation')