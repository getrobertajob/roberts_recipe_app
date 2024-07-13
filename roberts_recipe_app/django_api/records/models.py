# imports
from djongo import models

# class model
class Record(models.Model):
    # to declare validation parameters
    title = models.CharField(max_length=40)
    author = models.CharField(max_length=40)
    votes = models.IntegerField(default=0)
    description = models.CharField(max_length=255)
    
    def __str__(self):
        return self.title  # to return the title
