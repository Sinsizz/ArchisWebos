const apiUrl = 'http://localhost:5678/api/users/login';

// Informations d'identification
const credentials = {
    email: 'votre_email@example.com',
    password: 'votre_mot_de_passe'
};

// Effectuer une requête POST pour obtenir le token
fetch(apiUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
})
    .then(response => {
        // Vérifier si la réponse est OK (200)
        if (!response.ok) {
            throw new Error('Erreur lors de la connexion');
        }
        // Rediriger vers la page "accueil.html" après une connexion réussie
        window.location.href = 'accueil.html';
    })
    .catch(error => {
        // Gérer les erreurs lors de la connexion
        console.error('Erreur:', error);
    });




// Fonction pour sauvegarder le token dans le local storage
function saveTokenToLocalStorage(token) {
    localStorage.setItem('token', token);
}

// Fonction pour récupérer le token depuis le local storage
function getTokenFromLocalStorage() {
    return localStorage.getItem('token');
}

// Sauvegarder le token
const token = 'votre_token';
saveTokenToLocalStorage(token);

// Récupérer le token
const retrievedToken = getTokenFromLocalStorage();
console.log(retrievedToken); // Affichera le token récupéré depuis le local storage
