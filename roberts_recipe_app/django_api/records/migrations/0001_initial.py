# Generated by Django 4.1.13 on 2024-07-12 17:55

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Record',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=40)),
                ('author', models.CharField(max_length=40)),
                ('votes', models.IntegerField(default=0)),
                ('description', models.CharField(max_length=140)),
            ],
        ),
    ]
