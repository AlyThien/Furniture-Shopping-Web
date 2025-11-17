document.addEventListener('DOMContentLoaded', () => {
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

    function formatDate(dateString) {
        if (!dateString) return '';
        try {
            const [year, month, day] = dateString.split('-');
            return `${day}/${month}/${year}`;
        } catch (error) {
            return dateString;
        }
    }

    function formatCurrency(number) {
        if (typeof number !== 'number') return '0đ';
        return number.toLocaleString('vi-VN') + 'đ';
    }

    // Hàm chuyển chuỗi tiền tệ về số
    function currencyToNumber(currencyString) {
        if (typeof currencyString !== 'string') return 0;
        let cleanedString = currencyString.replace(/đ/g, '').trim();
        cleanedString = cleanedString.replace(/\./g, '');
        cleanedString = cleanedString.replace(/,/g, '');
        return parseInt(cleanedString) || 0;
    }

    // Hàm tính tổng tiền
    function calculateOrderTotal(items) {
        let total = 0;
        items.forEach(item => {
            const product = mockInventory.find(p => p.name === item.name);
            const price = product ? product.price : currencyToNumber(item.price); // Dùng giá mới nhất nếu tìm thấy
            const qty = parseInt(item.qty) || 0;
            total += price * qty;
        });
        return total;
    }

    // --- DỮ LIỆU KHO HÀNG (Dùng làm cơ sở tính giá) ---
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
    
    // --- DỮ LIỆU ĐƠN HÀNG ---
    let mockOrders = [
        { id: '1007', customer: 'Nguyễn Trọng An', date: '2025-11-26', status: 'pending', phone: '0901 234 567', address: '25 Lô A, Đường Số 10, Quận 7, TP.HCM', payment: 'Chuyển khoản Ngân hàng', items: [{ name: 'Cloud Couch', qty: 1 }] },
        { id: '1006', customer: 'Lê Thị Mỹ Hạnh', date: '2025-11-21', status: 'shipped', phone: '0902 987 654', address: '123/45 Đường Quang Trung, Gò Vấp, TP.HCM', payment: 'Thanh toán khi nhận hàng (COD)', items: [{ name: 'Bàn Ăn Zenith', qty: 1 }] },
        { id: '1005', customer: 'Trần Văn Quang', date: '2025-11-17', status: 'success', phone: '0903 111 222', address: 'Lầu 5, Tòa nhà Central Park, Hà Nội', payment: 'Thẻ tín dụng', items: [{ name: 'Tủ Quần Áo HDF', qty: 1 }, { name: 'Ghế Thư Giãn', qty: 1 }] }, 
        { id: '1004', customer: 'Jessica M. Chen', date: '2025-11-12', status: 'success', phone: '+84 908 555 333', address: 'Apartment 102, 12 Sương Nguyệt Ánh, Q.1', payment: 'PayPal', items: [{ name: 'Wave Couch', qty: 2 }, { name: 'Bàn Trà Mặt Đá', qty: 1 }] }, 
        { id: '1003', customer: 'Phạm Hồng Nhung', date: '2025-11-10', status: 'cancelled', phone: '0987 654 321', address: 'Khu đô thị Sala, Quận 2, TP.HCM', payment: 'Chuyển khoản', items: [{ name: 'Cotton Candi Couch', qty: 1 }] },
        { id: '1002', customer: 'David K. Johnson', date: '2025-11-09', status: 'success', phone: '+84 919 444 000', address: '100 Bà Triệu, Hà Nội', payment: 'Chuyển khoản', items: [{ name: 'Saphire Couch', qty: 2 }, { name: 'Kệ TV Gỗ Sồi', qty: 1 }] },
        { id: '1001', customer: 'Hoàng Đình Phú', date: '2025-11-08', status: 'success', phone: '0978 999 888', address: '456 Trường Chinh, Q.Tân Bình, TP.HCM', payment: 'COD', items: [{ name: 'Haven Couch', qty: 1 }, { name: 'Wave Couch', qty: 2 }] }, 
    ];

    // Hàm hiển thị dữ liệu
    function renderOrders(orders = mockOrders) {
        const ordersBody = document.getElementById('orders-body');
        if (!ordersBody) return;
        ordersBody.innerHTML = '';

        orders.forEach(order => {
            // Tính tổng tiền dựa trên giá mới nhất
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

    // Thêm, xóa, sửa sản phẩm
    const addProdBtn = document.getElementById('addProdBtn');
    const prodModalOverlay = document.getElementById('product-modal-overlay');
    const prodModalCloseBtns = prodModalOverlay ? prodModalOverlay.querySelectorAll('.close-btn, .btn-close-modal') : [];
    const prodForm = document.getElementById('product-form');
    const saveProdBtn = document.getElementById('save-prod-btn');
    const prodIdInput = document.getElementById('prod-id');


    // Mở modal Thêm/Sửa
    if (addProdBtn) {
        addProdBtn.addEventListener('click', () => {
            prodForm.reset();
            document.getElementById('modal-prod-title').textContent = 'Thêm Sản phẩm mới';
            prodIdInput.value = 'Tự động tạo';
            prodIdInput.readOnly = true;
            saveProdBtn.textContent = 'Thêm Sản phẩm';
            saveProdBtn.dataset.mode = 'add'; // Thiết lập chế độ: THÊM MỚI
            prodModalOverlay.classList.remove('hidden');
        });
    }

    // Đóng modal 
    prodModalCloseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            prodModalOverlay.classList.add('hidden');
        });
    });

    // Sự kiện cho sửa / xóa trong kho 
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

    // Chỉnh sửa sản phẩm
    function handleEditProduct(prodId) {
        const product = mockInventory.find(p => p.id === prodId);
        if (!product) {
            alert('Không tìm thấy sản phẩm!');
            return;
        }

        // 1. Điền dữ liệu vào Modal
        document.getElementById('modal-prod-title').textContent = 'Chỉnh sửa Sản phẩm';
        prodIdInput.value = product.id;
        prodIdInput.readOnly = true;
        document.getElementById('prod-name').value = product.name;
        document.getElementById('prod-stock').value = product.stock;
        document.getElementById('prod-price').value = product.price;

        // 2. Cập nhật nút Lưu
        saveProdBtn.textContent = 'Lưu thay đổi';
        saveProdBtn.dataset.mode = 'edit'; // Thiết lập chế độ: SỬA
        saveProdBtn.dataset.currentId = product.id; // Lưu ID sản phẩm đang sửa

        // 3. Mở Modal
        prodModalOverlay.classList.remove('hidden');
    }

    // Xoá sản phẩm
    function handleDeleteProduct(prodId) {
        if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm ${prodId} này không?`)) {
            const initialLength = mockInventory.length;
            mockInventory = mockInventory.filter(p => p.id !== prodId);

            if (mockInventory.length < initialLength) {
                alert(`Đã xóa sản phẩm ${prodId} thành công.`);
                renderInventory(); // Render lại bảng
            } else {
                alert('Không tìm thấy sản phẩm để xóa.');
            }
        }
    }


    // Xử lý lưu thêm / sửa sản phẩm
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
                // Logic Thêm mới
                const newProd = {
                    id: 'SP' + (mockInventory.length + 1).toString().padStart(3, '0'),
                    name: nameInput,
                    stock: stock,
                    price: price,
                };
                mockInventory.push(newProd);
                alert(`Đã thêm sản phẩm "${newProd.name}" thành công!`);

            } else if (mode === 'edit' && currentId) {
                // Logic CHỈNH SỬA
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

            renderInventory(); // Cập nhật lại danh sách
            prodModalOverlay.classList.add('hidden');
        });
    }

    // Xử lý tìm kiếm kho hàng
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

    // Báo cáo, thống kê
    function calculateReportData() {
        // Chỉ tính toán trên các đơn hàng HOÀN THÀNH
        const completedOrders = mockOrders.filter(o => o.status === 'success');

        // Tính tổng doanh thu
        let totalRevenue = completedOrders.reduce((sum, order) => {
            // TÍNH TOÁN LẠI TỔNG TIỀN DỰA TRÊN GIÁ MỚI NHẤT
            const totalNum = calculateOrderTotal(order.items);
            return sum + totalNum;
        }, 0);

        const orderCount = completedOrders.length;

        // Tìm sản phẩm bán chạy nhất
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

    function updateReportSummary(data) {
        document.getElementById('summary-revenue').textContent = formatCurrency(data.totalRevenue);
        document.getElementById('summary-orders').textContent = data.orderCount;
        document.getElementById('summary-best-seller').textContent = data.bestSeller;
    }

    function renderReport(completedOrders) {
        const reportsBody = document.getElementById('reports-body');
        if (!reportsBody) return;

        reportsBody.innerHTML = completedOrders.map(order => {
            const itemNames = order.items.map(item => item.name).join(', ');
            // Tính tổng tiền dựa trên giá mới nhất
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

    // Xử lý nút "Xem báo cáo"
    document.getElementById('btn-run-report').addEventListener('click', () => {
        const reportData = calculateReportData();
        updateReportSummary(reportData);
        renderReport(reportData.completedOrders);
    });


    const modalOverlay = document.getElementById('order-detail-modal');
    const closeModalBtn = modalOverlay ? modalOverlay.querySelector('.close-btn') : null;
    const ordersBody = document.getElementById('orders-body');


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

        // Dữ liệu khách hàng và tóm tắt đơn hàng
        document.getElementById('modal-order-id').textContent = `#${order.id}`;
        document.getElementById('detail-customer').textContent = order.customer;
        document.getElementById('detail-phone').textContent = order.phone;
        document.getElementById('detail-address').textContent = order.address;
        document.getElementById('detail-date').textContent = formattedDate;
        document.getElementById('detail-payment').textContent = order.payment;
        document.getElementById('detail-total-value').textContent = formatCurrency(calculatedTotal);

        // Cập nhật trạng thái
        const detailStatusSpan = document.getElementById('detail-status');
        detailStatusSpan.textContent = statusVi;
        detailStatusSpan.className = `badge ${statusClass}`;

        // Điền danh sách sản phẩm (Chi tiết)
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

        // Cập nhật nút hành động dựa trên trạng thái
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
            // success, cancelled
            btnUpdate.style.display = 'none';
            btnCancel.style.display = 'none';
        }

        modalOverlay.classList.remove('hidden');
    }

    // Mở Modal Chi tiết Đơn hàng
    if (ordersBody) {
        ordersBody.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-detail')) {
                const orderId = e.target.dataset.orderId;
                populateModal(orderId);
            }
        });
    }

    // Đóng Modal (Nút X)
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modalOverlay.classList.add('hidden');
        });
    }

    // Đóng Modal khi click ra ngoài
    if (modalOverlay) {
        window.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.add('hidden');
            }
        });
    }

    // Xử lý nút "Cập nhật Trạng thái" trong Modal
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

    // Xử lý nút "Hủy Đơn" trong Modal
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


    // Xử lý nút "Làm mới"
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

    // Xử lý nút "Đăng xuất"
    document.getElementById('logoutBtn').addEventListener('click', () => {
        alert("Đăng xuất thành công!");
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        window.location.href = 'login.html';
    });

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

    // Khởi tạo ban đầu
    renderOrders(); // Tải Đơn hàng ban đầu
    const initialReportData = calculateReportData();
    updateReportSummary(initialReportData); // Cập nhật Summary Report ban đầu
    
    const currentView = document.querySelector('.admin-view.active-view');
    if (currentView && currentView.id === 'view-inventory') {
        renderInventory();
    }
});
