document.addEventListener('DOMContentLoaded', function() {
    
    /* ************************************** */
    /* *** 1. Logic cho Accordion (ĐÃ CÓ) *** */
    /* ************************************** */

    const accordionContainer = document.getElementById('accordion-container');
    if (accordionContainer) {
        const triggers = accordionContainer.querySelectorAll('.accordion-trigger');
        const items = accordionContainer.querySelectorAll('.accordion-item');
        const contents = accordionContainer.querySelectorAll('.accordion-content');

        // Mở mục đầu tiên làm mặc định
        const firstItem = items[0];
        const firstContent = firstItem.querySelector('.accordion-content');
        if (firstItem && firstContent) {
            firstItem.classList.add('active');
            firstContent.classList.add('active');
            firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
        }

        triggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                const targetId = this.dataset.trigger;
                const targetContent = document.getElementById(targetId);
                const targetItem = this.closest('.accordion-item');

                if (!targetContent || !targetItem) return;

                const isActive = targetItem.classList.contains('active');

                // Đóng tất cả các mục
                items.forEach(item => item.classList.remove('active'));
                contents.forEach(content => {
                    content.classList.remove('active');
                    content.style.maxHeight = '0px';
                });

                // Nếu mục được nhấp *không* phải là mục đang hoạt động, hãy mở nó
                if (!isActive) {
                    targetItem.classList.add('active');
                    targetContent.classList.add('active');
                    targetContent.style.maxHeight = targetContent.scrollHeight + 'px'; 
                }
            });
        });
    }

    /* ***************************************** */
    /* *** 2. Logic cho Scroll Reveal (MỚI) *** */
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