if (document.body.id === 'aboutUs') {
    loadTemplate('../main/aboutUsMain.html', 'main');
}
document.addEventListener("DOMContentLoaded", function () {
    fetch("../Json/aboutUs.json")
        .then(response => response.json())
        .then(data => {
            // Cargar la sección "aboutUs_intro"
            const aboutSection = document.querySelector(".menu-about-section");
            aboutSection.innerHTML = "<h2>About Us</h2>";
            data.aboutUs_intro.forEach((item, index) => {
                const sectionHTML = `
                    <div class="menu-img-text-section ${index % 2 !== 0 ? 'reverse' : ''}">
                        <img src="${item.imagen}" alt="${item.titulo}">
                        <div>
                            <h3>${item.titulo}</h3>
                            <p class="description" data-full-text="${item.descripcion}">
                                ${item.descripcion.substring(0, 100)}...
                            </p>
                            <button class="toggle-text">Ver más</button>
                        </div>
                    </div>
                `;
                aboutSection.innerHTML += sectionHTML;
            });

            // Cargar la sección "aboutUs_grid"
            const gridSection = document.querySelector(".grid");
            gridSection.innerHTML = "";
            data.aboutUs_grid.forEach(item => {
                const article = document.createElement("article");
                article.classList.add("card");
                article.innerHTML = `
                    <img src="${item.imagen}" alt="${item.titulo}">
                    <h2>${item.titulo}</h2>
                    <p class="description" data-full-text="${item.descripcion}">
                        ${item.descripcion.substring(0, 100)}...
                    </p>
                    <button class="toggle-text">Ver más</button>
                `;
                gridSection.appendChild(article);
            });

            // Cargar la última sección "aboutUs_last"
            const lastSection = document.querySelector(".last-section");
            lastSection.innerHTML = "";
            data.aboutUs_last.forEach(item => {
                lastSection.innerHTML = `
                    <h2>${item.titulo}</h2>
                    <div class="img-text-section">
                        <img src="${item.imagen}" alt="${item.titulo}">
                        <p class="description" data-full-text="${item.descripcion}">
                            ${item.descripcion.substring(0, 100)}...
                        </p>
                        <button class="toggle-text">Ver más</button>
                    </div>
                `;
            });

            document.querySelectorAll(".toggle-text").forEach(button => {
                button.addEventListener("click", function () {
                    const description = this.previousElementSibling;
                    if (description.classList.contains("expanded")) {
                        description.innerHTML = description.dataset.fullText.substring(0, 100) + "...";
                        this.textContent = "Ver más";
                        description.classList.remove("expanded");
                        description.style.overflow = "hidden";
                        description.style.display = "-webkit-box";
                        description.style.webkitLineClamp = "3";
                    } else {
                        description.innerHTML = description.dataset.fullText;
                        this.textContent = "Ver menos";
                        description.classList.add("expanded");
                        description.style.overflow = "visible";
                        description.style.display = "block";
                        description.style.webkitLineClamp = "unset";
                    }
                });
            });
        })
        .catch(error => console.error("Error cargando el JSON:", error));
});
