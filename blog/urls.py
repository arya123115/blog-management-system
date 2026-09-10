from rest_framework.routers import DefaultRouter
from .views import BlogViewSet, CategoryViewSet, CommentViewSet


router = DefaultRouter()

router.register('blogs', BlogViewSet, basename='blogs')
router.register('categories', CategoryViewSet, basename='categories')
router.register('comments', CommentViewSet, basename='comments')


urlpatterns = router.urls