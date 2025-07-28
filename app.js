const express = require('express');
const app = express();
const path = require('path');

// 配置EJS模板引擎
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 静态资源目录（存放dashboard.js等）
app.use(express.static(path.join(__dirname, 'public')));

// 模拟数据
const chartData = {
  labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  values: [65, 59, 80, 81, 56, 55, 40]
};

const tableData = [
  { id: '1,001', col1: 'random', col2: 'data', col3: 'placeholder', col4: 'text' },
  { id: '1,002', col1: 'placeholder', col2: 'irrelevant', col3: 'visual', col4: 'layout' },
  // 更多数据...
];

// 路由：曲线图页面
app.get('/', (req, res) => {
  res.render('chart', {
    dateRange: '本周',
    chartData: chartData // 传递图表数据到前端
  });
});

// 路由：表格页面
app.get('/table', (req, res) => {
  res.render('table', {
    tableData: tableData // 传递表格数据到前端
  });
});

app.get('/login', (req, res) => {
  res.render('login'); // assumes login.ejs is in the views folder
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Add login logic here (e.g. check credentials)
  res.send(`Logged in as ${username}`);
});


// 启动服务器
app.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000');
});