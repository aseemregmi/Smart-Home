from django.contrib import admin

# Register your models here.
from .models import Users, RaspberryPi, Gadget, GadgetType

admin.site.register(Users)
admin.site.register(RaspberryPi)
admin.site.register(Gadget)
admin.site.register(GadgetType)