class ProfileFieldMixin():

    def get_image_url(self, object_name):

        def wrapper(obj):
            attr = getattr(obj, object_name)
            if not (attr and attr.url):
                return None
            return attr.url

        return wrapper
