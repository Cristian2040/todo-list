# Todo List Application

Una aplicación web robusta y minimalista para la gestión eficiente de tareas diarias. Este proyecto demuestra la implementación de una **Single Page Application (SPA)** utilizando tecnologías web estándar sin dependencias de frameworks externos, enfocándose en el rendimiento, la accesibilidad y la persistencia de datos.

## Descripción del Proyecto

Esta aplicación permite a los usuarios **crear, leer, actualizar y eliminar (CRUD)** tareas en una interfaz moderna y responsiva. El estado de la aplicación se gestiona en tiempo real y se sincroniza automáticamente con el almacenamiento local del navegador (`localStorage`), garantizando que los datos no se pierdan al recargar la página o cerrar el navegador.

El diseño sigue una estética "Dark Mode" moderna, utilizando una paleta de colores cuidadosamente seleccionada para reducir la fatiga visual y mejorar la legibilidad.

## Características Principales

### Funcionalidad Core
- **Agregar Tareas**: Validación de entrada para evitar tareas vacías.
- **Marcar como Completada**: Interacción visual inmediata con efectos de tachado y opacidad.
- **Eliminar Tareas**: Sistema de confirmación nativo para prevenir borrados accidentales con animaciones de salida.
- **Persistencia de Datos**: Uso de la API `localStorage` para guardar el array de objetos de tareas.

### Gestión de Estado y Vista
- **Filtrado Dinámico**: 
    - `Todas`: Muestra el historial completo.
    - `Pendientes`: Filtra solo las tareas activas.
    - `Completadas`: Muestra el historial de finalización.
- **Contador en Tiempo Real**: Indicador numérico de tareas pendientes (`Items left`).
- **Limpieza**: Botón para eliminar todas las tareas completadas en lote.

### Aspectos Técnicos
- **DOM Manipulation**: Creación y renderizado eficiente de elementos HTML mediante JavaScript.
- **Event Delegation**: Manejo optimizado de eventos en listas dinámicas.
- **CSS Avanzado**: Uso de `CSS Variables`, `Flexbox`, y Animaciones (`@keyframes`) para transiciones suaves.
- **Diseño Responsive**: Adaptable a dispositivos móviles, tablets y escritorio.

## Tecnologías Utilizadas

- **HTML5**: Semántica web para mejor accesibilidad y estructura (Header, Main, Section, Footer).
- **CSS3**: Estilos modulares sin preprocesadores ni librerías.
- **JavaScript (ES6+)**: 
    - `Arrow Functions`
    - `Array Methods` (map, filter, forEach)
    - `localStorage API`
    - `DOM API`

## Estructura del Proyecto

El proyecto sigue una arquitectura de separación de intereses:

```text
todo-list/
│
├── index.html          # Punto de entrada y estructura semántica
├── css/
│   └── styles.css      # Hoja de estilos principal y sistema de diseño
├── js/
│   └── app.js          # Lógica de negocio, manejo de estado y eventos
└── README.md           # Documentación técnica del proyecto
```

## Instalación y Despliegue

Este proyecto no requiere un servidor de backend ni procesos de compilación (build steps).

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/Cristian2040/todo-list.git
   ```

2. **Ejecutar**:
   - Navega al directorio del proyecto.
   - Abre el archivo `index.html` directamente en cualquier navegador web moderno (Chrome, Firefox, Edge).

## Estado del Proyecto

✅ **Versión 1.0.0 (Estable)**: Funcionalidades completas implementadas y testeadas.

## Licencia

Este proyecto es de código abierto y está disponible para fines educativos y personales.
