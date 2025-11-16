document.addEventListener('DOMContentLoaded', () => {

    function getStatusClass(statusEn) {
        switch (statusEn) {
            case 'success':
                return 'status-success';
            case 'shipped':
                return 'status-shipped';
            case 'pending':
                return 'status-pending';
            case 'cancelled':
                return 'status-cancelled';
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
        if (typeof number !== 'number') return number;
        return number.toLocaleString('vi-VN') + 'đ';
    }
    
    // Hàm chuyển chuỗi tiền tệ về số
    function currencyToNumber(currencyString) {
        if (typeof currencyString !== 'string') return 0;
        // 1. Loại bỏ ký tự 'đ' và khoảng trắng
        let cleanedString = currencyString.replace(/đ/g, '').trim();  
        // 2. Loại bỏ dấu phân cách hàng nghìn (dấu chấm hoặc dấu phẩy)
        cleanedString = cleanedString.replace(/\./g, '');
        cleanedString = cleanedString.replace(/,/g, '');      
        // 3. Chuyển thành số nguyên
        return parseInt(cleanedString) || 0;
    }

    // --- MÔ PHỎNG DỮ LIỆU KHO HÀNG ---
    let mockInventory = [
        { id: 'SP001', name: 'Cloud Couch', stock: 15, price: 5400000 },
        { id: 'SP002', name: 'Wave Couch', stock: 8, price: 5400000 },
        { id: 'SP003', name: 'Cotton Candy Couch', stock: 20, price: 3900000 },
        { id: 'SP004', name: 'Bàn Ăn Zenith', stock: 5, price: 12990000 },
        { id: 'SP005', name: 'Bàn Trà Mặt Đá', stock: 25, price: 2800000 },
        { id: 'SP006', name: 'Tủ Quần Áo HDF', stock: 12, price: 9200000 },
        { id: 'SP007', name: 'Ghế Thư Giãn', stock: 35, price: 1800000 },
        { id: 'SP008', name: 'Kệ TV Gỗ Sồi', stock: 10, price: 4500000 },
    ];

    // --- MÔ PHỎNG DỮ LIỆU ĐƠN HÀNG ---
    const mockOrders = [
        { id: '1001', customer: 'Nguyễn Trọng An', date: '2025-11-13', total: formatCurrency(5400000), status: 'pending', phone: '0901 234 567', address: '25 Lô A, Đường Số 10, Quận 7, TP.HCM', payment: 'Chuyển khoản Ngân hàng', items: [{ name: 'Cloud Couch', qty: 1, price: formatCurrency(5400000), subtotal: formatCurrency(5400000) }] },
        { id: '1002', customer: 'Lê Thị Mỹ Hạnh', date: '2025-11-12', total: formatCurrency(12990000), status: 'shipped', phone: '0902 987 654', address: '123/45 Đường Quang Trung, Gò Vấp, TP.HCM', payment: 'Thanh toán khi nhận hàng (COD)', items: [{ name: 'Bàn Ăn Phong Cách Ý', qty: 1, price: formatCurrency(12990000), subtotal: formatCurrency(12990000) }] },
        { id: '1003', customer: 'Trần Văn Quang', date: '2025-11-12', total: formatCurrency(7500000), status: 'success', phone: '0903 111 222', address: 'Lầu 5, Tòa nhà Central Park, Hà Nội', payment: 'Thẻ tín dụng', items: [{ name: 'Tủ Quần Áo HDF', qty: 1, price: formatCurrency(7500000), subtotal: formatCurrency(7500000) }] },
        { id: '1004', customer: 'Jessica M. Chen', date: '2025-11-11', total: formatCurrency(15800000), status: 'success', phone: '+84 908 555 333', address: 'Apartment 102, 12 Sương Nguyệt Ánh, Q.1', payment: 'PayPal', items: [{ name: 'Wave Couch', qty: 2, price: formatCurrency(5400000), subtotal: formatCurrency(10800000) }, { name: 'Bàn Trà Mặt Đá', qty: 1, price: formatCurrency(5000000), subtotal: formatCurrency(5000000) }] },
        { id: '1005', customer: 'Phạm Hồng Nhung', date: '2025-11-10', total: formatCurrency(3900000), status: 'cancelled', phone: '0987 654 321', address: 'Khu đô thị Sala, Quận 2, TP.HCM', payment: 'Chuyển khoản', items: [{ name: 'Cotton Candy Couch', qty: 1, price: formatCurrency(3900000), subtotal: formatCurrency(3900000) }] },
        { id: '1006', customer: 'David K. Johnson', date: '2025-11-09', total: formatCurrency(28500000), status: 'success', phone: '+84 919 444 000', address: '100 Bà Triệu, Hà Nội', payment: 'Chuyển khoản', items: [{ name: 'Bàn Ăn Zenith', qty: 2, price: formatCurrency(14250000), subtotal: formatCurrency(28500000) }] },
        { id: '1007', customer: 'Hoàng Đình Phú', date: '2025-11-08', total: formatCurrency(9700000), status: 'success', phone: '0978 999 888', address: '456 Trường Chinh, Q.Tân Bình, TP.HCM', payment: 'COD', items: [{ name: 'Ghế Thư Giãn', qty: 1, price: formatCurrency(9700000), subtotal: formatCurrency(9700000) }] },
    ];

    // Render dữ liệu trong trang
    function renderOrders(orders = mockOrders) {
        const ordersBody = document.getElementById('orders-body');
        if (!ordersBody) return;
        ordersBody.innerHTML = '';

        orders.forEach(order => {
            const statusClass = getStatusClass(order.status);
            const statusVi = translateStatus(order.status);
            const formattedDate = formatDate(order.date);

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.customer}</td>
                <td>${formattedDate}</td>
                <td>${order.total}</td>
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

    // Xử lý báo cáo
    function calculateReportData() {
        const completedOrders = mockOrders.filter(o => o.status === 'success');
        
        // Tính tổng doanh thu
        let totalRevenue = completedOrders.reduce((sum, order) => {
            const totalNum = currencyToNumber(order.total);
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
        
        const couchProducts = Object.keys(itemSales).filter(name => name.toLowerCase().includes('couch'));
        if (couchProducts.length > 0) {
            couchProducts.forEach(name => {
                if (itemSales[name] > maxQty) {
                    maxQty = itemSales[name];
                    bestSeller = name;
                }
            });
        }
        
        if (bestSeller === 'N/A') {
             for (const name in itemSales) {
                if (itemSales[name] > maxQty) {
                    maxQty = itemSales[name];
                    bestSeller = name;
                }
            }
        }
        
        if (bestSeller === 'N/A' && couchProducts.length > 0) {
             bestSeller = couchProducts[0];
        } else if (bestSeller === 'N/A' && Object.keys(itemSales).length > 0) {
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
            
            return `
                <tr>
                    <td>${formatDate(order.date)}</td>
                    <td style="text-align:left;">
                        <strong>ĐH #${order.id}</strong><br>
                        <small>SP: ${itemNames}</small>
                    </td>
                    <td>${order.customer}</td>
                    <td>${order.total}</td>
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
    
    const addProdBtn = document.getElementById('addProdBtn');
    const prodModalOverlay = document.getElementById('product-modal-overlay');
    const prodModalCloseBtns = prodModalOverlay ? prodModalOverlay.querySelectorAll('.close-btn, .btn-close-modal') : [];
    const prodForm = document.getElementById('product-form');

    // Mở modal Thêm/Sửa
    if (addProdBtn) {
        addProdBtn.addEventListener('click', () => {
            prodForm.reset();
            document.getElementById('modal-prod-title').textContent = 'Thêm Sản phẩm mới';
            document.getElementById('prod-id').value = 'Tự động tạo';
            document.getElementById('prod-id').readOnly = true;
            document.getElementById('save-prod-btn').textContent = 'Thêm Sản phẩm';
            document.getElementById('save-prod-btn').dataset.mode = 'add';
            prodModalOverlay.classList.remove('hidden');
        });
    }


    // Đóng modal (sử dụng close-btn và nút Hủy trong modal-footer)
    prodModalCloseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            prodModalOverlay.classList.add('hidden');
        });
    });

    // Xử lý lưu (Thêm mới)
    if (prodForm) {
        prodForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('prod-name').value.trim();
            const stockInput = document.getElementById('prod-stock').value;
            const priceInput = document.getElementById('prod-price').value;
            
            const newProd = {
                id: 'SP' + (mockInventory.length + 1).toString().padStart(3, '0'),
                name: nameInput,
                stock: parseInt(stockInput),
                price: parseInt(priceInput),
            };

            if (nameInput && !isNaN(newProd.stock) && newProd.stock >= 0 && !isNaN(newProd.price) && newProd.price > 0) {
                mockInventory.push(newProd);
                renderInventory();
                prodModalOverlay.classList.add('hidden');
                alert(`Đã thêm sản phẩm "${newProd.name}" thành công!`);
            } else {
                alert('Vui lòng nhập đầy đủ và chính xác thông tin sản phẩm (Số lượng >= 0, Giá > 0).');
            }
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

    const modalOverlay = document.getElementById('order-detail-modal');
    const closeModalBtn = modalOverlay ? modalOverlay.querySelector('.close-btn') : null; 
    const ordersBody = document.getElementById('orders-body');

    function populateModal(orderId) {
        const order = mockOrders.find(o => o.id === orderId);
        if (!order) {
            console.error("Không tìm thấy đơn hàng với ID:", orderId);
            return;
        }

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
        document.getElementById('detail-total-value').textContent = order.total;

        // Cập nhật trạng thái
        const detailStatusSpan = document.getElementById('detail-status');
        detailStatusSpan.textContent = statusVi;
        detailStatusSpan.className = `badge ${statusClass}`;

        // Điền danh sách sản phẩm (Chi tiết)
        const itemsBody = document.getElementById('detail-items-body');
        itemsBody.innerHTML = order.items.map(item => `
            <tr>
                <td style="text-align:left;">${item.name}</td>
                <td>${item.qty}</td>
                <td>${item.price}</td>
                <td>${item.subtotal}</td>
            </tr>
        `).join('');

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

    // Mở Modal
    if (ordersBody) {
        ordersBody.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-detail')) {
                const orderId = e.target.dataset.orderId;
                populateModal(orderId);
            }
        });
    }

    // Đóng Modal
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

    renderOrders(); // Tải Đơn hàng ban đầu
    const initialReportData = calculateReportData();
    updateReportSummary(initialReportData); // Cập nhật Summary Report ban đầu

});
