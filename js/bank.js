// Nhóm 9: Khai báo biến của các phần tử HTML để tương tác
const fileUpload = document.getElementById('file-upload');
const previewArea = document.getElementById('preview-area');
const previewImage = document.getElementById('preview-image');
const removeBtn = document.getElementById('remove-image');
const continueBtn = document.getElementById('continue-btn');
const uploadBtn = document.querySelector('.upload-btn');

// Nhóm 9: Tạo thông báo lỗi
const errorMessage = document.createElement('div');
errorMessage.id = 'error-message';
errorMessage.className = 'error-message';
errorMessage.style.display = 'none';
errorMessage.setAttribute("data-i18n", "upload-error");

// Thêm thông báo vào sau nút upload
uploadBtn.parentNode.insertBefore(errorMessage, uploadBtn.nextSibling);

// Nhóm 9: Thêm ảnh
fileUpload.addEventListener('change', function (e) {
    const file = e.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            previewImage.src = event.target.result;
            previewArea.style.display = 'block';

            // Ẩn thông báo khi có ảnh
            errorMessage.style.display = 'none';

            console.log('Image added successfully');
        };
        reader.readAsDataURL(file);
    }
});

// Nhóm 9: Xoá ảnh
removeBtn.addEventListener('click', function () {
    previewArea.style.display = 'none';
    previewImage.src = '';
    fileUpload.value = '';

    console.log('Image removed successfully');
});

// Nhóm 9: Khi bấm Continue → Kiểm tra ảnh trước
continueBtn.addEventListener('click', function (e) {

    // Chặn chuyển trang mặc định (rất quan trọng)
    e.preventDefault();

    // Nếu chưa chọn ảnh → báo lỗi + không chuyển trang
    if (!fileUpload.files || fileUpload.files.length === 0) {
        errorMessage.style.display = 'block';
        return; // Dừng lại, không qua trang mới
    }

    // Nếu đã có ảnh → cho chuyển trang
    window.location.href = 'success_index.html';
});
