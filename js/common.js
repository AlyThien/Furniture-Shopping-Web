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

//Phần thanh menu hamburger cho mobile
(function(){
    const menuToggle = document.querySelector('.icomoon-free--leaf');
    const mainMenu = document.querySelector('nav.Main-Menu');
    
    if (!menuToggle || !mainMenu) return;

    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Toggle class cho menu và icon
        mainMenu.classList.toggle('active');
        this.classList.toggle('active');
        
        // Ngăn scroll khi menu mở
        document.body.classList.toggle('menu-open');
    });

    // Đóng menu khi click vào link
    const menuLinks = mainMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Đóng menu khi click bên ngoài
    document.addEventListener('click', (e) => {
        if (!mainMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            mainMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
})();

(function() {
    'use strict';

    // Hàm kiểm tra và hiển thị avatar
    function updateHeaderAvatar() {
        const headerAvatar = document.getElementById('header-user-avatar');
        const defaultIcon = document.getElementById('header-default-icon');
        const userAvatarLink = document.getElementById('user-avatar-link');
        
        if (!headerAvatar || !defaultIcon || !userAvatarLink) return;

        // Lấy dữ liệu từ localStorage
        const storedData = localStorage.getItem('userPersonalData');
        const userEmail = localStorage.getItem('userEmail');
        
        // Kiểm tra xem user đã đăng nhập chưa
        if (storedData && userEmail) {
            try {
                const userData = JSON.parse(storedData);
                
                // ĐÃ ĐĂNG NHẬP - Link đến personal-info
                userAvatarLink.href = 'personal-info.html';
                
                // Nếu có avatar, hiển thị avatar
                if (userData.avatarUrl && userData.avatarUrl.trim() !== '') {
                    headerAvatar.src = userData.avatarUrl;
                    headerAvatar.style.display = 'block';
                    defaultIcon.style.display = 'none';
                } else {
                    // Không có avatar, hiển thị icon mặc định nhưng vẫn là đã login
                    headerAvatar.style.display = 'none';
                    defaultIcon.style.display = 'inline-block';
                }
                
                // Thêm tooltip với tên người dùng
                if (userData.fullName && userData.fullName.trim() !== '') {
                    userAvatarLink.title = userData.fullName;
                } else {
                    userAvatarLink.title = 'My Profile';
                }
                
            } catch (error) {
                console.error('Error parsing user data:', error);
                // Lỗi parse data -> coi như chưa login
                resetToDefaultIcon();
            }
        } else {
            // CHƯA ĐĂNG NHẬP hoặc đã logout
            resetToDefaultIcon();
        }
    }

    // Hàm reset về icon mặc định (chưa login)
    function resetToDefaultIcon() {
        const headerAvatar = document.getElementById('header-user-avatar');
        const defaultIcon = document.getElementById('header-default-icon');
        const userAvatarLink = document.getElementById('user-avatar-link');
        
        if (!headerAvatar || !defaultIcon || !userAvatarLink) return;
        
        headerAvatar.style.display = 'none';
        headerAvatar.src = '';
        defaultIcon.style.display = 'inline-block';
        userAvatarLink.href = 'login.html';
        userAvatarLink.title = 'Login';
    }

    // Chạy khi DOM load xong
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateHeaderAvatar);
    } else {
        updateHeaderAvatar();
    }

    // Lắng nghe sự kiện khi localStorage thay đổi (từ tab khác)
    window.addEventListener('storage', function(e) {
        if (e.key === 'userPersonalData' || e.key === 'userEmail') {
            updateHeaderAvatar();
        }
    });

    // Lắng nghe custom event khi update avatar hoặc logout
    window.addEventListener('avatarUpdated', updateHeaderAvatar);

})();

function updateHeaderAvatar() {
    const headerAvatar = document.getElementById('header-user-avatar');
    const defaultIcon = document.getElementById('header-default-icon');
    const userAvatarLink = document.getElementById('user-avatar-link');
    
    if (!headerAvatar || !defaultIcon) return;

    const storedData = localStorage.getItem('userPersonalData');
    
    if (storedData) {
        try {
            const userData = JSON.parse(storedData);
            
            // ĐÃ ĐĂNG NHẬP - Link đến personal-info
            userAvatarLink.href = 'personal-info.html';
            
            if (userData.avatarUrl) {
                headerAvatar.src = userData.avatarUrl;
                headerAvatar.style.display = 'block';
                defaultIcon.style.display = 'none';
                userAvatarLink.title = userData.fullName || 'My Profile';
            } else {
                headerAvatar.style.display = 'none';
                defaultIcon.style.display = 'inline-block';
                userAvatarLink.title = 'My Profile';
            }
        } catch (error) {
            console.error('Error parsing user data:', error);
            headerAvatar.style.display = 'none';
            defaultIcon.style.display = 'inline-block';
            userAvatarLink.href = 'login.html';
            userAvatarLink.title = 'Login';
        }
    } else {
        // CHƯA ĐĂNG NHẬP - Link đến login
        headerAvatar.style.display = 'none';
        defaultIcon.style.display = 'inline-block';
        userAvatarLink.href = 'login.html';
        userAvatarLink.title = 'Login';
    }
}