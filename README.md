APP: https://petfinder-d943d.web.app/
DEPLOY BACK: https://selfless-unity-production-3b69.up.railway.app/


# 🐶 PetFinder 2.0

**PetFinder 2.0** es una aplicación web desarrollada para ayudar a reportar y encontrar mascotas perdidas.  
El proyecto implementa un frontend en **React**, siguiendo una arquitectura basada en componentes, junto a un backend en **Node.js con Express**, alojado en Railway.

Permite:
- Registrar usuarios
- Iniciar sesión
- Reportar mascotas perdidas
- Visualizar reportes
- Actualizar datos de perfil

---

## 🌐 Deploy

- **Frontend**: Firebase hosting
- **Backend**: Railway.app

---

## 🧩 Tecnologías Utilizadas

### Frontend
- React
- React Router DOM (ruteo)
- Recoil (estado global)
- Leaflet (mapas interactivos)
- Dropzone + Cloudinary (subida de imágenes)
- Algolia Places (autocompletado de direcciones)
- Fetch API (consumo de datos)
- Parcel + Webpack (empacado)
- Firebase Hosting (deploy)

### Backend
- Node.js + Express
- TypeScript
- Sequelize + PostgreSQL (base de datos)
- Sendgrid (envío de emails)
- Cloudinary (almacenamiento de imágenes)
- JWT (autenticación)
- Dotenv (variables de entorno)
- CORS (permitir acceso desde frontend deployado)

---

## 🔐 Funcionalidades principales

- Registro e inicio de sesión con validaciones
- Edición de datos personales
- Reporte de mascotas perdidas (con foto, dirección y detalles)
- Visualización de mascotas reportadas
- Edición y eliminación de reportes existentes
- Envío de mensajes vía email desde el formulario de contacto
