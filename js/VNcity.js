//Nhóm 9: Tạo dữ liệu các tỉnh thành phố Việt Nam để lựa chọn trong form
// Cấu trúc: Province -> Cities
const VIETNAM_DATA = {
    'An Giang': [
        'Thành phố Long Xuyên',
        'Thành phố Châu Đốc',
        'Thị xã Tân Châu',
        'Huyện Phú Tân',
        'Huyện Chợ Mới'
    ],
    'Bà Rịa - Vũng Tàu': [
        'Thành phố Vũng Tàu',
        'Thành phố Bà Rịa',
        'Huyện Côn Đảo',
        'Huyện Long Điền',
        'Huyện Đất Đỏ'
    ],
    'Bắc Giang': [
        'Thành phố Bắc Giang',
        'Huyện Yên Thế',
        'Huyện Lục Ngan',
        'Huyện Sơn Động',
        'Huyện Hiệp Hòa'
    ],
    'Bắc Kạn': [
        'Thành phố Bắc Kạn',
        'Huyện Chợ Don',
        'Huyện Na Rì',
        'Huyện Ngân Sơn',
        'Huyện Nông Cống'
    ],
    'Bạc Liêu': [
        'Thành phố Bạc Liêu',
        'Huyện Hồng Dân',
        'Huyện Vĩnh Lợi',
        'Huyện Giá Rai',
        'Huyện Ba Đắc'
    ],
    'Bắc Ninh': [
        'Thành phố Bắc Ninh',
        'Huyện Tiên Du',
        'Huyện Yên Phong',
        'Huyện Quế Võ',
        'Huyện Gia Bình'
    ],
    'Bến Tre': [
        'Thành phố Bến Tre',
        'Huyện Chợ Lách',
        'Huyện Giồng Trôm',
        'Huyện Mỏ Cày',
        'Thị xã Ba Tri'
    ],
    'Bình Dương': [
        'Thành phố Thủ Dầu Một',
        'Thành phố Dĩ An',
        'Thành phố Thuận An',
        'Huyện Bàu Bàng',
        'Huyện Bến Cát'
    ],
    'Bình Phước': [
        'Thành phố Đồng Xoài',
        'Thị xã Phước Long',
        'Huyện Bình Long',
        'Huyện Chơn Thành',
        'Huyện Lộc Ninh'
    ],
    'Bình Thuận': [
        'Thành phố Phan Thiết',
        'Thị xã Lagi',
        'Huyện Hàm Tân',
        'Huyện Hàm Thuận Bắc',
        'Huyện Tuy Phong'
    ],
    'Cà Mau': [
        'Thành phố Cà Mau',
        'Huyện U Minh',
        'Huyện Năm Căn',
        'Huyện Ngọc Hiển',
        'Huyện Trần Văn Thời'
    ],
    'Cao Bằng': [
        'Thành phố Cao Bằng',
        'Huyện Hạ Lang',
        'Huyện Trà Lĩnh',
        'Huyện Quảng Uyên',
        'Huyện Bảo Lạc'
    ],
    'Đắc Lắc': [
        'Thành phố Buôn Ma Thuột',
        'Thị xã Buôn Hồ',
        'Huyện Eakar',
        'Huyện Eakô',
        'Huyện Krông Bông'
    ],
    'Đắc Nông': [
        'Thành phố Gia Nghĩa',
        'Huyện Đắc Mil',
        'Huyện Cư Mgar',
        'Huyện Tuy Đức',
        'Huyện Krông Nô'
    ],
    'Điện Biên': [
        'Thành phố Điện Biên Phủ',
        'Huyện Mường Lay',
        'Huyện Tuần Giáo',
        'Huyện Nậm Pồ',
        'Huyện Tủa Chùa'
    ],
    'Đồng Nai': [
        'Thành phố Biên Hòa',
        'Thị xã Long Khánh',
        'Huyện Nhơn Trạch',
        'Huyện Vĩnh Cửu',
        'Huyện Thống Nhất'
    ],
    'Đồng Tháp': [
        'Thành phố Cao Lãnh',
        'Thành phố Sa Đéc',
        'Huyện Hồng Ngu',
        'Huyện Tân Hồng',
        'Huyện Gò Công Đông'
    ],
    'Gia Lai': [
        'Thành phố Pleiku',
        'Thị xã An Khê',
        'Huyện Mang Yang',
        'Huyện Kông Chro',
        'Huyện Ch Păh'
    ],
    'Hà Giang': [
        'Thành phố Hà Giang',
        'Huyện Vị Xuyên',
        'Huyện Yên Minh',
        'Huyện Đông Van',
        'Huyện Mèo Vạc'
    ],
    'Hà Nam': [
        'Thành phố Phủ Lý',
        'Huyện Duy Tiên',
        'Huyện Kim Bảng',
        'Huyện Thanh Liêm',
        'Thị xã Bình Lục'
    ],
    'Hà Nội': [
        'Quận Ba Đình',
        'Quận Hoàn Kiếm',
        'Quận Tây Hồ',
        'Quận Cầu Giấy',
        'Quận Đống Đa',
        'Quận Hai Bà Trưng',
        'Quận Hoàng Mai',
        'Quận Long Biên',
        'Quận Thanh Trì',
        'Huyện Thanh Oai'
    ],
    'Hà Tĩnh': [
        'Thành phố Hà Tĩnh',
        'Huyện Hương Sơn',
        'Huyện Thạch Hà',
        'Huyện Vũ Quang',
        'Huyện Kỳ Anh'
    ],
    'Hải Dương': [
        'Thành phố Hải Dương',
        'Thành phố Chí Linh',
        'Huyện Nam Sách',
        'Huyện Thanh Hà',
        'Huyện Kinh Môn'
    ],
    'Hải Phòng': [
        'Quận Hồng Bàng',
        'Quận Ngô Quyền',
        'Quận Lê Chân',
        'Quận Kiến An',
        'Quận Đồ Sơn',
        'Huyện Vĩnh Bảo',
        'Huyện Thuỷ Nguyên',
        'Huyện Tiên Lãng'
    ],
    'Hậu Giang': [
        'Thành phố Vị Thanh',
        'Huyện Chợ Mối',
        'Huyện Phụng Hiệp',
        'Huyện Châu Thành',
        'Huyện Long Mỹ'
    ],
    'Hòa Bình': [
        'Thành phố Hòa Bình',
        'Huyện Kỳ Sơn',
        'Huyện Tạ Xương',
        'Huyện Lương Sơn',
        'Huyện Yên Thủy'
    ],
    'Hưng Yên': [
        'Thành phố Hưng Yên',
        'Huyện Ân Thi',
        'Huyện Văn Giang',
        'Huyện Văn Lâm',
        'Huyện Yên Mỹ'
    ],
    'Khánh Hòa': [
        'Thành phố Nha Trang',
        'Thị xã Cam Ranh',
        'Huyện Cam Lâm',
        'Huyện Vạn Ninh',
        'Huyện Ninh Hòa'
    ],
    'Kiên Giang': [
        'Thành phố Rạch Giá',
        'Thành phố Hà Tiên',
        'Huyện Gò Quao',
        'Huyện An Biên',
        'Huyện An Phú'
    ],
    'Kon Tum': [
        'Thành phố Kon Tum',
        'Huyện Đắk Glei',
        'Huyện Đắk Tô',
        'Huyện Iagr Ê',
        'Huyện Tu Mơ Rông'
    ],
    'Lai Châu': [
        'Thành phố Lai Châu',
        'Huyện Phong Thổ',
        'Huyện Tân Uyên',
        'Huyện Nậm Nhùn',
        'Huyện Si Ma Cai'
    ],
    'Lâm Đồng': [
        'Thành phố Đà Lạt',
        'Thị xã Đức Trọng',
        'Huyện Lâm Hà',
        'Huyện Đơn Dương',
        'Huyện Cát Tiên'
    ],
    'Lạng Sơn': [
        'Thành phố Lạng Sơn',
        'Huyện Hữu Lũng',
        'Huyện Cao Lộc',
        'Huyện Bắc Sơn',
        'Huyện Tràng Định'
    ],
    'Lào Cai': [
        'Thành phố Lào Cai',
        'Huyện Sa Pa',
        'Huyện Bảo Thắng',
        'Huyện Bảo Yên',
        'Huyện Văn Bàn'
    ],
    'Long An': [
        'Thành phố Tân An',
        'Thị xã Kiến Tường',
        'Huyện Cần Đước',
        'Huyện Cần Giuộc',
        'Huyện Gò Công'
    ],
    'Nam Định': [
        'Thành phố Nam Định',
        'Huyện Ý Yên',
        'Huyện Nam Trực',
        'Huyện Xuân Trường',
        'Huyện Giao Thủy'
    ],
    'Nghệ An': [
        'Thành phố Vinh',
        'Thị xã Cửa Lò',
        'Huyện Nghi Lộc',
        'Huyện Yên Thành',
        'Huyện Anh Sơn'
    ],
    'Ninh Bình': [
        'Thành phố Ninh Bình',
        'Huyện Hoa Lư',
        'Huyện Nho Quan',
        'Huyện Gia Viễn',
        'Huyện Yên Khánh'
    ],
    'Ninh Thuận': [
        'Thành phố Phan Rang-Tháp Chàm',
        'Huyện Ninh Hải',
        'Huyện Ninh Phước',
        'Huyện Thành Phố',
        'Huyện Thuận Bắc'
    ],
    'Phú Thọ': [
        'Thành phố Việt Trì',
        'Thị xã Phú Thọ',
        'Huyện Đông Anh',
        'Huyện Thanh Ba',
        'Huyện Tân Sơn'
    ],
    'Phú Yên': [
        'Thành phố Tuy Hòa',
        'Huyện Đông Hòa',
        'Huyện Tây Hòa',
        'Huyện Sơn Hòa',
        'Huyện Phú Hòa'
    ],
    'Quảng Bình': [
        'Thành phố Đồng Hới',
        'Huyện Lệ Thủy',
        'Huyện Quảng Trạch',
        'Huyện Minh Hóa',
        'Huyện Bố Trạch'
    ],
    'Quảng Nam': [
        'Thành phố Đà Nẵng',
        'Thị xã Hội An',
        'Huyện Duy Xuyên',
        'Huyện Thăng Bình',
        'Huyện Phú Ninh'
    ],
    'Quảng Ngãi': [
        'Thành phố Quảng Ngãi',
        'Huyện Bình Sơn',
        'Huyện Sơn Tịnh',
        'Huyện Sơn Hà',
        'Huyện Tây Trà'
    ],
    'Quảng Ninh': [
        'Thành phố Hạ Long',
        'Thị xã Uông Bí',
        'Huyện Cô Tô',
        'Huyện Bạch Long Vỹ',
        'Huyện Vân Đồn'
    ],
    'Quảng Trị': [
        'Thành phố Đông Hà',
        'Huyện Triệu Phong',
        'Huyện Gio Linh',
        'Huyện Hướng Hóa',
        'Huyện Vĩnh Linh'
    ],
    'Sóc Trăng': [
        'Thành phố Sóc Trăng',
        'Huyện Mỹ Xuyên',
        'Huyện Kế Sâm',
        'Huyện Cù Lao Dung',
        'Huyện Trần Đề'
    ],
    'Sơn La': [
        'Thành phố Sơn La',
        'Huyện Mường Lá',
        'Huyện Yên Châu',
        'Huyện Phù Yên',
        'Huyện Mường Khương'
    ],
    'Tây Ninh': [
        'Thành phố Tây Ninh',
        'Huyện Gò Dầu',
        'Huyện Dương Minh Châu',
        'Huyện Tân Biên',
        'Huyện Tân Châu'
    ],
    'Thái Bình': [
        'Thành phố Thái Bình',
        'Huyện Quỳnh Côi',
        'Huyện Hưng Hà',
        'Huyện Kiến Xương',
        'Huyện Thái Thụy'
    ],
    'Thái Nguyên': [
        'Thành phố Thái Nguyên',
        'Thị xã Sơn Dương',
        'Huyện Định Hóa',
        'Huyện Phú Lương',
        'Huyện Võ Nhai'
    ],
    'Thanh Hóa': [
        'Thành phố Thanh Hóa',
        'Huyện Hà Trung',
        'Huyện Nông Cống',
        'Huyện Thiệu Hóa',
        'Huyện Tĩnh Gia'
    ],
    'Thừa Thiên - Huế': [
        'Thành phố Huế',
        'Huyện A Lưới',
        'Huyện Phú Vang',
        'Huyện Phú Lộc',
        'Huyện Nam Đông'
    ],
    'Tiền Giang': [
        'Thành phố Mỹ Tho',
        'Thành phố Gò Công',
        'Huyện Cái Bè',
        'Huyện Cai Lậy',
        'Huyện Châu Thành'
    ],
    'TP. Hồ Chí Minh': [
        'Quận 1',
        'Quận 2',
        'Quận 3',
        'Quận 4',
        'Quận 5',
        'Quận 6',
        'Quận 7',
        'Quận 8',
        'Quận 9',
        'Quận 10',
        'Quận 11',
        'Quận 12'
    ],
    'Trà Vinh': [
        'Thành phố Trà Vinh',
        'Huyện Càng Long',
        'Huyện Cầu Ngang',
        'Huyện Tiểu Cần',
        'Huyện Duyên Hải'
    ],
    'Tuyên Quang': [
        'Thành phố Tuyên Quang',
        'Huyện Hàm Yên',
        'Huyện Chiêm Hóa',
        'Huyện Nà Hang',
        'Huyện Yên Sơn'
    ],
    'Vĩnh Long': [
        'Thành phố Vĩnh Long',
        'Huyện Mang Thít',
        'Huyện Vũng Liêm',
        'Huyện Tam Bình',
        'Huyện Long Hồ'
    ],
    'Vĩnh Phúc': [
        'Thành phố Vĩnh Yên',
        'Thị xã Phúc Yên',
        'Huyện Tam Dương',
        'Huyện Tam Đảo',
        'Huyện Lập Thạch'
    ],
    'Yên Bái': [
        'Thành phố Yên Bái',
        'Huyện Trấn Yên',
        'Huyện Lục Yên',
        'Huyện Văn Yên',
        'Huyện Mù Cang Chải'
    ]
};

//Nhóm 9: Lấy danh sách tỉnh thành của Việt Nam từ VIETNAM_DATA
function getProvinces() {
    return Object.keys(VIETNAM_DATA).sort();
}
//Lấy danh sách quận/huyện của tỉnh thành đã chọn nếu không tim thấy trả về mảng rỗng
function getCitiesForProvince(province) {
    return VIETNAM_DATA[province] || [];
}
//Nhóm 9: Tự động điền dữ liệu tỉnh thành vào dropdown
function populateProvinces(selectElementId) {
    const select = document.getElementById(selectElementId);
    if (!select) return;

    const provinces = getProvinces();

    //Xoá các option cũ trừ option đầu tiên
    while (select.options.length > 1) {
        select.remove(1);
    }

    // Thêm các option tỉnh thành
    provinces.forEach(province => {
        const option = document.createElement('option');
        option.value = province;
        option.textContent = province;
        select.appendChild(option);
    });
}
//Nhóm 9: Tự động điền dữ liệu quận/huyện dựa trên tỉnh thành đã chọn
function populateCities(provinceSelectId, citySelectId) {
    const provinceSelect = document.getElementById(provinceSelectId);
    const citySelect = document.getElementById(citySelectId);

    if (!provinceSelect || !citySelect) return;

    provinceSelect.addEventListener('change', function() {
        const selectedProvince = this.value;

        // Xoá các option cũ trừ option đầu tiên
        while (citySelect.options.length > 1) {
            citySelect.remove(1);
        }
        // Thêm các option quận/huyện mới
        if (selectedProvince) {
            const cities = getCitiesForProvince(selectedProvince);

            // Thêm các option quận/huyện
            cities.forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
            // Kích hoạt dropdown quận/huyện
            citySelect.disabled = false;
        } else {
            // Nếu không chọn tỉnh thành nào, disable dropdown quận/huyện
            citySelect.disabled = true;
        }
    });
}
// Khởi tạo khi trang load xong
document.addEventListener('DOMContentLoaded', function() {
    populateProvinces('province');
    populateCities('province', 'city');
});

//Xuất module để sử dụng trong các môi trường hỗ trợ module như Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        VIETNAM_DATA,
        getProvinces,
        getCitiesForProvince,
        populateProvinces,
        populateCities
    };
}