# imports
from django.urls import path
from .views import RecordListCreate, RecordRetrieveUpdateDestroy

# to define the url paths
urlpatterns = [
    # url path for listing and creating new records
    # maps to the RecordListCreate view
    path('records/', RecordListCreate.as_view(), name='record-list-create'),

    # url path for retrieving, updating, and deleting a specific record
    # maps to the RecordRetrieveUpdateDestroy view
    path('records/<int:id>/', RecordRetrieveUpdateDestroy.as_view(), name='record-detail'),
]
