from django.core.management.base import BaseCommand
from api.models import Role, User, Country, Vacation, Like
from datetime import date

class Command(BaseCommand):
    help = 'Load initial data for the vacation system'

    def handle(self, *args, **options):
        self.stdout.write('Loading initial data...')

        # Create roles
        admin_role, created = Role.objects.get_or_create(role_name='admin')
        user_role, created = Role.objects.get_or_create(role_name='user')
        
        # Create users
        admin_user, created = User.objects.get_or_create(
            email='admin@example.com',
            defaults={
                'first_name': 'Admin',
                'last_name': 'User',
                'password': 'adminpass',
                'role': admin_role
            }
        )
        
        regular_user, created = User.objects.get_or_create(
            email='user@example.com',
            defaults={
                'first_name': 'Regular',
                'last_name': 'User',
                'password': 'userpass',
                'role': user_role
            }
        )

        # Create countries
        countries_data = [
            'Israel', 'Spain', 'Italy', 'France', 'Germany',
            'Japan', 'Brazil', 'Argentina', 'United States', 
            'Australia', 'Colombia'
        ]
        
        countries = {}
        for country_name in countries_data:
            country, created = Country.objects.get_or_create(country_name=country_name)
            countries[country_name] = country

        # Create vacations
        vacations_data = [
            ('Israel', 'Tel Aviv', '2025-06-01', '2025-06-10', 1500, 'telaviv.jpg'),
            ('Spain', 'Madrid', '2025-07-05', '2025-07-15', 1200, 'madrid.jpg'),
            ('Italy', 'Rome', '2025-08-01', '2025-08-10', 1800, 'rome.jpg'),
            ('France', 'Paris', '2025-09-01', '2025-09-07', 2000, 'paris.jpg'),
            ('Germany', 'Berlin', '2025-10-10', '2025-10-17', 1400, 'berlin.jpg'),
            ('Japan', 'Tokyo', '2025-11-01', '2025-11-14', 2500, 'tokyo.jpg'),
            ('Brazil', 'Rio', '2025-05-20', '2025-05-28', 2200, 'rio.jpg'),
            ('Argentina', 'Buenos Aires', '2025-06-10', '2025-06-17', 1900, 'buenosaires.jpg'),
            ('United States', 'New York City', '2025-07-10', '2025-07-20', 1600, 'nyc.jpg'),
            ('Australia', 'Sydney', '2025-08-05', '2025-08-15', 2300, 'sydney.jpg'),
            ('Colombia', 'Medellin', '2025-06-20', '2025-06-27', 2100, 'medellin.jpg'),
            ('United States', 'Los Angeles', '2025-09-01', '2025-09-10', 1800, 'losangeles.jpg'),
        ]

        vacations = []
        for country_name, description, start_date, end_date, price, image_file in vacations_data:
            vacation, created = Vacation.objects.get_or_create(
                description=description,
                defaults={
                    'country': countries[country_name],
                    'start_date': date.fromisoformat(start_date),
                    'end_date': date.fromisoformat(end_date),
                    'price': price,
                    'image_file': image_file
                }
            )
            vacations.append(vacation)

        # Create some sample likes
        if len(vacations) >= 3:
            Like.objects.get_or_create(user=regular_user, vacation=vacations[0])
            Like.objects.get_or_create(user=regular_user, vacation=vacations[1])
            Like.objects.get_or_create(user=admin_user, vacation=vacations[2])

        self.stdout.write(
            self.style.SUCCESS('Successfully loaded initial data')
        )