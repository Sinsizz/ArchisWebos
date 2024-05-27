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
            if (!response.ok) {
                // Afficher un message d'erreur à l'utilisateur
                showError('Erreur lors de la connexion. Veuillez vérifier vos identifiants.');
                throw new Error('Erreur lors de la connexion');
            }
            return response.json(); // Convertir la réponse en JSON
        })
        .then(data => {
            // Sauvegarder le token dans le local storage
            saveTokenToLocalStorage(data.token);
            // Rediriger vers la page "index.html" après une connexion réussie
            window.location.href = 'index.html';
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

// Fonction pour afficher les messages d'erreur
function showError(message) {
    // Créer un élément pour afficher le message d'erreur
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;

    // Ajouter le message d'erreur au formulaire
    const form = document.querySelector('form');
    form.appendChild(errorDiv);

    // Supprimer le message d'erreur après 5 secondes
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}






