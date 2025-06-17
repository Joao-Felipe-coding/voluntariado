document.addEventListener('DOMContentLoaded', function() {
    // Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }
    
    // Fechando o menu ao clicar em um link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('show');
        });
    });

    // Inicializar funcionalidades da página de necessidades se estivermos nela
    if (window.location.pathname.includes('necessidades.html')) {
        initNecessidadesPage();
    }
});

/**
 * Inicializa a página de necessidades
 */
function initNecessidadesPage() {
    // Esta função será implementada no arquivo necessidades.js
    console.log('Página de necessidades carregada');
}
