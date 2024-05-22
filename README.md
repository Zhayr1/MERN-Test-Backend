# Proyecto de GitHub con Express y Node.js

Este proyecto está hecho con Express y Node.js y se puede levantar utilizando Docker.

## Pasos para levantar el proyecto

1. Crear un archivo .env tomando como referencia el archivo .env.example.

2. Hacer build del proyecto utilizando Docker Compose:

docker compose build

3. Levantar el proyecto utilizando Docker Compose:

docker compose up backend

Una vez seguidos estos pasos, el proyecto estará disponible en localhost en el puerto especificado en el archivo .env

Rutas Disponibles:

Auth
POST: /api/auth/register
POST: /api/auth/login

Users
GET: /api/users/profile

Categories
GET: /api/categories/
POST: /api/categories/
PATH: /api/categories/:id
DELETE: /api/categories/:id

Topics
GET: /api/topics/:categoryId
POST: /api/topics/
PATCH: /api/topics/:id
DELETE: /api/topics/:id

Contents
GET: /api/contents/public/:topicId
GET: /api/contents/:topicId
POST: /api/contents/
PATCH: /api/contents/:id
DELETE: /api/contents/:id
