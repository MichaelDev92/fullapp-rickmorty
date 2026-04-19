# FullApp Rick and Morty (Monorepo)

Aplicacion full stack para la prueba tecnica **Developer Full Stack Test**, construida como monorepo con:

- `frontend`: React 18 + GraphQL + React Router + TailwindCSS.
- `backend`: Express + Apollo GraphQL + Sequelize + PostgreSQL + Redis.

La solucion permite consultar, filtrar y gestionar personajes de Rick and Morty usando una API propia con cache y persistencia local.

## Funcionalidades implementadas

### Frontend

- Listado de personajes en tarjetas con nombre, imagen y especie.
- Vista de detalle por personaje con informacion ampliada.
- Marcado y desmarcado de favoritos.
- Comentarios por personaje.
- Ordenamiento por nombre (A-Z / Z-A).
- Busqueda/filtros por estado, especie y genero.
- UI responsive (layouts para orientacion vertical/horizontal con Flexbox y Grid).
- Estilos con TailwindCSS y soporte de temas.
- Pruebas unitarias en componentes/layouts clave.
- Soft delete de personaje desde detalle (opcional de la prueba).

### Backend

- API GraphQL sobre Express para personajes Rick and Morty.
- Query de personajes con filtros por `status`, `species`, `gender`, `name` y `origin`.
- Persistencia en PostgreSQL con Sequelize (migraciones y seeders).
- Cache de consultas en Redis.
- Seeder inicial con 15 personajes desde la API publica.
- Middleware de request logging y request id.
- Cron job configurable para refrescar personajes cada 12 horas.
- Decoradores para medir tiempo de ejecucion en servicios.
- Pruebas unitarias e integracion de consultas/resolvers.
- Arquitectura por capas (repositorios, servicios, resolvers, contenedor DI).

## Estructura del monorepo

```text
fullapp-rickmorty/
├─ backend/
├─ frontend/
├─ docker-compose.yml
└─ .env (opcional para docker compose)
```

## Requisitos

- Docker Desktop (o Docker Engine + Compose v2).

> No es obligatorio subir ni compartir archivos `.env` para ejecutar con Docker Compose, porque el `docker-compose.yml` define valores por defecto.

## Ejecutar todo con Docker Compose

Desde la raiz del monorepo:

```bash
docker compose up --build
```

Para ejecutar en segundo plano:

```bash
docker compose up --build -d
```

Para detener servicios:

```bash
docker compose down
```

Para limpiar tambien volumenes de datos:

```bash
docker compose down -v
```

## Variables de entorno en Compose

`docker-compose.yml` usa interpolacion con fallback, por ejemplo:

- `${DB_NAME:-namedb}`
- `${DB_USER:-userdb}`
- `${DB_PASSWORD:-passdb}`

Significa que si la variable no existe en el shell o en el `.env` de la raiz, Compose usa el valor por defecto.

Variables opcionales en raiz (`.env`) podrán ser compartidas siendo solicitadas al desarrollador.

## Servicios y puertos

- Frontend: `http://localhost:5173`
- Backend GraphQL: `http://localhost:4000/graphql`
- Health backend: `http://localhost:4000/health`
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`

## Documentacion por proyecto

- Backend: `backend/README.md`
- Frontend: `frontend/README.md`
