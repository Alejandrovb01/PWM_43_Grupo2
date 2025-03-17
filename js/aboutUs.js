if (document.body.id === 'aboutUs') {
    loadTemplate('../main/aboutUsMain.html', 'main');
}
document.addEventListener("DOMContentLoaded", () => {
    fetch("../Json/aboutUs.json")
        .then(response => response.json())
        .then(data => {
            const aboutUs_grid = document.getElementById("aboutUs_grid");

            data.aboutUs_grid.forEach(item => {
                const gridItem = document.createElement("div");
                gridItem.classList.add("menu-img-text-section");

                gridItem.innerHTML = `
                    <img src="${item.imagen}" alt="${item.titulo}">
                    <div class="info">
                        <h3 class="title">${item.titulo}</h3>
                        <p class="description">${item.descripcion}</p>
                    </div>
                `;

                aboutUs_grid.appendChild(gridItem);
            });
        })
        .catch(error => console.error("Error cargando el menú:", error));
});