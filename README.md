# API de Gestión de Productos

## Descripción

Esta API permite gestionar productos en una aplicación de e-commerce. Construida con Node.js y Express, incluye funcionalidades para crear, actualizar, listar y eliminar productos, además de manejar la carga de imágenes. La documentación de la API está disponible mediante Swagger.

## Características

- **CRUD de Productos**: Crear, leer, actualizar y eliminar productos.
- **Carga de Imágenes**: Gestión de imágenes asociadas a los productos.
- **Documentación con Swagger**: Interfaz interactiva para explorar y probar la API.
- **Middlewares de Seguridad y Logs**: Uso de Helmet, CORS y Morgan.
- **Manejo de Errores Centralizado**: Middleware para gestionar errores de manera consistente.
- **Pruebas Unitarias**: Aseguramiento de la calidad del código mediante pruebas.

## Tecnologías Utilizadas

- **Backend**: Node.js, Express
- **Documentación**: Swagger
- **Seguridad**: Helmet, CORS
- **Logs**: Morgan
- **Base de Datos**: [Especificar si aplica]
- **Contenedores**: Docker, Docker Compose

## Instalación

### Prerrequisitos

- [Node.js](https://nodejs.org/) 14.x o superior
- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/)

### Pasos

1. Clona el repositorio:

    ```bash
    git clone https://github.com/tu-usuario/tu-repo.git
    cd tu-repo
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Configura las variables de entorno. Crea un archivo `.env` basado en el ejemplo proporcionado:

    ```bash
    cp .env.example .env
    ```

4. Ejecuta los contenedores de Docker y la aplicación en modo desarrollo:

    ```bash
    docker-compose up -d
    npm run dev
    ```

## Uso

Una vez que la aplicación esté corriendo, puedes acceder a:

- **API**: `http://localhost:3000`
- **Documentación de Swagger**: `http://localhost:3000/api-docs`
- **Archivos Estáticos**: `http://localhost:3000/uploads`

## Documentación de la API

La documentación interactiva de la API está disponible en la ruta `/api-docs`. Aquí puedes explorar todas las rutas, parámetros y modelos de datos, así como probar las solicitudes directamente desde la interfaz.

## Estructura del Proyecto
