# Generated by Django 2.2 on 2021-03-13 20:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('learning_posts', '0004_auto_20210313_1358'),
    ]

    operations = [
        migrations.AlterField(
            model_name='topic',
            name='text',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
