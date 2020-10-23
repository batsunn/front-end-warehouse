$(function () {
    // 定义每页显示条数
    const pageSize = 5;
    // 默认获取第一页
    let page = 1;
    // 标杆
    let lock = true;
    function getinvestrecord(page) {
        $.ajax({
            url: 'http://139.9.177.51:3333/p2p/investList',
            type: 'get',
            async: false, // 变成同步的
            data: {
                userid: JSON.parse(localStorage.getItem('user')).id,
                pageIndex: page,
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
                                getinvestrecord(num)
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
                        result += `
                        <tr>
                            <td>${data[i].title}</td>
                            <td>${data[i].borrowmoney}元</td>
                            <td>${data[i].chargemoney}元</td>
                            <td>${step(i)}</td>
                            <td>${data[i].chargeTime}</td>
                        </tr>
                            `;
                    }
                    $('#invest-items').html(result);
                }
            }
        })
    }

    getinvestrecord(page);

})