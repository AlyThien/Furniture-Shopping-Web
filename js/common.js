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