# Merged Backend: Sundaram + Indigo

Both **Sundaram** and **Indigo** run in one server with shared folders (routes, controllers, models).

## Endpoints

### Sundaram
- `POST /api/contact/submit` – Contact form
- `GET /api/health` – Health check

### Indigo (same structure, no `/api/indigo` prefix)
- `POST /auth/login` – Admin login
- `GET /categories`, `GET /products`, `GET /blogs`, `GET /offers`, `GET /banners`
- `GET /reviews`, `GET /content-pages`, `GET /site-settings`
- `GET /delivery-platforms`, `GET /catering-menus`, `GET /inquiries`
- `GET /admin/notifications`

## Structure
- `routes/` – contactRoutes (Sundaram) + authRoutes, productRoutes, etc. (Indigo)
- `controllers/` – contactController + authController, productController, etc.
- `models/` – Customer (Sundaram) + Admin, Product, Category, etc. (Indigo)
- `config/`, `middlewares/`, `utils/`, `validations/`, `services/` – shared

## Run
```bash
npm install
npm start
```

## Indigo env vars (optional)
- `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
