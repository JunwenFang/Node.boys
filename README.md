# Node.boys
financial portfolio management

# Node.boys 文件执行顺序与调用关系说明

本说明档案帮助你理解 Node.boys 金融投资组合管理系统的文件执行顺序和主要调用关系。

---

## 1. 项目启动流程

1. **入口文件：`app.js`**
   - 通过 `node app.js` 或 `npm start` 启动。
   - 初始化 Express 应用，配置模板引擎（EJS）、静态资源目录。
   - 定义路由（如 `/`, `/table`, `/login`）。
   - 提供模拟数据，传递给前端页面。
   - 启动服务器监听端口（默认 3000）。

2. **依赖加载：`package.json`**
   - 定义项目依赖（express、ejs 等）。
   - 启动脚本指向 `app.js`。

---

## 2. 路由与页面渲染

- **`app.js` 路由处理**
  - `/`      → 渲染 `views/chart.ejs`（图表仪表板）
  - `/table` → 渲染 `views/table.ejs`（数据表格）
  - `/login` → 渲染 `views/login.ejs`（登录页面）

- **EJS 模板调用关系**
  - 每个主页面（如 `chart.ejs`、`table.ejs`）都会 `include` 公共组件：
    - `partials/header.ejs`（头部导航）
    - `partials/sidebar.ejs`（侧边栏导航）
    - `partials/footer.ejs`（底部）

---

## 3. 前端静态资源加载

- **静态资源目录：`public/`**
  - 通过 `app.use(express.static(...))` 自动托管
  - 主要包含 `js/dashboard.js`，用于前端图表渲染

- **仪表板静态页面：`dashboard/`**
  - `index.html`、`dashboard.css`、`dashboard.js` 为纯前端演示用
  - 与主 Express 应用无直接调用关系

---

## 4. 主要调用关系图（文字版）

1. 用户访问网站（如 http://localhost:3000）
2. Express (`app.js`) 根据路由渲染对应 EJS 页面
3. EJS 页面 include 公共组件（header, sidebar, footer）
4. 页面加载时，浏览器自动加载 `public/js/dashboard.js`，渲染图表
5. 用户与页面交互（如登录、切换页面），Express 处理请求并返回新页面

---

## 5. 总结

- **后端主控**：`app.js` 负责所有路由和数据传递
- **前端渲染**：EJS 模板负责页面结构，JS 负责交互和图表
- **组件复用**：header/sidebar/footer 通过 EJS include 复用
- **静态资源**：public 目录下的 JS/CSS 供前端页面调用

本项目结构清晰，适合初学者理解 Node.js + Express + EJS 的典型调用流程。 
