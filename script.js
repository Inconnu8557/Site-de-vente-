document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username-input');
    const emailInput = document.getElementById('email-input');
    const saveButton = document.getElementById('save-button');
    const clearButton = document.getElementById('clear-button');
    const usernameDisplay = document.getElementById('username-display');

    const loadUserInfo = () => {
        const storedUsername = localStorage.getItem('username');
        const storedEmail = localStorage.getItem('email');
        if (storedUsername && storedEmail) {
            usernameInput.value = storedUsername;
            emailInput.value = storedEmail;
            usernameDisplay.textContent = storedUsername;
        }
    };

    const saveUserInfo = () => {
        const username = usernameInput.value;
        const email = emailInput.value;
        if (username && email) {
            localStorage.setItem('username', username);
            localStorage.setItem('email', email);
            usernameDisplay.textContent = username;
            alert("Informations enregistrées !");
        } else {
            alert("Veuillez remplir tous les champs !");
        }
    };

    const clearUserInfo = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        usernameInput.value = '';
        emailInput.value = '';
        usernameDisplay.textContent = '!';
    };

    saveButton.addEventListener('click', saveUserInfo);
    clearButton.addEventListener('click', clearUserInfo);

    loadUserInfo();
    const fetchApiData = async () => {
        try {
        const response = await fetch('https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-annuaire-education/records?limit=1&where=identifiant_de_l_etablissement="0693890D"');
        if (!response.ok) {
            throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data); 

        const displaySection = document.getElementById('api-display');
        if (!displaySection) {
            console.error('Element with ID "api-display" not found.');
            return;
        }

        if (data && data.results && Array.isArray(data.results) && data.results.length > 0) {
            const fields = data.results[0];

            const nom = fields.nom_etablissement || "Non spécifié";
            const adresse = fields.adresse_1  || "Non spécifiée";
            const commune = fields.nom_commune || "Non spécifiée";
            const telephone = fields.telephone || "Non spécifié";
            const codepostale = fields.code_postal || "Non spécifié";

            displaySection.innerHTML = `
                <h3>Nom de l'établissement : ${nom}</h3>
                <p>Adresse : ${adresse}</p>
                <p>Commune : ${commune}</p>
                <p>Téléphone : ${telephone}</p>
                <p>Code postale : ${codepostale}</p>
            `;
        } else {
            displaySection.innerHTML = `<p>Aucune donnée trouvée.</p>`;
        }
    } catch (error) {
        console.error('Erreur de récupération des données API:', error);
        const displaySection = document.getElementById('api-display');
        if (displaySection) {
            displaySection.innerHTML = `<p>Erreur lors du chargement des données : ${error.message}</p>`;
        }
    }
};
fetchApiData();
});
// script.js

// Fonction qui détecte la position de l'élément par rapport à la fenêtre
function checkScroll() {
    const elements = document.querySelectorAll('.hidden'); // Sélectionne tous les éléments avec la classe 'hidden'
    
    elements.forEach((element) => {
        const rect = element.getBoundingClientRect(); // Obtient la position de l'élément
        const windowHeight = window.innerHeight;

        // Vérifie si l'élément est visible dans la fenêtre de visualisation
        if (rect.top <= windowHeight && rect.bottom >= 0) {
            element.classList.add('fade-in'); // Ajoute la classe d'animation
            element.classList.remove('hidden'); // Enlève la classe 'hidden'
        }
    });
}

// Écoute l'événement de défilement
window.addEventListener('scroll', checkScroll);

// Appel initial pour vérifier l'état au cas où l'élément serait déjà visible
checkScroll();
document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('newsletter-popup');
    const popupclose = document.getElementById('popupclose');

    // Vérifie si la pop-up a déjà été vue
    const popupShown = localStorage.getItem('popupShown');
    console.log('popupShown:', popupShown); // Vérifie la valeur

    if (!popupShown) {
        console.log('Affichage de la pop-up');
        setTimeout(() => {
            popup.style.display = 'flex';
        }, 3000);
    }

    // Ferme la pop-up et enregistre l'état
    popupclose.addEventListener('click', () => {
        console.log('Pop-up fermée');
        popup.style.display = 'none';
        localStorage.setItem('popupShown', 'true'); // Enregistre dans localStorage
        console.log('popupShown enregistré dans localStorage');
    });

    // Ferme la pop-up en cliquant à l'extérieur
    popup.addEventListener('click', (event) => {
        if (event.target === popup) {
            console.log('Pop-up fermée en cliquant à l’extérieur');
            popup.style.display = 'none';
            localStorage.setItem('popupShown', 'true'); // Enregistre dans localStorage
            console.log('popupShown enregistré dans localStorage');
        }
    });
});
