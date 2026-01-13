document.addEventListener('DOMContentLoaded', function () {
  // ---- Doanh thu tuần ----
  const weeklyCtx = document.getElementById('weeklyRevenueChart').getContext('2d');
  new Chart(weeklyCtx, {
    type: 'bar',
    data: {
      labels: ['Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7','Chủ nhật'],
      datasets: [{
        label: 'Doanh thu (₫)',
        data: [1500000, 2000000, 1800000, 2200000, 1700000, 2500000, 1900000],
        backgroundColor: 'rgba(255,122,162,0.7)',
        borderColor: 'rgba(255,122,162,1)',
        borderWidth: 1,
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': ' + context.formattedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '₫';
            }
          }
        }
      },
      scales: {
        y: { beginAtZero: true, ticks: { callback: v => v.toLocaleString('vi-VN') + '₫' } },
        x: { grid: { display: false } }
      }
    }
  });

  // ---- Doanh thu tháng ----
  const monthlyCtx = document.getElementById('monthlyRevenueChart').getContext('2d');
  new Chart(monthlyCtx, {
    type: 'line',
    data: {
      labels: ['Tuần 1','Tuần 2','Tuần 3','Tuần 4'],
      datasets: [{
        label: 'Doanh thu (₫)',
        data: [7000000, 8500000, 9000000, 7500000],
        backgroundColor: 'rgba(255,122,162,0.3)',
        borderColor: 'rgba(255,122,162,1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4, // bo góc đường line
        pointRadius: 4,
        pointBackgroundColor: 'rgba(255,122,162,1)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': ' + context.formattedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '₫';
            }
          }
        }
      },
      scales: {
        y: { beginAtZero: true, ticks: { callback: v => v.toLocaleString('vi-VN') + '₫' } },
        x: { grid: { display: false } }
      }
    }
  });
});
