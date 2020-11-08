$(function () {
    // 定义每页显示条数
    const pageSize = 5;
    // 默认获取第一页
    let page = 1;
    // 标杆
    let lock = true;
    // 封装一个获取充值列表的函数,传入页码数,获取该页列表
    function getRechargeRecordList(page) {
        $.ajax({
            url: 'http://139.9.177.51:3333/p2p/chargeRecord',
            type: 'get',
            async: false, // 变成同步的
            data: {
                userid: JSON.parse(localStorage.getItem('user')).id,
                // 传入页码数
                pageIndex: page,
                // 传入每页条数
                pageSize: pageSize
            },
            success: function (data) {
                // 获取数据总条数
                let { code, total } = data;
                if (code === 200) {
                    //计算页码总数
                let totalpage = Math.ceil(total / pageSize)
                /* 使用分页插件: 初始化 */
                if (lock) {
                    $("#page").paging({
                        pageNum: page, // 当前页码
                        totalNum: totalpage, // 总页码
                        totalList: total, // 数据总条数
                        callback: function (num) { // 回调函数 会把当前页码传入
                            // 获取当前页对应的数据
                            getRechargeRecordList(num)
                        }
                    })
                    lock = false;
                }
                    var data = data.data;
                    let str = '';
                    for (let i = 0; i < data.length; i++) {
                        str += `
                        <tr>
                            <td>${data[i].chargeTime}</td>
                            <td>${data[i].chargemoney}元</td>
                            <td>充值成功</td>
                            <td>线下充值${data[i].chargemoney}元</td>
                        </tr>
                        `
                    }
                    $('#chargedetails').html(str);
                }
            }
        })
    }
    // 先调用一次列表页面渲染事件
    getRechargeRecordList(page);
    

})