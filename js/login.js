let correctOTP = ''; 
let userEmail = ''; 
const ADMIN_EMAIL = 'admin@gmail.com';

// Keys cần thiết phải khớp với personal-info.js
const LOGIN_EMAIL_KEY = 'Haguchi_LoggedInUser'; 
const STORED_EMAIL_KEY = 'userEmailForLogin'; // Key dùng để lưu email đã nhập lần trước

const emailStep = document.getElementById('email-step');
const otpStep = document.getElementById('otp-step');
const emailInput = document.getElementById('email');
const otpInput = document.getElementById('otp');
const displayEmail = document.getElementById('display-email');
const errorMessage = document.getElementById('error-message');

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function showStep(stepToShow) {
    const steps = [emailStep, otpStep];
    steps.forEach(step => step.classList.add('hidden'));
    errorMessage.classList.add('hidden');
    stepToShow.classList.remove('hidden');
}

function displayError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

// --- Main Workflow Functions ---

function showEmailStep() {
    showStep(emailStep);
    emailInput.value = userEmail; 
    otpInput.value = ''; 
}

function sendCode() {
    userEmail = emailInput.value.trim();

    if (!userEmail || !userEmail.includes('@') || !userEmail.includes('.')) {
        displayError('Please enter a valid email address.');
        return;
    }

    // Lưu email vừa nhập để lần sau không cần nhập lại
    localStorage.setItem(STORED_EMAIL_KEY, userEmail); 

    correctOTP = generateOTP();
    
    console.log(`[SIMULATION]: Code sent to ${userEmail} is: ${correctOTP}`); 

    displayEmail.textContent = userEmail;
    showStep(otpStep);
    // Thay đổi thông báo lỗi thành thông báo thành công
    displayError('Success! Check your email for the 6-digit login code.'); 
}

function verifyCode() {
    const enteredOTP = otpInput.value.trim();

    if (!enteredOTP || enteredOTP.length !== 6) {
        displayError('Please enter the 6-digit code.');
        return;
    }

    if (enteredOTP === correctOTP) {
        
        // 1. LƯU EMAIL ĐÃ ĐĂNG NHẬP VỚI KEY MỚI (Đã đồng bộ)
        localStorage.setItem(LOGIN_EMAIL_KEY, userEmail); // KEY: Haguchi_LoggedInUser
        
        // 2. CHUYỂN HƯỚNG
        let redirectURL;

        if (userEmail.toLowerCase() === ADMIN_EMAIL) {
            console.log(`[SIMULATION]: Admin login successful. Redirecting to admin.html...`);
            redirectURL = 'admin.html'; 
        } else {
            console.log(`[SIMULATION]: User login successful. Redirecting to personal-info.html...`);
            redirectURL = 'personal-info.html'; 
        }

        window.location.href = redirectURL;

    } else {
        displayError('Invalid code. Please try again.');
        otpInput.value = ''; 
    }
}


document.addEventListener('DOMContentLoaded', () => {
    // Sử dụng STORED_EMAIL_KEY
    const storedEmail = localStorage.getItem(STORED_EMAIL_KEY); 
    if (storedEmail) {
        emailInput.value = storedEmail;
        userEmail = storedEmail;
    }
    showStep(emailStep);
});
