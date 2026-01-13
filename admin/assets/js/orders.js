document.addEventListener('DOMContentLoaded', function () {
  const rows = document.querySelectorAll('tbody tr[data-order-id]');
  
  rows.forEach(row => {
    row.addEventListener('click', () => {
      const orderId = row.getAttribute('data-order-id');
      // Chuyển sang trang quản lý đơn hàng với mã đơn hàng
      window.location.href = `orders.html?id=${orderId}`;
    });
  });
});
