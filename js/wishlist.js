//Nhóm 9: Giỏ hàng Wishlist 
class Wishlist {
  //Khởi tạo 
  constructor() {
    this.wishlist = [];
    this.init();
  }

  //init() - Khởi tạo hệ thống 
  init() {
    // Load sản phẩm từ bảng HTML  
    this.loadWishlist();
    // Gắn event listeners cho các tương tác giỏ hàng ( color, quantity, ...)
    this.attachEventListeners();
    // Lưu dữ liệu ban đầu vào localStorage
    this.saveCartToLocalStorage();
  }

  //loadWishlist() - Đọc sản phẩm từ HTML table
  loadWishlist() {
    // Tìm bảng wishlist
    const table = document.getElementById('wishlist');
    if (!table) return;

    const rows = table.querySelectorAll('tbody tr');
    // Duyệt qua từng row để lấy thông tin sản phẩm
    rows.forEach((row, index) => {
      const priceCell = row.querySelector('.price-cell');
      const quantityDropdown = row.querySelector('.quantity-dropdown');

      if (!priceCell || !quantityDropdown) return;
      //Tạo thông tin sản phẩmv(object)
      const product = {
        index: index,
        name: row.querySelector('.product-text strong')?.textContent || 'Unknown Product',
        image: row.querySelector('.product-image')?.src || '',
        dimensions: this.getDimensions(row),
        materials: this.getMaterials(row),
        price: this.parsePrice(priceCell.textContent),
        quantity: parseInt(quantityDropdown.value) || 1,
        selectedColor: null,
        colors: this.loadColors(row),
        row: row
      };
      //Lưu vào mảng wishlist
      this.wishlist.push(product);
    });
  }

  //getDimensions(row) - Lấy thông tin kích thước sản phẩm từ HTML --> lưu vô object
  getDimensions(row) {
    const specs = row.querySelectorAll('.product-specs p');
    for (let i = 0; i < specs.length; i++) {
      if (specs[i].textContent === 'DIMENSIONS' && specs[i + 1]) {
        return specs[i + 1].textContent;
      }
    }
    return '';
  }

  //getMaterials(row) - Lấy thông tin chất liệu sản phẩm từ HTML --> lưu vô object
  getMaterials(row) {
    const specs = row.querySelectorAll('.product-specs p');
    for (let i = 0; i < specs.length; i++) {
      if (specs[i].textContent === 'MATERIALS' && specs[i + 1]) {
        return specs[i + 1].textContent;
      }
    }
    return '';
  }

  //loadColors(row) - Lấy thông tin màu sắc sản phẩm từ dropdown --> lưu vô object
  loadColors(row) {
    const colorOptions = row.querySelectorAll('.color-dropdown option');
    const colors = [];

    colorOptions.forEach((option) => {
      if (option.value === '') return; // Skip "Select Color"

      const colorName = option.textContent.trim();
      colors.push({
        name: colorName,
        code: this.getColorCode(colorName),
        image: this.getColorImage(colorName)
      });
    });

    return colors;
  }

  //getColorCode(colorName) - Chuyển tên màu thành mã màu
  getColorCode(colorName) {
    const colorMap = {
      'Brown': '#6B4423',
      'Navy': '#2C3E50',
      'Olive': '#6B7C3C',
      'Gray': '#95A5A6'
    };
    return colorMap[colorName] || '#000000';
  }

  //getColorImage(colorName) - Chuyển hình tương ứng theo màu 
  getColorImage(colorName) {
    // Map color names to images
    const imageMap = {
      'Brown': '../images/product-detail/13.png',
      'Navy': '../images/product-detail/12.png',
      'Olive': '../images/product-detail/11.png',
      'Gray': '../images/product-detail/10.png'
    };
    return imageMap[colorName] || 'images/product-detail/9.png';
  }

  //parsePrice(priceText) - Chuyển text giá thành số --> Tính toán
  parsePrice(priceText) {
    return parseInt(priceText.replace(/[^0-9]/g, ''));
  }

  //addProduct(product) - Thêm sản phẩm vào wishlist
  addProduct(product) {
    this.wishlist.push(product);
    this.updateTotal();
    // Lưu vào saveCartToLocalStorage() khi thêm sản phẩm
    this.saveCartToLocalStorage();
  }

  //removeProduct(rowIndex) - Xóa sản phẩm khỏi wishlist
  removeProduct(rowIndex) {
    const product = this.wishlist[rowIndex];
    if (!product) return;

    // Remove from array
    this.wishlist.splice(rowIndex, 1);

    // Remove row from DOM
    if (product.row) {
      product.row.remove();
    }

    // Re-index remaining products
    this.wishlist.forEach((item, idx) => {
      item.index = idx;
    });

    this.updateTotal();

    // Lưu khi xóa sản phẩm
    this.saveCartToLocalStorage();

    // Show empty message if no products
    if (this.wishlist.length === 0) {
      const table = document.getElementById('wishlist');
      const tbody = table.querySelector('tbody');
      tbody.innerHTML = `
        <tr>
          <td colspan="5" class="empty-message">
            Your wishlist is empty. Keep shopping to add products!
          </td>
        </tr>
      `;
    }
  }

  //updateQuantity(rowIndex, newQuantity) - Cập nhật số lượng sản phẩm
  updateQuantity(rowIndex, newQuantity) {
    const product = this.wishlist[rowIndex];
    if (product && newQuantity > 0) {
      product.quantity = parseInt(newQuantity);

      // Update item total in DOM
      const itemTotal = product.row.querySelector('.item-total');
      if (itemTotal) {
        itemTotal.textContent = this.formatPrice(product.price * product.quantity);
      }

      this.updateTotal();
      
      //Lưu khi thay đổi số lượng
      this.saveCartToLocalStorage();
      console.log(`Đã cập nhật số lượng: ${product.name} - Quantity: ${newQuantity}`);
    }
  }

  //updateColor(rowIndex, colorIndex) - Cập nhật màu sắc sản phẩm
  updateColor(rowIndex, colorIndex) {
    const product = this.wishlist[rowIndex];
    if (!product) return;

    product.selectedColor = colorIndex;

    const selectedColorData = product.colors[colorIndex];
    if (selectedColorData && selectedColorData.image) {
      const imgElement = product.row.querySelector('.product-image');

      if (imgElement) {
        imgElement.style.transition = 'opacity 0.3s ease';
        imgElement.style.opacity = '0.5';

        setTimeout(() => {
          imgElement.src = selectedColorData.image;
          imgElement.style.opacity = '1';
        }, 150);
      }
    }
    
    // Xoá error styling khi chọn màu
    const colorDropdown = product.row.querySelector('.color-dropdown');
    if (colorDropdown) {
      colorDropdown.style.border = '';
      colorDropdown.style.borderColor = '';
      
      // Xóa error message nếu có
      const errorMsg = product.row.querySelector('.color-error-message');
      if (errorMsg) {
        errorMsg.remove();
      }
    }
    
    //Lưu khi thay đổi màu sắc
    this.saveCartToLocalStorage();
    console.log(`Đã chọn màu "${selectedColorData?.name}" cho sản phẩm "${product.name}"`);
  }

  //calculateTotal() - Tính tổng tiền giỏ hàng
  calculateTotal() {
    return this.wishlist.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  //updateTotal() - Cập nhật hiển thị tổng tiền giỏ hàng
  updateTotal() {
    const totalElement = document.getElementById('wishlist-total');
    if (totalElement) {
      totalElement.textContent = this.formatPrice(this.calculateTotal());
    }
  }

  //formatPrice(price) - Định dạng số thành chuỗi tiền VND
  formatPrice(price) {
    return price.toLocaleString('vi-VN') + ' VND';
  }

  //validateColors() - Kiểm tra tất cả sản phẩm đã chọn màu chưa
  validateColors() {
    const invalidProducts = [];
    
    this.wishlist.forEach((product, index) => {
      if (product.selectedColor === null) {
        invalidProducts.push({
          index: index,
          name: product.name,
          row: product.row
        });
      }
    });
    
    return {
      isValid: invalidProducts.length === 0,
      invalidProducts: invalidProducts
    };
  }

  //showColorError(row) - Hiển thị error message cho dropdown màu
  showColorError(row) {
    const colorDropdown = row.querySelector('.color-dropdown');
    if (!colorDropdown) return;
    
    // Tô viền đỏ cho dropdown
    colorDropdown.style.border = '1px solid #ff0000';
    colorDropdown.style.borderColor = '#ff0000';
    
    // Kiểm tra xem đã có error message chưa
    let errorMsg = row.querySelector('.color-error-message');
    if (errorMsg) return; // Đã có rồi thì không tạo nữa
    
    // Tạo error message
    errorMsg = document.createElement('div');
    errorMsg.className = 'color-error-message';
    errorMsg.textContent = 'Please select a color';
    errorMsg.style.cssText = `
      color: #ff0000;
      font-size: 12px;
      margin-top: 4px;
      font-weight: 300;
    `;
    
    // Thêm error message sau dropdown
    const colorCell = colorDropdown.closest('td');
    if (colorCell) {
      colorCell.appendChild(errorMsg);
    }
    
    console.log('Error: Chưa chọn màu cho sản phẩm');
  }

  //clearAllColorErrors() - Xóa tất cả color error messages
  clearAllColorErrors() {
    this.wishlist.forEach((product) => {
      const colorDropdown = product.row.querySelector('.color-dropdown');
      if (colorDropdown) {
        colorDropdown.style.border = '';
        colorDropdown.style.borderColor = '';
      }
      
      const errorMsg = product.row.querySelector('.color-error-message');
      if (errorMsg) {
        errorMsg.remove();
      }
    });
  }

  //LOCALSTORAGE
  //saveCartToLocalStorage() - Lưu thông tin giỏ hàng vào localStorage
  saveCartToLocalStorage() {
    const cartData = this.wishlist.map(product => {
        // Lấy thông tin màu sắc đã chọn
        let selectedColorData = null;
        if (product.selectedColor !== null && product.colors[product.selectedColor]) {
            selectedColorData = product.colors[product.selectedColor];
        }
        // Trả về object lưu trữ
        return {
            name: product.name,
            image: product.image,
            productCode: product.name.split(' ').pop(), // Lấy mã sản phẩm từ tên (VD: NF201)
            dimensions: product.dimensions,
            materials: product.materials,
            price: product.price,
            quantity: product.quantity,
            selectedColor: selectedColorData,
            timestamp: new Date().toISOString()
        };
    });

    localStorage.setItem('cartProducts', JSON.stringify(cartData));

    // Log kiểm tra
    console.log('='.repeat(50));
    console.log('THÔNG TIN GIỎ HÀNG');
    console.log('='.repeat(50));
    
    // Hiển thị từng sản phẩm riêng biệt
    cartData.forEach((product, index) => {
        console.log(`\nSẢN PHẨM ${index + 1}:`);
        
        // Format thành object để console.table hiển thị theo cột
        const productTable = {
            'name': product.name,
            'image': product.image,
            'productCode': product.productCode,
            'dimensions': product.dimensions,
            'materials': product.materials,
            'price': product.price.toLocaleString('vi-VN') + ' VND',
            'quantity': product.quantity,
            'selectedColor': product.selectedColor ? product.selectedColor.name : 'Not selected',
            'timestamp': product.timestamp
        };
        
        console.table(productTable); // Hiển thị theo cột (index) và Value
    });
    
    console.log('='.repeat(50));
}

  //attachEventListeners() - Gắn các event listeners cho tương tác giỏ hàng
  attachEventListeners() {
    const table = document.getElementById('wishlist');
    if (!table) return;

    const rows = table.querySelectorAll('tbody tr');

    rows.forEach((row, rowIndex) => {
      // Color change listener
      const colorDropdown = row.querySelector('.color-dropdown');
      if (colorDropdown) {
        colorDropdown.addEventListener('change', (e) => {
          const colorIndex = parseInt(e.target.value);
          if (!isNaN(colorIndex)) {
            this.updateColor(rowIndex, colorIndex);
          }
        });
      }

      // Quantity change listener
      const quantityDropdown = row.querySelector('.quantity-dropdown');
      if (quantityDropdown) {
        quantityDropdown.addEventListener('change', (e) => {
          const newQuantity = parseInt(e.target.value);
          this.updateQuantity(rowIndex, newQuantity);
        });
      }

      // Remove button listener
      const removeBtn = row.querySelector('.remove-btn');
      if (removeBtn) {
        removeBtn.addEventListener('click', () => {
          if (confirm('Are you sure you want to remove this item?')) {
            this.removeProduct(rowIndex);
          }
        });
      }
    });

    //Continue button - Kiểm tra validation trước khi chuyển trang
    const continueBtn = document.querySelector('.continue-bu');
    if (continueBtn) {
      continueBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Ngăn hành vi mặc định

        // Kiểm tra wishlist có empty không
        if (this.wishlist.length === 0) {
          alert('Your wishlist is empty. Keep shopping to add products!');
          window.location.href = 'typologies.html';
          return;
        }

        // Kiểm tra màu sắc
        const validation = this.validateColors();
        
        if (!validation.isValid) {
          // Xóa tất cả error cũ trước
          this.clearAllColorErrors();
          
          // Hiển thị error cho các sản phẩm chưa chọn màu
          validation.invalidProducts.forEach((product) => {
            this.showColorError(product.row);
          });
          
          // Scroll đến sản phẩm đầu tiên chưa chọn màu
          if (validation.invalidProducts.length > 0) {
            validation.invalidProducts[0].row.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });
          }
          // Validation failed - Dừng chuyển trang
          console.log('Validation failed');
          return;
        }
        
        // Validation passed - Chuyển sang trang tiếp theo
        console.log('Validation passed');
        window.location.href = 'wishlist-send_index.html';
      });
    }
  }
}

//Khởi tạo Wishlist khi trang load xong
document.addEventListener('DOMContentLoaded', () => {
  window.wishlist = new Wishlist();
});
