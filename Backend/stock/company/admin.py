from django.contrib import admin
from .models import *

admin.site.register(Company)

admin.site.enable_nav_sidebar = False
# Register your models here.
