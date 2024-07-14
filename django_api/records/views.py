# imports
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Record
from .serializers import RecordSerializer

# class for listing and creating records
class RecordListCreate(generics.ListCreateAPIView):
    serializer_class = RecordSerializer  # Specify the serializer to be used

    def get_queryset(self):
        # Retrieve all records and order them by votes in descending order
        return Record.objects.all().order_by('-votes')

# class for retrieving, updating, and deleting a record
class RecordRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Record.objects.all()  # Specify the queryset to retrieve records
    serializer_class = RecordSerializer  # Specify the serializer to be used
    lookup_field = 'id'  # Use 'id' field to look up a record

# function for updating the votes of a record
@api_view(['PUT'])
def update_record(request, id):
    try:
        # to get the record by ID
        record = Record.objects.get(id=id)
    except Record.DoesNotExist:
        # to return a 404 response if fails
        return Response(status=status.HTTP_404_NOT_FOUND)

    data = request.data
    record.votes = data.get('votes', record.votes)  # to update votes field
    
    # to serialize the record with the new data
    serializer = RecordSerializer(record, data=data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
