# GREEN-FURNITURE-SHOPPING-WEB (IE104 - ĐỒ ÁN TRANG WEB BÁN HÀNG NỘI THẤT THIÊN NHIÊN)

* Trường Đại học Công nghệ Thông tin, Đại học Quốc gia Thành phố Hồ Chí Minh (ĐHQG-HCM)
* Khoa: Khoa học và Kỹ thuật thông tin (KH&KTTT)
* GVHD: ThS. Võ Tấn Khoa
* Nhóm sinh viên thực hiện: Nhóm 9

## Danh sách thành viên
| STT | Họ Tên | MSSV | Chức vụ |
|:---:|:-------------:|:-----:|:-----:|
|1.   | Lê Trần Đức Thiện | 23521478 | Nhóm trưởng |
|2.   | Nguyễn Trần Khánh Vân | 23521773 | Thành viên |
|3.   | Từ Lý Mai             | 23520912 | Thành viên |
|4.   | Đỗ Bá Luân            | 23520895 | Thành viên |
|5.   | Trần Thanh Hà         | 23520415 | Thành viên |

## Giới thiệu
Với sự "mọc lên" trong nhu cầu mua sắm của mọi gia đình, có hàng trăm lối đi cũng như phong cách trong thiết kế các sản phẩm nội thất. Vì vậy, nhằm tăng thêm sự chuyên nghiệp cũng như là hướng tới một lối sống hoà mình vào thiên nhiên trong sản phẩm, không thể thiếu trang Web bán hàng đảm bảo hai yếu tố này, giúp tăng trải nghiệm người dùng, và đáp ứng đủ chức năng bán hàng.

Vì vậy, nhóm quyết định chọn đề tài "Thiết kế trang web bán hàng nội thất thiên nhiên".

## Tính năng
| ID | Tên tác nhân | Mô tả tác nhân |
|:---:|:-------------:|:-----:|
| 01 | Unauthenticated User (Người dùng chưa xác thực) | Người dùng chưa có tài khoản hoặc có nhưng chưa đăng nhập. Nhóm người dùng này được phép sử dụng toàn quyền các tính năng như xem sản phẩm, mua hàng, ... (trừ việc thông tin liên lạc và địa chỉ không được lưu lại cho lần sau và tính năng bình luận, ...) |
| 02 | Authenticated User (Người dùng đã xác thực) | Người dùng đã có tài khoản và đăng nhập. Nhóm người này cũng được toàn quyền tính năng trong trang web và các thông tin cá nhân được lưu lại cho lần mua hàng sau và review sản phẩm, ... |
| 03 | Admin (Quản trị viên: chủ shop, nhân viên) | Là nhóm người dùng có quyền hạn cao nhất trong hệ thống. Quản trị viên có thể quản lý người dùng, quản lý thông tin sản phẩm, kho hàng, xem và cập nhật trạng thái đơn hàng, báo cáo kinh doanh. Quản trị viên đảm bảo hoạt động chung của hệ thống, bảo mật, và có quyền cấp phép và phân quyền cho các tài khoản khác trong hệ thống. |

| ID | Tên chức năng | Tác nhân | Tiến độ hoàn thành |
|:---:|:-------------:|:-----:|:--------------------:|
| A1 | Đăng nhập tài khoản | 01 | 100% |
| A2 | Tìm kiếm sản phẩm | 01, 02 | 50% |
| A3 | Xem danh sách sản phẩm | 01, 02 | 100% |
| A4 | Xem chi tiết sản phẩm | 01, 02 | 100% |
| A5 | Sử dụng bộ lọc | 01, 02 | 0% |
| A6 | Xem thông tin cá nhân | 02 | 80% |
| A7 | Sửa thông tin cá nhân | 02 | 90% |
| A8 | Đăng xuất | 02 | 100% |
| A9 | Thêm vào giỏ hàng | 01, 02 | 100% |
| A10 | Quản lý giỏ hàng | 01, 02 | 100% |
| A11 | Đặt hàng | 01, 02 | 100% |
| A12 | Thanh toán | 01, 02 | 100% |
| A13 | Xem lịch sử mua hàng | 02 | 50% |
| A14 | Đánh giá | 02 | 100% |
| A15 | Quản lý đơn hàng | 03 | 100% |
| A16 | Quản lý kho | 03 | 90% |
| A17 | Quản lý báo cáo kinh doanh | 03 | 0% |

## Công nghệ sử dụng
<p align="left"> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> </p>

## Hướng dẫn cài đặt (Lưu ý đồ án chỉ có FrontEnd, có thể sẽ cập nhật BackEnd trong tương lai)
### Bước 1: Thực hiện clone repository này với lệnh
```
https://github.com/AlyThien/Furniture-Shopping-Web.git
```

### Bước 2: Mở dự án mới clone về và thực hiện các lệnh sau
```
npm install
```
```
npm start
```
