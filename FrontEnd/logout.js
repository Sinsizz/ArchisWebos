// Fonction pour vérifier si l'utilisateur est connecté
function isLoggedIn() {
    return localStorage.getItem('token') !== null;
}

// Fonction pour gérer la déconnexion
function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html'; // Redirection vers la page de connexion
}

// Fonction pour masquer les boutons de catégorie
function hideCategoryButtons() {
    const categoriesContainer = document.querySelector('.categories');
    if (categoriesContainer) {
        categoriesContainer.style.display = 'none';
    }
}

// Mise à jour de la navigation et des boutons de catégorie en fonction de l'état de connexion
document.addEventListener('DOMContentLoaded', () => {
    const loginLink = document.getElementById('login-link');
    if (isLoggedIn()) {
        // Si l'utilisateur est connecté, masquer les boutons de catégorie
        hideCategoryButtons();
        // Mettre à jour le lien de connexion pour afficher "logout"
        loginLink.innerHTML = '<a href="#" onclick="logout()">logout</a>';
    } else {
        // Mettre à jour le lien de connexion pour afficher "login"
        loginLink.innerHTML = '<a href="./login.html">login</a>';
    }
});



