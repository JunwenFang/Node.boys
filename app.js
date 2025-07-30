const { ok } = require('assert');
const express = require('express');
const app = express();
const mysql = require("mysql2")
const path = require('path');

const pool = mysql.createPool({
  host: "110.41.47.134",
  port: 9000,
  user: "root",
  password: "root",
  database:"portfolio_manager"
})

// 配置EJS模板引擎
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 静态资源目录（存放dashboard.js等）
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// 模拟数据
const lineData = {
  labels: ['7-1', '7-2', '7-3', '7-4', '7-5', '7-6', '7-7'],
  values: [65, 59, 80, 81, 56, 55, 40]
};

const pieData = {
  labels: ['Cash', 'Investment'],
  values: [60,40]
};

// 新增：柱状图数据（按时间序列，cash和证券价值比例）
const barData = {
  labels: ['7-1', '7-2', '7-3', '7-4', '7-5', '7-6', '7-7'],
  cash:   [60, 62, 58, 65, 63, 61, 59], // 百分比
  investments: [40, 38, 42, 35, 37, 39, 41] // 百分比
};

const tableData = [
  { id: '1,001', col1: 'random', col2: 'data', col3: 'placeholder', col4: 'text' },
  { id: '1,002', col1: 'placeholder', col2: 'irrelevant', col3: 'visual', col4: 'layout' },
  // 更多数据...
];

// 模拟用户数据
const userData = {
  name: '张三',
  accountType: 'VIP账户',
  balance: 12500,
  cash: 7500,
  investments: 5000
};

// 路由：曲线图页面
app.get('/', (req, res) => {
  res.render('chart', {
    dateRange: '本周',
    lineData: lineData, // 传递折线图数据到前端
    pieData: pieData, // 传递饼图数据到前端
    user: userData, // 传递用户数据到前端,
    barData: barData // 新增：传递柱状图数据
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
  pool.query('select * from users where username = ? and password = ?',
    [username,password],(err,result)=>{
      if(err) throw err;
      if(result.length!=1){
        res.status(500);
      }
      res.json({
        success:true,
        msg: 'login success'
      });
    }
  );
});


// 启动服务器
app.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000');
});
