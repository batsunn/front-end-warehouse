$(function () {
    // 定义每页显示条数
    const pageSize = 5;
    // 默认获取第一页
    let page = 1;
    // 标杆
    let lock = true;
    // 封装一个获取借款列表的函数,传入页码数,获取该页列表
    function getRechargeRecordList(page) {
        $.ajax({
            url: 'http://139.9.177.51:3333/p2p/getMyBorrowList',
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
                        data[i].borrowType = Type(data[i].borrowType);
                        str += `
                    <tr>
                        <td><a href="#">${data[i].title}</a><span class="blue">${data[i].borrowType}</span></td>
                        <td>${data[i].days}天</td>
                        <td>${data[i].borrowmoney}元</td>
                        <td>${data[i].borrowtime}月</td>
                        <td>${data[i].interest}%</td>
                        <td>    
                            <span class="Bidding">招标中</span>
                        </td>
                    </tr>
                        `
                    }
                    $('#borrow-items').html(str);
                }
            }

        })
    }
    // 先调用一次列表页面渲染事件
    getRechargeRecordList(page);


    // 借款类型(1信用贷 2车易贷 3房易贷)
    function Type(data) {
        switch (data) {
            case 1:
                data = "信";
                break;
            case 2:
                data = "车";
                break;
            case 3:
                data = "房";
                break;

            default:
                data = "信";
                break;
        }
        return data;
    }



})