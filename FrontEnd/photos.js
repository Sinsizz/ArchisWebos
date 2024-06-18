async function afficherphotos() {
    // Récupérer les photos depuis l'API
    const reponsePhotos = await fetch("http://localhost:5678/api/works");
    const photos = await reponsePhotos.json();

    const gallery = document.querySelector('#portfolio .gallery');

    // Masquer les boutons de catégorie si l'utilisateur est connecté
    if (isLoggedIn()) {
        hideCategoryButtons();
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
}

// Appeler la fonction pour afficher les photos et les catégories
afficherphotos();
