# 📊 Dashboard Server

Dashboard en **Angular 22 con SSR** para gestionar el catálogo de aplicaciones expuesto por
[`application-management-api`](https://github.com/ilusCode/application-management-api).
Permite listar, registrar y eliminar aplicaciones desde una interfaz web.

![Angular](https://img.shields.io/badge/Angular-22-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white)

---

## ✨ Funcionalidades

| Ruta | Descripción |
|------|-------------|
| `/home` | Lista las aplicaciones del catálogo en tarjetas, con su icono, nombre, descripción y enlace. Permite eliminarlas. |
| `/register-app` | Formulario para registrar una aplicación nueva y sus imágenes. |
| `**` | Cualquier otra ruta redirige a `/home`. |

## 🏗️ Arquitectura

```
Navegador ──/api/*──▶ Express (src/server.ts) ──proxy──▶ application-management-api
                         │
                         └─ SSR: en el servidor, las peticiones van directo a la API
```

- **Proxy `/api`:** `server.ts` reenvía `/api/*` a la API, así el navegador solo habla con este servidor y no hace falta CORS.
- **`baseUrlInterceptor`** (`app.config.ts`): en el navegador deja las URLs relativas. En el servidor (SSR) les antepone `environment.api.catalogApp`.
- **`CatalogAppService`:** centraliza las llamadas a la API.

### Endpoints que consume

| Método | Ruta | Uso |
|--------|------|-----|
| `GET` | `/api/v1/apps` | Listar el catálogo |
| `GET` | `/api/v1/apps/:id/details` | Detalle de una aplicación (imágenes) |
| `POST` | `/api/v1/app/new` | Registrar una aplicación |
| `PUT` | `/api/v1/apps/:id` | Eliminar una aplicación (*soft delete*) |

## 📁 Estructura

```
src/
├── app/
│   ├── components/      # application-card, navbar-home, no-applications
│   ├── pages/           # home-page, register-app-page
│   ├── services/        # catalog-app-service
│   ├── model/           # modelos de petición/respuesta de la API
│   ├── interfaces/      # register-app-config (lee el YAML)
│   ├── app.config.ts    # providers + baseUrlInterceptor
│   └── app.routes.ts
├── environments/        # URL de la API por entorno
└── server.ts            # Express: proxy /api + SSR
public/assets/
├── config/register-app.yaml   # configuración del formulario de registro
└── images/                    # logos y recursos gráficos
```

## ⚙️ Configuración

### URL de la API

| Archivo | Se usa en | Valor |
|---------|-----------|-------|
| `src/environments/environment.development.ts` | `ng serve` / build de desarrollo | `http://127.0.0.1:4000` |
| `src/environments/environment.ts` | Build de producción / Docker | `http://application-management-api:4000` |

### Formulario de registro

Los tipos de imagen disponibles se definen en `public/assets/config/register-app.yaml`:

```yaml
imageTypes:
  - Icon
  - Banner
```

### Hosts permitidos

- **Desarrollo:** `angular.json` → `serve.options.allowedHosts` (`localhost`, `0.0.0.0`). Agrega aquí la IP o el dominio si accedes desde otro equipo.
- **Producción (SSR):** variable de entorno `NG_ALLOWED_HOSTS` (lista separada por comas).

## 🚀 Desarrollo local

**Requisitos:** Node.js 24+ y `application-management-api` corriendo en `http://127.0.0.1:4000`.

```bash
npm install
npm start
```

Abre `http://localhost:4200/`.

| Script | Descripción |
|--------|-------------|
| `npm start` | Servidor de desarrollo con recarga automática |
| `npm run build` | Build de producción en `dist/DashboardServer` |
| `npm test` | Pruebas unitarias con Vitest |
| `npm run serve:ssr:DashboardServer` | Sirve el build de producción con SSR |

## 🐳 Docker

```bash
docker build -t dashboard-server .
docker run -p 4300:4300 \
  --network <red-de-la-api> \
  -e NG_ALLOWED_HOSTS=localhost,<tu-ip-o-dominio> \
  dashboard-server
```

La aplicación queda en `http://localhost:4300`. El contenedor debe estar en la misma red de Docker
que `application-management-api` para que el host `application-management-api` se resuelva.

| Variable | Por defecto | Descripción |
|----------|-------------|-------------|
| `PORT` | `4300` | Puerto del servidor |
| `NG_ALLOWED_HOSTS` | `localhost,127.0.0.1` | Hosts aceptados por el SSR (protección contra SSRF) |

## 🧪 Pruebas

```bash
npm test
```

Cubren el servicio (`CatalogAppService`), la tarjeta de aplicación, la página de inicio y el formulario de registro.

## 👤 Autor

**Eduardo Fernández Morales** — [@ilusCode](https://github.com/ilusCode) · [LinkedIn](https://www.linkedin.com/in/eduardo-fernandez-morales/)
