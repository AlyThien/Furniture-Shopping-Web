function isValidDate_ddmmyyyy(dateString) {
    // 1. Kiểm tra định dạng cơ bản: dd/mm/yyyy
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(dateString)) {
        return false;
    }
    
    // 2. Tách ngày, tháng, năm
    const parts = dateString.match(regex);
    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[2], 10);
    const year = parseInt(parts[3], 10);
    
    // 3. Kiểm tra các giá trị cơ bản (tháng, năm)
    if (year < 1900 || year > new Date().getFullYear() || month === 0 || month > 12) {
        return false;
    }

    // 4. Kiểm tra số ngày trong tháng
    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Xử lý năm nhuận (tháng 2)
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
        monthLength[1] = 29;
    }

    return day > 0 && day <= monthLength[month - 1];
}


document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userEmail = localStorage.getItem('userEmail');
    const infoForm = document.getElementById('info-form');
    const currentUserEmailDisplay = document.getElementById('current-user-email');
    const dobInput = document.getElementById('dob');

    if (isLoggedIn !== 'true' || !userEmail) {
    // Nếu chưa đăng nhập, chuyển hướng người dùng
        window.location.href = 'login.html'; 
        return; 
    }

    currentUserEmailDisplay.textContent = userEmail;
 
    // Tải dữ liệu đã lưu trữ (định dạng dd/mm/yyyy)
    document.getElementById('full-name').value = localStorage.getItem('userFullName') || '';
    document.getElementById('phone').value = localStorage.getItem('userPhone') || '';
    document.getElementById('address').value = localStorage.getItem('userAddress') || '';
    document.getElementById('dob').value = localStorage.getItem('userDOB') || ''; 

    const savedGender = localStorage.getItem('userGender');
    if (savedGender) {
        document.getElementById('gender').value = savedGender;
    }

    // Chức năng auto-mask cho Ngày sinh (dd/mm/yyyy)
    dobInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); // Chỉ giữ lại số
        
        // Tự động thêm dấu "/"
        if (value.length > 2 && value.length <= 4) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        } else if (value.length > 4) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4) + '/' + value.slice(4, 8);
        }
        e.target.value = value;
    });


    infoForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const fullName = document.getElementById('full-name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const gender = document.getElementById('gender').value;
        const address = document.getElementById('address').value.trim();
        const dobRaw = document.getElementById('dob').value;
        
        // Kiểm tra tính hợp lệ của ngày sinh
        if (dobRaw.length > 0 && !isValidDate_ddmmyyyy(dobRaw)) {
            alert('Ngày sinh không hợp lệ. Vui lòng nhập đúng định dạng dd/mm/yyyy.');
            return; // Ngăn không cho lưu nếu không hợp lệ
        }

        // LƯU DỮ LIỆU VÀO localStorage DƯỚI DẠNG dd/mm/yyyy
        localStorage.setItem('userFullName', fullName);
        localStorage.setItem('userPhone', phone);
        localStorage.setItem('userAddress', address);
        localStorage.setItem('userDOB', dobRaw); 
        localStorage.setItem('userGender', gender);

        console.log(`[SIMULATION]: User info saved: ${fullName}, ${phone}, Gender: ${gender}, DOB: ${dobRaw}`);

        alert('Personal information saved successfully! Redirecting to Home.');

        window.location.href = 'index.html';
    });
});
