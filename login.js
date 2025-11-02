window.document.addEventListener('DOMContentLoaded', () => {
   
    const bottoneAccedi = document.getElementById("bottone-accedi");
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    bottoneAccedi.addEventListener("click", function () {

        if (!username.value.trim()  || !password.value.trim() ) {
            alert("Compila tutti i campi!");
            return;
        }

        const utenti = JSON.parse(localStorage.getItem("utenti")) || [];

        const utenteTrovato = utenti.find(
            u => u.email === username.value.trim() && u.password === password.value.trim()
        );

        if (utenteTrovato) {
            localStorage.setItem("utenteLoggato", JSON.stringify(utenteTrovato));
            console.log("Accesso effettuato con successo!");
            window.location.href = "index.html";

        } else {
            alert("Email o password errati!");
        }
    });


    
});