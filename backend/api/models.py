from django.db import models

class Item(models.Model):
    item_id = models.AutoField(primary_key=True)
    item_name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    category = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.item_name

class Client(models.Model):
    supplier_name = models.CharField(max_length=255)
    address = models.TextField()
    contact_details = models.CharField(max_length=255)
    contact_person = models.CharField(max_length=255)
    tin_number = models.CharField(max_length=50)
    vat_number = models.CharField(max_length=50)
    email = models.EmailField(max_length=255)
    phone_number = models.CharField(max_length=20)

    def __str__(self):
        return self.supplier_name

class Payment(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)
    payment_method = models.CharField(max_length=50)  # e.g., cash, card, etc.
    invoice = models.ForeignKey('Invoice', on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f'Payment of {self.amount} for {self.client.supplier_name}'

class Invoice(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    items = models.ManyToManyField(Item)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    invoice_date = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField()
    status = models.CharField(max_length=20, choices=[('Paid', 'Paid'), ('Pending', 'Pending'), ('Overdue', 'Overdue')])

    def __str__(self):
        return f'Invoice {self.id} for {self.client.supplier_name}'