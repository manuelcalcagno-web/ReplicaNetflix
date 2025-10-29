window.document.addEventListener('DOMContentLoaded', () => {
    
    const Films = [];

    class Film {
        constructor(titolo, categoria, durata, img) {
            this.titolo = titolo;
            this.categoria = categoria;
            this.durata = durata;
            this.img = img;
        }
    }

    function listaFilm () {
        const container = document.getElementById("input");
        const table = document.getElementById("dashboard");
        const buttonAdd = document.getElementById("bottone");
        buttonAdd.addEventListener("click", aggiungiFilm());

    }

    function renderFilm() {
        const lista = localStorage.getItem("Films");
        const body_tb = document.getElementById("body-dashboard");
        body_tb.innerHTML = "";

        if(lista){
            const film = JSON.parse(localStorage.getItem("Films"));
            film.map(element => {
            });((film) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${film.titolo}</td>
                    <td>${film.categoria}</td>
                    <td>${film.durata}</td>
                    <td>${film.img}</td>
                    <td>
                        <button class="btn-modifica" id="${film.titolo}-modifica">Modiifica</button>
                        <button class="btn-elimina" id="${film.titolo}-elimina">Elimina</button>
                    </td>
                `;
                body_tb.appendChild(row);
            });
        }

    }

    function confermaFilm(titolo, categoria, durata, img) {
        let film = JSON.parse(localStorage.getItem("Films")) || [];
        const nuovoFilm = new Film(titolo, categoria, durata, img);
        film.push(nuovoFilm);
        localStorage.setItem("Films", JSON.stringify(film));
        console.table(film);
        console.log("Film confermato:", nuovoFilm);
        renderFilm();
    }

    function aggiungiFilm() {
        const inputTitolo = document.createElement("input");
        inputTitolo.id = "input-titolo";
        inputTitolo.placeholder = "Titolo";

        const inputCategoria = document.createElement("input");
        inputCategoria.id = "input-categoria";
        inputCategoria.placeholder = "Categoria";

        const inputDurata = document.createElement("input");
        inputDurata.id = "input-durata";
        inputDurata.type = "number";
        inputDurata.placeholder = "Durata (min)";

        const inputImg = document.createElement("input");
        inputImg.id = "input-img";
        inputImg.type = "href";
        inputImg.accept = "image/*";
        inputImg.placeholder = "Immagine";

        const btn_conferma = document.createElement("button");
        btn_conferma.id = "btn-conferma";
        btn_conferma.innerText = "Conferma";

        const inputContainer = document.getElementById("input");
        inputContainer.id = "input-container";

        inputContainer.appendChild(inputTitolo);
        inputContainer.appendChild(inputCategoria);
        inputContainer.appendChild(inputDurata);
        inputContainer.appendChild(inputImg);
        inputContainer.appendChild(btn_conferma);

        btn_conferma.addEventListener("click", function () {
            if (!inputTitolo.value || !inputCategoria.value || !inputDurata.value || !inputImg.value) {
                alert("Compila tutti i campi");
                return;
            }
            confermaFilm(inputTitolo.value, inputCategoria.value, inputDurata.value, inputImg.value);

            inputTitolo.value = "";
            inputCategoria.value = "";
            inputDurata.value = "";
            inputImg.value = "";
        });
    }
    listaFilm();
});