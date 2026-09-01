# AgendaApp

AgendaApp es una aplicación web responsive para la gestión y reserva de turnos en pequeños negocios, como peluquerías, salones, consultorios y centros de servicios.

El proyecto utiliza una arquitectura basada en microservicios, con Spring Boot en el backend, React en el frontend y Supabase para la persistencia de datos y almacenamiento de imágenes.

## Demo

La aplicación se encuentra desplegada y funcional:

**Frontend:** https://agend-app-virid.vercel.app

> Los servicios backend utilizan el plan gratuito de Render, por lo que la primera solicitud después de un período de inactividad puede tardar mientras los servicios se activan.

## Funcionalidades

### Cliente

- Ver servicios disponibles.
- Consultar precio, duración e imagen.
- Seleccionar fecha y horario disponible.
- Reservar turnos.
- Consultar y cancelar sus turnos.

### Administración

- Consultar los turnos.
- Confirmar, completar o cancelar turnos.
- Crear, editar y eliminar servicios.
- Agregar imágenes a los servicios.

Actualmente las vistas de Cliente y Administración están separadas en la interfaz, pero todavía no cuentan con autenticación ni autorización por roles.

## Tecnologías

### Backend

- Java 17
- Spring Boot
- Spring Data JPA
- Spring Cloud Gateway
- PostgreSQL
- Maven
- Docker

### Frontend

- React
- Vite
- Tailwind CSS
- JavaScript

### Infraestructura y servicios

- Supabase PostgreSQL
- Supabase Storage
- Render
- Vercel

## Arquitectura

```text
                Vercel
                  |
                React
                  |
                  v
          API Gateway (Render)
             /          \
            v            v
    User Service     Appointment Service
       (Render)           (Render)
            \              /
             \            /
                  v
               Supabase
```

El frontend se comunica con el backend a través del API Gateway. El Gateway dirige las solicitudes al microservicio correspondiente.

## Estructura

```text
AgendApp/
├── backend/
│   ├── api-gateway/
│   ├── user-service/
│   └── appointment-service/
├── frontend/
├── .gitignore
└── README.md
```

## Ejecución local

| Aplicación | Puerto |
|---|---:|
| API Gateway | 8080 |
| User Service | 8081 |
| Appointment Service | 8082 |
| React | 5173 |

### Backend

Los microservicios utilizan `DB_PASSWORD` como variable de entorno para conectarse a PostgreSQL.

### Frontend

El frontend utiliza las siguientes variables de entorno:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_API_URL=http://localhost:8080
```

Los archivos `.env` no deben subirse al repositorio.

En producción, `VITE_API_URL` apunta al API Gateway desplegado en Render.

## Despliegue

La aplicación está desplegada utilizando:

- **Frontend:** Vercel
- **API Gateway:** Render
- **User Service:** Render
- **Appointment Service:** Render
- **Base de datos:** Supabase PostgreSQL
- **Almacenamiento de imágenes:** Supabase Storage

Cada servicio backend cuenta con su propio `Dockerfile` para el despliegue.

## Estado del proyecto

El MVP se encuentra funcional y desplegado.

Actualmente permite completar el flujo de reserva de turnos y administrar tanto los turnos como los servicios.
