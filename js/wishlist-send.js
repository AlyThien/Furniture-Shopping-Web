//Nhóm 9: Form thanh toán 
class PaymentHandler {
//Khởi tạo các phần tử cho PaymentHandler
  constructor() {
    this.codRadio = document.getElementById('cod');
    this.bankRadio = document.getElementById('bank');
    this.qrSection = document.getElementById('qr-section');
    this.paymentForm = document.getElementById('paymentForm');
    this.phoneInput = document.querySelector('input[name="phone"]');
    this.init();
  }
  //Lấy ngôn ngữ hiện tại từ lang-change.js
  getCurrentLanguage() {
    // Kiểm tra xem lang-change.js đã load chưa
    if (typeof currentLang !== 'undefined') {
        return currentLang;
    }
    // Fallback: check localStorage
    return localStorage.getItem('selectedLanguage') || 'en';
  }

  //Lấy translation từ lang-change.js (đã load JSON)
  getTranslation(key) {
    // Kiểm tra xem translations từ lang-change.js đã có chưa
    if (typeof translations !== 'undefined' && translations[key]) {
        return translations[key];
    }
    // Fallback: return key nếu không tìm thấy
    console.warn(`Translation not found for key: ${key}`);
    return key;
  }

  //Lấy error message theo ngôn ngữ hiện tại
  getErrorMessage(fieldName) {
    const pleaseEnterText = this.getTranslation('error-please-enter');
    const fieldLabel = this.getTranslation(`error-field-${fieldName}`);
    
    return `${pleaseEnterText} ${fieldLabel}`;
  } 

  //Lấy error message cho phone validation
  getPhoneErrorMessage() {
    return this.getTranslation('error-invalid-phone');
  }


//Khởi tạo event listeners
  init() {
    // Gắn listener cho COD radio button - thay đổi phương thức thanh toán
    if (this.codRadio) {
      this.codRadio.addEventListener('change', () => this.toggleQRSection());
    }

    // Gắn listener cho Bank radio button - thay đổi phương thức thanh toán
    if (this.bankRadio) {
      this.bankRadio.addEventListener('change', () => this.toggleQRSection());
    }

    // Gắn listeners để xóa lỗi khi người dùng nhập lại
    this.attachClearErrorListeners();

    // Gắn listener cho phone input để chỉ cho phép nhập số - loại ký tự không phải số, chỉ nhập số 
    if (this.phoneInput) {
      this.phoneInput.addEventListener('input', (e) => this.validatePhoneInput(e));
      this.phoneInput.addEventListener('keypress', (e) => this.onlyNumbersKeypress(e));
    }

    // Gắn listener cho form submit - xử lý submit form
    if (this.paymentForm) {
      this.paymentForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
    } else {
      return;
    }

    // Khởi động hiển thị QR section - ẩn/ hiện dựa trên lựa chọn phương thức thanh toán
    this.toggleQRSection();
  }
// attachClearErrorListeners() - xóa lỗi khi người dùng nhập
  attachClearErrorListeners() {
    if (!this.paymentForm) return;
      // Danh sách tất cả các input và select cần theo dõi
      const fields = this.paymentForm.querySelectorAll('input[name], select[name]');

      fields.forEach(field => {
        // Xóa lỗi khi người dùng bắt đầu nhập/chọn
        field.addEventListener('input', () => {
          this.clearFieldError(field);
        });
        // Đặc biệt cho select (dùng 'change' thay vì 'input')
        if (field.tagName === 'SELECT') {
          field.addEventListener('change', () => {
            this.clearFieldError(field);
          });
        }
      });
  }
  //validatePhoneInput(e) - Chỉ cho phép nhập số
  validatePhoneInput(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  }

  //onlyNumbersKeypress(e) - Ngăn nhập ký tự không phải số
  onlyNumbersKeypress(e) {
    const char = String.fromCharCode(e.which);
    //Nếu ký tự không phải số thì ngăn không cho nhập
    if (!/[0-9]/.test(char)) {
      e.preventDefault();
    }
  }

  //toggleQRSection() - Ẩn/hiện phần QR dựa trên lựa chọn phương thức thanh toán
  toggleQRSection() {
    if (this.qrSection && this.bankRadio) {
      const shouldShow = this.bankRadio.checked;
      this.qrSection.style.display = shouldShow ? 'block' : 'none';
    }
  }

  //getFieldLabel(fieldName) - Giúp đổi tên field cho dễ đọc khi báo lỗi.
  getFieldLabel(fieldName) {
    const labels = {
      'name': 'name',
      'surname': 'surname',
      'email': 'email',
      'phone': 'phone number',
      'country': 'country',
      'address': 'address',
      'city': 'city',
      'province': 'province'
    };
    return labels[fieldName] || fieldName;
  }

 //showFieldError(input, message) - Hiển thị error cho input field
  showFieldError(input, message) {
    if (!input) return;

    // Tô viền đỏ cho input
    input.style.setProperty('border', '1px solid #ff0000', 'important');
    input.style.setProperty('border-color', '#ff0000', 'important');

    // Kiểm tra xem đã có error message chưa
    const fieldWrapper = input.closest('div') || input.parentElement;
    let errorMsg = fieldWrapper.querySelector('.field-error-message');
    // Nếu đã có rồi thì chỉ cần cập nhật nội dung
    if (errorMsg) {
      errorMsg.textContent = message;
      return;
    }

    // Tạo error message
    errorMsg = document.createElement('div');
    errorMsg.className = 'field-error-message';
    errorMsg.textContent = message;
    errorMsg.style.cssText = `
      color: #ff0000;
      font-size: 12px;
      margin-top: 4px;
      font-weight: 300;
      line-height: 1.4;
    `;
    //báo lỗi UI + thông báo console
    if (fieldWrapper) {
      fieldWrapper.appendChild(errorMsg);
    }
    console.log(`Error: ${message}`);
  }

  //clearFieldError(input) - Xóa error message của input field
  clearFieldError(input) {
    if (!input) return;

    input.style.removeProperty('border');
    input.style.removeProperty('border-color');

    const fieldWrapper = input.closest('div') || input.parentElement;
    const errorMsg = fieldWrapper.querySelector('.field-error-message');
    if (errorMsg) {
      errorMsg.remove();
    }
  }

  //clearAllErrors() - Xóa tất cả error messages
  clearAllErrors() {
    const errorMessages = this.paymentForm.querySelectorAll('.field-error-message');
    errorMessages.forEach(msg => msg.remove());

    const inputs = this.paymentForm.querySelectorAll('input, select');
    inputs.forEach(input => {
      input.style.removeProperty('border');
      input.style.removeProperty('border-color');
    });
  }

  //validateForm() - Kiểm tra tính hợp lệ của form
  validateForm() {
    this.clearAllErrors();

    const errors = [];
    let firstErrorInput = null;

    //1. Kiểm tra các field bắt buộc (không dùng [required] selector)
    const requiredFields = ['name', 'surname', 'email', 'phone', 'country', 'address', 'city', 'province'];
    
    requiredFields.forEach(fieldName => {
      const input = this.paymentForm.querySelector(`input[name="${fieldName}"], select[name="${fieldName}"]`);
      if (input && !input.value.trim()) {
        // Sử dụng getErrorMessage() để lấy text từ JSON
        const errorMessage = this.getErrorMessage(fieldName);
        this.showFieldError(input, errorMessage);
        errors.push(fieldName);
        
        if (!firstErrorInput) {
            firstErrorInput = input;
        }
      }
    });

    //2. Kiểm tra phone number format
    const phoneInput = this.paymentForm.querySelector('input[name="phone"]');
    if (phoneInput && phoneInput.value) {
      const phoneDigits = phoneInput.value.replace(/\D/g, '');
      if (phoneDigits.length < 10) {
        const errorMessage = this.getPhoneErrorMessage();
        this.showFieldError(phoneInput, errorMessage);
        errors.push('phone (min 10 digits)');
        
        if (!firstErrorInput) {
          firstErrorInput = phoneInput;
        }
      }
    }

    //3. Kiểm tra payment method
    const paymentMethod = new FormData(this.paymentForm).get('payment');
    if (!paymentMethod) {
      errors.push('payment method');
      
      const paymentSection = this.paymentForm.querySelector('.payment-methods') 
                           || this.paymentForm.querySelector('[name="payment"]')?.closest('div');
      if (paymentSection && !firstErrorInput) {
        firstErrorInput = paymentSection;
      }
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
      firstErrorInput: firstErrorInput
    };
  }

  //collectFormData() - Thu thập dữ liệu từ form 
  collectFormData() {
    const formData = new FormData(this.paymentForm);
    return {
      name: formData.get('name') || '',
      surname: formData.get('surname') || '',
      email: formData.get('email') || '',
      phone: formData.get('phone') || '',
      country: formData.get('country') || '',
      address: formData.get('address') || '',
      city: formData.get('city') || '',
      province: formData.get('province') || '',
      payment: formData.get('payment'),
      timestamp: new Date().toISOString(),
    };
  }

  //handleFormSubmit(e) - Xử lý submit form
  handleFormSubmit(e) {
    e.preventDefault();

    console.log('FORM SUBMITTED');
    console.log('='.repeat(50));
    //kiểm tra validation - tính hợp lệ của form
    const validation = this.validateForm();

    if (!validation.isValid) {
      console.error('Validation errors:', validation.errors);
      
      if (validation.firstErrorInput) {
        validation.firstErrorInput.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        
        if (validation.firstErrorInput.tagName === 'INPUT' || 
            validation.firstErrorInput.tagName === 'SELECT') {
          setTimeout(() => {
            validation.firstErrorInput.focus();
          }, 500);
        }
      }
      
      console.log(' Please fix the errors above');
      console.log('='.repeat(50) + '\n');
      return;
    }

    console.log('Validation passed\n');
    //Form hợp lệ --> Thu thập dữ liệu từ form
    const customerData = this.collectFormData();

    console.log('👤 CUSTOMER DATA:');
    console.table(customerData);

    localStorage.setItem('customerInfo', JSON.stringify(customerData));
    console.log('Saved to localStorage\n');
    //Chuyển hướng dựa trên phương thức thanh toán
    const paymentMethod = customerData.payment;
    console.log(`Redirecting to ${paymentMethod === 'cod' ? 'success' : 'bank'} page...`);
    console.log('='.repeat(50) + '\n');

    if (paymentMethod === 'cod') {
      window.location.href = 'success_index.html';
    } else if (paymentMethod === 'bank') {
      window.location.href = 'bank.html';
    }
  }
}

//Khởi tạo PaymentHandler khi trang load xong
document.addEventListener('DOMContentLoaded', function() {
  window.paymentHandler = new PaymentHandler();
});

//Xuất thông tin module để sử dụng trong trang khác 
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PaymentHandler;
}