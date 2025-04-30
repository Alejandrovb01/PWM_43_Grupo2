
# Luigi's Restaurant - Grupo de Trabajo 2

## Descripción del Proyecto

Este proyecto representa la evolución de la web de Luigi's Restaurant. En el **Sprint 3**, hemos migrado toda la estructura del proyecto a **Angular**, incorporando una arquitectura basada en componentes reutilizables, servicios con conexión a Firebase y un sistema completo de gestión de pedidos en tiempo real.

## Integrantes del Equipo

- Daniel Padrón Acosta
- Gabriel Domínguez Torres
- David González Espino
- Alejandro Van Baumberghen Quintana

---

## Cambios Realizados en el Sprint 3

### Migración a Angular

Todos los templates, scripts y páginas del Sprint anterior han sido reemplazados por componentes `standalone` de Angular, siguiendo buenas prácticas de modularización, reutilización y mantenimiento del código.

---

## Estructura del Proyecto

### Componentes Reutilizables

- `AboutUsComponent` – Vista de la página de Nosotros, donde se muestra la información del restaurante.
- `CardSliderComponent` – Muestra tarjetas de platos reutilizadas en home, menú, etc.
- `ContactComponent` – Vista de la página de Contacto con un formulario de reseñas.
- `DishMenuComponent` – Lista de platos sin imagen ni card.
- `DishPageComponent` – Vista detallada de un plato con información de alérgenos.
- `FooterComponent` – Footer reutilizable en todas las páginas.
- `HeaderComponent` – Header reutilizable en todas las páginas.
- `FooterComponent` – Vista de la página de inicio, donde se muestra la información del restaurante, como las reseñas y platos destacados.
- `KitchenPageComponent` – Panel de cocina con CRUD de platos y gestión de comandas.
- `LayoutComponent` – Plantilla donde se incorpora dinámicamente los componentes de las vistas de las páginas con el header y footer correspondiente.
- `LoginPageComponent` – Página de acceso para personal del restaurante.
- `MenuComponent` – Página del menu, donde se muestran los platos que existen en la carta del restaurante, pero solo muestra información.
- `MenuQRComponent` – Página del menu, donde accedería el cliente después del escaneo del QR para poder realizar el pedido.

### Servicios

- `AboutUsService` – Información guardada en Firebase de la página de Nosotros para que se incorpore dinámicamente.
- `APIService` – Trae los usuarios de FIrebase para poder entrar a la página de cocina, en este caso solo con un usuario (Cocina).
- `ContactService` – Realiza la creación de reseñas.
- `KitchenService` – CRUD de platos y gestión de pedidos en tiempo real con Firestore.
- `FirebaseDataService` – Servicio genérico para consultas a Firebase.
- `LoginService` – Servicio para iniciar sesión.
- `MenuService` – Servicio para traer la información de los platos del menú.

---

## Autenticación y Panel de Cocina

Accediendo a la ruta `/login`, el personal del restaurante puede ingresar al **Panel de Cocina**, desde donde es posible:

- Ver **comandas en tiempo real** (a través de Firestore).
- Cambiar el **estado** de cada pedido (`Pendiente`, `En preparación`, `Listo`, `Entregado`).
- Asignar un **tiempo estimado de preparación** (visible por el cliente).
- Realizar un **CRUD completo** del menú:
    - Crear nuevos platos.
    - Editar o eliminar platos existentes.
    - Activar o desactivar platos según disponibilidad (`stock`).

Tener en cuenta que el usuario es *"Cocina"* con contraseña *"luigis"*.

---

## Flujo del Cliente vía QR

En el restaurante, los clientes pueden escanear un QR que redirige a `/menu-qr?mesa={número de mesa}`

Para probar el flujo completo debe usar la URL con `mesa=1` por ejemplo, o cualquier número de mesa.

Desde esta página el cliente puede:

- Ver los platos disponibles (solo los que están en stock).
- Añadir productos al carrito.
- Procesar el pedido.

Una vez enviado el pedido:

- Se muestra el **estado en tiempo real** del pedido.
- Se visualiza un **contador regresivo** del tiempo estimado asignado desde cocina.

---

## Tecnologías Utilizadas

- **Angular 19** – Framework principal.
- **Firebase Firestore** – Base de datos en tiempo real.
- **TypeScript** – JavaScrpt tipado.
- **HTML5 / CSS** – Maquetación y estilos.
- **OpenStreetMap** – Integración de mapa en la sección "Dónde estamos".

---

## Instrucciones para Probar el Proyecto

1. Clona el repositorio:
   ```bash
   git clone <URL-del-repo>
   cd <nombre-del-proyecto>
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Inicia servidor:
   ```bash
   cd sprint3
   ng serve
   ```
4. Entrar al explorador en:
   ```
   http://localhost:4200
   ```
---
## Rutas de Prueba Rápida
- **Página Principal**: `/`.
- **Menú QR**:  `/menu-qr?mesa=1`.
- **Login**: `/login`.
- **Panel de Cocina**: `/kitchen`.
- **Menú General**: `/menu`.
---

## Enlaces

**Link Figma**  
[Diseño en Figma](https://www.figma.com/design/d7QA36de4T0m12a2ifsf4L/PWM?node-id=0-1&t=j3eLO3TWJ09O6Kew-1)

**Link Trello**  
[Tablero de Trello](https://trello.com/invite/b/67cb0b0ea93c0c2fd4ea4b9f/ATTI30a4b31cd95ce668d39f194f6e95989e6D891BC1/pwm-sprint-3)

---

¡Gracias por visitar el proyecto de Luigi's Restaurant! Esperamos que disfrutes explorando nuestro trabajo.