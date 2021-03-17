from django.db import models

class CommonInfoAddress(models.Model):
    phone1 = models.CharField(max_length=255)
    phone2 = models.CharField(max_length=255, blank=True, null=True)
    fax = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    country = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    website = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        abstract = True

class Company(CommonInfoAddress):
    name = models.CharField(max_length = 255)
    currency= models.CharField(max_length = 100)
    vat = models.BooleanField()
    start_date= models.DateField()
    end_date = models.DateField()
    vat_amount = models.FloatField(null = True, blank= True)
    vat_date = models.DateField(null = True, blank= True)
    mof =  models.CharField(max_length = 100)
    commercial_register = models.IntegerField()
    image= models.ImageField()

    def __str__(self):
        return self.name

class Branch(CommonInfoAddress):
    name = models.CharField(max_length = 255)
    start_date= models.DateField()
    end_date = models.DateField()
    company = models.ForeignKey(Company, on_delete=models.PROTECT)

    
    def __str__(self):
        return self.name