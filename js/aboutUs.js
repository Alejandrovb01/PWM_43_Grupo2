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

            const map = document.getElementById('map');
            if (map) {
                const lat = 27.7669022;
                const lng = -15.5903258;
                const zoom = 16;

                const map = L.map('map').setView([lat, lng], zoom);

                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution:
                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                }).addTo(map);

                if (window.location.pathname === '../main/aboutUsMain') {
                    L.marker([lat, lng])
                        .addTo(map)
                        .bindPopup(
                            `
                    <h2 class="contact_map_heading">C.D Maspaoasis</h2>
                    <p class="contact_map_text">A/ Alejandro del Castillo, 53</p>
                    <p class="contact_map_text">Maspalomas, Las Palmas</p>`
                        )
                        .openPopup();
                } else {
                    L.marker([lat, lng])
                        .addTo(map)
                        .bindPopup(
                            `
                        <h2 class="map__heading">C.D Maspaoasis</h2>
                        <p class="map__text">A/ Alejandro del Castillo, 53</p>
                        <p class="map__text">Maspalomas, Las Palmas</p>`
                        )
                        .openPopup();
                }
            }

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
