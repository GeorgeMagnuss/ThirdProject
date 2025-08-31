from django.contrib import admin
from .models import Role, User, Country, Vacation, Like

@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    """Admin interface for Role model"""
    list_display = ['role_name']
    search_fields = ['role_name']

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    """Admin interface for User model"""
    list_display = ['first_name', 'last_name', 'email', 'role']
    list_filter = ['role']
    search_fields = ['first_name', 'last_name', 'email']

@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    """Admin interface for Country model"""
    list_display = ['country_name']
    search_fields = ['country_name']

@admin.register(Vacation)
class VacationAdmin(admin.ModelAdmin):
    """Admin interface for Vacation model"""
    list_display = ['description', 'country', 'start_date', 'end_date', 'price']
    list_filter = ['country', 'start_date']
    search_fields = ['description', 'country__country_name']

@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    """Admin interface for Like model"""
    list_display = ['user', 'vacation']
    list_filter = ['vacation__country']