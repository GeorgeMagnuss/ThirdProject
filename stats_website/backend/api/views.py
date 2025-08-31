from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.utils.decorators import method_decorator
from django.utils import timezone
from django.db.models import Count
import json
from .models import User, Vacation, Like, Country

@csrf_exempt
@require_http_methods(["POST"])
def login_view(request):
    """Login view for admin users"""
    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return JsonResponse({'error': 'Email and password required'}, status=400)
        
        try:
            user = User.objects.select_related('role').get(email=email, password=password)
            
            if user.role.role_name == 'admin':
                request.session['user_id'] = user.id
                return JsonResponse({
                    'success': True,
                    'user': {
                        'id': user.id,
                        'email': user.email,
                        'role': user.role.role_name
                    }
                })
            else:
                return JsonResponse({'error': 'Invalid credentials or insufficient permissions'}, status=401)
                
        except User.DoesNotExist:
            return JsonResponse({'error': 'Invalid credentials or insufficient permissions'}, status=401)
            
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def logout_view(request):
    """Logout view"""
    request.session.flush()
    return JsonResponse({'success': True, 'message': 'Logged out successfully'})

@require_http_methods(["GET"])
def vacation_stats_view(request):
    """Get vacation statistics (past, ongoing, future)"""
    try:
        today = timezone.now().date()
        
        past_vacations = Vacation.objects.filter(end_date__lt=today).count()
        ongoing_vacations = Vacation.objects.filter(start_date__lte=today, end_date__gte=today).count()
        future_vacations = Vacation.objects.filter(start_date__gt=today).count()
        
        return JsonResponse({
            'pastVacations': past_vacations,
            'ongoingVacations': ongoing_vacations,
            'futureVacations': future_vacations
        })
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@require_http_methods(["GET"])
def total_users_view(request):
    """Get total number of users in the system"""
    try:
        total_users = User.objects.count()
        return JsonResponse({'totalUsers': total_users})
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@require_http_methods(["GET"])
def total_likes_view(request):
    """Get total number of likes in the system"""
    try:
        total_likes = Like.objects.count()
        return JsonResponse({'totalLikes': total_likes})
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@require_http_methods(["GET"])
def likes_distribution_view(request):
    """Get likes distribution by vacation destinations"""
    try:
        distribution = (
            Country.objects
            .annotate(likes=Count('vacation__like'))
            .values('country_name', 'likes')
            .order_by('-likes')
        )
        
        result = [
            {'destination': item['country_name'], 'likes': item['likes']}
            for item in distribution
        ]
        
        return JsonResponse(result, safe=False)
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)