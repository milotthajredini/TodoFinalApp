# Generated by Django 3.2.9 on 2022-03-08 23:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_user_task_assigned'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='name',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='task',
            name='completed',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
