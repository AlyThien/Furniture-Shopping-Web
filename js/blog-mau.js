document.addEventListener('DOMContentLoaded', function() {
    
    /* ==========================================
       1. READING PROGRESS BAR (Thanh tiến độ)
       ========================================== */
    // Tạo thanh progress bar bằng JS và chèn vào đầu body
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress-bar';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = scrollPercentage + '%';
    });

    /* ==========================================
       2. SCROLL REVEAL (Hiện nội dung khi cuộn)
       ========================================== */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // 15% phần tử hiện ra thì mới kích hoạt
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Chọn các thành phần cần hiệu ứng trong trang chi tiết
    // Bao gồm: Các đoạn văn, tiêu đề H2/H3, hình ảnh, và trích dẫn
    const contentElements = document.querySelectorAll(
        '.case-study-page p, ' +
        '.case-study-page h2, ' +
        '.case-study-page h3, ' +
        '.case-study-page img, ' +
        '.case-study-page .quote-section, ' +
        '.case-study-page .image-block'
    );

    contentElements.forEach(el => {
        el.classList.add('reveal-hidden');
        observer.observe(el);
    });

    /* ==========================================
       3. PARALLAX EFFECT CHO ẢNH BÌA
       ========================================== */
    const mainImage = document.querySelector('.main-image-container img');
    
    if (mainImage) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            // Di chuyển ảnh chậm hơn tốc độ cuộn (tỷ lệ 0.4)
            if (scrollPosition < 800) { // Chỉ áp dụng khi ảnh còn trong tầm nhìn
                mainImage.style.transform = `translateY(${scrollPosition * 0.4}px)`;
            }
        });
    }
});