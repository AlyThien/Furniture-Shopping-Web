const USER_DATA_KEY = 'Haguchi_UserData';
const ORDER_DATA_KEY = 'Haguchi_MockOrders';
const LOGIN_EMAIL_KEY = 'Haguchi_LoggedInUser'; // KEY ĐỒNG BỘ với login.js

//Nhóm 9: Dữ liệu Đơn hàng GIẢ LẬP
const defaultMockOrders = [
    { 
        id: '1011', 
        recipient: 'Tram Vu',
        phone: '09123456789',
        email: 'kzan@gmail.com',
        address: 'Dong Xoai City, Binh Phuoc Province',
        productName: 'L-shaped Sofa NF201 (Navy)', 
        paymentMethod: 'COD',
        price: '11,000,000 VND',
        quantity: 2,
        total: '22,000,000 VND', 
        date: '26/11/2025', 
        status: 'pending',
        statusText: 'Pending Confirmation',
    }
];

// Biến toàn cục
let userData;
let mockOrders;

// --- UTILITY FUNCTIONS ---

function formatCurrency(amount) {
    if (typeof amount === 'string') {
        return amount;
    }
    if (isNaN(amount) || amount === null) return '0 VND';
    return amount.toLocaleString('vi-VN') + ' VND';
}

// VIEW MODE FUNCTIONS 
function showViewMode() {
    document.getElementById('view-mode-container').style.display = 'block'; 
}

function hideViewMode() {
    document.getElementById('view-mode-container').style.display = 'none';
}

// === STORAGE FUNCTIONS ===
function loadDataFromStorage() {
    // LẤY EMAIL THẬT TỪ LOGIN
    const loggedInEmail = localStorage.getItem(LOGIN_EMAIL_KEY);
    
    // Nếu không có email đăng nhập, chuyển về trang login
    if (!loggedInEmail) {
        alert('Please login first!');
        window.location.href = 'login.html';
        return;
    }

    const storedUser = localStorage.getItem(USER_DATA_KEY);
    const storedOrders = localStorage.getItem(ORDER_DATA_KEY);
    
    if (storedUser) {
        userData = JSON.parse(storedUser);
        // CẬP NHẬT EMAIL THẬT VÀO USERDATA
        userData.email = loggedInEmail;
    } else {
        // Tạo dữ liệu mặc định với EMAIL THẬT
        userData = {
            email: loggedInEmail, // SỬ DỤNG EMAIL THẬT
            fullName: '',
            phone: '',
            dob: '',
            gender: '',
            cityProvince: '',
            addressDetail: '',
            avatarUrl: 'https://via.placeholder.com/100'
        };
    }
    
    mockOrders = storedOrders ? JSON.parse(storedOrders) : [...defaultMockOrders]; 

    // Lưu lại để đảm bảo email được cập nhật
    saveDataToStorage();
}

function saveDataToStorage() {
    const dataString = JSON.stringify(userData);
    localStorage.setItem('userPersonalData', dataString);
    
    // Trigger event để các trang khác cập nhật avatar
    window.dispatchEvent(new Event('avatarUpdated'));
}

// === MODAL FUNCTIONS (Chỉ cho Edit và Order Details) ===
function showModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.getElementById(modalId).style.display = 'none';
}

function openEditModal() {
    loadEditData();
    showModal('edit-profile-modal');
}

function closeEditModal() {
    closeModal('edit-profile-modal');
    loadViewData();
}

// === LOAD/RENDER DATA FUNCTIONS ===
function loadViewData() {
    document.getElementById('display-view-user-name').textContent = userData.fullName || 'User';
    document.getElementById('display-view-user-email').textContent = userData.email;
    
    document.getElementById('view-full-name').textContent = userData.fullName || 'N/A';
    document.getElementById('view-phone').textContent = userData.phone || 'N/A';
    document.getElementById('view-dob').textContent = userData.dob || 'N/A';
    document.getElementById('view-gender').textContent = userData.gender || 'N/A';
    document.getElementById('view-city-province').textContent = userData.cityProvince || 'Not updated';
    document.getElementById('view-address-detail').textContent = userData.addressDetail || 'Not updated';
    
    document.getElementById('view-avatar-preview').src = userData.avatarUrl;
    document.getElementById('edit-avatar-preview').src = userData.avatarUrl;
    
    renderOrders();
}

function loadEditData() {
    document.getElementById('edit-full-name').value = userData.fullName || '';
    document.getElementById('edit-phone').value = userData.phone || '';
    document.getElementById('edit-dob').value = userData.dob || '';
    document.getElementById('edit-gender').value = userData.gender || '';
    document.getElementById('edit-city-province').value = userData.cityProvince || '';
    document.getElementById('edit-address-detail').value = userData.addressDetail || '';
}

function renderOrders() {
    const statusMap = {
        'pending': { text: 'Pending Confirmation', class: 'status-pending' },
        'shipped': { text: 'Shipping', class: 'status-shipped' },
        'delivered': { text: 'Delivered', class: 'status-delivered' },
        'cancelled': { text: 'Cancelled', class: 'status-cancelled' }
    };
    
    const orderListContainer = document.getElementById('order-list-view');
    if (!orderListContainer) return;

    if (mockOrders.length === 0) {
        orderListContainer.innerHTML = '<p style="text-align: center; color: #555;">You have no orders yet.</p>';
        return;
    }

    orderListContainer.innerHTML = mockOrders.map(order => {
        const statusData = statusMap[order.status.toLowerCase()] || { text: order.statusText || 'Unknown', class: '' };
        
        const cancelButton = (order.status.toLowerCase() === 'pending') ? 
                             `<button class="action-btn cancel-btn" onclick="cancelOrder('${order.id}')">Cancel</button>` : '';

        return `
            <div class="order-item">
                <div class="order-header">
                    <span class="order-id">Order #${order.id}</span>
                    <span class="order-status ${statusData.class}">${order.statusText}</span>
                </div>
                <p class="order-detail">Product: ${order.productName} (Qty: ${order.quantity})</p>
                <div class="order-footer">
                    <span class="order-total">Total: ${order.total}</span>
                    <div class="order-actions">
                        ${cancelButton}
                        <button class="action-btn" onclick="viewOrderDetails('${order.id}')">View Details</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// THÊM HÀM HIỂN THỊ NOTIFICATION
function showNotification(message, type = 'success', duration = 3000) {
    const notification = document.getElementById('profile-notification');
    if (!notification) return;
    
    notification.textContent = message;
    notification.className = `profile-notification ${type}`;
    
    // Tự động ẩn sau duration
    setTimeout(() => {
        notification.classList.add('hidden');
    }, duration);
}

// === INTERACTION HANDLERS ===

function cancelOrder(orderId) {
    const orderIndex = mockOrders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) {
        alert('Order not found!');
        return;
    }

    const order = mockOrders[orderIndex];

    if (order.status.toLowerCase() === 'pending') {
        if (confirm(`Are you sure you want to cancel order #${orderId}?`)) {
            mockOrders[orderIndex].status = 'cancelled';
            mockOrders[orderIndex].statusText = 'Cancelled';

            saveDataToStorage();

            // THAY ALERT BẰNG NOTIFICATION
            closeModal('order-details-modal');
            renderOrders();
            
            // Hiển thị notification nhẹ nhàng
            setTimeout(() => {
                const notification = document.createElement('div');
                notification.className = 'order-notification success';
                notification.textContent = `Order #${orderId} has been cancelled.`;
                document.body.appendChild(notification);
                
                setTimeout(() => notification.remove(), 3000);
            }, 300);
        }
    } else {
        alert(`Order #${orderId} cannot be cancelled because its status is '${order.statusText}'.`);
    }
}

function viewOrderDetails(orderId) {
    const order = mockOrders.find(o => o.id === orderId);
    if (!order) {
        alert('Order not found!');
        return;
    }
    
    const statusMap = {
        'pending': { class: 'status-pending' },
        'shipped': { class: 'status-shipped' },
        'delivered': { class: 'status-success' },
        'cancelled': { class: 'status-cancelled' }
    };
    const statusKey = order.status.toLowerCase();
    const statusClass = statusMap[statusKey] ? statusMap[statusKey].class : '';

    document.getElementById('detail-order-id').textContent = order.id;
    document.getElementById('detail-recipient').textContent = order.recipient;
    document.getElementById('detail-phone').textContent = order.phone;
    document.getElementById('detail-email').textContent = order.email;
    document.getElementById('detail-address').textContent = order.address;
    document.getElementById('detail-date').textContent = order.date;
    
    const statusSpan = document.getElementById('detail-status');
    statusSpan.textContent = order.statusText;
    statusSpan.className = statusClass;
    
    document.getElementById('detail-payment-method').textContent = order.paymentMethod;
    document.getElementById('detail-product-name').textContent = order.productName;
    document.getElementById('detail-quantity').textContent = order.quantity;
    document.getElementById('detail-price').textContent = order.price;
    document.getElementById('detail-total-amount').textContent = order.total;

    const cancelBtnContainer = document.getElementById('order-detail-action-container');
    if (order.status.toLowerCase() === 'pending') {
        cancelBtnContainer.innerHTML = `<button type="button" class="action-btn cancel-btn" onclick="cancelOrder('${order.id}')">Cancel Order</button>`;
    } else {
        cancelBtnContainer.innerHTML = ''; 
    }

    showModal('order-details-modal');
}

function initTabNavigation() {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.dataset.target;
            
            document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            const targetContent = document.getElementById(target + '-content');
            if (targetContent) {
                targetContent.classList.add('active');
                if (target === 'orders') {
                    renderOrders(); 
                }
            }
        });
    });
}

function initAvatarUpload() {
    const avatarInput = document.getElementById('avatar-input');
    const chooseAvatarBtn = document.getElementById('choose-avatar-btn');

    if (chooseAvatarBtn) {
        chooseAvatarBtn.addEventListener('click', () => {
            avatarInput.click();
        });
    }

    avatarInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                userData.avatarUrl = e.target.result;
                document.getElementById('edit-avatar-preview').src = userData.avatarUrl;
                
                // Lưu ngay để cập nhật header
                saveDataToStorage();
                
                showNotification('Profile picture selected. Click "Save Changes" to save.', 'info');
            };
            reader.readAsDataURL(this.files[0]);
        }
    });
}

// === LOGOUT FUNCTION ===
function handleLogout() {
    // Xác nhận logout
    if (confirm('Are you sure you want to logout?')) {
        // Xóa tất cả dữ liệu user
        localStorage.removeItem('userPersonalData');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('mockOrders');
        
        // Trigger event để header cập nhật
        window.dispatchEvent(new Event('avatarUpdated'));
        
        // Chuyển về trang login
        window.location.href = 'login.html';
    }
}

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', function() {
    // Load data từ storage (đã có check login ở trong)
    loadDataFromStorage();
    
    // Hiển thị email trong Setup Mode
    const emailDisplaySetup = document.getElementById('current-user-email');
    if (emailDisplaySetup) {
        emailDisplaySetup.textContent = userData.email;
    }

    // KIỂM TRA ĐỂ HIỂN THỊ VIEW MODE HOẶC SETUP
    const urlParams = new URLSearchParams(window.location.search);
    const openModalParam = urlParams.get('open');
    
    const isProfileSetup = !!userData.fullName; 
    
    if (openModalParam === 'profile' || isProfileSetup) {
        document.getElementById('setup-mode-container').style.display = 'none';
        loadViewData();
        showViewMode(); 

        if (openModalParam === 'profile') {
             const profileTab = document.querySelector('.nav-tab[data-target="profile"]');
             if (profileTab) profileTab.click(); 
        }

    } else {
        document.getElementById('setup-mode-container').style.display = 'block';
        hideViewMode(); 
    }

    // === FORM SUBMISSIONS ===
    const setupForm = document.getElementById('setup-info-form');
    if (setupForm) {
        setupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            userData.fullName = document.getElementById('setup-full-name').value.trim();
            userData.phone = document.getElementById('setup-phone').value.trim();
            userData.dob = document.getElementById('setup-dob').value.trim();
            userData.gender = document.getElementById('setup-gender').value;
            userData.cityProvince = document.getElementById('setup-address').value.trim();
            
            if (userData.fullName && userData.phone && userData.dob && userData.gender) {
                saveDataToStorage();

                document.getElementById('setup-mode-container').style.display = 'none';
                loadViewData();
                showViewMode(); 
                
                document.querySelector('.nav-tab[data-target="profile"]').click();
            } else {
                alert('Please fill in all required fields (Full Name, Phone, DOB, Gender).');
            }
        });
    }

    const editForm = document.getElementById('info-form');
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            userData.fullName = document.getElementById('edit-full-name').value.trim();
            userData.phone = document.getElementById('edit-phone').value.trim();
            userData.dob = document.getElementById('edit-dob').value.trim();
            userData.gender = document.getElementById('edit-gender').value;
            userData.cityProvince = document.getElementById('edit-city-province').value.trim();
            userData.addressDetail = document.getElementById('edit-address-detail').value.trim();
            
            saveDataToStorage();

            // THAY ALERT BẰNG NOTIFICATION
            showNotification('Profile updated successfully!', 'success');
            
            // Đóng modal sau 1.5 giây
            setTimeout(() => {
                closeEditModal();
            }, 1500);
        });
    }
    
    // === EVENT LISTENERS ===
    document.querySelectorAll('.edit-close-btn').forEach(btn => btn.addEventListener('click', closeEditModal));
    document.querySelectorAll('.order-details-close-btn').forEach(btn => btn.addEventListener('click', () => closeModal('order-details-modal')));

    const editProfileBtn = document.getElementById('edit-profile-btn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', openEditModal);
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logout-sidebar-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleLogout();
        });
    }
    
    // === KHỞI TẠO KHÁC ===
    initTabNavigation();
    initAvatarUpload();

    // Export window functions
    window.openEditModal = openEditModal; 
    window.closeModal = closeModal; 
    window.closeEditModal = closeEditModal; 
    window.viewOrderDetails = viewOrderDetails; 
    window.cancelOrder = cancelOrder; 
});