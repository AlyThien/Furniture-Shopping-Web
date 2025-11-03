document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userEmail = localStorage.getItem('userEmail');
    const infoForm = document.getElementById('info-form');
    const currentUserEmailDisplay = document.getElementById('current-user-email');
  
    if (isLoggedIn !== 'true' || !userEmail) {
        window.location.href = 'login.html'; 
        return; 
    }
    
    currentUserEmailDisplay.textContent = userEmail;

    infoForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const fullName = document.getElementById('full-name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        
        const dob = document.getElementById('dob').value;
        const gender = document.getElementById('gender').value;

        const address = document.getElementById('address').value.trim();

        localStorage.setItem('userFullName', fullName);
        localStorage.setItem('userPhone', phone);
        localStorage.setItem('userAddress', address);

        localStorage.setItem('userDOB', dob);
        localStorage.setItem('userGender', gender);
        
        console.log(`[SIMULATION]: User info saved: ${fullName}, ${phone}, Gender: ${gender}`);
        
        alert('Personal information saved successfully! Redirecting to Home.');

        window.location.href = 'index.html';
    });
});
