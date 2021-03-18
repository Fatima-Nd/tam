from rest_framework import serializers
from .models import Company

#CRUD COMPANY
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'
