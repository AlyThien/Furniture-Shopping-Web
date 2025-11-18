

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Cấu hình Intersection Observer
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

    // 2. CHỌN CÁC PHẦN TỬ CẦN HIỆU ỨNG (Đây là điểm cần kiểm tra kỹ!)
    
    // 💡 GIẢ ĐỊNH: Các thẻ sản phẩm có class là .sofa-card 
    // Nếu trong HTML của bạn, mỗi thẻ sản phẩm là: <div class="sofa-card">...</div>,
    // hãy sử dụng bộ chọn này:
    const productCards = document.querySelectorAll('.sofa-card');

    // 💡 HOẶC: Nếu thẻ sản phẩm là con trực tiếp của .sofa-container, hãy dùng:
    // const productCards = document.querySelectorAll('.sofa-gallery .sofa-container > *');


    // **QUAN TRỌNG:** Nếu vẫn không hoạt động, bạn phải mở file couch.html và tìm 
    // xem mỗi thẻ sản phẩm (article/div) được đặt tên class là gì để thay thế 
    // cho '.sofa-card' ở trên.

    // 3. Gán trạng thái ẩn ban đầu
    productCards.forEach((card, index) => {
        card.classList.add('reveal-hidden');
        
        // 🌟 Tinh chỉnh: Thêm delay nhỏ để các thẻ hiện ra tuần tự
        card.style.transitionDelay = `${index * 50}ms`; 

        observer.observe(card);
    });
});