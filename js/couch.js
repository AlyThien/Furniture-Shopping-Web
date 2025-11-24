document.addEventListener('DOMContentLoaded', function() {
    
    //Nhóm 9: 1. Cấu hình Intersection Observer
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 // Kích hoạt khi 10% phần tử xuất hiện
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Thêm class 'reveal-visible' để kích hoạt animation CSS
                entry.target.classList.add('reveal-visible');
                // Ngừng theo dõi
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    //Nhóm 9: 2. CHỌN CÁC PHẦN TỬ CẦN HIỆU ỨNG (Đây là điểm cần kiểm tra kỹ!)
    const productCards = document.querySelectorAll('.sofa-card');

    //Nhóm 9: 3. Gán trạng thái ẩn ban đầu
    productCards.forEach((card, index) => {
        card.classList.add('reveal-hidden');
        
        // Tinh chỉnh: Thêm delay nhỏ để các thẻ hiện ra tuần tự
        card.style.transitionDelay = `${index * 50}ms`; 

        observer.observe(card);
    });
});