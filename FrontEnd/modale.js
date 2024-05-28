// Fonction pour vérifier si l'utilisateur est connecté
function isLoggedIn() {
    return localStorage.getItem('token') !== null;
}

// Afficher ou masquer le bouton "modifier" et l'icône en fonction de l'état de connexion
document.addEventListener('DOMContentLoaded', () => {
    const modifierButton = document.getElementById('modifier-button');
    const modifierIcon = document.querySelector('.fa-regular');

    if (isLoggedIn()) {
        // Afficher le bouton "modifier" et l'icône si l'utilisateur est connecté
        modifierButton.style.display = 'inline-block';
        modifierIcon.style.display = 'inline-block';
    } else {
        // Cacher le bouton "modifier" et l'icône si l'utilisateur n'est pas connecté
        modifierButton.style.display = 'none';
        modifierIcon.style.display = 'none';
    }
});

// Ouvrir la modale lorsque le bouton "modifier" est cliqué
document.addEventListener('DOMContentLoaded', () => {
    const modifierButton = document.getElementById('modifier-button');
    const modifierIcon = document.getElementById('modifier-icon');
    const modal = document.getElementById('modal');
    const closeButton = document.getElementsByClassName('close')[0];

    // Fonction pour ouvrir la modale
    function openModal() {
        modal.style.display = 'block';
    }

    // Ajouter un écouteur d'événement au bouton "modifier"
    modifierButton.addEventListener('click', openModal);

    // Ajouter un écouteur d'événement à l'icône "modifier"
    modifierIcon.addEventListener('click', openModal);

    // Fermer la modale lorsque l'utilisateur clique sur le bouton de fermeture
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Fermer la modale lorsque l'utilisateur clique en dehors de celle-ci
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});




