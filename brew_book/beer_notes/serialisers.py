from rest_framework import serializers
from .models import Beer

class BeerSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Beer
        fields = [
            'id', 'name', 'place', 'producer_info', 'label_picture', 'date', 'notes', 'user']