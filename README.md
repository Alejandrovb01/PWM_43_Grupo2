# Luigi's Restaurant - Grupo de Trabajo 2

## Descripción del Proyecto

Este proyecto es una página web para el restaurante Luigi's, desarrollada durante el Sprint 2. En esta fase, hemos mejorado la accesibilidad y funcionalidad del sitio web, asegurando que sea completamente responsive para todos los dispositivos. Además, hemos implementado mejoras dinámicas mediante JSON y validaciones nativas de HTML5.

## Integrantes del Equipo

- Daniel Padrón Acosta
- Gabriel Domínguez Torres
- David González Espino
- Alejandro Van Baumberghen Quintana

## Mejoras Implementadas en el Sprint 2

### 1. **Diseño Responsive**
- Adaptación completa de la web para que sea accesible en cualquier dispositivo (móvil, tablet y desktop).
- Mejora de estilos CSS para una mejor experiencia de usuario en diferentes resoluciones.

### 2. **Carga Dinámica de Datos**
- Creación de archivos JSON para almacenar información:
  - `menu.json`: Contiene los datos del menú.
  - `review.json`: Almacena las reseñas de los clientes.
- Implementación de JavaScript para cargar estos datos dinámicamente en la web.

### 3. **Validación de Formularios**
- Implementación de validaciones nativas de HTML5 en los formularios de reseñas.
- Mejora en la interacción del usuario mediante mensajes de error personalizados.

### 4. **Templates Dinámicos con Fetch**
- Carga de templates de forma dinámica utilizando `fetch` para mejorar la modularidad del código.
- Integración de componentes reutilizables en las páginas principales.

## Estructura del Proyecto

- **`assets/`** - Recursos multimedia.
- **`js/`** - Scripts JavaScript.
  - `aboutUs.js`
  - `contactPage.js`
  - `dishPage.js`
  - `dishPageNoQR.js`
  - `global.js` - Funcionalidades globales.
  - `homePage.js`
  - `menuPage.js`
  - `menuQRPage.js`
  - `NotificationPage.js`
- **`Json/`** - Archivos de datos.
  - `aboutUs.json`
  - `menu.json` - Datos del menú.
  - `review.json` - Reseñas de clientes.
- **`main/`** - Páginas principales.
  - `aboutUsMain.html`
  - `contactMain.html`
  - `dishMain.html`
  - `dishMainNoQR.html`
  - `homeMain.html`
  - `menuMain.html`
  - `menuQRMain.html`
  - `notificationMain.html`
- **`mockups/`** - Diseños iniciales.
- **`pages/`** - Páginas completas.
  - `aboutUsPage.html`
  - `contactPage.html`
  - `dishPage.html`
  - `dishPageNoQR.html`
  - `homePage.html` - Archivo index
  - `loginWorkers.html`
  - `menuPage.html`
  - `menuQRPage.html`
  - `NotificationPage.html`
- **`styles/`** - Estilos CSS.
  - `about.css`
  - `cardSlider.css`
  - `contact.css`
  - `dishMenuQR.css`
  - `dishPage.css`
  - `footer.css`
  - `header.css`
  - `home.css`
  - `loginworkers.css`
  - `menu.css`
  - `menuDish.css`
  - `menuQR.css`
  - `notification.css`
  - `review.css`
  - `style.css` - Estilos globales.
- **`templates/`** - Componentes reutilizables.
  - `cardSlider.html`
  - `cardValues.html`
  - `dishMenuQR.html`
  - `footer.html`
  - `header.html`
  - `Notification.html`
  - `opImages.html`
  - `review.html`
- **`README.md`** - Este archivo.

## Tecnologías Utilizadas

- **HTML5**: Estructura del sitio web.
- **CSS3**: Estilos y diseño responsive.
- **JavaScript**: Programación de funcionalidades y carga dinámica.
- **JSON**: Almacenamiento y gestión de datos del menú y reseñas.
- **WebStorm**: Entorno de desarrollo.

## Instrucciones de Uso

1. Clona el repositorio en tu máquina local.
2. Abre el proyecto en WebStorm o cualquier otro editor de texto.
3. Abre el archivo de inicio `/pages/homePage.html`
4. Utiliza un servidor local para probar las funcionalidades de `fetch` y JSON.
5. Explora las distintas secciones de la página y prueba la interactividad.

## Enlaces

**Link Figma**  
[Diseño en Figma](https://www.figma.com/design/d7QA36de4T0m12a2ifsf4L/PWM?node-id=0-1&t=j3eLO3TWJ09O6Kew-1)

**Link Trello**  
[Tablero de Trello](https://trello.com/invite/b/67cb0b0ea93c0c2fd4ea4b9f/ATTI30a4b31cd95ce668d39f194f6e95989e6D891BC1/pwm-sprint-2)

---

¡Gracias por visitar el proyecto de Luigi's Restaurant! Esperamos que disfrutes explorando nuestro trabajo.

