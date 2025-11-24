document.addEventListener('DOMContentLoaded', function() {
    
    /* ************************************** */
    /* *** Nhóm 9: 1. Logic cho Accordion (ĐÃ CÓ) *** */
    /* ************************************** */

    const accordionContainer = document.getElementById('accordion-container');
    
    if (accordionContainer) {
        const items = accordionContainer.querySelectorAll('.accordion-item');

        // Hàm cập nhật chiều cao cho một item cụ thể
        const updateContentHeight = (item) => {
            const content = item.querySelector('.accordion-content');
            if (item.classList.contains('active') && content) {
                // Reset lại max-height để đo chiều cao thực tế mới nhất
                content.style.maxHeight = 'none'; 
                // Tính toán và gán lại (cộng 20px dư giả để an toàn)
                const newHeight = content.scrollHeight + 20;
                content.style.maxHeight = newHeight + 'px';
            }
        };

        // 1. Xử lý sự kiện click (Cơ bản)
        accordionContainer.addEventListener('click', function(e) {
            const trigger = e.target.closest('.accordion-trigger');
            if (!trigger) return;

            const targetItem = trigger.closest('.accordion-item');
            const isActive = targetItem.classList.contains('active');

            // Đóng tất cả các mục khác
            items.forEach(item => {
                item.classList.remove('active');
                const content = item.querySelector('.accordion-content');
                if (content) content.style.maxHeight = null;
            });

            // Nếu mục đó chưa mở thì mở ra
            if (!isActive) {
                targetItem.classList.add('active');
                updateContentHeight(targetItem); // Gọi hàm tính chiều cao
            }
        });

        // 2. Mở mục đầu tiên mặc định khi load trang
        if (items.length > 0) {
            items[0].classList.add('active');
            updateContentHeight(items[0]);
        }

        // 3. ROOT CAUSE FIX: "Camera giám sát" thay đổi nội dung
        // Bất cứ khi nào text thay đổi (do đổi ngôn ngữ), tự động tính lại chiều cao
        const observer = new MutationObserver(() => {
            // Tìm mục nào đang mở (active) thì tính lại chiều cao cho mục đó
            items.forEach(item => {
                if (item.classList.contains('active')) {
                    updateContentHeight(item);
                }
            });
        });

        // Bắt đầu giám sát toàn bộ container accordion
        observer.observe(accordionContainer, {
            childList: true,  // Theo dõi thêm/bớt phần tử con
            subtree: true,    // Theo dõi sâu vào bên trong các thẻ con
            characterData: true, // Theo dõi thay đổi ký tự text
            attributes: false 
        });
    }


    /* ***************************************** */
    /* *** Nhóm 9: 2. Logic cho Scroll Reveal (MỚI) *** */
    /* ***************************************** */

    function initScrollReveal() {
        // Chọn các phần tử quan trọng: tiêu đề, khung thông tin, grid...
        // Tùy chỉnh bộ chọn này để nhắm mục tiêu đến các khối nội dung lớn trên trang
        const targets = document.querySelectorAll(
            '.section-title, .hero-info-box, .hero-image-container, .philosophy-grid > *'
        );
        
        const observerOptions = {
            root: null, 
            rootMargin: '0px',
            threshold: 0.1 
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        targets.forEach(element => {
            // Gán trạng thái ẩn ban đầu
            element.classList.add('reveal-hidden');
            observer.observe(element);
        });
    }

    // Khởi chạy Scroll Reveal
    initScrollReveal();


});
