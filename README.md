# Sitio web proyecto Devstudio

Bienvenido, este repositorio contiene el código para un sitio web moderno, rápido y responsivo creado con el framework Astro. Astro está optimizado para el rendimiento y la experiencia del desarrollador, lo que lo hace ideal para construir sitios web estáticos centrados en contenido.

## Características

- 🚀 **Súper rápido**: Astro genera páginas estáticas, ofreciendo un alto rendimiento.
- 📱 **Diseño responsivo**: Funciona perfectamente en todos los dispositivos.
- 🎨 **Personalizable**: Actualiza fácilmente estilos, contenido y componentes.
- 🔗 **Optimizado para SEO**: Estructura y etiquetas meta adecuadas para los motores de búsqueda.
- ⚡ **Ligero**: JavaScript mínimo por defecto, reduciendo tiempos de carga.

## Comenzando

### Requisitos previos

Asegúrate de tener instalados los siguientes elementos en tu sistema:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/teck007/devstudio.cl.git
   cd devstudio.cl
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

### Ejecutar el servidor de desarrollo

Inicia el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

Abre tu navegador y navega a [http://localhost:3000](http://localhost:3000) para ver el sitio web.

### Construir para producción

Construye el proyecto para producción:
```bash
npm run build
# o
yarn build
```

Los archivos estáticos se generarán en el directorio `dist/`.

### Previsualizar la construcción para producción

Para previsualizar la construcción de producción localmente:
```bash
npm run preview
# o
yarn preview
```

## Estructura del proyecto

```plaintext
/
├── public/           # Archivos estáticos (imágenes, íconos, etc.)
├── src/
│   ├── assets/
│   │   └── icons/    # Iconos
│   ├── components/   # Componentes reutilizables
│   ├── layouts/      # Componentes de diseño
│   └── pages/        # Páginas (cada archivo representa una ruta)
├── astro.config.mjs  # Configuración de Astro
├── package.json      # Gestión de dependencias
└── README.md         # Documentación del proyecto
```

## Contribuir

¡Las contribuciones son bienvenidas! Si encuentras un error o tienes una sugerencia, no dudes en abrir un issue o enviar un pull request.

### Pasos para contribuir

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b nombre-de-la-funcionalidad`).
3. Realiza tus cambios (`git commit -m 'Añadir nombre-de-la-funcionalidad'`).
4. Sube la rama (`git push origin nombre-de-la-funcionalidad`).
5. Abre un pull request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## Agradecimientos

- [Astro](https://astro.build/) por el increíble framework.
- Las bibliotecas y herramientas de código abierto que hicieron posible este proyecto.
