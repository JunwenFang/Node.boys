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
  database: "portfolio_manager"
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
  values: [0, 10, 15, 12, 18, 28, 40]
};

const pieData = {
  labels: ['Cash', 'Investment'],
  values: [60, 40]
};

// 新增：柱状图数据（按时间序列，cash和证券价值比例）
const barData = {
  labels: ['7-1', '7-2', '7-3', '7-4', '7-5', '7-6', '7-7'],
  cash:   [100, 62, 58, 65, 63, 61, 59], // 百分比
  investments: [0, 38, 42, 35, 37, 39, 41] // 百分比
};

const tableData = [
  { id: '1', col1: '数据1', col2: '数据2', col3: '数据3', col4: '数据4' },
  { id: '2', col1: '数据5', col2: '数据6', col3: '数据7', col4: '数据8' },
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
app.get('/login', (req, res) => {
  res.render('login'); // assumes login.ejs is in the views folder
});

// 路由：表格页面
// 股票数据存储
let positions = []
async function fetchPositions() {
  return new Promise((resolve, reject) => {
    pool.query('SELECT position_id, stock_name, stock_code, cost, quantity FROM position', (err, results) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      positions = results;
      resolve(results);
    });
  });
};
  // 启用JSON请求体解析
  app.use(express.json());

  app.get('/table', async (req, res) => {
    await fetchPositions(); // 确保在渲染前获取最新数据
    res.render('table', {
      tableData: positions.map(row => ({
        id: row.position_id,
        stockName: row.stock_name,
        ticker: row.stock_code,
        TbuyPrice: row.cost,
        quantity: row.quantity,
        currentPrice: 0
      }))
    })
  });

// 添加持仓
app.post('/stocks/add', (req, res) => {
  const { stockName, ticker, buyPrice, quantity } = req.body;

  pool.query(
    'INSERT INTO `position` (stock_name, stock_code, cost, quantity, create_time, user_id) VALUES (?, ?, ?, ?, NOW(), ?)',
    [stockName, ticker, buyPrice, quantity, 1],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: '添加持仓失败' });
      }
      res.json({ success: true, id: result.insertId });
    }
  );
});

// 更新持仓
app.post('/stocks/update/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { stockName, ticker, buyPrice, quantity } = req.body;
  pool.query(
    'UPDATE position SET stock_name = ?, stock_code = ?, cost = ?, quantity = ? WHERE position_id = ?',
    [stockName, ticker, buyPrice, quantity, id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: '更新持仓失败' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: '持仓未找到' });
      }
      res.json({ success: true });
    }
  );
});

// 删除持仓
app.post('/stocks/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(
    'DELETE FROM position WHERE position_id = ?',
    [id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: '删除持仓失败' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: '持仓未找到' });
      }
      res.json({ success: true });
    }
  );
});


  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    pool.query('select * from users where username = ? and password = ?',
      [username, password], (err, result) => {
        if (err) throw err;
        if (result.length != 1) {
          res.status(500);
        }
        res.json({
          success: true,
          msg: 'login success'
        });
      }
    );
  });


  // 启动服务器
  app.listen(3000, () => {
    console.log('服务器运行在 http://localhost:3000');
  });
