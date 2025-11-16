let correctOTP = ''; 
let userEmail = ''; 
const ADMIN_EMAIL = 'admin@gmail.com';

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

    correctOTP = generateOTP();
    
    console.log(`[SIMULATION]: Code sent to ${userEmail} is: ${correctOTP}`); 

    displayEmail.textContent = userEmail;
    showStep(otpStep);
    displayError('Success! Check your email for the login code.'); 
}

function verifyCode() {
    const enteredOTP = otpInput.value.trim();

    if (!enteredOTP || enteredOTP.length !== 6) {
        displayError('Please enter the 6-digit code.');
        return;
    }

    if (enteredOTP === correctOTP) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', userEmail);

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
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'index.html'; 
    } else {
        showStep(emailStep);
    }
});
