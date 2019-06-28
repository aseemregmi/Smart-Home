# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
import hashlib


class RaspberrypiUsers(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(unique=True, max_length=25)
    password = models.CharField(max_length=400)

    class Meta:
        managed = False
        db_table = 'RaspBerryPi_users'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Gadget(models.Model):
    gadget_id = models.AutoField(primary_key=True)
    rpi = models.ForeignKey('RaspberryPi', models.DO_NOTHING)
    gadget_type = models.ForeignKey('GadgetType', models.DO_NOTHING)
    gadget_name = models.CharField(max_length=40)
    gpio_number = models.IntegerField()
    power = models.IntegerField()
    status = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'gadget'

    def __str__(self):
        return self.gadget_name


class GadgetType(models.Model):
    gadget_type_id = models.AutoField(primary_key=True)
    gadget_type_name = models.CharField(unique=True, max_length=50)

    class Meta:
        managed = False
        db_table = 'gadget_type'

    def __str__(self):
        return self.gadget_type_name


class RaspberryPi(models.Model):
    rpi_id = models.AutoField(primary_key=True)
    user = models.ForeignKey('Users', models.DO_NOTHING)
    rpi_name = models.CharField(max_length=40)
    socket_id = models.CharField(max_length=64, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'raspberry_pi'

    def __str__(self):
        return self.rpi_name


class ScheduledTasks(models.Model):
    gadget = models.ForeignKey(Gadget, models.DO_NOTHING)
    scheduled_time = models.DateTimeField()
    task_to_do = models.BooleanField()
    status = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'scheduled_tasks'


class Session(models.Model):
    gadget = models.ForeignKey(Gadget, models.DO_NOTHING)
    starting_datetime = models.DateTimeField()
    ending_datetime = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'session'


class Users(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(unique=True, max_length=25)
    password = models.CharField(max_length=64)

    class Meta:
        managed = False
        verbose_name_plural = "Users"
        db_table = 'users'

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        
        self.password = hashlib.sha256(self.password.encode('utf-8')).hexdigest()
        super(Users, self).save(*args, **kwargs)