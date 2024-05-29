
// Fonction pour afficher les photos dans la modale
async function afficherPhotosModal() {
    const apiUrl = "http://localhost:5678/api/works";

    try {
        // Récupérer les photos depuis l'API
        const reponsePhotos = await fetch(apiUrl);
        const photos = await reponsePhotos.json();

        // Créer la galerie dans la modale
        const gallery = document.querySelector('.modal-content .gallery2');

        // Effacer le contenu existant de la galerie
        gallery.innerHTML = '';

        // Ajouter chaque photo à la galerie avec l'icône de la corbeille
        photos.forEach(photo => {
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('image-container');

            const img = document.createElement('img');
            img.src = photo.imageUrl; // Assurez-vous que votre API renvoie une URL pour chaque photo
            img.alt = photo.title; // Assurez-vous que votre API renvoie un titre pour chaque photo

            // Créer un conteneur pour l'icône de la corbeille
            const deleteIconContainer = document.createElement('div');
            deleteIconContainer.classList.add('delete-icon-container');

            // Positionner l'icône de la corbeille
            deleteIconContainer.style.position = 'absolute';
            deleteIconContainer.style.top = '3px'; // Placer l'icône à 9 pixels du haut de l'image
            deleteIconContainer.style.right = '12px'; // Placer l'icône à 9 pixels de la droite de l'image
            deleteIconContainer.style.width = '17px'; // Définir la largeur de l'encadrement noir
            deleteIconContainer.style.height = '17px'; // Définir la hauteur de l'encadrement noir
            deleteIconContainer.style.backgroundColor = 'black'; // Définir la couleur de l'encadrement
            deleteIconContainer.style.borderRadius = '2px';
            deleteIconContainer.style.display = 'flex'; // Activer le mode flex pour centrer l'icône
            deleteIconContainer.style.justifyContent = 'center'; // Centrer horizontalement l'icône
            deleteIconContainer.style.alignItems = 'center'; // Centrer verticalement l'icône
            deleteIconContainer.style.fontSize = '11px'; // Ajuster la taille de la police de l'icône

            // Créer l'icône de la corbeille
            const deleteIcon = document.createElement('i');
            deleteIcon.classList.add('fa-regular', 'fa-trash-can');
            deleteIcon.style.width = '56%'; // Ajuster la largeur de l'icône
            deleteIcon.style.height = '60%'; // Ajuster la hauteur de l'icône
            deleteIcon.style.color = 'white'; // Définir la couleur de l'icône en blanc
            deleteIcon.style.cursor = 'pointer';

            // Ajouter un gestionnaire d'événements de clic à l'icône de la corbeille
            deleteIcon.addEventListener('click', async () => {
                await deletePhotoById(photo.id); // Supprimer la photo avec l'ID correspondant
                // Rafraîchir la galerie après la suppression de la photo
                afficherPhotosModal();
            });

            // Ajouter l'icône de la corbeille au conteneur
            deleteIconContainer.appendChild(deleteIcon);

            // Ajouter l'image et le conteneur de l'icône de la corbeille au conteneur principal
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
        const token = getTokenFromLocalStorage();
        if (!token) {
            console.error('Token not found. User not authenticated.');
            return;
        }

        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Envoyer le token dans l'en-tête Authorization
            }
        });

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

// Exemple d'utilisation : supprimer la photo avec l'identifiant 2
deletePhotoById(2);































