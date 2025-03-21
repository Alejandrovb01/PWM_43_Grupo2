if (document.body.id === 'contactPage') {
    loadTemplate('../main/contactMain.html', 'main', function() {
        const stars = document.querySelectorAll('.star');
        const starContainer = document.getElementById('star-rating');
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'rating';
        hiddenInput.value = '0';

        if (starContainer) {
            starContainer.appendChild(hiddenInput);
        }

        stars.forEach(star => {
            star.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                hiddenInput.value = value;

                stars.forEach(s => {
                    if (s.getAttribute('data-value') <= value) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });

            star.addEventListener('mouseover', function() {
                const value = this.getAttribute('data-value');
                stars.forEach(s => {
                    if (s.getAttribute('data-value') <= value) {
                        s.style.color = 'gold';
                    } else {
                        s.style.color = 'grey';
                    }
                });
            });

            star.addEventListener('mouseout', function() {
                stars.forEach(s => {
                    if (!s.classList.contains('active')) {
                        s.style.color = 'grey';
                    }
                });
            });
        });

        const form = document.getElementById('reviewForm');
        if (form) {
            form.addEventListener('submit', function(event) {
                if (hiddenInput.value === '0') {
                    alert('Por favor, selecciona una valoración.');
                    event.preventDefault();
                }
            });
        }
    });
}