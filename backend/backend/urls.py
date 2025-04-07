from django.contrib import admin
from django.urls import path
from django.urls import include
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
