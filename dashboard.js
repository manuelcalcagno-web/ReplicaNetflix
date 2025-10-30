window.document.addEventListener('DOMContentLoaded', () => {
    
    const Films = [];
    const svuotaContainer = document.getElementById("input");
    svuotaContainer.innerHTML = "";

    class Film {
        constructor(titolo, categoria, durata, immagine) {
            this.titolo = titolo;
            this.categoria = categoria;
            this.durata = durata;
            this.immagine = immagine;
        }
    }

    function listaFilm () {
        const table = document.getElementById("dashboard");
        const buttonAdd = document.getElementById("bottone");
        buttonAdd.addEventListener("click", aggiungiFilm);

    }

    function renderFilm() {
        const lista = localStorage.getItem("Films");
        const body_tb = document.getElementById("body-dashboard");
        body_tb.innerHTML = "";

        if(lista){
            const film = JSON.parse(localStorage.getItem("Films"));
            film.map((element, index) =>{
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${element.titolo}</td>
                    <td>${element.categoria}</td>
                    <td>${element.durata}</td>
                    <td><img src="${element.immagine}"></td>
                    <td><button class="btn" id="${index}">Modifica</button>
                    <button class="btn-elimina" id="${index}">Elimina</button></td>
                `;
                body_tb.appendChild(row);
            });

            document.querySelectorAll(".btn-elimina").forEach(btn => {
                btn.addEventListener("click", function () {
                    const id = this.getAttribute("id");
                    const film = JSON.parse(localStorage.getItem("Films"));
                    film.splice(id, 1);
                    localStorage.setItem("Films", JSON.stringify(film));
                    renderFilm();
                });
            });

            /*document.querySelectorAll(".btn").forEach(btn => {
                btn.addEventListener("click", function () {
                    const id = this.getAttribute("id");
                    let film = JSON.parse(localStorage.getItem("Films")) || [];
                    const filmDaModificare = film[id];
                    const inputContainer = document.getElementById("input");
                    inputContainer.innerHTML = "";

                    const inputTitolo = document.createElement("input");
                    inputTitolo.type = "text";
                    inputTitolo.value = filmDaModificare.titolo

                    const inputCategoria = document.createElement("input");
                    inputCategoria.type = "text";
                    inputCategoria.value = filmDaModificare.categoria;

                    const inputDurata = document.createElement("input");
                    inputDurata.type = "number";
                    inputDurata.value = filmDaModificare.durata;

                    const inputImmagine = document.createElement("input");
                    inputImmagine.type = "text";
                    inputImmagine.value = filmDaModificare.immagine;

                    const bottoneSalva = document.createElement("button");
                    bottoneSalva.textContent = "Salva modifiche";

                    bottoneSalva.addEventListener("click", () => {
                        film = film.map((element, i) => {
                            if (i == index) {
                                return new Film(
                                    inputTitolo.value,
                                    inputCategoria.value,
                                    inputDurata.value,
                                    inputImmagine.value
                                );
                            }
                            return element;
                        });
                        localStorage.setItem("Films", JSON.stringify(film));
                        inputContainer.innerHTML = "";
                        renderFilm();
                    });

                    inputContainer.appendChild(inputTitolo);
                    inputContainer.appendChild(inputCategoria);
                    inputContainer.appendChild(inputDurata);
                    inputContainer.appendChild(inputImmagine);
                    inputContainer.appendChild(bottoneSalva);
                });
            });*/

        } else{
            const row = document.createElement("tr");
            row.innerHTML = `
                <td colspan="5">Nessun film presente</td>
            `;
            body_tb.appendChild(row);
        }
    }

    function confermaFilm(titolo, categoria, durata, immagine) {
        let film = JSON.parse(localStorage.getItem("Films")) || [];
        const nuovoFilm = new Film(titolo, categoria, durata, immagine);
        film.push(nuovoFilm);
        localStorage.setItem("Films", JSON.stringify(film));
        console.table(film);
        console.log("Film confermato:", nuovoFilm);
        renderFilm();
    }

    function aggiungiFilm() {
        const inputContainer = document.getElementById("input");

        const inputTitolo = document.createElement("input");
        inputTitolo.type = "text";
        inputTitolo.placeholder = "Titolo";

        const inputCategoria = document.createElement("input");
        inputCategoria.type = "text";
        inputCategoria.placeholder = "Categoria";

        const inputDurata = document.createElement("input");
        inputDurata.type = "number";
        inputDurata.placeholder = "Durata (min)";

        const inputImmagine = document.createElement("input");
        inputImmagine.type = "text";
        inputImmagine.placeholder = "Immagine";

        const bottoneConferma = document.createElement("button");
        bottoneConferma.id = "btn-conferma";
        bottoneConferma.textContent = "Conferma";
        bottoneConferma.addEventListener("click", () => {
            const titolo = inputTitolo.value;
            const categoria = inputCategoria.value;
            const durata = inputDurata.value;
            const img = inputImmagine.value;
            confermaFilm(titolo, categoria, durata, img);
            inputContainer.innerHTML  = "";
        });

        inputContainer.appendChild(inputTitolo);
        inputContainer.appendChild(inputCategoria);
        inputContainer.appendChild(inputDurata);
        inputContainer.appendChild(inputImmagine);
        inputContainer.appendChild(bottoneConferma);
    }
    listaFilm();
    renderFilm();
});