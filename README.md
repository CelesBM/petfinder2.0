APP: https://petfinder-d943d.web.app/
DEPLOY BACK: https://selfless-unity-production-3b69.up.railway.app/

PetFinder 2.0 es una aplicación web desarrollada para ayudar a reportar y encontrar mascotas perdidas. 
El proyecto implementa un frontend en React, siguiendo una arquitectura basada en componentes, junto a un backend en Node.js con Express, alojado en Railway. 
Permite registrar usuarios, iniciar sesión, reportar mascotas perdidas, visualizar reportes y actualizar datos de perfil.

Tecnologías Utilizadas

🧩 Frontend
React 
React Router DOM para manejo de rutas
Recoil para manejo de estado global
Leaflet para mostrar mapas interactivos
Dropzone y Cloudinary para subida de imágenes
Algolia Places para autocompletado de direcciones
Fetch API para consumo del backend
Parcel y Webpack para bundling
Firebase Hosting para el deploy

🛠️ Backend
Node.js + Express
TypeScript
Sequelize + PostgreSQL para la base de datos
Sendgrid para envío de emails
Cloudinary para almacenamiento de imágenes
JWT para autenticación segura
Dotenv para variables de entorno
CORS configurado para permitir acceso desde frontend deployado

🌐 Deploy
Frontend: Firebase Hosting
Backend: Railway

🔐 Funcionalidades principales
Registro e inicio de sesión de usuarios con validación
Actualización de datos personales
Reporte de mascotas perdidas con imagen, ubicación y descripción
Visualización de mascotas reportadas
Edición y eliminación de reportes
Envío de emails desde el formulario de contacto
