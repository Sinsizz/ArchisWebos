function afficherModal2() {
    // Sélection de l'élément modal2
    var modal2 = document.getElementById("modal2");
    modal2.style.display = "block";

    // Sélection de l'élément avec la classe "close2" à l'intérieur de la modal 2
    var closeArrowModal2 = document.querySelector("#modal2 .close2");

    // Ajout d'un gestionnaire d'événements pour le clic sur l'icône de flèche pour fermer la modal 2
    closeArrowModal2.addEventListener("click", function () {
        modal2.style.display = "none"; // Masquer la modal 2
    });

    // Sélection de l'élément avec la classe "close" à l'intérieur de la modal 2
    var closeButtonModal2 = document.querySelector("#modal2 .close");

    // Ajout d'un gestionnaire d'événements pour le clic sur le bouton de fermeture de la modal 2
    closeButtonModal2.addEventListener("click", function () {
        modal2.style.display = "none"; // Masquer la modal 2
    });
}

// Sélection de l'élément de la flèche de retour à la première modal
var retourModal1Button = document.getElementById("retour-modal1");














