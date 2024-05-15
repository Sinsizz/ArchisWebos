async function afficherphotos() {
    const reponse = await fetch("http://localhost:5678/api/works");
    const photos = await reponse.json();
    const gallery = document.querySelector('#portfolio .gallery');

    photos.forEach(photo => {
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

afficherphotos();

