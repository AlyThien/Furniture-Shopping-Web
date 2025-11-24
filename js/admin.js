// Nhóm 9: Khởi tạo khi DOM đã load xong
document.addEventListener('DOMContentLoaded', () => {
    
    // ============================================
    // Nhóm 9: CÁC HÀM TIỆN ÍCH (UTILITY FUNCTIONS)
    // ============================================
    
    // Nhóm 9: Hàm lấy class CSS tương ứng với trạng thái đơn hàng
    function getStatusClass(statusEn) {
        switch (statusEn) {
            case 'success':
                return 'status-success'; // Hoàn thành
            case 'shipped':
                return 'status-shipped'; // Đã giao hàng
            case 'pending':
                return 'status-pending'; // Đang xử lý
            case 'cancelled':
                return 'status-cancelled'; // Đã hủy
            default:
                return 'status-default';
        }
    }

    // Nhóm 9: Hàm dịch trạng thái từ tiếng Anh sang tiếng Việt
    function translateStatus(statusEn) {
        switch (statusEn) {
            case 'pending':
                return 'Đang xử lý';
            case 'shipped':
                return 'Đã giao hàng';
            case 'success':
                return 'Hoàn thành';
            case 'cancelled':
                return 'Đã hủy';
            default:
                return 'Không rõ';
        }
    }

    // Nhóm 9: Hàm định dạng ngày từ YYYY-MM-DD sang DD/MM/YYYY
    function formatDate(dateString) {
        if (!dateString) return '';
        try {
            const [year, month, day] = dateString.split('-');
            return `${day}/${month}/${year}`;
        } catch (error) {
            return dateString;
        }
    }

    // Nhóm 9: Hàm định dạng số tiền theo chuẩn Việt Nam (thêm dấu chấm phân cách và đơn vị đ)
    function formatCurrency(number) {
        if (typeof number !== 'number') return '0đ';
        return number.toLocaleString('vi-VN') + 'đ';
    }

    // Nhóm 9: Hàm chuyển đổi chuỗi tiền tệ (VD: "5.400.000đ") về số nguyên
    function currencyToNumber(currencyString) {
        if (typeof currencyString !== 'string') return 0;
        let cleanedString = currencyString.replace(/đ/g, '').trim();
        cleanedString = cleanedString.replace(/\./g, '');
        cleanedString = cleanedString.replace(/,/g, '');
        return parseInt(cleanedString) || 0;
    }

    // Nhóm 9: Hàm tính tổng giá trị đơn hàng dựa trên danh sách sản phẩm và giá hiện tại trong kho
    function calculateOrderTotal(items) {
        let total = 0;
        items.forEach(item => {
            const product = mockInventory.find(p => p.name === item.name);
            const price = product ? product.price : currencyToNumber(item.price);
            const qty = parseInt(item.qty) || 0;
            total += price * qty;
        });
        return total;
    }

    // ============================================
    // Nhóm 9: DỮ LIỆU MẪU (MOCK DATA)
    // ============================================
    
    // Nhóm 9: Dữ liệu kho hàng mẫu - lưu thông tin sản phẩm (ID, tên, số lượng tồn kho, giá)
    let mockInventory = [
        { id: 'SP001', name: 'Cloud Couch', stock: 15, price: 5400000 },
        { id: 'SP002', name: 'Wave Couch', stock: 8, price: 3400000 },
        { id: 'SP003', name: 'Cotton Candi Couch', stock: 14, price: 3900000 },
        { id: 'SP004', name: 'Saphire Couch', stock: 15, price: 6200000 },
        { id: 'SP005', name: 'Haven Couch', stock: 8, price: 4700000 },
        { id: 'SP006', name: 'Bàn Ăn Zenith', stock: 5, price: 12990000 },
        { id: 'SP007', name: 'Bàn Trà Mặt Đá', stock: 7, price: 2800000 },
        { id: 'SP008', name: 'Tủ Quần Áo HDF', stock: 12, price: 9200000 },
        { id: 'SP009', name: 'Ghế Thư Giãn', stock: 15, price: 1800000 },
        { id: 'SP010', name: 'Kệ TV Gỗ Sồi', stock: 10, price: 5700000 },
        { id: 'SP011', name: 'Giường ngủ cao cấp ODGN28', stock: 2, price: 29800000 },
    ];
    
    // Nhóm 9: Dữ liệu đơn hàng mẫu - lưu thông tin đơn hàng (ID, khách hàng, ngày, trạng thái, địa chỉ, thanh toán, sản phẩm)
    let mockOrders = [
        { id: '1007', customer: 'Nguyễn Trọng An', date: '2025-11-26', status: 'pending', phone: '0901 234 567', address: '25 Lô A, Đường Số 10, Quận 7, TP.HCM', payment: 'Chuyển khoản Ngân hàng', items: [{ name: 'Cloud Couch', qty: 1 }] },
        { id: '1006', customer: 'Lê Thị Mỹ Hạnh', date: '2025-11-21', status: 'shipped', phone: '0902 987 654', address: '123/45 Đường Quang Trung, Gò Vấp, TP.HCM', payment: 'Thanh toán khi nhận hàng (COD)', items: [{ name: 'Bàn Ăn Zenith', qty: 1 }] },
        { id: '1005', customer: 'Trần Văn Quang', date: '2025-11-17', status: 'success', phone: '0903 111 222', address: 'Lầu 5, Tòa nhà Central Park, Hà Nội', payment: 'Thẻ tín dụng', items: [{ name: 'Tủ Quần Áo HDF', qty: 1 }, { name: 'Ghế Thư Giãn', qty: 1 }] }, 
        { id: '1004', customer: 'Jessica M. Chen', date: '2025-11-12', status: 'success', phone: '+84 908 555 333', address: 'Apartment 102, 12 Sương Nguyệt Ánh, Q.1', payment: 'PayPal', items: [{ name: 'Wave Couch', qty: 2 }, { name: 'Bàn Trà Mặt Đá', qty: 1 }] }, 
        { id: '1003', customer: 'Phạm Hồng Nhung', date: '2025-11-10', status: 'cancelled', phone: '0987 654 321', address: 'Khu đô thị Sala, Quận 2, TP.HCM', payment: 'Chuyển khoản', items: [{ name: 'Cotton Candi Couch', qty: 1 }] },
        { id: '1002', customer: 'David K. Johnson', date: '2025-11-09', status: 'success', phone: '+84 919 444 000', address: '100 Bà Triệu, Hà Nội', payment: 'Chuyển khoản', items: [{ name: 'Saphire Couch', qty: 2 }, { name: 'Kệ TV Gỗ Sồi', qty: 1 }] },
        { id: '1001', customer: 'Hoàng Đình Phú', date: '2025-11-08', status: 'success', phone: '0978 999 888', address: '456 Trường Chinh, Q.Tân Bình, TP.HCM', payment: 'COD', items: [{ name: 'Haven Couch', qty: 1 }, { name: 'Wave Couch', qty: 2 }] }, 
    ];

    // ============================================
    // Nhóm 9: RENDER DỮ LIỆU LÊN GIAO DIỆN
    // ============================================
    
    // Nhóm 9: Hàm hiển thị danh sách đơn hàng lên bảng
    function renderOrders(orders = mockOrders) {
        const ordersBody = document.getElementById('orders-body');
        if (!ordersBody) return;
        ordersBody.innerHTML = '';

        orders.forEach(order => {
            const calculatedTotal = calculateOrderTotal(order.items);
            const statusClass = getStatusClass(order.status);
            const statusVi = translateStatus(order.status);
            const formattedDate = formatDate(order.date);

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.customer}</td>
                <td>${formattedDate}</td>
                <td>${formatCurrency(calculatedTotal)}</td>
                <td><span class="badge ${statusClass}">${statusVi}</span></td>
                <td><button class="action-btn view-detail" data-order-id="${order.id}">Chi tiết</button></td>
            `;
            ordersBody.appendChild(row);
        });
    }

    // Nhóm 9: Hàm hiển thị danh sách sản phẩm trong kho lên bảng
    function renderInventory(products = mockInventory) {
        const inventoryBody = document.getElementById('inventory-body');
        if (!inventoryBody) return;
        inventoryBody.innerHTML = '';

        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td style="text-align:left;">${product.name}</td>
                <td>${product.stock}</td>
                <td>${formatCurrency(product.price)}</td>
                <td>
                    <button class="action-btn edit-prod" data-prod-id="${product.id}">Sửa</button>
                    <button class="action-btn delete-prod" data-prod-id="${product.id}">Xóa</button>
                </td>
            `;
            inventoryBody.appendChild(row);
        });
    }

    // ============================================
    // Nhóm 9: QUẢN LÝ SẢN PHẨM (THÊM/SỬA/XÓA)
    // ============================================
    
    // Nhóm 9: Khai báo các phần tử DOM liên quan đến modal sản phẩm
    const addProdBtn = document.getElementById('addProdBtn');
    const prodModalOverlay = document.getElementById('product-modal-overlay');
    const prodModalCloseBtns = prodModalOverlay ? prodModalOverlay.querySelectorAll('.close-btn, .btn-close-modal') : [];
    const prodForm = document.getElementById('product-form');
    const saveProdBtn = document.getElementById('save-prod-btn');
    const prodIdInput = document.getElementById('prod-id');

    // Nhóm 9: Xử lý khi click nút "Thêm sản phẩm mới" - mở modal với form trống
    if (addProdBtn) {
        addProdBtn.addEventListener('click', () => {
            prodForm.reset();
            document.getElementById('modal-prod-title').textContent = 'Thêm Sản phẩm mới';
            prodIdInput.value = 'Tự động tạo';
            prodIdInput.readOnly = true;
            saveProdBtn.textContent = 'Thêm Sản phẩm';
            saveProdBtn.dataset.mode = 'add';
            prodModalOverlay.classList.remove('hidden');
        });
    }

    // Nhóm 9: Xử lý đóng modal sản phẩm
    prodModalCloseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            prodModalOverlay.classList.add('hidden');
        });
    });

    // Nhóm 9: Lắng nghe sự kiện click trên bảng kho hàng để xử lý nút Sửa/Xóa
    const inventoryBody = document.getElementById('inventory-body');
    if (inventoryBody) {
        inventoryBody.addEventListener('click', (e) => {
            const target = e.target;
            const prodId = target.dataset.prodId;

            if (target.classList.contains('edit-prod')) {
                handleEditProduct(prodId);
            } else if (target.classList.contains('delete-prod')) {
                handleDeleteProduct(prodId);
            }
        });
    }

    // Nhóm 9: Hàm xử lý chỉnh sửa sản phẩm - điền dữ liệu vào modal
    function handleEditProduct(prodId) {
        const product = mockInventory.find(p => p.id === prodId);
        if (!product) {
            alert('Không tìm thấy sản phẩm!');
            return;
        }

        document.getElementById('modal-prod-title').textContent = 'Chỉnh sửa Sản phẩm';
        prodIdInput.value = product.id;
        prodIdInput.readOnly = true;
        document.getElementById('prod-name').value = product.name;
        document.getElementById('prod-stock').value = product.stock;
        document.getElementById('prod-price').value = product.price;

        saveProdBtn.textContent = 'Lưu thay đổi';
        saveProdBtn.dataset.mode = 'edit';
        saveProdBtn.dataset.currentId = product.id;

        prodModalOverlay.classList.remove('hidden');
    }

    // Nhóm 9: Hàm xử lý xóa sản phẩm khỏi kho
    function handleDeleteProduct(prodId) {
        if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm ${prodId} này không?`)) {
            const initialLength = mockInventory.length;
            mockInventory = mockInventory.filter(p => p.id !== prodId);

            if (mockInventory.length < initialLength) {
                alert(`Đã xóa sản phẩm ${prodId} thành công.`);
                renderInventory();
            } else {
                alert('Không tìm thấy sản phẩm để xóa.');
            }
        }
    }

    // Nhóm 9: Xử lý submit form sản phẩm - thêm mới hoặc cập nhật sản phẩm
    if (prodForm) {
        prodForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('prod-name').value.trim();
            const stockInput = document.getElementById('prod-stock').value;
            const priceInput = document.getElementById('prod-price').value;
            const mode = saveProdBtn.dataset.mode;
            const currentId = saveProdBtn.dataset.currentId;

            const stock = parseInt(stockInput);
            const price = parseInt(priceInput);

            if (!nameInput || isNaN(stock) || stock < 0 || isNaN(price) || price <= 0) {
                alert('Vui lòng nhập đầy đủ và chính xác thông tin sản phẩm (Số lượng >= 0, Giá > 0).');
                return;
            }

            if (mode === 'add') {
                const newProd = {
                    id: 'SP' + (mockInventory.length + 1).toString().padStart(3, '0'),
                    name: nameInput,
                    stock: stock,
                    price: price,
                };
                mockInventory.push(newProd);
                alert(`Đã thêm sản phẩm "${newProd.name}" thành công!`);

            } else if (mode === 'edit' && currentId) {
                const prodIndex = mockInventory.findIndex(p => p.id === currentId);
                if (prodIndex !== -1) {
                    mockInventory[prodIndex].name = nameInput;
                    mockInventory[prodIndex].stock = stock;
                    mockInventory[prodIndex].price = price;
                    alert(`Đã cập nhật sản phẩm ${currentId} thành công!`);
                } else {
                    alert('Lỗi: Không tìm thấy sản phẩm để cập nhật.');
                }
            }

            renderInventory();
            prodModalOverlay.classList.add('hidden');
        });
    }

    // Nhóm 9: Xử lý tìm kiếm sản phẩm theo tên hoặc mã sản phẩm
    const prodFilterInput = document.getElementById('prod-filter');
    if (prodFilterInput) {
        prodFilterInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            const filteredProducts = mockInventory.filter(product =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.id.toLowerCase().includes(searchTerm)
            );
            renderInventory(filteredProducts);
        });
    }

    // ============================================
    // Nhóm 9: BÁO CÁO & THỐNG KÊ
    // ============================================
    
    // Nhóm 9: Hàm tính toán dữ liệu báo cáo - tổng doanh thu, số đơn hoàn thành, sản phẩm bán chạy
    function calculateReportData() {
        const completedOrders = mockOrders.filter(o => o.status === 'success');

        let totalRevenue = completedOrders.reduce((sum, order) => {
            const totalNum = calculateOrderTotal(order.items);
            return sum + totalNum;
        }, 0);

        const orderCount = completedOrders.length;

        const itemSales = {};
        completedOrders.forEach(order => {
            order.items.forEach(item => {
                const name = item.name;
                const qty = parseInt(item.qty) || 0;
                itemSales[name] = (itemSales[name] || 0) + qty;
            });
        });

        let bestSeller = 'N/A';
        let maxQty = 0;
        
        for (const name in itemSales) {
            if (itemSales[name] > maxQty) {
                maxQty = itemSales[name];
                bestSeller = name;
            }
        }
        
        if (bestSeller === 'N/A' && Object.keys(itemSales).length > 0) {
            bestSeller = Object.keys(itemSales)[0];
        }

        return { totalRevenue, orderCount, bestSeller, completedOrders };
    }

    // Nhóm 9: Hàm cập nhật tóm tắt báo cáo lên giao diện
    function updateReportSummary(data) {
        document.getElementById('summary-revenue').textContent = formatCurrency(data.totalRevenue);
        document.getElementById('summary-orders').textContent = data.orderCount;
        document.getElementById('summary-best-seller').textContent = data.bestSeller;
    }

    // Nhóm 9: Hàm hiển thị chi tiết báo cáo (danh sách đơn hàng hoàn thành) lên bảng
    function renderReport(completedOrders) {
        const reportsBody = document.getElementById('reports-body');
        if (!reportsBody) return;

        reportsBody.innerHTML = completedOrders.map(order => {
            const itemNames = order.items.map(item => item.name).join(', ');
            const calculatedTotal = calculateOrderTotal(order.items);
            
            return `
                <tr>
                    <td>${formatDate(order.date)}</td>
                    <td style="text-align:left;">
                        <strong>ĐH #${order.id}</strong><br>
                        <small>SP: ${itemNames}</small>
                    </td>
                    <td>${order.customer}</td>
                    <td>${formatCurrency(calculatedTotal)}</td>
                </tr>
            `;
        }).join('');
    }

    // Nhóm 9: Xử lý khi click nút "Xem báo cáo" - tính toán và hiển thị báo cáo
    document.getElementById('btn-run-report').addEventListener('click', () => {
        const reportData = calculateReportData();
        updateReportSummary(reportData);
        renderReport(reportData.completedOrders);
    });

    // ============================================
    // Nhóm 9: MODAL CHI TIẾT ĐƠN HÀNG
    // ============================================
    
    // Nhóm 9: Khai báo các phần tử DOM liên quan đến modal chi tiết đơn hàng
    const modalOverlay = document.getElementById('order-detail-modal');
    const closeModalBtn = modalOverlay ? modalOverlay.querySelector('.close-btn') : null;
    const ordersBody = document.getElementById('orders-body');

    // Nhóm 9: Hàm điền dữ liệu đơn hàng vào modal chi tiết
    function populateModal(orderId) {
        const order = mockOrders.find(o => o.id === orderId);
        if (!order) {
            console.error("Không tìm thấy đơn hàng với ID:", orderId);
            return;
        }

        const calculatedTotal = calculateOrderTotal(order.items);
        const statusVi = translateStatus(order.status);
        const statusClass = getStatusClass(order.status);
        const formattedDate = formatDate(order.date);

        document.getElementById('modal-order-id').textContent = `#${order.id}`;
        document.getElementById('detail-customer').textContent = order.customer;
        document.getElementById('detail-phone').textContent = order.phone;
        document.getElementById('detail-address').textContent = order.address;
        document.getElementById('detail-date').textContent = formattedDate;
        document.getElementById('detail-payment').textContent = order.payment;
        document.getElementById('detail-total-value').textContent = formatCurrency(calculatedTotal);

        const detailStatusSpan = document.getElementById('detail-status');
        detailStatusSpan.textContent = statusVi;
        detailStatusSpan.className = `badge ${statusClass}`;

        const itemsBody = document.getElementById('detail-items-body');
        itemsBody.innerHTML = order.items.map(item => {
            const product = mockInventory.find(p => p.name === item.name);
            const price = product ? product.price : 0;
            const subtotal = price * (parseInt(item.qty) || 0);

            return `
                <tr>
                    <td style="text-align:left;">${item.name}</td>
                    <td>${item.qty}</td>
                    <td>${formatCurrency(price)}</td>
                    <td>${formatCurrency(subtotal)}</td>
                </tr>
            `;
        }).join('');

        const btnUpdate = document.getElementById('btn-update-status');
        const btnCancel = document.getElementById('btn-cancel-order');
        btnUpdate.dataset.orderId = order.id;
        btnCancel.dataset.orderId = order.id;

        if (order.status === 'pending') {
            btnUpdate.textContent = 'Xác nhận & Giao hàng';
            btnUpdate.style.display = 'inline-block';
            btnCancel.style.display = 'inline-block';
        } else if (order.status === 'shipped') {
            btnUpdate.textContent = 'Đánh dấu Hoàn thành';
            btnUpdate.style.display = 'inline-block';
            btnCancel.style.display = 'none';
        } else {
            btnUpdate.style.display = 'none';
            btnCancel.style.display = 'none';
        }

        modalOverlay.classList.remove('hidden');
    }

    // Nhóm 9: Xử lý khi click nút "Chi tiết" trên bảng đơn hàng
    if (ordersBody) {
        ordersBody.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-detail')) {
                const orderId = e.target.dataset.orderId;
                populateModal(orderId);
            }
        });
    }

    // Nhóm 9: Xử lý đóng modal chi tiết đơn hàng
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modalOverlay.classList.add('hidden');
        });
    }

    // Nhóm 9: Đóng modal khi click ra ngoài overlay
    if (modalOverlay) {
        window.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.add('hidden');
            }
        });
    }

    // Nhóm 9: Xử lý cập nhật trạng thái đơn hàng (pending → shipped → success)
    const btnUpdateStatus = document.getElementById('btn-update-status');
    if (btnUpdateStatus) {
        btnUpdateStatus.addEventListener('click', function() {
            const orderId = this.dataset.orderId;
            const orderIndex = mockOrders.findIndex(o => o.id === orderId);

            if (orderIndex !== -1) {
                if (mockOrders[orderIndex].status === 'pending') {
                    mockOrders[orderIndex].status = 'shipped';
                } else if (mockOrders[orderIndex].status === 'shipped') {
                    mockOrders[orderIndex].status = 'success';
                }
            }
            modalOverlay.classList.add('hidden');
            renderOrders();
            alert(`Đơn hàng #${orderId} đã được cập nhật trạng thái thành công!`);
        });
    }

    // Nhóm 9: Xử lý hủy đơn hàng (chỉ cho phép hủy khi trạng thái là pending)
    const btnCancelOrder = document.getElementById('btn-cancel-order');
    if (btnCancelOrder) {
        btnCancelOrder.addEventListener('click', function() {
            const orderId = this.dataset.orderId;
            const orderIndex = mockOrders.findIndex(o => o.id === orderId);

            if (orderIndex !== -1) {
                if (mockOrders[orderIndex].status === 'pending') {
                    mockOrders[orderIndex].status = 'cancelled';
                } else {
                    alert(`Không thể hủy đơn hàng #${orderId} ở trạng thái hiện tại.`);
                    return;
                }
            }
            modalOverlay.classList.add('hidden');
            renderOrders();
            alert(`Đơn hàng #${orderId} đã được HỦY thành công!`);
        });
    }

    // ============================================
    // Nhóm 9: XỬ LÝ CÁC NÚT CHỨC NĂNG
    // ============================================
    
    // Nhóm 9: Xử lý nút "Làm mới" - reload dữ liệu của view hiện tại
    document.getElementById('refreshBtn').addEventListener('click', () => {
        alert("Đang làm mới dữ liệu...");
        const activeView = document.querySelector('.admin-view.active-view');
        if (activeView && activeView.id === 'view-orders') {
            renderOrders();
        } else if (activeView && activeView.id === 'view-inventory') {
            renderInventory();
        } else if (activeView && activeView.id === 'view-reports') {
            const reportData = calculateReportData();
            updateReportSummary(reportData);
            renderReport(reportData.completedOrders);
        }
    });

    // Nhóm 9: Xử lý nút "Đăng xuất" - xóa thông tin đăng nhập và chuyển về trang login
    document.getElementById('logoutBtn').addEventListener('click', () => {
        alert("Đăng xuất thành công!");
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        window.location.href = 'login.html';
    });

    // ============================================
    // Nhóm 9: ĐIỀU HƯỚNG GIỮA CÁC VIEW
    // ============================================
    
    // Nhóm 9: Xử lý chuyển đổi giữa các tab (Đơn hàng, Kho, Báo cáo)
    const navButtons = document.querySelectorAll('.admin-sidebar nav button');
    const pageTitle = document.getElementById('page-title');

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const targetViewId = `view-${this.dataset.view}`;
            document.querySelectorAll('.admin-view').forEach(view => {
                view.classList.add('hidden');
                view.classList.remove('active-view');
            });
            const targetView = document.getElementById(targetViewId);
            if (targetView) {
                targetView.classList.remove('hidden');
                targetView.classList.add('active-view');
            }

            let newTitle = 'Bảng điều khiển';
            switch (this.dataset.view) {
                case 'orders':
                    newTitle = 'Đơn hàng hiện có';
                    renderOrders();
                    break;
                case 'inventory':
                    newTitle = 'Quản lý kho sản phẩm';
                    renderInventory();
                    break;
                case 'reports':
                    newTitle = 'Báo cáo & Phân tích';
                    const reportData = calculateReportData();
                    updateReportSummary(reportData);
                    renderReport(reportData.completedOrders);
                    break;
            }
            pageTitle.textContent = newTitle;
        });
    });

    // ============================================
    // Nhóm 9: KHỞI TẠO BAN ĐẦU
    // ============================================
    
    // Nhóm 9: Render dữ liệu ban đầu khi trang load
    renderOrders();
    const initialReportData = calculateReportData();
    updateReportSummary(initialReportData);
    
    const currentView = document.querySelector('.admin-view.active-view');
    if (currentView && currentView.id === 'view-inventory') {
        renderInventory();
    }
});