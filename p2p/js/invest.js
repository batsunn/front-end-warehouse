$(function () {
    // 定义每页显示条数
    const pageSize = 10;
    // 默认获取第一页
    let page = 1;
    // 标杆
    let lock = true;
    // 封装一个获取投资列表的函数,传入页码数,获取该页列表
    function getRechargeRecordList(page) {
        $.ajax({
            url: 'http://139.9.177.51:3333/p2p/getborrowList',
            type: 'get',
            // async: false, // 变成同步的
            data: {
                // 传入页码数
                pageIndex: page,
                // 传入每页条数
                pageSize: pageSize,
            },
            success: function (data) {
                // 获取数据总条数
                let { code, total } = data;
                //计算页码总数
                if (code === 200) {
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
                    let result = '';
                    for (let i = 0; i < data.length; i++) {
                        function step(i) {
                            return data[i].ownmoney / data[i].borrowmoney * 100 + '%';
                        };
                        data[i].repaytype = repaytype(data[i].repaytype);
                        result += `
                         <tr>
                         <td>${data[i].username}</td>
                         <td>${data[i].title}</td>
                         <td class="info">${data[i].interest}%</td>
                         <td class="info">${data[i].borrowmoney}元</td>
                         <td>${data[i].repaytype}</td>
                         <td>${step(i)}</td>
                         <td><a href="?id=${data[i].id}#borrow-details">查看</a></td>
                         </tr>
                         `;
                    }
                    $('#borrowList').html(result);
                }
            }
        })
    }


    //还款方式(0按月分期  1按月到期)
    function repaytype(data) {
        switch (data) {
            case 0:
                data = "按月分期";
                break;
            case 1:
                data = "按月到期";
                break;
            default:
                data = "按月分期";
                break;
        }
        return data;
    }
    /* 进入页面 第一次调用 */
    getRechargeRecordList(page)

})




