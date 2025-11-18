    //Khai báo biến của các phần tử HTML để tương tác
    const fileUpload = document.getElementById('file-upload');
    const previewArea = document.getElementById('preview-area');
    const previewImage = document.getElementById('preview-image');
    const removeBtn = document.getElementById('remove-image');
    const continueBtn = document.getElementById('continue-btn');

    //Thêm ảnh
    fileUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                previewImage.src = event.target.result;
                previewArea.style.display = 'block';
                console.log('Image added successfully');
            };
            reader.readAsDataURL(file);
        }
    });

    // Xoá ảnh
    removeBtn.addEventListener('click', function() {
        previewArea.style.display = 'none';
        previewImage.src = '';
        fileUpload.value = '';
        console.log('Image removed successfully');
    });

    // Nhấn continue --> chuyển sang trang success.html
    continueBtn.addEventListener('click', function() {
        window.location.href = 'success.html';
    });