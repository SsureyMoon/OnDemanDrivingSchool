from StringIO import StringIO
from fabric.api import cd, local, env, run
from fabric.colors import green
from fabric.context_managers import lcd, settings, shell_env, prefix
from fabric.contrib import files
from fabric.decorators import task
from fabric.operations import prompt, os, sudo
import fabtools
from fabtools.python import virtualenv
import sys
from fabtools.shorewall import Ping, SSH, HTTP, HTTPS, SMTP

postgres_dir = "/usr/local/var/postgres"
postgres_log = "/usr/local/var/postgres/server.log"

backend_dir = "./backend/"


def run_db_on_mac():
    local("pg_ctl -D {} -l {} start".format(postgres_dir, postgres_log), capture=False)

def check_db_on_mac():

    with settings(warn_only=True):
        result = local("pg_ctl -D {} status".format(postgres_dir), capture=False)

    return result.succeeded

@task
def run_local():
    # run_db_on_mac()
    # run_migrate_on_local()
    if not check_db_on_mac():
        run_db_on_mac()
    with lcd(backend_dir):
        local("./manage.py runserver")
