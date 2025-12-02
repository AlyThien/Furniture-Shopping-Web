//Nhóm 9: Phần quay lại đầu trang
(function(){
    const btn = document.getElementById('btn-top');
    if (!btn) return;

    const SHOW_AFTER = 300; // px

    function update() {
        if (window.scrollY > SHOW_AFTER) btn.classList.add('show');
        else btn.classList.remove('show');
    }

    // ẩn/hiện nút khi scroll
    window.addEventListener('scroll', update, { passive: true });
    update();

    // chuyển động mượt khi cuộn trang
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        btn.blur();
    });

    // dành cho bàn phím sử dụng enter/space để kích hoạt
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    });
})();

//Nhóm 9: Cập nhật đường dẫn logo về trang chủ và tất cả navigation links
(function() {
    function getBasePath() {
        const path = window.location.pathname;
        // Đếm số thư mục từ file hiện tại đến root
        const parts = path.split('/').filter(x => x);
        const depth = parts.length - 1; // Trừ đi tên file
        return depth > 0 ? '../'.repeat(depth) : './';
    }
    
    function updateAllLinks() {
        const basePath = getBasePath();
        
        // Cập nhật logo link
        const logoLink = document.getElementById('logo-home-link');
        if (logoLink) {
            logoLink.href = basePath + 'index.html';
        }
        
        // Cập nhật tất cả navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const target = link.getAttribute('data-target');
            if (target) {
                link.href = basePath + target;
            }
        });
        
        // Cập nhật user avatar link (xử lý riêng vì có logic login/logout)
        const userAvatarLink = document.getElementById('user-avatar-link');
        if (userAvatarLink && userAvatarLink.classList.contains('nav-link')) {
            const storedData = localStorage.getItem('userPersonalData');
            const userEmail = localStorage.getItem('userEmail');
            
            if (storedData && userEmail) {
                userAvatarLink.href = basePath + 'user/personal-info.html';
            } else {
                userAvatarLink.href = basePath + 'user/login.html';
            }
        }
    }
    
    // Chạy khi partials load xong
    document.addEventListener('allPartialsLoaded', updateAllLinks);
    
    // Chạy ngay nếu đã load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateAllLinks);
    } else {
        updateAllLinks();
    }
})();

//Nhóm 9: Phần thanh menu hamburger cho mobile
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

//Nhóm 9: Phần hiển thị avatar người dùng trên header (lưu lại khi chuyển sang các trang khác)
(function() {
    'use strict';

    // Hàm xác định đường dẫn tương đối đến thư mục gốc
    function getBasePath() {
        const path = window.location.pathname;
        const parts = path.split('/').filter(x => x);
        const depth = parts.length - 1;
        return depth > 0 ? '../'.repeat(depth) : './';
    }

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
            // chưa đăng nhập hoặc đã logout
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
        userAvatarLink.title = 'Login';
    }

    // Chạy khi DOM load xong
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateHeaderAvatar);
    } else {
        updateHeaderAvatar();
    }

    // Lắng nghe sự kiện khi tất cả partials đã load xong
    document.addEventListener('allPartialsLoaded', updateHeaderAvatar);

    // Lắng nghe sự kiện khi localStorage thay đổi (từ tab khác)
    window.addEventListener('storage', function(e) {
        if (e.key === 'userPersonalData' || e.key === 'userEmail') {
            updateHeaderAvatar();
        }
    });

    // Lắng nghe custom event khi update avatar hoặc logout
    window.addEventListener('avatarUpdated', updateHeaderAvatar);

})();

// Hàm cập nhật avatar trên header (có thể gọi từ các trang khác khi cần)
function updateHeaderAvatar() {
    const headerAvatar = document.getElementById('header-user-avatar');
    const defaultIcon = document.getElementById('header-default-icon');
    const userAvatarLink = document.getElementById('user-avatar-link');
    
    if (!headerAvatar || !defaultIcon) return;

    const storedData = localStorage.getItem('userPersonalData');
    
    if (storedData) {
        try {
            const userData = JSON.parse(storedData);
            
            // Đã đăng nhập - Link đến personal-info
            userAvatarLink.href = '../user/personal-info.html';
            
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
            userAvatarLink.href = '../user/login.html';
            userAvatarLink.title = 'Login';
        }
    } else {
        // chưa đăng nhập - Link đến login
        headerAvatar.style.display = 'none';
        defaultIcon.style.display = 'inline-block';
        userAvatarLink.href = '../user/login.html';
        userAvatarLink.title = 'Login';
    }
}
