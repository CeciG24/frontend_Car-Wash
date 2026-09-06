# Frontend público LS 1713

## Configuración

Crea .env.local usando .env.example como referencia:

VITE_API_URL=http://127.0.0.1:5000
VITE_PORTFOLIO_SOURCE=api

Reinicia Vite después de cambiar estas variables. VITE_API_URL debe ser la URL
base del backend, sin /api adicional. Las variables VITE_ son públicas: no
pongas secretos ni contraseñas en ellas.

npm install
npm run dev

El cliente HTTP compartido está en src/services/api.js. Servicios, reseñas,
contacto, citas y portafolio utilizan la misma URL base.

El portafolio usa la API de la base de datos por defecto. El archivo
src/data/portfolio.json se conserva como alternativa: establece
VITE_PORTFOLIO_SOURCE=json para usarlo. Consulta src/data/README.md.

## Verificación

npm run lint
npm run build

La carpeta frontend-adminpanel es un proyecto separado e incompleto: esta
entrega no implementa sus pantallas.
