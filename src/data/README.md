# Agregar videos al portafolio

El portafolio usa la API por defecto. Para activar este archivo local, configura
VITE_PORTFOLIO_SOURCE=json en frontend/.env.local y reinicia Vite.
En modo JSON, edita portfolio.json en esta carpeta:
no hace falta modificar componentes ni arrancar el backend para mostrar videos.

Cada objeto dentro de "videos" representa una tarjeta. Duplica la plantilla,
reemplaza los datos y cambia "publicado" a true cuando esté listo.

- id: identificador de texto único; por ejemplo, "jetta-001".
- carro: nombre del vehículo; por ejemplo, "Volkswagen Jetta".
- servicio: servicio realizado; por ejemplo, "Lavado premium".
- url: enlace completo https://www.tiktok.com/@usuario/video/ID.
- descripcion: texto opcional; puede omitirse o dejarse vacío.
- publicado: true para mostrar la tarjeta, false para conservar un borrador.

Los enlaces cortos vm.tiktok.com o vt.tiktok.com se abren en TikTok en lugar
de reproducirse dentro de la tarjeta. Abre el enlace corto en el navegador
y copia la dirección completa para incrustar el reproductor.
También se admiten enlaces HTTP(S) directos a MP4, WebM, OGG o MOV.

Las tarjetas conservan el orden del arreglo. El inicio muestra los primeros
tres publicados y la página Portafolio muestra todos.

Las entradas sin id, carro, servicio o url, y los identificadores duplicados,
no se muestran. La plantilla incluida está oculta y no representa un trabajo real.

Usa comas entre objetos, pero no después del último. JSON no admite comentarios.

Al guardar, Vite actualiza la vista en desarrollo. En el sitio publicado,
vuelve a compilar y publicar el frontend para aplicar los cambios.


