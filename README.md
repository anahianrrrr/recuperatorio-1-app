# 🎮 API de Juegos y Reseñas
Esta es una API RESTful desarrollada con **Node.js**, **Express** y **MongoDB** para gestionar una colección de videojuegos y las opiniones de los usuarios.

---
## 🚀 Instalación y Configuración

  **Instalar dependencias:**
    ```bash
    npm install
    ```
 **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto y agrega tu conexión a la base de datos:
    ```env
    PORT=3000
    URI_DB=mongodb+srv://TU_USUARIO:TU_PASSWORD@cluster0.mongodb.net/
  
   **Iniciar el servidor:**
    ```bash
    node index.js
    ```
    El servidor correrá en: `http://localhost:3000`


## 🔗 Endpoints de la APp
### 👤 Usuarios
Como la API es pública, no requiere inicio de sesión, pero necesitas registrar un usuario para obtener su `ID` y poder dejar reseñas.
| Método | Endpoint | Descripción | Body (JSON) |
| **POST** | `/api/usuarios/register` | Registrar un nuevo usuario | `{"nombre": "...", "email": "...", "password": "..."}` |

> **Nota:** Al registrarte, guarda el `_id` que devuelve la respuesta. Lo necesitarás para crear reseñas

### 🕹️ Juegos (Games)
Gestión completa de videojuegos. Soporta filtros y búsqueda.

| Método | Endpoint | Descripción | Body / Parámetros |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/games` | Obtener todos los juegos | - |
| **GET** | `/api/games?genre=Accion` | **Filtrar** por género | Query Param |
| **GET** | `/api/games?year=2023` | **Filtrar** por año de lanzamiento | Query Param |
| **GET** | `/api/games?title=Mario` | **Buscar** por nombre (parcial) | Query Param |
| **GET** | `/api/games/:id` | Obtener un juego por ID | - |
| **POST** | `/api/games` | Crear un nuevo juego | `{"title": "...", "description": "...", "genre": "...", "releaseDate": "YYYY-MM-DD"}` |
| **PUT** | `/api/games/:id` | Actualizar un juego | `{"description": "Nueva descripción"}` |
| **DELETE** | `/api/games/:id` | Eliminar un juego | - |

### ⭐ Reseñas (Reviews)
Las reseñas están vinculadas a un juego y a un usuario.

| Método | Endpoint | Descripción | Body (JSON) |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/games/:game_id/reviews` | Ver reseñas de un juego | - |
| **POST** | `/api/games/:game_id/reviews` | Agregar una reseña | `{"rating": 5, "comment": "...", "user": "ID_DEL_USUARIO"}` |

> **Importante:** Para crear una reseña, debes enviar manualmente el `ID` del usuario en el cuerpo de la petición (campo `"user"`), ya que no se utiliza autenticación por token.
