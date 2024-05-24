function login() {
    const apiUrl = 'http://localhost:5678/api/users/login';

    // Récupérer les valeurs des champs de formulaire
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Informations d'identification
    const credentials = {
        email: email,
        password: password
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
            return response.json(); // Convertir la réponse en JSON
        })
        .then(data => {
            // Sauvegarder le token dans le local storage
            saveTokenToLocalStorage(data.token);
            // Rediriger vers la page "accueil.html" après une connexion réussie
            window.location.href = 'accueil.html';
        })
        .catch(error => {
            // Gérer les erreurs lors de la connexion
            console.error('Erreur:', error);
        });
}

// Fonction pour sauvegarder le token dans le local storage
function saveTokenToLocalStorage(token) {
    localStorage.setItem('token', token);
}

// Fonction pour récupérer le token depuis le local storage
function getTokenFromLocalStorage() {
    return localStorage.getItem('token');
}

