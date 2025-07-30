const response = await fetch('http://api.tushare.pro',{
    method: 'POST',
    headers: {
        'Content-Type' : 'application/json' 
    },
    body: JSON.stringify({
      api_name: 'daily',
      token: '32f21ba37fc15213e2e71c32277a58b381f1fb14543ab206dcbec0e4',
      params: {
        ts_code: '000333.SZ,601166.SH,000858.SZ,688981.SH,600030.SH,601998.SH,600276.SH,600000.SH,300059.SZ',
        start_date: '20250715',
        end_date: '20250729'
      },
      fields: 'ts_code,trade_date,close'
    })
});
if(response.ok) {
    const result = await response.json();
    let items = result.data.items;
    items.forEach(item => {
        console.log(`股票代码: ${item[0]}, 交易日期: ${item[1]}, 收盘价: ${item[2]}`);
    });
}else
{
    console.error('请求失败:', response.status, response.statusText);
}

