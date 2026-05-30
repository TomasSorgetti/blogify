# Blogify

Este es el repositorio principal de Blogify. El proyecto está dividido en una arquitectura de microservicios e incluye las siguientes piezas clave: un frontend en React, un backend en Node.js, un worker en Rust y servicios de infraestructura (Postgres y Redis) orquestados mediante Docker.

## Arquitectura y Uso de Servicios

- **Server (Node.js + MongoDB)**: Es la API principal de la aplicación. Gestiona la lógica de negocio y utiliza MongoDB como base de datos principal (Write Model). Emite eventos a Redis (Event Bus / Cola de mensajes) cuando ocurren acciones importantes en el sistema.
- **Worker (Rust)**: Actúa como un consumidor de los eventos enviados por el servidor a Redis. Procesa tareas en segundo plano de manera asíncrona, como el envío de emails, la generación de resúmenes con IA, y la escritura de logs y analíticas.
- **Redis (Docker)**: Utilizado por el Node server para caché (por ej. en `src/infrastructure/services/cache`) y principalmente como sistema de colas/eventos (Event Bus) a través de los cuales el worker en Rust consume mensajes (como `ARTICLE_VIEWED`, `ACTIVITY_LOGGED`, etc.).
- **Postgres (Docker)**:
  - **¿Para qué se utiliza Postgres?**: Se utiliza como el **Read Model** (base de datos optimizada para lectura) bajo un patrón similar a CQRS. El Worker en Rust escucha eventos desde Redis y escribe datos (analíticas, registros de actividad, notificaciones, etc.) en esta base de datos relacional de Postgres. Esto permite liberar a MongoDB de la carga de procesar análisis pesados o relaciones complejas para lecturas posteriores.

---

## Cómo levantar el proyecto en desarrollo

Para ejecutar este proyecto en tu entorno local, asegúrate de tener instalados **Node.js**, **pnpm**, **Rust (Cargo)** y **Docker**.

### 1. Levantar la Infraestructura (Docker)

Primero, levanta los contenedores de Redis y Postgres. En la raíz del proyecto, ejecuta:

```bash
docker-compose up -d
```

> Esto levantará Redis en el puerto `6379` y Postgres en el puerto `5432` con la base de datos `blogify_read_model`.

### 2. Levantar el Backend (Server)

Abre una nueva terminal, ve al directorio `server` y arranca el entorno de desarrollo:

```bash
cd server
pnpm install
pnpm run dev
```

> El servidor se iniciará utilizando `nodemon` (asegúrate de haber configurado tu archivo `.env` correspondiente dentro de la carpeta `server`).

### 3. Levantar el Frontend (Client)

Abre otra terminal, ve al directorio `client` y ejecuta el servidor de Vite:

```bash
cd client
pnpm install
pnpm run dev
```

> La aplicación de React estará disponible (por lo general en `http://localhost:5173`).

### 4. Levantar el Worker (Rust)

Abre una última terminal, dirígete al directorio `worker` y ejecuta el consumidor en Rust:

```bash
cd worker
cargo run
```

> El worker compilará y empezará a escuchar los eventos provenientes de Redis de forma inmediata.

---

¡Con estos 4 componentes corriendo, ya tienes todo el stack de Blogify funcionando en desarrollo!
