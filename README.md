# 🚀 API REST con Firebase y Node.js

Esta API permite **crear, leer, actualizar y eliminar productos y usuarios** en una base de datos **Firestore de Firebase**, con autenticación mediante tokens **JWT**.  
Incluye validaciones, manejo de errores, arquitectura escalable por capas y una colección Postman para pruebas.

---

## 📁 Estructura del proyecto

```
.
├── controllers/
├── services/
├── models/
├── routes/
├── middlewares/
├── validators/
├── config/
├── index.js
├── .env
├── package.json
└── README.md
```

---

## 🧩 Tecnologías utilizadas

- **Node.js + Express**
- **Firebase Firestore**
- **JWT** para autenticación
- **bcrypt** para encriptación de contraseñas
- **dotenv** para variables de entorno
- **Joi** para validaciones
- **Postman** para pruebas

---

## ✅ Requisitos previos

- Node.js instalado
- Cuenta en [Firebase Console](https://console.firebase.google.com/)
- Crear un proyecto y habilitar **Firestore en modo de prueba**
- Habilitar la API desde:  
  👉 [`https://console.developers.google.com/apis/api/firestore.googleapis.com/overview`](https://console.developers.google.com/apis/api/firestore.googleapis.com/overview)

---

## ⚙️ Instalación

```bash
git clone https://github.com/miguelpuente/api-rest-firebase.git
cd api-rest-firebase
npm install
```

---

## 🔐 Variables de entorno `.env`

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
JWT_SECRET=miclaveultrasecreta

FIREBASE_API_KEY=xxxxxxxxxxxx
FIREBASE_AUTH_DOMAIN=xxxxx.firebaseapp.com
FIREBASE_PROJECT_ID=apis-products
FIREBASE_STORAGE_BUCKET=xxxxx.appspot.com
FIREBASE_MESSAGING_SENDER_ID=xxxxxxx
FIREBASE_APP_ID=1:xxxx:web:xxxxxx
```

Podés obtener estos datos desde la configuración del proyecto en Firebase > "Configuración del proyecto" > "Tus apps".

---

## 🚀 Ejecución del servidor

```bash
npm start
```

El servidor se ejecutará en:  
**http://localhost:3000**

---

## 🌐 URL del deploy
**https://api-rest-firebase-bice.vercel.app/**

---

## 🔐 Autenticación

Debés autenticarte con:

```http
POST /auth/login
```

Cuerpo:

```json
{
  "username": "admin",
  "password": "123456"
}
```

Obtendrás un **Bearer Token** que deberás incluir en las cabeceras:

```
Authorization: Bearer TU_TOKEN
```

---

## 📦 Endpoints disponibles

### 🧑‍💼 Usuarios

| Método | Ruta                      | Autenticación | Descripción                |
|--------|---------------------------|---------------|----------------------------|
| POST   | /api/users/create         | ❌            | Crear nuevo usuario        |
| GET    | /api/users                | ✅            | Listar todos los usuarios  |
| GET    | /api/users/:id            | ✅            | Obtener usuario por ID     |
| PUT    | /api/users/:id            | ✅            | Actualizar usuario         |
| DELETE | /api/users/:id            | ✅            | Eliminar usuario           |

---

### 📦 Productos

| Método | Ruta                        | Autenticación | Descripción                 |
|--------|-----------------------------|---------------|-----------------------------|
| GET    | /api/products               | ✅            | Listar productos            |
| GET    | /api/products/:id           | ✅            | Obtener producto por ID     |
| POST   | /api/products/create        | ✅            | Crear nuevo producto        |
| PUT    | /api/products/:id           | ✅            | Actualizar producto         |
| DELETE | /api/products/:id           | ✅            | Eliminar producto           |

---

## 🧪 Pruebas con Postman

1. Abrí Postman
2. Importá el archivo `api-firebase-rest.postman_collection.json`
3. Usá el endpoint **Login** para obtener el token
4. Copiá el token y reemplazá la variable `{{token}}` en la colección
5. Probá los demás endpoints

---

## 🧱 Estructura por capas

- `controllers/` → recibe la petición y la pasa al servicio
- `services/` → ejecuta lógica de negocio
- `models/` → interactúa con Firestore
- `routes/` → define rutas REST
- `middlewares/` → validaciones y autenticación
- `validators/` → esquemas Joi para validar datos

---

## 🛠️ Validaciones

- Se utiliza **Joi** para validar los datos entrantes.
- Se rechazan peticiones malformadas con error 400.

---

## ⚠️ Manejo de errores

- Rutas no encontradas → `404`
- Error de autenticación → `401` o `403`
- Error de validación → `400`
- Error interno o Firestore → `500`

---

## 🔐 Seguridad

- Contraseñas encriptadas con **bcrypt**
- Tokens JWT con vencimiento de 1 hora
- Middleware que protege rutas privadas

---

## 🧑 Autor

Desarrollado por **Miguel Puente**  
💼 Proyecto final para curso de Backend/API REST
