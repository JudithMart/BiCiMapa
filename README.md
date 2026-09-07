# 🚲 BiciMapa

Aplicación web para ciclistas urbanos: un mapa interactivo para descubrir lugares de interés (cafés, baños, comida, ciclopuertos, bares, hoteles, sitios turísticos), seguir rutas ciclistas, participar en retos mensuales, canjear promociones y gestionar todo desde un panel de administración.

Construida con **React + Vite**, **Mapbox GL** y **Supabase** como backend (autenticación, base de datos y almacenamiento).

> 💼 **Proyecto de portafolio.** BiciMapa fue desarrollado como trabajo freelance para **BiCitas Históricas**. El código de la aplicación es autoría propia y se comparte aquí con fines demostrativos; el proyecto, su marca, datos y contenido pertenecen al cliente. Ver la sección [Licencia](#-licencia).

## ✨ Características

### Para usuarios
- **Mapa interactivo** con Mapbox GL: ubicación en tiempo real, marcadores de lugares por categoría y trazado de rutas ciclistas.
- **Autenticación** de usuarios (registro, login, recuperación/cambio de contraseña) con Supabase Auth.
- **Perfil de usuario** con estado premium (suscripción con fecha de expiración).
- **Lugares favoritos** guardados por el usuario.
- **Promociones y cupones**: listado general, detalle por lugar y validación mediante **escaneo de código QR** (`html5-qrcode`).
- **Retos mensuales** ("bicitas") con seguimiento de progreso y lugares a visitar.
- **Novedades/avisos** activos mostrados dentro de la app.

### Panel de administración
- Dashboard con estadísticas generales (usuarios, usuarios premium, lugares, promociones, visitas).
- CRUD completo de **usuarios**, **lugares**, **promociones**, **rutas ciclistas**, **retos mensuales** y **novedades**.
- Generación de **códigos QR** para promociones y **reportes mensuales en PDF** (`jspdf` + `jspdf-autotable`).
- Rutas protegidas por rol (`admin`).

## 🛠️ Stack técnico

| Categoría | Tecnología |
|---|---|
| Framework | [React 19](https://react.dev/) + [Vite](https://vite.dev/) |
| Enrutamiento | [React Router DOM](https://reactrouter.com/) |
| Estilos | [Tailwind CSS](https://tailwindcss.com/) |
| Mapas | [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/) |
| Backend / BD / Auth | [Supabase](https://supabase.com/) |
| Íconos | `lucide-react`, `react-icons` |
| QR | `html5-qrcode`, `react-qr-code` |
| Reportes/PDF | `jspdf`, `jspdf-autotable`, `html-to-image` |
| Despliegue | [Vercel](https://vercel.com/) |

## 📁 Estructura del proyecto

```
BiciMapa/
├── public/                  # Assets estáticos (logos, avatares, imágenes de fondo, íconos de tipos de lugar)
├── src/
│   ├── admin/                # Panel de administración
│   │   ├── components/       # Dashboard, formularios, tablas, gestión de rutas/retos/promociones/usuarios/lugares
│   │   ├── pages/             # Páginas del panel admin
│   │   ├── routes/            # Rutas protegidas por rol admin
│   │   └── utils/              # Generación de PDF, slugs, etc.
│   ├── assets/                # Imágenes y geojson
│   ├── config/                 # Configuración de tipos de lugar (íconos y etiquetas)
│   ├── context/                 # AuthContext (sesión, usuario, estado premium)
│   ├── lib/                      # Cliente de Supabase
│   ├── pages/                     # Login / Registro
│   ├── services/                   # Funciones de acceso a datos (Supabase) por dominio
│   ├── shared/components/           # Componentes compartidos (Login, Registro, NotFound)
│   ├── user/
│   │   ├── components/               # Navbar, mapa (hooks y utilidades), tarjetas, cupones, favoritos, QR, progreso de ruta...
│   │   └── pages/                     # Perfil, Favoritos, Cupones, Promociones, Validación, Reset password
│   ├── App.jsx                        # Definición de rutas de la app
│   └── main.jsx                        # Punto de entrada
├── tailwind.config.js
├── vite.config.js
└── vercel.json
```

## 🚀 Empezando

### Requisitos previos
- [Node.js](https://nodejs.org/) 18 o superior
- Una cuenta y proyecto de [Supabase](https://supabase.com/)
- Un token de acceso de [Mapbox](https://account.mapbox.com/)

### Instalación

```bash
git clone https://github.com/JudithMart/BiCiMapa.git
cd BiCiMapa
npm install
```

### Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes claves:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
VITE_MAPBOX_TOKEN=tu_token_de_mapbox
VITE_MAPBOX_STYLE=tu_estilo_de_mapbox
```

### Ejecutar en desarrollo

```bash
npm run dev
```

La app quedará disponible en `http://localhost:5173`.

### Otros scripts disponibles

```bash
npm run build     # Compila la app para producción
npm run preview   # Sirve localmente el build de producción
npm run lint      # Ejecuta ESLint sobre el proyecto
```

## 🗄️ Base de datos

El proyecto usa Supabase como backend y espera, entre otras, las siguientes tablas: `usuario`, `lugar`, `tipo`, `promocion`, `token_lugar`, `ruta`, `ruta_lugar`, `reto_mensual`, `reto_lugares`, `visita`, `historial_premium` y `novedades_bicitas`. El esquema completo debe configurarse en tu proyecto de Supabase antes de ejecutar la aplicación.

## ☁️ Despliegue

El proyecto incluye configuración lista para [Vercel](https://vercel.com/) (`vercel.json`), con reescritura de rutas para funcionar correctamente como SPA. Recuerda configurar las mismas variables de entorno en el panel de tu proyecto de Vercel.

## 👩‍💻 Autoría

Desarrollado por **Agui Martínez** como proyecto freelance para **BiCitas Históricas**.

## 📄 Licencia

Todos los derechos reservados © BiCitas Históricas.

El código fuente de este repositorio es autoría de la desarrolladora y se publica en su portafolio únicamente con fines demostrativos y de exhibición de trabajo profesional. No se otorga licencia de uso, copia, modificación, distribución ni despliegue de este código o de los contenidos, marca y datos de BiCitas Históricas sin autorización previa por escrito.

Si te interesa un proyecto similar o quieres contactar a la desarrolladora, escríbeme a **www.linkedin.com/in/aguimartinezg**.
