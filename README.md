# Gestión de Coaching

Sistema web para la gestión financiera de un negocio de masajes, orientado a la administración de ingresos, egresos, reportes y análisis visuales.

---

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Funcionalidades Principales](#funcionalidades-principales)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Explicación de Componentes y Páginas](#explicación-de-componentes-y-páginas)
- [Instalación y Puesta en Marcha](#instalación-y-puesta-en-marcha)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Créditos](#créditos)

---

## Descripción General

**Gestión de Coaching** es una aplicación web desarrollada en React que permite llevar el control de ingresos y egresos de un negocio de coaching, con soporte para importación/exportación de datos, reportes gráficos, filtros avanzados y multi-idioma. Utiliza Firebase como backend para autenticación y almacenamiento de datos.

---

## Funcionalidades Principales

- **Ingreso y egreso de datos**: Carga manual o importación desde archivos CSV/XLSX.
- **Edición y eliminación**: Modificación y borrado de registros desde la interfaz.
- **Filtros avanzados**: Por fecha única, rango de fechas o mes/año.
- **Reportes y gráficos**: Visualización de utilidades, tortas y barras comparativas.
- **Exportación**: Descarga de datos a Excel.
- **Multi-idioma**: Español, inglés y portugués.
- **Autenticación**: Acceso protegido por usuario.
- **Responsive**: Adaptado a dispositivos móviles y escritorio.

---

## Estructura del Proyecto

```
Gestion_Coaching/
│
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── ...
├── src/
│   ├── App.jsx
│   ├── index.js
│   ├── index.css
│   ├── assets/
│   ├── components/
│   ├── config/
│   ├── context/
│   ├── data/
│   ├── hooks/
│   ├── locales/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   └── utils/
└── README.md
```

---

## Explicación de Componentes y Páginas

### 1. **src/pages/Login/Login.jsx**
Pantalla de bienvenida para ingreso de mail y contraseña.

### 2. **src/pages/Ingresar/**
Flujo para cargar datos:
- **IngresoForm.jsx / EgresoForm.jsx**: Formularios para carga manual de ingresos/egresos.
- **FileImporter.jsx**: Permite importar datos desde archivos CSV/XLSX, mapeando columnas y validando fechas y totales.

### 3. **src/pages/Datos/Ingreso/Ingreso.jsx** y **src/pages/Datos/Egreso/Egreso.jsx**
Listados de ingresos y egresos con filtros avanzados (fecha única, rango, mensual), edición inline y eliminación múltiple.

### 4. **src/pages/Graficos1/Graficos1.jsx**
Panel de reportes visuales:
- Gráficos de barras comparativas de ingresos vs egresos.
- Gráficos de torta agrupados por tipo o categoría.
- Filtros para visualizar diferentes períodos.

### 5. **src/pages/exportService/exportService.jsx**
Pantalla para exportar los datos de ingresos y egresos a archivos Excel.

### 6. **src/components/**
- **NavBar.jsx**: Barra de navegación principal.
- **Breadcrumb/**: Migas de pan para navegación contextual.
- **Loader/**: Indicadores de carga.
- **charts/**: Componentes de gráficos reutilizables (barras, tortas).
- **Menu/**: Menú lateral o superior.
- **PrivateRoute/**: Protección de rutas para usuarios autenticados.

### 7. **src/hooks/**
- **useIngresosRealtime.jsx / useEgresosRealtime.jsx**: Hooks para suscripción en tiempo real a Firestore.
- **useIngresosCrud.jsx / useEgresosCrud.jsx**: Hooks para crear, editar y eliminar registros.
- **useReportData.jsx**: Hook para obtener y procesar datos para reportes y gráficos.

### 8. **src/services/**
- **firebaseService.js**: Configuración y funciones de acceso a Firebase.
- **exportService.jsx**: Lógica para exportar datos a Excel usando SheetJS.

### 9. **src/context/**
- **IdiomaContext.jsx**: Contexto para el idioma de la app.
- **AuthContext.jsx**: Contexto para autenticación de usuario.

### 10. **src/utils/**
- **listados.jsx**: Listas de tipos, categorías, sucursales, etc.
- **i18n.js**: Carga dinámica de archivos de idioma.

---

## Instalación y Puesta en Marcha

1. **Clonar el repositorio**
   ```sh
   git clone https://github.com/tu-usuario/Gestion_Coaching.git
   cd Gestion_Coaching
   ```

2. **Instalar dependencias**
   ```sh
   npm install
   ```

3. **Configurar variables de entorno**
   - Crea un archivo `.env` con las credenciales de Firebase.

4. **Ejecutar en modo desarrollo**
   ```sh
   npm start
   ```

---

## Tecnologías Utilizadas

- **React** (SPA)
- **Firebase** (Firestore, Auth)
- **SheetJS (xlsx)** para importación/exportación de Excel
- **React Router** para navegación
- **Bootstrap** y CSS Modules para estilos
- **React Context** para manejo de idioma y autenticación

---

## Créditos

Desarrollado por Aníbal y colaboradores.

---

¿Dudas o sugerencias? Contacta al equipo de