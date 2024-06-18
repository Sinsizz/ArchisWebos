// Fonction pour vérifier si l'utilisateur est connecté
function isLoggedIn() {
    return localStorage.getItem('token') !== null;
}

// Fonction pour récupérer les catégories depuis l'API /categories
async function fetchCategories() {
    try {
        const response = await fetch('http://localhost:5678/api/categories');
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const categories = await response.json();
        console.log('Catégories récupérées :', categories);
        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return []; // Retourner une liste vide en cas d'erreur
    }
}

// Fonction pour peupler la liste déroulante des catégories
async function populateCategoryDropdown() {
    const categoryDropdown = document.getElementById('category2');
    if (!categoryDropdown) return;

    const categories = await fetchCategories();

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categoryDropdown.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const uploadDiv = document.querySelector('.upload');
    if (uploadDiv) {
        // Sauvegarder le contenu initial
        initialUploadContent = uploadDiv.innerHTML;
    }
});

// Fonction pour envoyer les données du formulaire à l'API
async function sendFormData(formData) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found. User not authenticated.');
            return;
        }

        console.log('Envoi du formulaire avec token:', token);

        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        };

        console.log('Options de la requête:', requestOptions);

        const response = await fetch('http://localhost:5678/api/works', requestOptions);

        console.log('Réponse de l\'API status:', response.status);
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Erreur de réponse de l\'API:', errorText);
            throw new Error(`Network response was not ok: ${response.statusText} - ${errorText}`);
        }

        const result = await response.json();
        console.log('Réponse JSON de l\'API :', result);

        // Ajouter la nouvelle photo à la galerie
        addNewPhotoToGallery(result.imageUrl, result.title);

    } catch (error) {
        console.error('Erreur lors de l\'envoi du formulaire à l\'API :', error.message);
    }
}

// Fonction pour ajouter une nouvelle photo à la galerie principale
function addNewPhotoToMainGallery(imgUrl, imgTitle) {
    const gallery = document.querySelector('#portfolio .gallery');
    if (!gallery) return;

    const newFigure = document.createElement('figure');
    const newImg = document.createElement('img');
    const newCaption = document.createElement('figcaption');

    newImg.src = imgUrl;
    newImg.alt = imgTitle;
    newCaption.textContent = imgTitle;

    newFigure.appendChild(newImg);
    newFigure.appendChild(newCaption);

    gallery.appendChild(newFigure);
}

// Fonction pour ajouter une nouvelle photo à la galerie de la modal
function addNewPhotoToModalGallery(imgUrl, imgTitle) {
    const modalGallery = document.querySelector('.modal-content .gallery2');
    if (!modalGallery) return;

    const newImg = document.createElement('img');
    newImg.src = imgUrl;
    newImg.alt = imgTitle;

    const newFigure = document.createElement('figure');
    newFigure.appendChild(newImg);

    const newCaption = document.createElement('figcaption');
    newCaption.textContent = imgTitle;
    newFigure.appendChild(newCaption);

    modalGallery.appendChild(newFigure);
}

// Fonction pour ajouter une nouvelle photo à la galerie
function addNewPhotoToGallery(imgUrl, imgTitle) {
    addNewPhotoToMainGallery(imgUrl, imgTitle); // Ajouter à la galerie principale
    // Appeler afficherPhotosModal après l'ajout de la nouvelle photo
    afficherPhotosModal();
}
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM chargé');
    populateCategoryDropdown();

    const fileInput = document.getElementById('file-input');
    const titleInput = document.getElementById('name2');
    const categoryInput = document.getElementById('category2');
    const validerBtn = document.getElementById('valider-photo-btn');
    const uploadDiv = document.querySelector('.upload');

    let formData; // Déclarer formData ici pour qu'il soit accessible dans le scope

    // Mettre à jour le bouton de validation au chargement du DOM
    updateSubmitButtonState();


    // Fonction pour créer FormData avec les données du formulaire
    function createFormData() {
        const title = titleInput.value.trim();
        const category = parseInt(categoryInput.value, 10);
        const file = fileInput ? fileInput.files[0] : null;

        if (isNaN(category)) {
            console.error('La catégorie est requise');
            return null;
        }

        // Vérifier si un fichier est sélectionné
        if (!file || !file.name) {
            console.error('Le fichier est requis');
            return null;
        }

        // Créer un nouvel objet FormData
        const formData = new FormData();

        // Ajouter les données au FormData
        formData.append('title', title);
        formData.append('category', category);
        formData.append('image', file);

        return formData;
    }

    // Fonction pour mettre à jour le contenu de la div d'aperçu avec l'image sélectionnée
    function updatePreviewImage() {
        const file = fileInput.files[0];
        if (!file) return;

        const imgUrl = URL.createObjectURL(file);
        if (uploadDiv) {
            uploadDiv.innerHTML = '';

            const imgElement = document.createElement('img');
            imgElement.src = imgUrl;
            imgElement.alt = 'Photo sélectionnée';
            imgElement.style.width = '100%';
            imgElement.style.height = 'auto';

            uploadDiv.appendChild(imgElement);
        }
    }

    // Événement déclenché lors de la sélection d'une image
    if (fileInput) {
        fileInput.addEventListener('change', () => {
            // Mettre à jour l'aperçu de l'image
            updatePreviewImage();
        });
    }

    function updateSubmitButtonState() {
        if (checkFormValidity()) {
            validerBtn.removeAttribute('disabled');
        } else {
            validerBtn.setAttribute('disabled', 'disabled');
        }
    }


    // Vérifier si tous les champs sont remplis
    function checkFormValidity() {
        const title = titleInput.value.trim();
        const category = categoryInput.value.trim();
        const file = fileInput.files[0];

        return title !== '' && category !== '' && file;
    }

    // Événements pour mettre à jour l'état du bouton de validation
    titleInput.addEventListener('input', updateSubmitButtonState);
    categoryInput.addEventListener('input', updateSubmitButtonState);
    fileInput.addEventListener('change', updateSubmitButtonState);

    // Événement déclenché lors du clic sur le bouton "Valider"
    if (validerBtn) {
        validerBtn.addEventListener('click', async (event) => {
            event.preventDefault();
            console.log('Bouton "Valider" cliqué');

            // Mettre à jour le FormData avec les données du formulaire
            formData = createFormData();

            // Vérifier si formData est défini
            if (!formData) {
                console.error('Veuillez remplir tous les champs et sélectionner une image');
                return;
            }

            try {
                await sendFormData(formData);
                console.log('La nouvelle œuvre a été envoyée avec succès.');

                // Réinitialiser le contenu de uploadDiv pour réafficher l'icône, le bouton et le message indicatif
                if (uploadDiv) {
                    uploadDiv.innerHTML = ''; // Effacer l'image sélectionnée

                    // Réafficher l'icône et le bouton "Ajouter une photo"
                    const iconElement = document.createElement('i');
                    iconElement.className = 'fa-regular fa-image';
                    uploadDiv.appendChild(iconElement);

                    // Réafficher le champ d'entrée de fichier
                    uploadDiv.appendChild(fileInput);

                    const addButton = document.createElement('button');
                    addButton.id = 'ajouter-photo-btn2';
                    addButton.textContent = '+ Ajouter une photo';
                    addButton.addEventListener('click', () => {
                        fileInput.click(); // Cliquer sur le champ de fichier lors du clic sur le bouton
                    });
                    uploadDiv.appendChild(addButton);

                    // Réafficher le message indicatif
                    const indicSpan = document.createElement('span');
                    indicSpan.className = 'indic';
                    indicSpan.textContent = 'jpg, png : 4mo max';
                    uploadDiv.appendChild(indicSpan);
                }

                // Réinitialiser les champs de formulaire
                titleInput.value = ''; // Réinitialiser le titre
                categoryInput.value = ''; // Réinitialiser la catégorie
                formData = null; // Réinitialiser formData

                // Désactiver à nouveau le bouton de validation
                validerBtn.setAttribute('disabled', 'disabled');

            } catch (error) {
                console.error('Erreur lors de l\'envoi de la nouvelle œuvre :', error.message);
            }
        });
    } else {
        console.error('Bouton "valider-photo-btn" non trouvé');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var addButton = document.getElementById('ajouter-photo-btn2');
    var fileInput = document.getElementById('file-input');

    addButton.addEventListener('click', function () {
        fileInput.click(); // Déclenche le clic sur le champ de sélection de fichier
    });
});









