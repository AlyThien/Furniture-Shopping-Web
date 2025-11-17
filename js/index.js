document.getElementById('overview-next').onclick = function() {
    let list = document.querySelectorAll('.item');
    document.getElementById('slide').appendChild(list[0]);
}

document.getElementById('overview-prev').onclick = function() {
    let list = document.querySelectorAll('.item');
    document.getElementById('slide').prepend(list[list.length - 1]);
}

// Hero scroll effect - Phiên bản debug
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.Hero');
    
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    
    // Log để debug
    console.log('ScrollY:', scrollY, 'ViewportHeight:', viewportHeight);
    
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

document.addEventListener('DOMContentLoaded', function() {

    const logoutButton = document.getElementById('logout-btn');

    // Logic xử lý Đăng xuất
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault(); // Ngăn liên kết chuyển hướng ngay lập tức

            // 1. Xóa thông tin phiên làm việc và xác thực
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userToken'); 
            sessionStorage.removeItem('sessionID'); 

            // 2. Xóa tất cả thông tin cá nhân đã lưu trên trình duyệt
            localStorage.removeItem('userFullName');
            localStorage.removeItem('userPhone');
            localStorage.removeItem('userDOB');
            localStorage.removeItem('userGender');
            localStorage.removeItem('userAddress');
            localStorage.removeItem('userEmail'); // Xóa cả email

            console.log('User logged out successfully and all local data cleared.');

            // Chuyển hướng về trang đăng nhập
            window.location.href = 'login.html';
        });
    }
});


