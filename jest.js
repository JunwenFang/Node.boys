const request = require('supertest');
const express = require('express');
const app = require('./app'); // 假设你的app.js导出了app对象

describe('API 单元测试', () => {
  // 登录接口
  it('POST /login - 登录成功', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpass' });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.msg).toBe('login success');
  });

  // 更新现金接口
  it('POST /api/update-cash - 更新现金成功', async () => {
    const res = await request(app)
      .post('/api/update-cash')
      .send({ user_id: 1, cash: 1000 });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.cash).toBe(1000);
  });

  // 添加持仓
  it('POST /stocks/add - 添加持仓', async () => {
    const res = await request(app)
      .post('/stocks/add')
      .send({ stockName: '测试股票', ticker: '000001', buyPrice: 10, quantity: 5 });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty('id');
  });

  // 删除持仓
  it('POST /stocks/delete/:id - 删除持仓', async () => {
    const res = await request(app)
      .post('/stocks/delete/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});