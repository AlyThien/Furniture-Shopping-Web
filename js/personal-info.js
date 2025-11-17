// Khai báo key dùng cho Local Storage
const USER_DATA_KEY = 'Haguchi_UserData';
const ORDER_DATA_KEY = 'Haguchi_MockOrders';

// Dữ liệu Mặc định (Default Data) - Giả lập email đăng nhập ban đầu
const defaultUserData = {
    email: 'user001@haguchi.com', // Email giả lập
    fullName: '',
    phone: '',
    dob: '',
    gender: '',
    cityProvince: '',
    addressDetail: '',
    avatarUrl: 'https://via.placeholder.com/100'
};

const defaultMockOrders = [
    { 
        id: '1000', 
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

// VIEW MODE FUNCTIONS 
function showViewMode() {
    document.getElementById('view-mode-container').style.display = 'grid'; // Dùng grid cho layout chính
}

function hideViewMode() {
    document.getElementById('view-mode-container').style.display = 'none';
}

// === STORAGE FUNCTIONS ===
function loadDataFromStorage() {
    const storedUser = localStorage.getItem(USER_DATA_KEY);
    const storedOrders = localStorage.getItem(ORDER_DATA_KEY);
    
    userData = storedUser ? JSON.parse(storedUser) : { ...defaultUserData }; 
    mockOrders = storedOrders ? JSON.parse(storedOrders) : [...defaultMockOrders]; 

    // Lưu email mặc định ngay lần đầu nếu chưa có dữ liệu gì
    if (!storedUser) {
        saveDataToStorage();
    }
}

function saveDataToStorage() {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    localStorage.setItem(ORDER_DATA_KEY, JSON.stringify(mockOrders));
}

loadDataFromStorage();

// === MODAL FUNCTIONS (Chỉ cho Edit và Order Details) ===
function showModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function openEditModal() {
    loadEditData();
    showModal('edit-profile-modal');
}

function closeEditModal() {
    closeModal('edit-profile-modal');
    loadViewData(); // Tải lại dữ liệu sau khi sửa để cập nhật View Mode
}

// === LOAD/RENDER DATA FUNCTIONS ===
function loadViewData() {
    // Load data vào các phần tử của View Mode (trang tĩnh)
    document.getElementById('display-view-user-name').textContent = userData.fullName || 'User';
    document.getElementById('display-view-user-email').textContent = userData.email;
    
    // View Tab Content
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
    // Load data vào input của Edit Modal
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
        'success': { text: 'Completed', class: 'status-success' },
        'cancelled': { text: 'Cancelled', class: 'status-cancelled' }
    };
    
    const orderListContainer = document.getElementById('order-list-view');
    if (!orderListContainer) return;

    orderListContainer.innerHTML = mockOrders.map(order => {
        const status = statusMap[order.status] || { text: 'Unknown', class: '' };
        
        const cancelButton = (order.status === 'pending') ? 
                             `<button class="action-btn cancel-btn" onclick="cancelOrder('${order.id}')">Cancel</button>` : '';

        return `
            <div class="order-item">
                <div class="order-header">
                    <span class="order-id">Order #${order.id}</span>
                    <span class="order-status ${status.class}">${status.text}</span>
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


// === INTERACTION HANDLERS ===

function cancelOrder(orderId) {
    const orderIndex = mockOrders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) {
        alert('Order not found!');
        return;
    }

    const order = mockOrders[orderIndex];

    if (order.status === 'pending') {
        if (confirm(`Are you sure you want to cancel order #${orderId}?`)) {
            mockOrders[orderIndex].status = 'cancelled';
            mockOrders[orderIndex].statusText = 'Cancelled';

            saveDataToStorage();

            alert(`Order #${orderId} has been cancelled.`);
            
            closeModal('order-details-modal'); 
            renderOrders(); 
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
        'pending': { text: 'Pending Confirmation', class: 'status-pending' },
        'shipped': { text: 'Shipping', class: 'status-shipped' },
        'success': { text: 'Completed', class: 'status-success' },
        'cancelled': { text: 'Cancelled', class: 'status-cancelled' }
    };
    const status = statusMap[order.status] || { text: 'Unknown', class: '' };

    document.getElementById('detail-order-id').textContent = order.id;
    document.getElementById('detail-recipient').textContent = order.recipient;
    document.getElementById('detail-phone').textContent = order.phone;
    document.getElementById('detail-email').textContent = order.email;
    document.getElementById('detail-address').textContent = order.address;
    document.getElementById('detail-date').textContent = order.date;
    
    const statusSpan = document.getElementById('detail-status');
    statusSpan.textContent = status.text;
    statusSpan.className = status.class; 
    
    document.getElementById('detail-payment-method').textContent = order.paymentMethod;
    document.getElementById('detail-product-name').textContent = order.productName;
    document.getElementById('detail-quantity').textContent = order.quantity;
    document.getElementById('detail-price').textContent = order.price;
    document.getElementById('detail-total-amount').textContent = order.total;

    const cancelBtnContainer = document.getElementById('order-detail-action-container');
    if (order.status === 'pending') {
        cancelBtnContainer.innerHTML = `<button class="action-btn cancel-btn" onclick="cancelOrder('${order.id}')">Cancel Order</button>`;
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
                alert('Profile picture selected. Click "Save Changes" to save.');
            };
            reader.readAsDataURL(this.files[0]);
        }
    });
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        alert('Logged out successfully! All personal data (Name, Phone, etc.) has been reset. Email remains as the login ID.');
        
        const loggedInEmail = userData.email; 
        
        // RESET CÁC THÔNG TIN KHÁC VỀ MẶC ĐỊNH, GIỮ LẠI EMAIL
        userData = { ...defaultUserData };
        userData.email = loggedInEmail; 

        mockOrders = [...defaultMockOrders]; 

        saveDataToStorage();
        
        document.getElementById('current-user-email').textContent = userData.email;
        
        hideViewMode(); // Ẩn View Mode (trang tĩnh)
        document.getElementById('setup-mode-container').style.display = 'block'; // Hiện Setup Mode
    }
}

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', function() {
    
    // Đảm bảo email hiện tại được hiển thị trong Setup Mode
    const emailDisplaySetup = document.getElementById('current-user-email');
    if (emailDisplaySetup) {
        emailDisplaySetup.textContent = userData.email;
    }

    // --- KIỂM TRA ĐỂ HIỂN THỊ VIEW MODE HOẶC SETUP ---
    const urlParams = new URLSearchParams(window.location.search);
    const openModalParam = urlParams.get('open');
    
    // Coi như đã setup nếu trường tên có dữ liệu
    const isProfileSetup = !!userData.fullName; 
    
    if (openModalParam === 'profile' || isProfileSetup) {
        // HIỂN THỊ VIEW MODE (trang tĩnh)
        document.getElementById('setup-mode-container').style.display = 'none';
        loadViewData();
        showViewMode(); 

        // Kích hoạt tab profile nếu có tham số URL
        if (openModalParam === 'profile') {
             const profileTab = document.querySelector('.nav-tab[data-target="profile"]');
             if (profileTab) profileTab.click(); 
        }

    } else {
        // HIỂN THỊ SETUP MODE
        document.getElementById('setup-mode-container').style.display = 'block';
        hideViewMode(); 
    }
    // --- KẾT THÚC LOGIC HIỂN THỊ ---

    // === FORM SUBMISSIONS ===
    const setupForm = document.getElementById('setup-info-form');
    if (setupForm) {
        setupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Cập nhật userData từ Setup form
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
            } else {
                alert('Please fill in all required fields (Full Name, Phone, DOB, Gender).');
            }
        });
    }

    const editForm = document.getElementById('info-form');
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Cập nhật userData từ Edit form
            userData.fullName = document.getElementById('edit-full-name').value.trim();
            userData.phone = document.getElementById('edit-phone').value.trim();
            userData.dob = document.getElementById('edit-dob').value.trim();
            userData.gender = document.getElementById('edit-gender').value;
            userData.cityProvince = document.getElementById('edit-city-province').value.trim();
            userData.addressDetail = document.getElementById('edit-address-detail').value.trim();
            
            saveDataToStorage();

            closeEditModal(); 
            alert('Profile updated successfully!');
        });
    }
    
    const bankForm = document.getElementById('bank-form');
    if (bankForm) {
        bankForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Cập nhật userData từ Bank form
            userData.bankName = document.getElementById('bank-name').value.trim();
            userData.bankAccNumber = document.getElementById('bank-acc-number').value.trim();
            userData.bankBranch = document.getElementById('bank-branch').value.trim();
            
            saveDataToStorage();

            alert('Bank account information saved!');
            loadViewData();
        });
    }
    
    // === EVENT LISTENERS ===
    document.querySelector('.edit-close-btn').addEventListener('click', closeEditModal);
    document.querySelector('.order-details-close-btn').addEventListener('click', () => closeModal('order-details-modal'));

    const editProfileBtn = document.getElementById('edit-profile-btn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', openEditModal);
    }
    
    const logoutBtn = document.getElementById('logout-sidebar-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    // === KHỞI TẠO KHÁC ===
    initTabNavigation();
    initAvatarUpload();

    // Export window functions (đảm bảo các onclick từ HTML vẫn hoạt động)
    window.openEditModal = openEditModal; 
    window.closeModal = closeModal; 
    window.closeEditModal = closeEditModal; 
    window.viewOrderDetails = viewOrderDetails; 
    window.cancelOrder = cancelOrder; 
});
