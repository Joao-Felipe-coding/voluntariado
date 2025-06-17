document.addEventListener('DOMContentLoaded', function() {
    // Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        // Suporte para clique do mouse
        menuToggle.addEventListener('click', toggleMenu);
        
        // Suporte para navegação via teclado
        menuToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });
    }
    
    function toggleMenu() {
        navLinks.classList.toggle('show');
        
        // Atualizar aria-label do botão
        const isOpen = navLinks.classList.contains('show');
        menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
    }
    
    // Fechando o menu ao clicar em um link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('show');
            menuToggle.setAttribute('aria-label', 'Abrir menu de navegação');
        });
    });
    
    // Fechar menu ao pressionar ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
            menuToggle.setAttribute('aria-label', 'Abrir menu de navegação');
            menuToggle.focus(); // Retorna o foco para o botão
        }
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
