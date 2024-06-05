
// Fonction pour récupérer les catégories depuis l'API /categories
async function fetchCategories() {
    try {
        const response = await fetch('http://localhost:5678/api/categories');
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const categories = await response.json();
        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return []; // Retourner une liste vide en cas d'erreur
    }
}

// Fonction pour peupler la liste déroulante des catégories
async function populateCategoryDropdown() {
    const categoryDropdown = document.getElementById('category2');

    // Récupérer les catégories depuis l'API
    const categories = await fetchCategories();

    // Ajouter chaque catégorie comme une option à la liste déroulante
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id; // Utilisez l'identifiant de catégorie comme valeur
        option.textContent = category.name; // Utilisez le nom de catégorie comme texte
        categoryDropdown.appendChild(option);
    });
}

// Fonction pour afficher les photos dans la div "upload"
function displaySelectedPhotos() {
    const fileInput = document.getElementById('file-input');
    const uploadDiv = document.querySelector('.upload');

    // Ajout d'un gestionnaire d'événements pour le changement de fichier
    fileInput.addEventListener('change', async () => {
        const file = fileInput.files[0]; // Récupérer tous les fichiers sélectionnés

        // Effacer le contenu précédent de la div "upload"
        uploadDiv.innerHTML = '';

        // Créer un objet URL pour la photo sélectionnée
        const imgUrl = URL.createObjectURL(file);


        // Créer un élément img pour afficher la photo
        const imgElement = document.createElement('img');
        imgElement.src = imgUrl;
        imgElement.alt = 'Photo sélectionnée';
        imgElement.style.width = '100%'; // Agrandir l'image à 100% de la largeur de la div
        imgElement.style.height = 'auto'; // Conserver les proportions de l'image

        // Ajouter l'élément img à la div "upload"
        uploadDiv.appendChild(imgElement);
    });
}


// Fonction pour soumettre le formulaire à l'API
async function submitFormToAPI(formData) {
    try {
        // Récupérer le jeton du local storage
        const token = localStorage.getItem('token');

        // Remplacer l'URL par l'URL correcte de votre API
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}` // Ajouter le jeton d'authentification
                // Pas besoin de spécifier le 'Content-Type' pour le FormData
            },
            body: formData
        });

        if (!response.ok) {
            // Ajouter des détails supplémentaires sur l'erreur
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${response.statusText} - ${errorText}`);
        }

        // Vérifier si la réponse est un JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const result = await response.json();
            console.log('Réponse de l\'API :', result);
            // Traitez la réponse de l'API en conséquence
        } else {
            console.error('La réponse n\'est pas un JSON valide');
            const text = await response.text();
            console.log('Réponse texte:', text);
        }
    } catch (error) {
        console.error('Erreur lors de la soumission du formulaire à l\'API :', error);
    }
}

// Événement déclenché lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();
    populateCategoryDropdown();
    displaySelectedPhotos();

});














































