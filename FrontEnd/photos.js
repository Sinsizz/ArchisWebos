// Fonction pour vérifier si l'utilisateur est connecté
function isLoggedIn() {
    // Remplacez cette ligne par la logique réelle pour vérifier la connexion de l'utilisateur
    return false; // Retourne true si l'utilisateur est connecté, false sinon
}

// Fonction pour masquer les boutons de catégorie
function hideCategoryButtons() {
    const categoriesContainer = document.querySelector('.categories');
    if (categoriesContainer) {
        categoriesContainer.style.display = 'none';
    }
}

// Fonction pour afficher les boutons de catégorie
function showCategoryButtons() {
    const categoriesContainer = document.querySelector('.categories');
    if (categoriesContainer) {
        categoriesContainer.style.display = 'block'; // ou la valeur appropriée
    }
}

// Fonction pour récupérer et afficher les catégories depuis l'API
async function afficherCategories(filtrerPhotosParCategorie) {
    const reponseCategories = await fetch("http://localhost:5678/api/categories");
    const categories = await reponseCategories.json();
    const categoriesContainer = document.querySelector('.categories');

    // Vider le conteneur de catégories
    categoriesContainer.innerHTML = '';

    // Créer un bouton pour afficher toutes les catégories
    const allButton = document.createElement('button');
    allButton.textContent = 'Tous';
    allButton.classList.add('categories');
    allButton.addEventListener('click', () => filtrerPhotosParCategorie(null));
    categoriesContainer.appendChild(allButton);

    // Créer des boutons pour chaque catégorie
    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category.name;
        button.classList.add('categories');
        button.setAttribute('data-category', category.id);
        button.addEventListener('click', () => filtrerPhotosParCategorie(category.id));
        categoriesContainer.appendChild(button);
    });
}

async function afficherphotos() {
    // Récupérer les photos depuis l'API
    const reponsePhotos = await fetch("http://localhost:5678/api/works");
    const photos = await reponsePhotos.json();

    const gallery = document.querySelector('#portfolio .gallery');

    // Masquer ou afficher les boutons de catégorie en fonction de l'état de connexion
    if (isLoggedIn()) {
        hideCategoryButtons();
    } else {
        showCategoryButtons();
    }

    // Fonction pour filtrer les photos par catégorie
    function filtrerPhotosParCategorie(categoryId) {
        // Filtrer les photos qui appartiennent à la catégorie sélectionnée
        const photosFiltrees = categoryId ? photos.filter(photo => photo.category.id === categoryId) : photos;

        // Effacer la galerie actuelle
        gallery.innerHTML = '';

        // Afficher uniquement les photos filtrées
        photosFiltrees.forEach(photo => {
            const figure = document.createElement('figure');
            const img = document.createElement('img');
            const figcaption = document.createElement('figcaption');

            img.src = photo.imageUrl;
            img.alt = photo.title;
            figcaption.textContent = photo.title;

            figure.appendChild(img);
            figure.appendChild(figcaption);

            gallery.appendChild(figure);
        });
    }

    // Afficher toutes les photos par défaut
    filtrerPhotosParCategorie(null);

    // Récupérer et afficher les catégories
    await afficherCategories(filtrerPhotosParCategorie);
}

// Appeler la fonction pour afficher les photos et les catégories
afficherphotos();

