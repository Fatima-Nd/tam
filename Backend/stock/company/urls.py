from django.urls import path
from django.conf.urls import url
from .views import CompanyList, CompanyUpdate, CompanyDetail


urlpatterns = [
    path('listcompany/', CompanyList ),
    path('updatecompany/<int:pk>/', CompanyUpdate),
    path('detailcompany/<int:pk>/', CompanyDetail.as_view())

]