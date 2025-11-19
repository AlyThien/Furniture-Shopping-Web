document.addEventListener('DOMContentLoaded', function() {
    
    /* ==========================================
       Nhóm 9: 1. HIỆU ỨNG SCROLL REVEAL (Hiện dần khi cuộn)
       ========================================== */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Kích hoạt khi 10% phần tử xuất hiện
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Chỉ chạy 1 lần
            }
        });
    }, observerOptions);

    // Chọn các phần tử cần áp dụng hiệu ứng
    const elementsToAnimate = document.querySelectorAll('.blog-card, .sidebar-section, .pagination');
    elementsToAnimate.forEach(el => {
        el.classList.add('scroll-hidden'); // Thêm class ẩn mặc định
        observer.observe(el);
    });


    /* ==========================================
       Nhóm 9: 2. TÍNH NĂNG TÌM KIẾM TRỰC TIẾP (Live Search)
       ========================================== */
    const searchInput = document.getElementById('search-text');
    const blogCards = document.querySelectorAll('.blog-card');

    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();

            blogCards.forEach(card => {
                const title = card.querySelector('.blog-title')?.textContent.toLowerCase() || "";
                const summary = card.querySelector('.blog-summary')?.textContent.toLowerCase() || "";
                
                // Kiểm tra xem từ khóa có trong Tiêu đề hoặc Tóm tắt không
                if (title.includes(searchTerm) || summary.includes(searchTerm)) {
                    card.style.display = ''; // Hiện lại (mặc định của CSS)
                    // Thêm lại animation nhẹ khi hiện ra
                    card.classList.add('fade-in-search'); 
                } else {
                    card.style.display = 'none'; // Ẩn đi
                    card.classList.remove('fade-in-search');
                }
            });
        });
    }

});