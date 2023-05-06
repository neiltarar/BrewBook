import os
from PIL import Image
from django.db import models
from accounts.models import CustomUser


def validate_image_format(image):
    try:
        img = Image.open(image)
        if img.format not in ('JPEG', 'JPG', 'PNG'):
            raise ValidationError("Unsupported image format. Only JPEG, JPG, and PNG are allowed.")
    except Exception as e:
        raise ValidationError("Error while processing the image. Please try again.")


def validate_image_size(image):
    if image.size > 2 * 1024 * 1024:  # 2MB limit
        raise ValidationError("Image size is too large. Please upload an image smaller than 2MB.")


def get_image_path(instance, filename):
    return os.path.join('beer_pics', instance.name, filename)


class Beer(models.Model):
    name = models.CharField(max_length=120)
    place = models.CharField(max_length=300)
    producer_info = models.JSONField()
    label_picture = models.ImageField(upload_to=get_image_path, validators=[validate_image_format, validate_image_size], null=True, blank=True)
    date = models.DateField()
    notes = models.TextField()
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.name