#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
# imports
import os
import sys

def main():
    """Run administrative tasks."""
    # to set the default settings module for the Django project
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_app.settings')
    
    try:
        # to import Django's command execution utility
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        # to display an error message if Django can't be imported
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    
    # to execute the command-line utility
    execute_from_command_line(sys.argv)

# to call the main() function.
if __name__ == '__main__':
    main()
