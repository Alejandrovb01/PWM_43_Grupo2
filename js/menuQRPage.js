if (document.body.id === 'menuQRPage') {
    // Cargar el contenido principal
    loadTemplate('../main/menuQRMain.html', 'main', () => {
        // Cargar el JSON del menú
        fetch('../Json/menu.json')
            .then((response) => response.json())
            .then((data) => {
                const menu = data.menu;

                // Cargar los templates y rellenarlos con los datos del JSON
                loadTemplate('../templates/cardSlider.html', 'cardSlider1', () => {
                    fillCardSlider('cardSlider1', menu.clasicas[0]);
                });

                loadTemplate('../templates/cardSlider.html', 'cardSlider2', () => {
                    fillCardSlider('cardSlider2', menu.bestsellers[0]);
                });

                loadTemplate('../templates/cardSlider.html', 'cardSlider3', () => {
                    fillCardSlider('cardSlider3', menu.gourmet[0]);
                });

                loadTemplate('../templates/dishMenuQR.html', 'dishMenu1', () => {
                    fillDishMenu('dishMenu1', menu.appetizers[0]);
                });

                loadTemplate('../templates/dishMenuQR.html', 'dishMenu2', () => {
                    fillDishMenu('dishMenu2', menu.appetizers[1]);
                });

                loadTemplate('../templates/dishMenuQR.html', 'dishMenu3', () => {
                    fillDishMenu('dishMenu3', menu.appetizers[2]);
                });

                loadTemplate('../templates/dishMenuQR.html', 'dishMenu4', () => {
                    fillDishMenu('dishMenu4', menu.antipasti[0]);
                });

                loadTemplate('../templates/dishMenuQR.html', 'dishMenu5', () => {
                    fillDishMenu('dishMenu5', menu.antipasti[1]);
                });

                loadTemplate('../templates/dishMenuQR.html', 'dishMenu6', () => {
                    fillDishMenu('dishMenu6', menu.antipasti[2]);
                });
            })
            .catch((error) => {
                console.error('Error loading menu:', error);
            });
    });
}

// Función para cargar un template y ejecutar un callback cuando termine
function loadTemplate(fileName, containerId, callback) {
    fetch(fileName)
        .then((response) => response.text())
        .then((html) => {
            document.getElementById(containerId).innerHTML = html;
            if (callback) callback();
        })
        .catch((error) => {
            console.error(`Error loading template ${fileName}:`, error);
        });
}

// Función para rellenar el cardSlider con los datos del plato
function fillCardSlider(containerId, dish) {
    const container = document.getElementById(containerId);
    if (container) {
        container.querySelector('img').src = `../assets/${dish.imagen}`;
        container.querySelector('h3').textContent = dish.nombre;
        container.querySelector('.description p').textContent = dish.descripcion;
        container.querySelector('.button').textContent = `Add - ${dish.precio}`;
    }
}

// Función para rellenar el dishMenu con los datos del plato
function fillDishMenu(containerId, dish) {
    const container = document.getElementById(containerId);
    if (container) {
        container.querySelector('.title').textContent = dish.nombre;
        container.querySelector('.price').textContent = dish.precio;
        container.querySelector('.description').textContent = dish.descripcion;
    }
}