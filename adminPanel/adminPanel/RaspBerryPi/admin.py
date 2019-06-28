from django.contrib import admin

# Register your models here.
from .models import Users, Gadget, GadgetType, RaspberryPi

admin.site.register(Users)
admin.site.register(Gadget)
admin.site.register(GadgetType)
admin.site.register(RaspberryPi)