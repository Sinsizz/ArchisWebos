// Fonction pour vérifier si l'utilisateur est connecté
function isLoggedIn() {
    return localStorage.getItem('token') !== null;
}

// Afficher ou masquer le bouton "modifier" et l'icône en fonction de l'état de connexion
document.addEventListener('DOMContentLoaded', () => {
    const modifierButton = document.getElementById('modifier-button');
    const modifierIcon = document.querySelector('.fa-regular');

    if (isLoggedIn()) {
        modifierButton.style.display = 'inline-block';
        modifierIcon.style.display = 'inline-block';
    } else {
        modifierButton.style.display = 'none';
        modifierIcon.style.display = 'none';
    }

    // Initialiser les modales après le chargement du DOM
    initModal();
});

// Fonction générique pour configurer une modal
function setupModal(buttonId, modalId, iconId) {
    const button = document.getElementById(buttonId);
    const icon = document.getElementById(iconId);
    const modal = document.getElementById(modalId);
    const closeButtons = modal.querySelectorAll('.close, .close2');

    // Fonction pour ouvrir la modal
    function openModal() {
        modal.style.display = 'block';
        if (modalId === 'modal') {
            afficherPhotosModal(); // Afficher les photos lorsque la modale est ouverte
        }
    }

    // Fonction pour fermer la modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Ajouter les écouteurs d'événements pour ouvrir la modal
    if (button) button.addEventListener('click', openModal);
    if (icon) icon.addEventListener('click', openModal);

    // Ajouter les écouteurs d'événements pour fermer la modal
    closeButtons.forEach(closeButton => {
        closeButton.addEventListener('click', closeModal);
    });

    // Fermer la modal lorsqu'on clique en dehors de celle-ci
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}

// Fonction pour initialiser les modales
function initModal() {
    setupModal('modifier-button', 'modal', 'modifier-icon');
    setupModal('ajouter-photo-btn', 'modal2', null);
}

// Sélection de l'élément de la flèche de retour à la première modal
const retourModal1Button = document.getElementById("retour-modal1");

if (retourModal1Button) {
    retourModal1Button.addEventListener('click', () => {
        document.getElementById('modal2').style.display = 'none';
        document.getElementById('modal').style.display = 'block';
    });
}


















