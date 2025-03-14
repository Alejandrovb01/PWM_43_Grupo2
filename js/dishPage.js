if (document.body.id === 'dishPage') {
    const urlParams = new URLSearchParams(window.location.search);
    const dishId = urlParams.get('id');

    if (dishId) {
        fetch('../Json/menu.json')
            .then((response) => response.json())
            .then((data) => {
                const menu = data.menu;
                const dish = Object.values(menu)
                    .flat()
                    .find((item) => item.id === parseInt(dishId));

                if (dish) {
                    loadTemplate('../main/dishMain.html', 'main', () => {
                        fillDishDetails(dish);
                    });
                } else {
                    console.error('Dish not found');
                }
            })
            .catch((error) => {
                console.error('Error loading menu:', error);
            });
    } else {
        console.error('No dish ID provided');
    }
}

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

function fillDishDetails(dish) {
    const container = document.getElementById('main');
    if (container) {
        container.querySelector('#dishImage').src = `../assets/${dish.imagen}`;
        container.querySelector('#dishTitle').textContent = dish.nombre;
        container.querySelector('#dishDescription').textContent = dish.descripcion;
        const alergenosContainer = container.querySelector('#alergenosList');
        if (alergenosContainer) {
            alergenosContainer.innerHTML = dish.alergenos.map((alergeno) => `<img src="../assets/${alergeno}.png" alt="${alergeno}">`).join('');
        }
        const buyButton = container.querySelector('#buyButton');
        if (buyButton) {
            buyButton.textContent = `Add to Buy - ${dish.precio}`;
        }
    }
}