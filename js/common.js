// Phần quay lại đầu trang
(function(){
    const btn = document.getElementById('btn-top');
    if (!btn) return;

    const SHOW_AFTER = 300; // px scrolled before showing

    function update() {
        if (window.scrollY > SHOW_AFTER) btn.classList.add('show');
        else btn.classList.remove('show');
    }

    // show/hide on scroll
    window.addEventListener('scroll', update, { passive: true });
    // initial state
    update();

    // smooth scroll to top
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        btn.blur();
    });

    // keyboard accessibility (Enter / Space)
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    });
})();

//Phần thanh menu hamburger cho mobile
(function(){
    const menuToggle = document.querySelector('.icomoon-free--leaf');
    const mainMenu = document.querySelector('nav.Main-Menu');
    
    if (!menuToggle || !mainMenu) return;

    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Toggle class cho menu và icon
        mainMenu.classList.toggle('active');
        this.classList.toggle('active');
        
        // Ngăn scroll khi menu mở
        document.body.classList.toggle('menu-open');
    });

    // Đóng menu khi click vào link
    const menuLinks = mainMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Đóng menu khi click bên ngoài
    document.addEventListener('click', (e) => {
        if (!mainMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            mainMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
})();