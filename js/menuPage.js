if (document.body.id === 'menuPage') {
    loadTemplate('../main/menuMain.html', 'main');
    loadTemplate('../templates/cardMenu.html', 'cardMenu1');
    loadTemplate('../templates/cardMenu.html', 'cardMenu2');
    loadTemplate('../templates/cardMenu.html', 'cardMenu3');
    loadTemplate('../templates/cardMenu.html', 'cardMenu4');
    loadTemplate('../templates/cardMenu.html', 'cardMenu5');
    loadTemplate('../templates/cardMenu.html', 'cardMenu6');
    loadTemplate('../templates/cardMenu.html', 'cardMenu7');
    loadTemplate('../templates/cardMenu.html', 'cardMenu8');
    loadTemplate('../templates/cardMenu.html', 'cardMenu9');

    loadTemplate('../templates/dishMenuQR.html', 'dishMenu1');
    loadTemplate('../templates/dishMenuQR.html', 'dishMenu2');
    loadTemplate('../templates/dishMenuQR.html', 'dishMenu3');
    loadTemplate('../templates/dishMenuQR.html', 'dishMenu4');
    loadTemplate('../templates/dishMenuQR.html', 'dishMenu5');
    loadTemplate('../templates/dishMenuQR.html', 'dishMenu6');
    loadTemplate('../templates/dishMenuQR.html', 'dishMenu7');
    loadTemplate('../templates/dishMenuQR.html', 'dishMenu8');
    loadTemplate('../templates/dishMenuQR.html', 'dishMenu9');
    loadTemplate('../templates/dishMenuQR.html', 'dishMenu10');
    loadTemplate('../templates/dishMenuQR.html', 'dishMenu11');
    loadTemplate('../templates/dishMenuQR.html', 'dishMenu12');
}
document.addEventListener("DOMContentLoaded", () => {
    fetch("../Json/menu.json")
        .then(response => response.json())
        .then(data => {
            const menuGrid = document.getElementById("menuGrid");

            data.menu.forEach(item => {
                const gridItem = document.createElement("div");
                gridItem.classList.add("grid-item");

                gridItem.innerHTML = `
                    <img src="${item.imagen}" alt="${item.nombre}">
                    <div class="info">
                        <h3 class="title">${item.nombre}</h3>
                        <p class="price">${item.precio}</p>
                        <p class="description">${item.descripcion}</p>
                    </div>
                `;

                // Añadir el elemento al grid
                menuGrid.appendChild(gridItem);
            });
        })
        .catch(error => console.error("Error cargando el menú:", error));
});

