// 初始化图表
document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('myChart');
  if (ctx) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: window.chartLabels,
        datasets: [{
          label: '盈亏金额',
          data: window.chartValues,
          fill: false,
          borderColor: 'rgba(37, 198, 133, 0.85)',   // 柔和绿
          tension: 0.1,
          pointBackgroundColor: 'rgba(255, 215, 0, 1)',  // 金色
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: '日期'
            },
            grid: {
              display: true,
              color: 'rgba(35, 39, 43, 0.5)',            // 深灰半透明网格线
              drawBorder: true,
              drawOnChartArea: true,
              drawTicks: true
            }
          },
          y: {
            display: true,
            beginAtZero: true,
            min: 0,
            max: Math.max(...window.chartValues) * 1.2, // 动态设置最大值
            title: {
              display: true,
              text: '收益率 (%)'
            },
            grid: {
              display: false, // 不显示Y轴网格线
              drawBorder: true,
              drawOnChartArea: false,
              drawTicks: true
            }
          }
        }
      }
    });
  }

  // 初始化饼图
  const pieCtx = document.getElementById('pieChart');
  if (pieCtx && (window.pieLabels || window.pieValues)) {
    new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: window.pieLabels,
        datasets: [{
          data: window.pieValues,
          backgroundColor: (window.pieValues ).map((_, i) => {
            const colors = [
              'rgba(138, 180, 248, 0.85)',   // 银蓝
              'rgba(255, 215, 0, 0.85)',    // 金色
              'rgba(176, 179, 184, 0.85)',  // 银灰
              'rgba(37, 198, 133, 0.85)',   // 柔和绿
              'rgba(231, 76, 60, 0.85)'     // 柔和红
            ];
            return colors[i % colors.length];
          }),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }
    });
  }

  
  // 初始化投资比例柱状图
  const barCtx = document.getElementById('barChart');
  if (barCtx && window.barLabels && window.barCash && window.barInvestments) {
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: window.barLabels,
        datasets: [
          { label: '现金',
            data: window.barCash,
            backgroundColor: 'rgba(37, 198, 133, 0.85)',   // 柔和绿
          },
          { label: '证券',
            data: window.barInvestments,
            backgroundColor: 'rgba(231, 76, 60, 0.85)'     // 柔和红
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true, text: '日期'
            },
            grid: {
              display: true,
              color: 'rgba(35, 39, 43, 0.5)',            // 深灰半透明网格线
              drawBorder: true,
              drawOnChartArea: true,
              drawTicks: true
            }
          },
          y: {
            display: true,
            beginAtZero: true,
            min: 0,      // 明确指定最小值
            max: 100,    // 明确指定最大值
            title: {
              display: true, text: '百分比(%)'
            },
            grid: {
              display: false, // 不显示Y轴网格线
              drawBorder: true,
              drawOnChartArea: false,
              drawTicks: true
            }
          }
        }
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
