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
        console.log('API Response:', data); // Log de la réponse de l'API

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
