// Biến toàn cục
let sentOTP = ''; // OTP đã gửi
let currentUserEmail = ''; // Email hiện tại

// localStorage keys
const STORED_EMAIL_KEY = 'userEmailForLogin'; // Key lưu email đã nhập

// Admin email
const ADMIN_EMAIL = 'admin@gmail.com';

// DOM elements
const emailStep = document.getElementById('email-step');
const otpStep = document.getElementById('otp-step');
const emailInput = document.getElementById('email');
const otpInput = document.getElementById('otp');
const displayEmail = document.getElementById('display-email');
const errorMessage = document.getElementById('error-message');

// === Nhóm 9: Tính năng gửi code OTP ===

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function showStep(stepToShow) {
    const steps = [emailStep, otpStep];
    steps.forEach(step => step.classList.add('hidden'));
    errorMessage.classList.add('hidden');
    stepToShow.classList.remove('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function showSuccess(message) {
    errorMessage.textContent = message;
    errorMessage.style.color = '#28a745';
    errorMessage.classList.remove('hidden');
}

// === Nhóm 9: MAIN WORKFLOW FUNCTIONS ===

function showEmailStep() {
    showStep(emailStep);
    emailInput.value = currentUserEmail; 
    otpInput.value = ''; 
    errorMessage.style.color = '#dc3545'; // Reset màu về đỏ
}

function sendCode() {
    currentUserEmail = emailInput.value.trim();

    // Validate email
    if (!currentUserEmail) {
        showError('Please enter your email address.');
        return;
    }

    if (!currentUserEmail.includes('@') || !currentUserEmail.includes('.')) {
        showError('Please enter a valid email address.');
        return;
    }

    // Lưu email để lần sau không cần nhập lại
    localStorage.setItem(STORED_EMAIL_KEY, currentUserEmail);

    // Tạo OTP mới
    sentOTP = generateOTP();
    
    // Log OTP ra console (để test)
    console.log(`[SIMULATION] OTP sent to ${currentUserEmail}: ${sentOTP}`);

    // Hiển thị email và chuyển sang bước nhập OTP
    displayEmail.textContent = currentUserEmail;
    showStep(otpStep);
    
    // Hiển thị thông báo thành công
    showSuccess('Success! Check your email for the 6-digit login code.');
}

function verifyCode() {
    const enteredOTP = otpInput.value.trim();

    // Validate OTP input
    if (!enteredOTP) {
        showError('Please enter the code.');
        return;
    }

    if (enteredOTP.length !== 6) {
        showError('The code must be 6 digits.');
        return;
    }

    if (!/^\d{6}$/.test(enteredOTP)) {
        showError('The code must contain only numbers.');
        return;
    }

    // Kiểm tra OTP
    if (enteredOTP !== sentOTP) {
        showError('Incorrect code. Please try again.');
        return;
    }

    // OTP đúng - Lưu email vào localStorage
    localStorage.setItem('userEmail', currentUserEmail);
    
    // Kiểm tra nếu là admin thì chuyển đến trang admin
    if (currentUserEmail.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
        window.location.href = 'admin.html';
    } else {
        // User thường chuyển đến trang personal-info
        window.location.href = 'personal-info.html';
    }
}

// === Nhóm 9: EVENT LISTENERS ===

document.addEventListener('DOMContentLoaded', () => {
    // Load email đã lưu (nếu có)
    const storedEmail = localStorage.getItem(STORED_EMAIL_KEY);
    if (storedEmail) {
        emailInput.value = storedEmail;
        currentUserEmail = storedEmail;
    }
    
    // Hiển thị bước nhập email
    showStep(emailStep);
    
    // Focus vào email input
    emailInput.focus();
});

// Enter key support
emailInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendCode();
    }
});

otpInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        verifyCode();
    }
});

// Auto-focus OTP input khi hiển thị
if (otpStep) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target === otpStep && !otpStep.classList.contains('hidden')) {
                otpInput.focus();
            }
        });
    });

    observer.observe(otpStep, { attributes: true, attributeFilter: ['class'] });
}