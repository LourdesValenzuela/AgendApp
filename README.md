# AgendApp

AgendApp es una aplicación web para la gestión y reserva de turnos en pequeños negocios.

El proyecto utiliza una arquitectura basada en microservicios, con Spring Boot en el backend, React en el frontend y Supabase para base de datos y almacenamiento de imágenes.

## Funcionalidades

### Cliente
- Ver servicios disponibles.
- Consultar precio, duración e imagen.
- Seleccionar fecha y horario.
- Reservar turnos.
- Consultar y cancelar sus turnos.

### Administración
- Consultar los turnos.
- Confirmar, completar o cancelar turnos.
- Crear, editar y eliminar servicios.
- Agregar imágenes a los servicios.

Actualmente las vistas de Cliente y Administración están separadas en la interfaz, pero todavía no cuentan con autenticación ni autorización por roles.

## Tecnologías

**Backend**
- Java 17
- Spring Boot
- Spring Data JPA
- Spring Cloud Gateway
- PostgreSQL

**Frontend**
- React
- Vite
- Tailwind CSS
- JavaScript

**Servicios**
- Supabase PostgreSQL
- Supabase Storage

## Arquitectura

```text
React
  |
API Gateway
  |
  +-- User Service
  |
  +-- Appointment Service
          |
       Supabase
```

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

El backend utiliza `DB_PASSWORD` como variable de entorno.

El frontend utiliza:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Los archivos `.env` no deben subirse al repositorio.

## Estado del proyecto

El MVP permite realizar el flujo completo de reserva de turnos y administrar tanto los turnos como los servicios.
