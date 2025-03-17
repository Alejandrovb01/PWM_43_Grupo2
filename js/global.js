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

function loadCommonTemplates() {
    loadTemplate('../templates/header.html', 'header');
    loadTemplate('../templates/footer.html', 'footer');
}

document.addEventListener('DOMContentLoaded', () => {
    loadCommonTemplates();
});