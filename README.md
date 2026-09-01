# AgendaApp

AgendaApp es una aplicación web para la gestión de turnos y reservas de servicios. El proyecto está orientado a pequeños negocios que necesitan administrar sus servicios, clientes y citas de forma sencilla.

Actualmente se encuentra desarrollado el **backend del MVP**, utilizando una arquitectura basada en microservicios.

## Tecnologías utilizadas

- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- Bean Validation
- Spring Cloud Gateway
- PostgreSQL
- Supabase
- Maven
- Git y GitHub

## Arquitectura del backend

El backend está compuesto por tres aplicaciones:

### API Gateway
Punto de entrada principal del backend.

- Puerto: `8080`
- Redirige las solicitudes hacia los microservicios correspondientes.

### User Service
Gestiona la información relacionada con:

- Negocios
- Clientes
- Servicios ofrecidos

Puerto: `8081`

### Appointment Service
Gestiona los turnos y su estado.

Permite:

- Crear y consultar turnos.
- Actualizar el estado de un turno.
- Cancelar turnos.
- Evitar la reserva duplicada de un mismo horario.

Puerto: `8082`

Los estados utilizados actualmente son:

`PENDING`, `CONFIRMED`, `COMPLETED` y `CANCELLED`.

## Base de datos

Se utiliza **PostgreSQL alojado en Supabase**.

Las principales tablas son:

- `businesses`
- `clients`
- `services`
- `appointments`

Las credenciales sensibles, como la contraseña de la base de datos, se manejan mediante variables de entorno y no se almacenan en el repositorio.

## Estructura actual

```text
AgendApp/
├── backend/
│   ├── api-gateway/
│   ├── user-service/
│   └── appointment-service/
├── frontend/
└── .gitignore
```

## Estado del proyecto

Actualmente se encuentra implementada la base del backend del MVP.

El siguiente paso del proyecto es desarrollar el frontend con **React** y conectarlo al backend a través del API Gateway.

## Objetivo

El objetivo de AgendaApp es construir un proyecto pequeño pero completo que permita aplicar conceptos de desarrollo backend y frontend, APIs REST, microservicios, persistencia de datos y comunicación entre servicios.