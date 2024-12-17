document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.hero-content button');

    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.1)'; 
    });

    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('username-input');
    const saveButton = document.getElementById('save-button');
    const clearButton = document.getElementById('clear-button');
    const display = document.getElementById('username-display');

    const storedName = localStorage.getItem('username');
    if (storedName) {
        display.textContent = storedName; 

    saveButton.addEventListener('click', () => {
        const username = input.value.trim(); 
        if (username) {
            localStorage.setItem('username', username); 
            display.textContent = username; 
        } else {
            alert('Veuillez entrer un nom valide.'); 
        }
    });
    }
    clearButton.addEventListener('click', () => {
        localStorage.removeItem('username'); 
        display.textContent = '!';
        input.value = ''; 
    });
});
input.addEventListener('input', () => {
    if (input.value.trim() === '') {
        saveButton.disabled = true;
    } else {
        saveButton.disabled = false;
    }
});
