from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ItemViewSet, ClientViewSet, PaymentViewSet, InvoiceViewSet, generate_invoice

# Create a router and register our viewsets with it.manage 
router = DefaultRouter()
router.register(r'items', ItemViewSet)
router.register(r'clients', ClientViewSet)
router.register(r'payments', PaymentViewSet)
router.register(r'invoices', InvoiceViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('generate-invoice/<int:invoice_id>/', generate_invoice, name='generate_invoice'),
]