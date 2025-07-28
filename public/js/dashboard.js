// 初始化图表
document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('myChart');
  if (ctx) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: window.chartLabels,
        datasets: [{
          label: '数据趋势',
          data: window.chartValues,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    });
  }
});
// // public/js/dashboard.js
// document.addEventListener('DOMContentLoaded', () => {
//   const ctx = document.getElementById('myChart');
//   if (ctx && window.chartData) { // 确保图表容器和数据存在
//     new Chart(ctx, {
//       type: 'line', // 曲线图类型
//       data: {
//         labels: window.chartData.labels, // x轴标签（来自后端数据）
//         datasets: [{
//           label: '数据趋势',
//           data: window.chartData.values, // y轴数据（来自后端数据）
//           fill: false,
//           borderColor: 'rgb(75, 192, 192)',
//           tension: 0.1 // 曲线平滑度
//         }]
//       },
//       options: {
//         responsive: true,
//         scales: {
//           y: {
//             beginAtZero: true // y轴从0开始
//           }
//         }
//       }
//     });
//   }
// });
// 初始化feather图标
feather.replace();