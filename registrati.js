window.document.addEventListener('DOMContentLoaded', () => {

    const btnRegistrati = document.getElementById("bottone-accedi");
    const nome = document.getElementById("nome");
    const cognome = document.getElementById("cognome");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    btnRegistrati.addEventListener("click", function () {
        
        if (!nome.value.trim() || !cognome.value.trim() || !email.value.trim() || !password.value.trim()) {
            alert("Compila tutti i campi!");
            return;
            
        } else {

        let utenti = JSON.parse(localStorage.getItem("utenti")) || [];

        const utenteEsistente = utenti.find(u => u.email === email.value.trim());
        if (utenteEsistente) {
            alert("Email già registrata! Prova a fare il login.");
            return;
        }

        const nuovoUtente = {
            nome: nome.value.trim(),
            cognome: cognome.value.trim(),
            email: email.value.trim(),
            password: password.value.trim()
        };

        utenti.push(nuovoUtente);
        localStorage.setItem("utenti", JSON.stringify(utenti));

        alert("Registrazione completata! Ora puoi accedere.");
        window.location.href = "login.html";
        }
    });

});