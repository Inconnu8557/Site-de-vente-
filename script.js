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
function checkScroll() {
    const elements = document.querySelectorAll('.hidden'); 
    
    elements.forEach((element) => {
        const rect = element.getBoundingClientRect(); 
        const windowHeight = window.innerHeight;

        if (rect.top <= windowHeight && rect.bottom >= 0) {
            element.classList.add('fade-in');
            element.classList.remove('hidden'); 
        }
    });
}

window.addEventListener('scroll', checkScroll);

checkScroll();
document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('newsletter-popup');
    const popupclose = document.getElementById('popupclose');

    const popupShown = localStorage.getItem('popupShown');
    console.log('popupShown:', popupShown);

    if (!popupShown) {
        console.log('Affichage de la pop-up');
        setTimeout(() => {
            popup.style.display = 'flex';
        }, 3000);
    }

    popupclose.addEventListener('click', () => {
        console.log('Pop-up fermée');
        popup.style.display = 'none';
        localStorage.setItem('popupShown', 'true');
        console.log('popupShown enregistré dans localStorage');
    });

    popup.addEventListener('click', (event) => {
        if (event.target === popup) {
            console.log('Pop-up fermée en cliquant à l’extérieur');
            popup.style.display = 'none';
            localStorage.setItem('popupShown', 'true'); 
            console.log('popupShown enregistré dans localStorage');
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const quoteText = document.getElementById('quote-text');
    const newQuoteBtn = document.getElementById('new-quote-btn');

    const quotes = [
        "L'avenir appartient à ceux qui croient à la beauté de leurs rêves. - Eleanor Roosevelt",
        "La vie est ce qui se passe quand vous êtes occupé à faire d'autres projets. - John Lennon",
        "L'échec n'est pas l'opposé du succès, c'est une partie du succès. - Arianna Huffington",
        "Ne regarde pas l'horloge ; fais ce qu'elle fait, continue d'avancer. - Sam Levenson",
        "L'inspiration existe, mais elle doit vous trouver en train de travailler. - Pablo Picasso",
        "Le travail éloigne de nous trois grands maux : l'ennui, le vice et le besoin. - Voltaire",
        "La vie est un mystère qu'il faut vivre, et non un problème à résoudre. - Gandhi",
        "Le bonheur est la seule chose qui se double si on le partage. - Albert Schweitzer",
        "Le succès c'est d'aller d'échec en échec sans perdre son enthousiasme. - Winston Churchill",
        "Exige beaucoup de toi-même et attends peu des autres. Ainsi beaucoup d'ennuis te seront épargnés - Confucius",
        "Vis comme si tu devais mourir demain. Apprends comme si tu devais vivre toujours. - Gandhi",

    ];

    function getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    }

    newQuoteBtn.addEventListener('click', () => {
        const randomQuote = getRandomQuote();
        quoteText.textContent = randomQuote;
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollToTopBtn.classList.add('visible'); 
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
