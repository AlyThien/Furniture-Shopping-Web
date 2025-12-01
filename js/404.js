// Xử lý nút "Quay lại" và redirect link có data-404
document.addEventListener('DOMContentLoaded', function () {
  const back = document.getElementById('nf-back');
  if (back) back.addEventListener('click', () => window.history.length > 1 ? window.history.back() : window.location.href = '/index.html');

  // tất cả link có attribute data-404 sẽ điều hướng tới trang 404
  document.querySelectorAll('a[data-404]').forEach(a => {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      // thay đổi đường dẫn hiển thị (không reload server) hoặc force load /404.html
      window.location.href = '/404.html';
    });
  });

  
});