const subscribeForm = document.querySelector("#subscribe-form");

// Fonction pause pour afficher le spinner
const pause = (milliseconds) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(1), milliseconds);
    });
  };

subscribeForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const signInButton = subscribeForm.querySelector('button[type="submit"]');
    signInButton.disabled = true;

//------------ Gestion des messages d'erreurs --------------- 
    // Réinitialisation des messages d'erreur
    resetError();

    // Fonction pour réinitialiser les erreurs
    function resetError() {
        document.getElementById("error").style.display = "none";
    }
    
    // Fonction pour afficher les erreurs
    function showError(message) {
        const errorElement = document.getElementById("error");
        errorElement.textContent = message;
        errorElement.style.display = "block";
        signInButton.disabled = false;
    }

//------------ Gestion du message de validation ---------------     

    // Réinitialisation du message de validation
    resetValid();

    // Fonction pour réinitialiser le message de validation
    function resetValid() {
        document.getElementById("valid").style.display = "none";
    }

    // Fonction pour afficher le message de validation
    function showValid() {
        const errorElement = document.getElementById("valid");
        errorElement.textContent = "Inscription reussit !";
        errorElement.style.display = "block";
        signInButton.disabled = false;
    }

//------------ Gestion du formulaire et de sa validité ---------------  

    // Je construis un objet FormData à partir du formulaire existant
    const formData = new FormData(subscribeForm);
    // J'extraie les valeurs (string) des champs du formulaire : "email", "password" et "passwordConfirm"
    const email = formData.get("email");
    const password = formData.get("password");
    const passwordConfirm = formData.get("passwordConfirm");

    // Vérification que tous les champs sont remplis
    if (!email || !password || !passwordConfirm) {
        showError("Tous les champs doivent être remplit");
        return;
    }

    // Vérification que le mot de passe fait bien 8 caratères
    if (password.length < 8){
        showError("Le mot de passe doit faire 8 caractères minimum");
        return;
    }

    // Vérification que le mot de passe et le mot de passe de confirmation sont bien identiques
    if (password !== passwordConfirm){
        showError("Le mot de passe et la confirmation de mot de passe doivent être identique");
        return;
    }

    // Afficher le spinner
    document.getElementById("spinner").classList.remove("d-none");
    
//------------ Requête vers l'api ---------------  

    try  {
        await pause(300);
        const res = await fetch("http://localhost:8000/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // Dans le body, je lui demande de transformer un objet en string
            // L'objet en question portera une propriété "email" avec la valeur de username définie plus haut, et idem avec "password"
            body: JSON.stringify({ email, password }),
        });
        
        if(!res.ok) {
            showError("Une erreur est survenue lors de l'inscription");
            // Masquer le spinner
            document.getElementById("spinner").classList.add("d-none");
            return;
        }
        
        // Masquer le spinner
        document.getElementById("spinner").classList.add("d-none");

        showValid();


    } catch {
        // Masquer le spinner
        document.getElementById("spinner").classList.add("d-none");
        showError(`Erreur CATCH : ${err}`);
    }
});