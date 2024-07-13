# imports
from rest_framework import serializers
from .models import Record

# class for the record model
class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        # to declare which fields to be serialized
        model = Record
        fields = '__all__' 
