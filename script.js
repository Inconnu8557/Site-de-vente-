document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.hero-content button');

    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.1)'; 
    });

    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
    });
});
