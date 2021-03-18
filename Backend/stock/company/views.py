from .serializers import CompanySerializer
from .models import Company
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics

# LIST AND CREATE NEW COMPANY
@api_view(['GET', 'POST'])
def CompanyList(request):
    if request.method == 'GET':
        data = Company.objects.all()
        serializer = CompanySerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            saved = serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        print(serializer)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# UPDATE AND DELETE COMPANY
@api_view(['PUT', 'DELETE'])
def CompanyUpdate(request, pk):
    try:
        company = Company.objects.get(pk=pk)
    except Company.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = CompanySerializer(company, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        company.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#DETAIL COMPANY
class CompanyDetail(generics.RetrieveAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
