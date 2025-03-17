if (document.body.id === 'menuPage') {
    loadTemplate('../main/menuMain.html', 'main');
}

document.addEventListener("DOMContentLoaded", () => {
    fetch("../Json/menu.json")
        .then(response => response.json())
        .then(data => {
            cargarPizzas(data.menu.clasicas.concat(data.menu.bestsellers, data.menu.gourmet));
            cargarSeccion(".menu-about-section .menu-img-text-section:nth-child(1) .dish-menu", data.menu.appetizers);
            cargarSeccion(".menu-about-section .menu-img-text-section:nth-child(2) .dish-menu", data.menu.antipasti);
        })
        .catch(error => console.error("Error cargando el JSON:", error));
});

function cargarPizzas(pizzas) {
    const grid = document.querySelector(".menu-grid-3x3");
    grid.innerHTML = "";

    pizzas.forEach(pizza => {
        const card = crearCard(pizza);
        grid.appendChild(card);
    });
}

function cargarSeccion(selector, items) {
    const sections = document.querySelectorAll(selector);
    sections.forEach((section, index) => {
        if (items[index]) {
            const card = crearCard(items[index]);
            section.innerHTML = "";
            section.appendChild(card);
        }
    });
}

function crearCard(item) {
    const div = document.createElement("div");
    div.classList.add("grid-item", "menu-card");
    div.innerHTML = `
      <img src="../assets/${item.imagen}" alt="${item.nombre}">
      <h3>${item.nombre}</h3>
      <p>${item.descripcion}</p>
      <span class="price">${item.precio}</span>
      <p class="alergenos">Alergenos: ${item.alergenos.join(", ") || "Ninguno"}</p>
  `;
    return div;
}
