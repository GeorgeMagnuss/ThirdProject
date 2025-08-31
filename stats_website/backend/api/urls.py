from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('stats/vacations/', views.vacation_stats_view, name='vacation_stats'),
    path('users/total/', views.total_users_view, name='total_users'),
    path('likes/total/', views.total_likes_view, name='total_likes'),
    path('likes/distribution/', views.likes_distribution_view, name='likes_distribution'),
]