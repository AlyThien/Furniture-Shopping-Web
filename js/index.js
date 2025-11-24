//Nhóm 9: Phần Overview Slider 
    //Quẹt phải (đưa phần tử đầu danh sách xuống cuối)
document.getElementById('overview-next').onclick = function() {
    let list = document.querySelectorAll('.item');
    document.getElementById('slide').appendChild(list[0]);
}
    //Quẹt trái (đưa phần tử cuối danh sách lên đầu)
document.getElementById('overview-prev').onclick = function() {
    let list = document.querySelectorAll('.item');
    document.getElementById('slide').prepend(list[list.length - 1]);
}

//Nhóm 9: Hiệu ứng cuộn trang thu nhỏ Hero
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.Hero');
    
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    
    // Tính progress
    const progress = Math.min(scrollY / viewportHeight, 1);
    console.log('Progress:', progress);
    
    // Scale và opacity
    const scale = 1 - (progress * 0.6);
    const opacity = 1 - progress;
    
    console.log('Scale:', scale, 'Opacity:', opacity);
    
    // Apply
    hero.style.transform = `scale(${scale})`;
    hero.style.opacity = opacity;
});

//Nhóm 9: Phần FAQ
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Đóng tất cả các items khác
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle item hiện tại
            item.classList.toggle('active');
        });
    });
});

