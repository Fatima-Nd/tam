# Generated by Django 3.1.7 on 2021-03-18 10:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0003_auto_20210318_1216'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='vat_date',
            field=models.DateField(null=True),
        ),
    ]
