document.addEventListener('DOMContentLoaded', function() {
            
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

        });