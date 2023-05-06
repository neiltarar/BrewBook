from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Beer
from .serialisers import BeerSerialiser


class BeerListCreateView(generics.ListCreateAPIView):
    queryset = Beer.objects.all()
    serializer_class = BeerSerialiser
    permission_classes = [IsAuthenticated]


class BeerRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Beer.objects.all()
    serializer_class = BeerSerialiser
    permission_classes = [IsAuthenticated]

