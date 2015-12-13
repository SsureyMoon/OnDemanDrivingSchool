# ODDS(On-Demand Driving School)

A Single page web application in Python, Django rest framework and Backbone.js.

## Code structure

- Front-end code in **/app_client** directory
- Back-end code in **/backend** directory
- Nginx settings in **/nginx** directory

## How it works
1. Nginx to serve static, media file, and redirect API url to localhost.
2. Postgres to store data, PostGIS to implement geo query, such as people near by.
3. Django REST Framework to serve REST API.
4. SASS for a responsive web design.
5. Backbone.js for a single page web application.
6. JSON Web Token for stateless authentication.

## Getting Started(MacOS)

### Postgres Setting
Turn on Postgres, create database, and access it
```bash
pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
createdb drivingschool
psql drivingschool
```

Great extension for Geo query, and exit Postgres shell
```bash
drivingschool=# create extension postgis;
drivingschool=# \\q
```

## Nginx Setting
In MacOs, nginx configuration files is usually **/usr/local/etc/nginx/nginx.conf**
Add the path of \< this project root \>/nginx/local.conf to the http context.
For exampe, in /usr/local/etc/nginx/nginx.conf
```bash
http {
    ...
    sudo nginx
    include < this project root >/nginx/local.conf
    ...
}
```

## Run Backend server
Install dependencies(Don't forget to use virtual environment).
```bash
pip install -r requirements.txt
```
Synchronize database
```bash
cd backend
./manage.py makemigrations
./manage.py migrate
```
Run server
```bash
./manage.py runserver
```


## Run Frontend client
Install dependencies(Don't forget to use virtual environment).
```bash
pip install -r requirements.txt
```
Synchronize database
```bash
cd app_client
bower install
node install
```
Compile Sass
```bash
grunt compile
```

## Test application
Open browser and access to **your local hostname**
In this app, we are using **local-pm.app.dev**


### This application is currently on development
