document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.hero-content button');
    const input = document.getElementById('username-input');
    const saveButton = document.getElementById('save-button');
    const clearButton = document.getElementById('clear-button');
    const display = document.getElementById('username-display');
    
    const handleButtonHover = (event) => {
        const transformValue = event.type === 'mouseover' ? 'scale(1.1)' : 'scale(1)';
        button.style.transform = transformValue;
    };

    button.addEventListener('mouseover', handleButtonHover);
    button.addEventListener('mouseout', handleButtonHover);

    const storedName = localStorage.getItem('username');
    if (storedName) {
        display.textContent = storedName;
    }

    const handleSaveButtonClick = () => {
        const username = input.value.trim();
        if (username) {
            localStorage.setItem('username', username);
            display.textContent = username;
        } else {
            alert('Veuillez entrer un nom valide.');
        }
    };

    const handleInputChange = () => {
        saveButton.disabled = input.value.trim() === '';
    };

    const handleClearButtonClick = () => {
        localStorage.removeItem('username');
        display.textContent = '!';
        input.value = '';
        saveButton.disabled = true; 
    };

    saveButton.addEventListener('click', handleSaveButtonClick);
    clearButton.addEventListener('click', handleClearButtonClick);
    input.addEventListener('input', handleInputChange);

    handleInputChange();
});
document.addEventListener('DOMContentLoaded', () => {
    // Fonction pour appliquer le thème
    function applyTheme(theme) {
        document.body.classList.remove('light-theme', 'dark-theme');
        document.body.classList.add(`${theme}-theme`);

        // Appliquer le thème aux éléments spécifiques
        document.querySelector('.header').classList.remove('light-theme', 'dark-theme');
        document.querySelector('.header').classList.add(`${theme}-theme`);

        document.querySelector('.nav-bar').classList.remove('light-theme', 'dark-theme');
        document.querySelector('.nav-bar').classList.add(`${theme}-theme`);

        document.querySelector('.hero-section').classList.remove('light-theme', 'dark-theme');
        document.querySelector('.hero-section').classList.add(`${theme}-theme`);
    }
    const usernameInput = document.getElementById('username-input');
    const emailInput = document.getElementById('email-input');
    const saveButton = document.getElementById('save-button');
    const clearButton = document.getElementById('clear-button');
    const usernameDisplay = document.getElementById('username-display');

    // Charger le nom et email depuis localStorage
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    if (storedUsername) {
        usernameDisplay.textContent = storedUsername;
        usernameInput.value = storedUsername;
        emailInput.value = storedEmail;
    }

    saveButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();

        if (username && email) {
            localStorage.setItem('username', username);
            localStorage.setItem('email', email);
            usernameDisplay.textContent = username;
        } else {
            alert('Veuillez entrer un nom et un email valides.');
        }
    });

  
    clearButton.addEventListener('click', () => {
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        usernameDisplay.textContent = '!';
        usernameInput.value = '';
        emailInput.value = '';
    });

        const themeToggleButton = document.getElementById('theme-toggle');
        themeToggleButton.addEventListener('click', () => {
            const currentTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
            localStorage.setItem('theme', currentTheme); 
            document.body.classList.remove('light-theme', 'dark-theme'); 
            document.body.classList.add(currentTheme + '-theme'); 
        });
    });

    const xhr = new XMLHttpRequest();
    xhr.open("GET", 'https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-annuaire-education/records?limit=1&where=identifiant_de_l_etablissement="0693890D"');
    xhr.send();
    xhr.responseType = "json";
    
    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = xhr.response;
        console.log(data); 
        const record = data.records[0];
        const apiDisplay = document.getElementById('api-display'); 
        if (record) {
          apiDisplay.textContent = `Nom de l'établissement : ${record.fields.nom_etablissement}, Adresse : ${record.fields.adresse_etablissement}`;
        }
      } else {
        console.log(`Error: ${xhr.status}`);
      }
    };
    document.addEventListener('DOMContentLoaded', () => {
        const fetchApiData = async () => {
            try {
                const response = await fetch('https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-annuaire-education/records?limit=1&where=identifiant_de_l_etablissement="0693890D"');
                const data = await response.json(); 
                console.log("iciic???")
                const displaySection = document.getElementById('api-display');
    
                const formatJson = (obj) => {
                    let result = '';
                    for (let key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            result += `<span class="key">${key}:</span> `;
                            if (typeof obj[key] === 'object' && obj[key] !== null) {
                                result += `<div class="nested">${formatJson(obj[key])}</div>`;
                            } else {
                                result += `<span class="value">${obj[key]}</span><br>`;
                            }
                        }
                    }
                    return result;
                };
    
                displaySection.innerHTML = formatJson(data);
            } catch (error) {
                console.error('Erreur de récupération des données API:', error);
            }
        };
        fetchApiData();
    });
    
    
