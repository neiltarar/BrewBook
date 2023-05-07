from django.urls import path
from .views import BeerListCreateView, BeerRetrieveUpdateDestroyView


urlpatterns = [
    path('beer-list-create', BeerListCreateView.as_view(), name='beer_list_create'),
    path('beer-list-mutate/<int:pk>', BeerRetrieveUpdateDestroyView.as_view(), name='beer_retrieve_update_destroy')
]
