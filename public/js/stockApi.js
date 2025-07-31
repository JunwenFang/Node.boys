
async function fetchStockData(ts_code,start_date,end_date) {
    const response = await fetch('http://api.tushare.pro',{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json' 
        },
        body: JSON.stringify({
          api_name: 'daily',
          token: '32f21ba37fc15213e2e71c32277a58b381f1fb14543ab206dcbec0e4',
          params: {
            ts_code: ts_code,
            start_date: start_date,
            end_date: end_date
          },
          fields: 'ts_code,trade_date,close'
        })
    });
    if(response.ok) {
        const result = await response.json();
        return result.data.items;
        
    }else
    {
        throw new Error('请求失败:', response.status, response.statusText);
    }
}

async function fetchRecentTradeDay(n) {
    let start_date = new Date();
    start_date.setDate(start_date.getDate() - n*2); // 预留两倍的天数以确保获取到足够的交易日
    let end_date = new Date();
    end_date.setDate(end_date.getDate() - 1); // 不包括今天
    const response = await fetch('http://api.tushare.pro', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        api_name: 'trade_cal',
        token: '32f21ba37fc15213e2e71c32277a58b381f1fb14543ab206dcbec0e4',
        params: {
            exchange: '',
            is_open: 1,
            start_date: start_date.toISOString().slice(0, 10).replace(/-/g, ''),
            end_date: end_date.toISOString().slice(0, 10).replace(/-/g, '')
        },
        fields: 'cal_date'
        })
    });
    if (response.ok) {
        const result = await response.json();
        return result.data.items.slice(0, n).map(item => item[0]).reverse(); // 返回最近n个交易日
    } else {
        throw new Error('获取交易日失败:', response.status, response.statusText);
    }
}

module.exports = { fetchStockData, fetchRecentTradeDay };