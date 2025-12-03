//Nhóm 9: Chi tiết đơn hàng 
class OrderDetailPage {
    // Khởi tạo
    constructor() {
        this.init();
        // Hiển thị thông tin khách hàng
        this.displayCustomerInfo();
        // Hiển thị thông tin sản phẩm
        this.displayProductInfo();
    }

    // Khởi tạo event listeners
    init() {
        // Gắn listener cho các nút bấm
        const contactSellerBtn = document.getElementById('contactSellerBtn');
        const buyAgainBtn = document.getElementById('buyAgainBtn');
        // contact --> gửi email liên hệ
        if (contactSellerBtn) {
            contactSellerBtn.addEventListener('click', () => this.handleContactSeller());
        }
        // buy again --> chuyển đến trang wishlist
        if (buyAgainBtn) {
            buyAgainBtn.addEventListener('click', () => { window.location.href = 'wishlist_index.html';});
        }
    }

    // Hiển thị thông tin khách hàng từ localStorage
    displayCustomerInfo() {
        // Lấy dữ liệu từ localStorage
        const savedInfo = localStorage.getItem('customerInfo');

        // Log console
        console.log('\n' + '='.repeat(50));
        console.log('ORDER VIEW - CUSTOMER INFORMATION');
        console.log('='.repeat(50));

        if (savedInfo) {
            try {
                const customerData = JSON.parse(savedInfo);

                // Hiển thị thông tin trong console
                const customerTable = {
                    'name': customerData.name,
                    'surname': customerData.surname,
                    'email': customerData.email,
                    'phone': customerData.phone,
                    'country': customerData.country,
                    'address': customerData.address,
                    'city': customerData.city,
                    'province': customerData.province,
                    'payment': customerData.payment === 'cod' ? 'Cash on Delivery (COD)' : 'Bank Transfer',
                    'timestamp': new Date(customerData.timestamp).toLocaleString('vi-VN')
                };

                // Cập nhật giao diện - Delivery Address Section
                this.updateDeliveryAddress(customerData);

                // Cập nhật phương thức thanh toán
                this.updatePaymentMethod(customerData);

                // Cập nhật thời gian đặt hàng
                this.updateOrderTime(customerData);

                // Cập nhật Payment Status
                this.updatePaymentStatus(customerData);

                console.log('✅ Đã cập nhật thông tin lên giao diện');

            } catch (error) {
                console.error('❌ Lỗi khi đọc thông tin khách hàng:', error);
            }
        } else {
            console.warn('❗️ Không tìm thấy thông tin khách hàng trong localStorage');
            console.log('   Vui lòng điền thông tin tại trang thanh toán trước.');
            console.log('='.repeat(50) + '\n');
        }
    }

    // updateDeliveryAddress(customerData) - Cập nhật địa chỉ giao hàng
    updateDeliveryAddress(customerData) {
        const addressNameEl = document.querySelector('.address-name');
        const addressPhoneEl = document.querySelector('.address-phone');
        const addressDetailEl = document.querySelector('.address-detail');

        if (addressNameEl) {
            addressNameEl.textContent = `${customerData.name} ${customerData.surname}`;
        }

        if (addressPhoneEl) {
            addressPhoneEl.textContent = customerData.phone;
        }

        if (addressDetailEl) {
            // Tạo địa chỉ đầy đủ từ các trường
            const fullAddress = [
                customerData.address,
                customerData.city,
                customerData.province
            ].filter(item => item && item.trim()).join(', ');

            addressDetailEl.textContent = fullAddress || customerData.address;
        }
    }

     // updatePaymentMethod(customerData) - Cập nhật phương thức thanh toán
    updatePaymentMethod(customerData) {
        const paymentMethodEl = document.querySelector(
            '.payment-shipping-grid .info-card:first-child .info-value'
        );
    
        if (paymentMethodEl) {
            paymentMethodEl.innerHTML = ""; // clear old content
    
            const icon = document.createElement("span");
            const text = document.createElement("span");
    
            if (customerData.payment === "cod") {
                icon.className = "cod-icon";
                text.textContent = "Cash on Delivery (COD)";
            } else {
                icon.className = "atm-icon";
                text.textContent = "Bank Transfer (VietQR)";
            }
    
            paymentMethodEl.appendChild(icon);
            paymentMethodEl.appendChild(text);
        }
    }
    // updateOrderTime(customerData) - Cập nhật thời gian đặt hàng
    updateOrderTime(customerData) {
        const orderTimeElements = document.querySelectorAll('.info-card .info-value');

        // Tìm phần tử có chứa "ORDER TIME" ở nhãn
        const infoCards = document.querySelectorAll('.info-card');

        infoCards.forEach(card => {
            const label = card.querySelector('.info-label');
            const value = card.querySelector('.info-value');

            if (label && label.textContent.includes('ORDER TIME') && value) {
                const orderDate = new Date(customerData.timestamp);
                value.textContent = orderDate.toLocaleString('vi-VN');
            }
        });
    }

    // updatePaymentStatus(customerData) - Cập nhật trạng thái thanh toán
    updatePaymentStatus(customerData) {
        // Tìm element chứa PAYMENT STATUS
        const infoCards = document.querySelectorAll('.info-card');
        
        infoCards.forEach(card => {
            const label = card.querySelector('.info-label');
            const value = card.querySelector('.info-value');
            
            if (label && label.textContent.includes('PAYMENT STATUS') && value) {
                if (customerData.payment === 'bank') {
                    // Bank transfer -> Paid
                    value.textContent = 'Paid';
                    value.style.color = '#1D382C'; 
                    value.style.fontWeight = '600';
                    console.log('Payment Status: Paid (Bank Transfer)');
                } else if (customerData.payment === 'cod') {
                    // COD -> Not Paid
                    value.textContent = 'Not Paid';
                    value.style.color = '#FF0000'; 
                    value.style.fontWeight = '600';
                    console.log('Payment Status: Not Paid (COD)');
                }
            }
        });
    }
    //handleContactSeller - Liên hệ người bán qua email
    handleContactSeller() {
        const email = 'support@noithatmaistudio.com';
        const subject = 'Product Inquiry';
        const body = 'I have a question about your products.';

        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;

        console.log('📧 Mở email client để liên hệ');
    }

    //displayProductInfo() - Hiển thị thông tin sản phẩm từ localStorage
    displayProductInfo() {
        const cartData = localStorage.getItem('cartProducts');
        
        console.log('\n' + '='.repeat(50));
        console.log('ORDER VIEW - PRODUCT INFORMATION');
        console.log('='.repeat(50));
        
        if (cartData) {
            try {
                const products = JSON.parse(cartData);
                
                console.log('✅ Đã tìm thấy thông tin sản phẩm:\n');
                console.table(products);
                
                console.log('\nCHI TIẾT SẢN PHẨM:');
                products.forEach((product, index) => {
                    console.log(`\nSản phẩm ${index + 1}:`);
                    console.log(`     Tên: ${product.name}`);
                    console.log(`     Màu sắc: ${product.selectedColor ? product.selectedColor.name : 'Chưa chọn'}`);
                    console.log(`     Hình ảnh: ${product.selectedColor ? product.selectedColor.image : product.image}`);
                    console.log(`     Số lượng: ${product.quantity}`);
                    console.log(`     Giá: ${product.price.toLocaleString('vi-VN')} VND`);
                    console.log(`     Thành tiền: ${(product.price * product.quantity).toLocaleString('vi-VN')} VND`);
                    if (product.dimensions) {
                        console.log(` Kích thước: ${product.dimensions}`);
                    }
                    if (product.materials) {
                        console.log(`  Chất liệu: ${product.materials}`);
                    }
                });
                
                // Tính toán tổng tiền
                const subtotal = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
                const tax = Math.round(subtotal * 0.05); // 5% thuế
                const total = subtotal + tax;
                
                console.log(`\n💰 TỔNG TIỀN:`);
                console.log(`   Subtotal: ${subtotal.toLocaleString('vi-VN')} VND`);
                console.log(`   Tax (10%): ${tax.toLocaleString('vi-VN')} VND`);
                console.log(`   Total: ${total.toLocaleString('vi-VN')} VND`);
                
                console.log('\n' + '='.repeat(50) + '\n');
                
                //updateProductDisplay(products) - Cập nhật giao diện với thông tin sản phẩm
                this.updateProductDisplay(products);
                
                console.log('✅ Đã cập nhật thông tin sản phẩm lên giao diện');
                
            } catch (error) {
                console.error('❌ Lỗi khi đọc thông tin sản phẩm:', error);
            }
        } else {
            console.warn('❗ Không tìm thấy thông tin sản phẩm trong giỏ hàng');
            console.log('='.repeat(50) + '\n');
        }
    }

    // updateProductDisplay(products) - Cập nhật giao diện với thông tin sản phẩm
    updateProductDisplay(products) {
        if (products.length === 0) return;
        
        const firstProduct = products[0];
        
        console.log('🔄 Bắt đầu cập nhật giao diện web...');
        
        // 1.CẬP NHẬT HÌNH ẢNH SẢN PHẨM - class="product-image"
        const productImageEl = document.querySelector('.product-image');
        if (productImageEl) {
            // Ưu tiên: Hình của màu đã chọn > Hình mặc định từ product
            if (firstProduct.selectedColor && firstProduct.selectedColor.image) {
                productImageEl.src = firstProduct.selectedColor.image;
                console.log(`✅ Đã cập nhật hình ảnh sản phẩm (màu ${firstProduct.selectedColor.name}): ${firstProduct.selectedColor.image}`);
            } else if (firstProduct.image) {
                // Nếu không có màu được chọn, dùng hình mặc định
                productImageEl.src = firstProduct.image;
                console.log(`✅ Đã cập nhật hình ảnh sản phẩm (mặc định): ${firstProduct.image}`);
            } else {
                console.warn('❗ Không có hình ảnh để hiển thị');
            }
        } else {
            console.warn('❗Không tìm thấy element .product-image');
        }
        
        //2.CẬP NHẬT TÊN SẢN PHẨM - class="product-name"
        const productNameEl = document.querySelector('.product-name');
        if (productNameEl) {
            productNameEl.textContent = firstProduct.name;
            console.log(`✅ Đã cập nhật tên sản phẩm: ${firstProduct.name}`);
        } else {
            console.warn('❗Không tìm thấy element .product-name');
        }
        
        //3. CẬP NHẬT MÀU SẮC VÀ SỐ LƯỢNG - class="product-specs"
        const colorText = firstProduct.selectedColor ? firstProduct.selectedColor.name : 'Not selected';
        const colorQuantityText = `Color: ${colorText} | Quantity: ${firstProduct.quantity}`;
        
        const productSpecsEl = document.querySelector('.product-specs');
        if (productSpecsEl) {
            productSpecsEl.textContent = colorQuantityText;
            console.log(`✅ Đã cập nhật màu sắc và số lượng: ${colorQuantityText}`);
        } else {
            console.warn('❗Không tìm thấy element .product-specs');
        }
        
        //4.CẬP NHẬT GIÁ SẢN PHẨM - class="product-price"
        const itemTotal = firstProduct.price * firstProduct.quantity;
        const formattedPrice = itemTotal.toLocaleString('vi-VN') + ' VND';
        
        const productPriceEl = document.querySelector('.product-price');
        if (productPriceEl) {
            productPriceEl.textContent = formattedPrice;
            console.log(`✅ Đã cập nhật giá sản phẩm: ${formattedPrice}`);
        } else {
            console.warn('❗Không tìm thấy element .product-price');
        }
        
        //5.CẬP NHẬT TỔNG TIỀN (Subtotal, Taxes, Total)
        this.updateOrderTotal(products);
    }

    //updateOrderTotal(products) - Cập nhật tổng tiền
    updateOrderTotal(products) {
        const subtotal = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
        const tax = Math.round(subtotal * 0.05); // 5% thuế
        const total = subtotal + tax;
        
        console.log('🔄 Cập nhật tổng tiền...');
        console.log(`   Subtotal: ${subtotal.toLocaleString('vi-VN')} VND`);
        console.log(`   Tax: ${tax.toLocaleString('vi-VN')} VND`);
        console.log(`   Total: ${total.toLocaleString('vi-VN')} VND`);
        
        // Tìm tất cả .price-row trong .price-summary
        const priceRows = document.querySelectorAll('.price-summary .price-row');
        
        priceRows.forEach(row => {
            const spans = row.querySelectorAll('span');
            if (spans.length === 2) {
                const label = spans[0].textContent.trim();
                const valueEl = spans[1];
                
                if (label === 'Subtotal') {
                    valueEl.textContent = subtotal.toLocaleString('vi-VN') + ' VND';
                    console.log(`✅ Cập nhật Subtotal: ${subtotal.toLocaleString('vi-VN')} VND`);
                } else if (label === 'Taxes') {
                    valueEl.textContent = tax.toLocaleString('vi-VN') + ' VND';
                    console.log(`✅ Cập nhật Taxes: ${tax.toLocaleString('vi-VN')} VND`);
                } else if (label === 'Total') {
                    valueEl.textContent = total.toLocaleString('vi-VN') + ' VND';
                    console.log(`✅ Cập nhật Total: ${total.toLocaleString('vi-VN')} VND`);
                }
            }
        });
        
        console.log('✅ Đã cập nhật tất cả giá trị lên giao diện web');
    }
}

//Nhóm 9: Khởi tạo khi trang load xong
document.addEventListener('DOMContentLoaded', function() {
    window.orderDetailPage = new OrderDetailPage();
    console.log('✅ Order Detail Page đã khởi tạo');
});
