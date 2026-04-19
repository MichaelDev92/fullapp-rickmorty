# Rick and Morty Frontend

Aplicacion web desarrollada con React 18, GraphQL, React Router y TailwindCSS para listar y gestionar personajes de Rick and Morty.

## Funcionalidades implementadas

- Listado de personajes en tarjetas con nombre, imagen y especie.
- Vista de detalle por personaje al seleccionar una tarjeta.
- Marcado/desmarcado de favoritos por sesion.
- Agregar comentarios por personaje.
- Ordenamiento por nombre (A-Z / Z-A).
- Filtros por estado, especie y genero.
- Busqueda por texto (nombre/especie).
- Layout responsive para pantallas moviles y escritorio.
- Uso de Flexbox y CSS Grid en las vistas principales.
- Estilos con TailwindCSS.
- Manejo de estado de UI con Zustand.
- Pruebas unitarias en componentes/layouts principales (Vitest + Testing Library).
- Soft delete disponible en detalle de personaje (opcional de la prueba).

## Stack tecnico

- React 18 + TypeScript
- React Router DOM
- Apollo Client (GraphQL)
- Zustand
- TailwindCSS
- Vitest + Testing Library

## Estructura principal

```text
frontend/
├─ src/
│  ├─ features/
│  ├─ pages/
│  ├─ routes/
│  ├─ shared/
│  └─ styles/
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

Frontend disponible en:

- `http://localhost:5173`

La app consume GraphQL en:

- `http://localhost:4000/graphql`

## Variables de entorno

En Docker Compose, el build del frontend usa:

- `VITE_GRAPHQL_URL=http://localhost:4000/graphql`

Para ejecucion local sin Docker, puedes usar `frontend/.env` con:

```env
VITE_GRAPHQL_URL=http://localhost:4000/graphql
```

## Ejecucion local sin Docker (opcional)

1. Instalar dependencias:

```bash
pnpm install
```

2. Iniciar en desarrollo:

```bash
pnpm run dev
```

3. Build de produccion:

```bash
pnpm run build
```

## Scripts utiles

- `pnpm run dev`: servidor de desarrollo
- `pnpm run build`: build de produccion
- `pnpm run preview`: servir build local
- `pnpm run codegen`: generar tipos GraphQL
- `pnpm run test`: ejecutar pruebas
