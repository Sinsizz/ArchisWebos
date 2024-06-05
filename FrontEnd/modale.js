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

// Fonction pour afficher les photos depuis l'API Works dans la modale
async function afficherPhotosModal() {
    // Récupérer les photos depuis l'API
    const reponsePhotos = await fetch("http://localhost:5678/api/works");
    const photos = await reponsePhotos.json();

    // Créer la galerie dans la modale
    const gallery = document.querySelector('.modal-content .gallery2');

    // Effacer le contenu existant de la galerie
    gallery.innerHTML = '';

    // Ajouter chaque photo à la galerie
    photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.imageUrl; // Assurez-vous que votre API renvoie une URL pour chaque photo
        img.alt = photo.title; // Assurez-vous que votre API renvoie un titre pour chaque photo
        gallery.appendChild(img);
    });
}

// Événement déclenché lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    const modifierButton = document.getElementById('modifier-button');
    const modifierIcon = document.getElementById('modifier-icon');
    const closeButton = document.querySelector('.modal .close');

    modifierButton.addEventListener('click', openModalIfLoggedIn);
    modifierIcon.addEventListener('click', openModalIfLoggedIn);

    closeButton.addEventListener('click', () => {
        document.getElementById('modal').style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === document.getElementById('modal')) {
            document.getElementById('modal').style.display = 'none';
        }
    });
});












