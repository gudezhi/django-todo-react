from rest_framework import permissions

class IsAuthenticatedForWrite(permissions.BasePermission):
    """
    Custom permission to only allow authenticated users to write.
    """

    def has_permission(self, request, view):
        # SAFE_METHODS is a tuple containing 'GET', 'OPTIONS' and 'HEAD'.
        # So, if the request method is in SAFE_METHODS, it's a read-only request
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated
