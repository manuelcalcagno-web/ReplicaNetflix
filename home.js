window.document.addEventListener('DOMContentLoaded', () => {

    const divBenvenuto = document.getElementById("benvenuto");    
    const divNav = document.getElementById("nav-user");
    const utenteLoggato = JSON.parse(localStorage.getItem("utenteLoggato"));
    const btnSearch = document.getElementById("search");
    

    

    if (!utenteLoggato) {
        alert("Devi prima accedere!");
        window.location.href = "login.html";
        return;
    }
    
    if(utenteLoggato){
        const userIcon = document.createElement("img");
        userIcon.src = "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png";
        userIcon.id = "user-icon";
        const logoutButton = document.createElement("button");
        logoutButton.textContent = "Logout";
        logoutButton.id = "logout-button";
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("utenteLoggato");
            window.location.href = "login.html";
        });
        divNav.appendChild(userIcon);
        divNav.appendChild(logoutButton);
    }

    const Benvenuto = document.createElement("h2");
    Benvenuto.textContent = `Benvenuto ${utenteLoggato.nome} ${utenteLoggato.cognome}`;
    Benvenuto.id = "benvenuto-scritta";
    divBenvenuto.appendChild(Benvenuto);
    
    const cardContainer = document.getElementById("container-card");
    const listaFilm = JSON.parse(localStorage.getItem("Films"));

    function searchFilm() {
            const navSearch = document.getElementById("nav-search");
            const searchInput = document.createElement("input");
            searchInput.type = "text";
            searchInput.placeholder = "Cerca film";
            searchInput.id = "search-input";
            navSearch.appendChild(searchInput);
        }

        if(btnSearch){
        btnSearch.addEventListener("click", searchFilm);
    }
    
    function createCard (film) {
        const card = document.createElement("div");
        card.className = "film-card";
        card.id = film.titolo;

        const cardImage = document.createElement("img");
        cardImage.src = film.immagine;
        cardImage.className = "card-image";

        const divOverlay = document.createElement("div");
        divOverlay.className = "overlay";
        

        const cardTitle = document.createElement("h3");
        cardTitle.textContent = film.titolo;
        cardTitle.id = film.titolo;
        

        const cardCategory = document.createElement("p");
        cardCategory.textContent = `Categoria: ${film.categoria}`;
        cardCategory.id = film.titolo;
        

        const cardDuration = document.createElement("p");
        cardDuration.textContent = `Durata: ${film.durata} min`;
        cardDuration.id = film.titolo;
        

        divOverlay.appendChild(cardTitle);
        divOverlay.appendChild(cardCategory);
        divOverlay.appendChild(cardDuration);
        card.appendChild(cardImage);
        card.appendChild(divOverlay);

        return card;
    }

    function groupByCategory(Films) {
        const groupedFilms = {};
        for (let i = 0; i < Films.length; i++) {
            const film_group = Films[i];
            if (!groupedFilms[film_group.categoria.trim()]) {
                groupedFilms[film_group.categoria.trim()] = [];
            }
            groupedFilms[film_group.categoria.trim()].push(film_group);
        }
        return groupedFilms;
    }

  function renderFilms() {
    
    const Films = JSON.parse(localStorage.getItem("Films"));
    const groupedFilms = groupByCategory(Films);
    const cardContainer = document.getElementById("container-card");

    for (const category in groupedFilms) {
        const cards = groupedFilms[category].map(film => createCard(film));
        const categoryContainer = document.createElement("div");
        categoryContainer.className = "category-container";
        categoryContainer.id = category;
        categoryContainer.innerHTML = `<h2 class="category-title">${category}</h2>`;
        const imageContainer = document.createElement("div");
        imageContainer.className = "image-container";
        cards.map(card => imageContainer.appendChild(card));
        cardContainer.appendChild(categoryContainer);
        categoryContainer.appendChild(imageContainer);
    }
  }
  
        renderFilms();


});