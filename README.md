# Luigi's Restaurant - Grupo de Trabajo 2

## Descripción del Proyecto

Este proyecto representa la fase final de la web de Luigi's Restaurant. En el **Sprint 4**, hemos migrado toda la estructura del proyecto de **Angular** a **Ionic + Angular standalone**, con el objetivo de obtener una aplicación funcional tanto en entorno web como en dispositivos móviles Android.

## Integrantes del Equipo

- Daniel Padrón Acosta
- Gabriel Domínguez Torres
- David González Espino
- Alejandro Van Baumberghen Quintana

---

## Cambios Realizados en el Sprint 4

### Migración a Ionic

Todo el código de los templates, scripts y páginas del Sprint anterior ha sido traducido a **Ionic**, manteniendo la misma estructura del sprint anterior.

---

## Estructura del Proyecto

### Componentes Reutilizables

- `login` – Página de acceso para aquellos usuarios que ya tienen una cuenta.
- `register` – Página de registro, donde aquellos usuarios que aún no tienen una cuenta pueden crearla.
- `menu` – Página del menu, donde se muestran los platos disponibles.
- `dish-page` – Vista detallada de un plato con información sobre alérgenos y botón para añadir a "favoritos".
- `favorites` – Lista de platos favoritos, sin imagen ni card.

### Servicios

- `AuthService` – Servicio para el registro, inicio de sesión y cierre de sesión.
- `FirebaseDataService` – Servicio genérico para consultas a Firebase.
- `FavoritesService` - Servicio para las consultas a SQLite.
- `MenuService` – Servicio para traer los platos al menú, con su respectiva información.

---

## Tecnologías Utilizadas

- **Ionic / Angular 19** – Framework principal.
- **Android Studio** - IDE para la emulación de un teléfono móvil y la visualización del proyecto.
- **Firebase Firestore** – Base de datos para obtener el menú.
- **SQLite** – Base de datos para obtener los platos favoritos.
- **TypeScript** – JavaScrpt tipado.
- **HTML5 / CSS** – Maquetación y estilos.

---

## Instrucciones para Probar el Proyecto

1. Clonar el repositorio:
   ```bash
    git clone <URL-del-repo>
    cd <nombre-del-proyecto>
   ```
2. Instalar dependencias:
   ```bash
    npm install
   ```
3. Iniciar el capacitor y ruta a Android Studio:
   ```bash
    npx cap init
    npx cap add android
    $env:CAPACITOR_ANDROID_STUDIO_PATH = <ruta al archivo studio64.exe, de Android Studio>
   ```
4. Visualización en Android Studio:
   ```bash
    ionic build
    npx can copy android
    npx can open android
   ```

## Enlaces

**Link Figma**  
[Diseño en Figma](https://www.figma.com/design/d7QA36de4T0m12a2ifsf4L/PWM?node-id=0-1&t=j3eLO3TWJ09O6Kew-1)

**Link Trello**  
[Tablero de Trello](https://trello.com/invite/b/67cb0b0ea93c0c2fd4ea4b9f/ATTI30a4b31cd95ce668d39f194f6e95989e6D891BC1/pwm-sprint-3)

---

¡Gracias por visitar el proyecto de Luigi's Restaurant! Esperamos que disfrutes explorando nuestro trabajo.