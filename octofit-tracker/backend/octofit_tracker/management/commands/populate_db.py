
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from octofit_tracker.models import Team, Activity, Workout, Leaderboard
User = get_user_model()

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Delete existing data
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        Leaderboard.objects.all().delete()
        User.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create users
        users = [
            {'email': 'ironman@marvel.com', 'username': 'IronMan', 'team': 'Marvel'},
            {'email': 'captain@marvel.com', 'username': 'CaptainAmerica', 'team': 'Marvel'},
            {'email': 'batman@dc.com', 'username': 'Batman', 'team': 'DC'},
            {'email': 'wonderwoman@dc.com', 'username': 'WonderWoman', 'team': 'DC'},
        ]
        for u in users:
            User.objects.create_user(username=u['username'], email=u['email'], password='test1234')

        # Create activities
        Activity.objects.create(name='Running', user_email='ironman@marvel.com', team='Marvel')
        Activity.objects.create(name='Swimming', user_email='captain@marvel.com', team='Marvel')
        Activity.objects.create(name='Cycling', user_email='batman@dc.com', team='DC')
        Activity.objects.create(name='Yoga', user_email='wonderwoman@dc.com', team='DC')

        # Create workouts
        Workout.objects.create(name='Chest Day', description='Bench press and pushups', user_email='ironman@marvel.com')
        Workout.objects.create(name='Leg Day', description='Squats and lunges', user_email='captain@marvel.com')
        Workout.objects.create(name='Cardio', description='Running and cycling', user_email='batman@dc.com')
        Workout.objects.create(name='Flexibility', description='Yoga and stretching', user_email='wonderwoman@dc.com')

        # Create leaderboard
        Leaderboard.objects.create(team='Marvel', points=200)
        Leaderboard.objects.create(team='DC', points=180)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data'))
