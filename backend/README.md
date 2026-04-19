# Rick and Morty Backend

API GraphQL construida con Express, Apollo Server, Sequelize, PostgreSQL y Redis para soportar la gestion de personajes Rick and Morty.

## Funcionalidades implementadas

- API GraphQL en `/graphql`.
- Query `characters` con filtros por:
  - `status`
  - `species`
  - `gender`
  - `name`
  - `origin`
- Query `character` por id.
- Query `favorites` por `sessionId`.
- Mutaciones:
  - `addComment`
  - `toggleFavorite`
  - `softDeleteCharacter`
  - `restoreCharacter`
- Persistencia con PostgreSQL y Sequelize.
- Migraciones y seeders con `sequelize-cli`.
- Seeder inicial de 15 personajes desde la API publica.
- Cache de resultados con Redis.
- Middleware de trazabilidad:
  - `request-id`
  - logging de requests/responses
  - error handler centralizado
- Cron job configurable para refrescar personajes cada 12 horas.
- Decoradores para medir tiempo de ejecucion de metodos.
- Pruebas unitarias e integracion (Vitest).

## Stack tecnico

- Node.js + TypeScript
- Express
- Apollo Server (GraphQL)
- Sequelize + PostgreSQL
- Redis (ioredis)
- Zod (validacion)
- Pino (logging)
- Vitest + Supertest

## Estructura principal

```text
backend/
├─ src/
│  ├─ modules/characters/
│  ├─ graphql/
│  ├─ middlewares/
│  ├─ db/
│  ├─ cache/
│  ├─ cron/
│  └─ container/
├─ tests/
├─ Dockerfile
└─ package.json
```

## Requisitos

- Docker Desktop (recomendado para correr todo desde compose).

## Ejecucion con Docker Compose (recomendado)

Desde la raiz del monorepo (`fullapp-rickmorty`):

```bash
docker compose up --build
```

Servicios relacionados con backend:

- API: `http://localhost:4000/graphql`
- Health: `http://localhost:4000/health`
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`

El contenedor backend ejecuta migraciones y seeders al iniciar.

## Variables de entorno (Compose)

En `docker-compose.yml` se usan defaults:

- `DB_NAME=${DB_NAME:-rickmorty}`
- `DB_USER=${DB_USER:-app}`
- `DB_PASSWORD=${DB_PASSWORD:-app}`

Si no existe `.env` en raiz ni variables en shell, se usan esos valores.

## Ejecucion local sin Docker (opcional)

1. Instalar dependencias:

```bash
pnpm install
```

2. Configurar `backend/.env`.

3. Ejecutar migraciones y seed:

```bash
pnpm run db:migrate
pnpm run db:seed
```

4. Levantar API:

```bash
pnpm run dev
```

## Scripts utiles

- `pnpm run dev`: desarrollo
- `pnpm run build`: build TypeScript
- `pnpm run start`: ejecutar build
- `pnpm run db:migrate`: correr migraciones
- `pnpm run db:seed`: ejecutar seeders
- `pnpm run db:reset`: reset de DB + migrate + seed
- `pnpm run test`: pruebas
