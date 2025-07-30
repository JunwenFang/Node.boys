// 初始化图表
document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('myChart');
  if (ctx) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: window.chartLabels,
        datasets: [{
          label: '收益率',
          data: window.chartValues,
          fill: false,
          borderColor: 'rgba(255, 102, 0, 1)',         
          tension: 0.1,
          pointBackgroundColor: 'rgba(255, 102, 0, 1)' 
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
              color: 'rgba(0, 0, 0, 0.1)',
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
  // // 初始化或更新饼图的函数
  // function initOrUpdatePieChart(cash, investments) {
  //   const pieCtx = document.getElementById('pieChart');
  //   if (pieCtx && (window.pieLabels || [cash, investments])) {
  //     // 如果已有实例，先销毁
  //     if (pieChartInstance) {
  //       pieChartInstance.destroy();
  //     }
      
  //     // 创建新实例
  //     pieChartInstance = new Chart(pieCtx, {
  //       type: 'pie',
  //       data: {
  //         labels: window.pieLabels,
  //         datasets: [{
  //           data: [cash, investments],
  //           backgroundColor: [cash, investments].map((_, i) => {
  //             const colors = [
  //               'rgba(255, 99, 132, 0.7)',
  //               'rgba(54, 162, 235, 0.7)',
  //               'rgba(255, 206, 86, 0.7)',
  //               'rgba(75, 192, 192, 0.7)',
  //               'rgba(153, 102, 255, 0.7)'
  //             ];
  //             return colors[i % colors.length];
  //           }),
  //           borderWidth: 1
  //         }]
  //       },
  //       options: {
  //         responsive: true,
  //         plugins: {
  //           legend: {
  //             position: 'right'
  //           }
  //         }
  //       }
  //     });
  //   }
  // }
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
              // 'rgba(255, 99, 132, 0.7)',
              // 'rgba(54, 162, 235, 0.7)',
              // 'rgba(255, 206, 86, 0.7)',
              // 'rgba(75, 192, 192, 0.7)',
              // 'rgba(153, 102, 255, 0.7)'
              'rgba(0, 217, 130, 1)',     // 绿色
              'rgba(239, 63, 63, 1)',   // 红色
              'rgba(54, 162, 235, 0.7)',  // 蓝色（如图右下对比线）
              'rgba(255, 204, 0, 0.7)',   // 黄色
              'rgba(153, 102, 255, 0.7)'  // 可选
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
            backgroundColor: 'rgba(0, 217, 130, 1)' 
          },
          { label: '证券',
            data: window.barInvestments,
            backgroundColor: 'rgba(239, 63, 63, 1)' 
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
              color: 'rgba(0, 0, 0, 0.1)',
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
