// Fonction pour afficher les photos dans la modale
async function afficherPhotosModal() {
    const apiUrl = "http://localhost:5678/api/works";

    try {
        // Récupérer les photos depuis l'API
        const reponsePhotos = await fetch(apiUrl);
        const photos = await reponsePhotos.json();

        // Sélectionner la galerie dans la modale
        const gallery = document.querySelector('.modal-content .gallery2');
        gallery.innerHTML = ''; // Effacer le contenu existant de la galerie

        // Parcourir toutes les photos
        photos.forEach(photo => {
            // Créer un conteneur pour chaque photo
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('image-container');

            // Créer l'élément img pour afficher la photo
            const img = document.createElement('img');
            img.src = photo.imageUrl; // URL de l'image
            img.alt = photo.title; // Texte alternatif de l'image

            // Créer un conteneur pour l'icône de la corbeille
            const deleteIconContainer = document.createElement('div');
            deleteIconContainer.classList.add('delete-icon-container');

            // Créer la div noire
            const blackContainer = document.createElement('div');
            blackContainer.classList.add('black-container');

            // Créer l'icône de la corbeille
            const deleteIcon = document.createElement('i');
            deleteIcon.classList.add('fa', 'fa-trash-can', 'delete-icon');

            // Ajouter l'icône de la corbeille à la div noire
            blackContainer.appendChild(deleteIcon);

            // Ajouter la div noire à son conteneur
            deleteIconContainer.appendChild(blackContainer);



            // Ajouter un gestionnaire d'événements pour supprimer la photo au clic sur l'icône de la corbeille
            deleteIcon.addEventListener('click', async () => {
                await deletePhotoById(photo.id); // Supprimer la photo avec l'ID correspondant
                // Rafraîchir la galerie après la suppression de la photo
                afficherPhotosModal();
                afficherphotos();
                hideCategoryButtons();
            });

            // Ajouter l'icône de la corbeille au conteneur
            deleteIconContainer.appendChild(deleteIcon);

            // Ajouter l'image et l'icône de la corbeille au conteneur principal
            imgContainer.appendChild(img);
            imgContainer.appendChild(deleteIconContainer);

            // Ajouter le conteneur principal à la galerie
            gallery.appendChild(imgContainer);
        });
    } catch (error) {
        console.error('Error fetching photos:', error);
    }
}

// Fonction pour supprimer une photo par son identifiant
async function deletePhotoById(photoId) {
    const apiUrl = `http://localhost:5678/api/works/${photoId}`;

    try {
        // Récupérer le token d'authentification depuis le local storage
        const token = getTokenFromLocalStorage();
        if (!token) {
            console.error('Token not found. User not authenticated.');
            return;
        }

        // Envoyer une requête DELETE à l'API pour supprimer la photo avec le token d'authentification
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Envoyer le token dans l'en-tête Authorization
            }
        });

        // Vérifier si la suppression s'est effectuée avec succès
        if (response.ok) {
            console.log(`Photo with id ${photoId} deleted successfully.`);
        } else {
            console.error('Error deleting photo:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting photo:', error);
    }
}

// Fonction pour récupérer le token depuis le local storage
function getTokenFromLocalStorage() {
    return localStorage.getItem('token');
}


























