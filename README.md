# Gestión de Clientes

Aplicación web para gestionar clientes construida con ASP.NET Core Minimal API en C# y Next.js en el frontend.

## Tecnologías utilizadas

- Backend: C# con ASP.NET Core Minimal API (.NET 10) - me parecio la mejor opcion una Minimal API porque permite definir los endpoints directamente en Program.cs sin necesidad de controllers, lo que hace el código más simple, directo y fácil de probar.

- Base de datos: SQLite con Entity Framework Core - Se eligió SQLite porque es una base de datos embebida que no requiere instalar ningún servidor externo. El archivo de base de datos se crea automáticamente al correr el proyecto.

- Frontend: Next.js con JavaScript

## Estructura del proyecto

    app-web-pb-tecnica/
    ├── backend/
    │   └── ClientesApi/       API REST en C#
    └── frontend/              Interfaz en Next.js

## Requisitos previos

- .NET 10 SDK — https://dotnet.microsoft.com/download
- Node.js 18 o superior — https://nodejs.org/
- Entity Framework CLI, instalarlo con este comando:

    dotnet tool install --global dotnet-ef

## Base de datos
La base de datos SQLite se crea automáticamente al correr el proyecto. Si querés crearla manualmente, dentro de la carpeta backend/ClientesApi corré:

    dotnet ef migrations add InitialCreate
    dotnet ef database update

Esto genera el archivo clientes.db con la tabla lista.

## Cómo correr el proyecto
### 1. Backend

Abrí una terminal y navegá a la carpeta del backend:

    cd backend/ClientesApi

Restaurá las dependencias:

    dotnet restore

Corré la API:

    dotnet run

La API queda corriendo en http://localhost:5114

### 2. Frontend

Abrí otra terminal y navegá a la carpeta del frontend:

    cd frontend

Instalá las dependencias:

    npm install

Corré el servidor de desarrollo:

    npm run dev

Abrí http://localhost:3000 en el navegador.

## Endpoints de la API

GET     /api/clientes              Listar todos los clientes
GET     /api/clientes?search=xxx   Buscar por nombre o email
GET     /api/clientes/{id}         Obtener un cliente por ID
POST    /api/clientes              Crear un nuevo cliente
PUT     /api/clientes/{id}         Editar un cliente existente
DELETE  /api/clientes/{id}         Eliminar un cliente

## Ejemplo de body para POST y PUT

    {
      "nombre": "Juan Pérez",
      "email": "juan@email.com",
      "estado": "activo"
    }

## Funcionalidades

- Listado de clientes con nombre, email, estado y fecha de creación
- Búsqueda en tiempo real por nombre o email
- Contador de clientes activos e inactivos
- Hacer click en una fila despliega el detalle del cliente
- Crear cliente con validaciones
- Editar cliente existente 
- Eliminar cliente con modal de confirmación
- Mensajes de éxito al crear, editar y eliminar
- Diseño dark mode con gradientes y animaciones

## Colección Postman
Importar el archivo Clientes.postman_collection.json incluido en la carpeta backend/ClientesApi para tener todos los endpoints listos para probar.