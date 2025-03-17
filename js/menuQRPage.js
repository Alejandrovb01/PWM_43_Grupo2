if (document.body.id === 'menuQRPage') {
    loadTemplate('../main/menuQRMain.html', 'main', () => {
        fetch('../Json/menu.json')
            .then((response) => response.json())
            .then((data) => {
                const menu = data.menu;

                loadTemplate('../templates/cardSlider.html', 'cardSlider1', () => {
                    fillCardSlider('cardSlider1', menu.clasicas[0]);
                    addClickListener('cardSlider1', menu.clasicas[0].id);
                });

                loadTemplate('../templates/cardSlider.html', 'cardSlider2', () => {
                    fillCardSlider('cardSlider2', menu.bestsellers[0]);
                    addClickListener('cardSlider2', menu.bestsellers[0].id);
                });

                loadTemplate('../templates/cardSlider.html', 'cardSlider3', () => {
                    fillCardSlider('cardSlider3', menu.gourmet[0]);
                    addClickListener('cardSlider3', menu.gourmet[0].id);
                });

                loadTemplate('../templates/dishMenuQR.html', 'dishMenu1', () => {
                    fillDishMenu('dishMenu1', menu.appetizers[0]);
                    addClickListener('dishMenu1', menu.appetizers[0].id);
                });

                loadTemplate('../templates/dishMenuQR.html', 'dishMenu2', () => {
                    fillDishMenu('dishMenu2', menu.appetizers[1]);
                    addClickListener('dishMenu2', menu.appetizers[1].id);
                });

                loadTemplate('../templates/dishMenuQR.html', 'dishMenu3', () => {
                    fillDishMenu('dishMenu3', menu.appetizers[2]);
                    addClickListener('dishMenu3', menu.appetizers[2].id);
                });

                loadTemplate('../templates/dishMenuQR.html', 'dishMenu4', () => {
                    fillDishMenu('dishMenu4', menu.antipasti[0]);
                    addClickListener('dishMenu4', menu.antipasti[0].id);
                });

                loadTemplate('../templates/dishMenuQR.html', 'dishMenu5', () => {
                    fillDishMenu('dishMenu5', menu.antipasti[1]);
                    addClickListener('dishMenu5', menu.antipasti[1].id);
                });

                loadTemplate('../templates/dishMenuQR.html', 'dishMenu6', () => {
                    fillDishMenu('dishMenu6', menu.antipasti[2]);
                    addClickListener('dishMenu6', menu.antipasti[2].id);
                });
            })
            .catch((error) => {
                console.error('Error loading menu:', error);
            });
    });
}

function fillCardSlider(containerId, dish) {
    const container = document.getElementById(containerId);
    if (container) {
        container.querySelector('img').src = `../assets/${dish.imagen}`;
        container.querySelector('h3').textContent = dish.nombre;
        container.querySelector('.description p').textContent = dish.descripcion;
        container.querySelector('.button').textContent = `Add - ${dish.precio}`;
    }
}

function fillDishMenu(containerId, dish) {
    const container = document.getElementById(containerId);
    if (container) {
        container.querySelector('.title').textContent = dish.nombre;
        container.querySelector('.price').textContent = dish.precio;
        container.querySelector('.description').textContent = dish.descripcion;
    }
}

function addClickListener(containerId, dishId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.addEventListener('click', () => {
            window.location.href = `dishPage.html?id=${dishId}`;
        });
    }
}