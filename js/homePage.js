if (document.body.id === 'homePage') {
    loadTemplate('../main/homeMain.html', 'main', () => {
        // Cargar reseñas
        fetch('../Json/review.json')
            .then((response) => response.json())
            .then((data) => {
                const reviews = data.reviews;

                reviews.forEach((review, index) => {
                    const containerId = `review${index + 1}`;
                    loadTemplate('../templates/review.html', containerId, () => {
                        fillReview(containerId, review);
                    });
                });
            })
            .catch((error) => {
                console.error('Error loading reviews:', error);
            });

        fetch('../Json/menu.json')
            .then((response) => response.json())
            .then((data) => {
                const menu = data.menu;
                const allDishes = [
                    ...menu.clasicas,
                    ...menu.bestsellers,
                    ...menu.gourmet,
                    ...menu.appetizers,
                    ...menu.antipasti
                ];

                const randomDishes = getRandomDishes(allDishes, 3);

                randomDishes.forEach((dish, index) => {
                    const containerId = `item${index + 1}`; // item1, item2, item3
                    loadTemplate('../templates/cardSlider.html', containerId, () => {
                        fillCard(containerId, dish);
                    });
                });
            })
            .catch((error) => {
                console.error('Error loading menu:', error);
            });
    });
}

function fillReview(containerId, review) {
    const container = document.getElementById(containerId);
    if (container) {
        container.querySelector('.username').textContent = review.name;
        container.querySelector('.review-text').textContent = review.description;

        const starsContainer = container.querySelector('.stars');
        starsContainer.innerHTML = '';
        for (let i = 0; i < review.stars; i++) {
            starsContainer.insertAdjacentHTML('beforeend', '&#9733;');
        }
    }
}

function fillCard(containerId, dish) {
    const container = document.getElementById(containerId);
    if (container) {
        container.querySelector('.card-image').src = `../assets/${dish.imagen}`;
        container.querySelector('.card-title').textContent = dish.nombre;
        container.querySelector('.card-description').textContent = dish.descripcion;

        const button = container.querySelector('.button');
        if (button) {
            button.remove();
        }

        let priceElement = container.querySelector('.price');
        if (!priceElement) {
            priceElement = document.createElement('p');
            priceElement.classList.add('price');
            container.appendChild(priceElement);
        }
        priceElement.textContent = `Precio: ${dish.precio}`;
    }
}

function getRandomDishes(dishes, count) {
    const shuffled = dishes.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}