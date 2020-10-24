$(function () {
    // 封装一个渲染用户信息事件
    function updatauser() {
        $.ajax({
            url: 'http://139.9.177.51:3333/p2p/getuserinfo',
            type: 'get',
            async: false, // 变成同步的
            data: {
                userid: JSON.parse(localStorage.getItem('user')).id
            },
            success: function (data) {
                let { code, msg } = data;
                if (code === 200) {
                    var data = data.data;
                    let arr = ['nickname', 'email', 'username', 'lastlogintime', 'totalmoney', 'usablemoney', 'blockedmoney'];
                    for (key in data) {
                        if (arr.includes(key)) {
                            $(`#${key}`).html(`${data[key]}`);
                        }
                    }
                }
            }
        })
    }
    // 进入页面先调用一次
    updatauser();
    // 用户信息回填
    $('.btn').on('click', function () {
        $('#changenickname').val($('#nickname').text());
        $('#changeemail').val($('#email').text());
    })
    // 添加更改用户信息事件
    $('#cardbtn').on('click', function () {
        $.ajax({
            url: 'http://139.9.177.51:3333/p2p/updateuser',
            type: 'post',
            data: {
                userid: JSON.parse(localStorage.getItem('user')).id,
                nickname: $('#changenickname').val(),
                email: $('#changeemail').val(),
            },
            success: function (data) {
                let { msg, code } = data;
                if (code === 200) {
                    alert(`${msg},请重新登录`);
                    localStorage.clear();//清除本地储存
                    location.href = '../login.html';
                } else if (code === 500) {
                    alert(msg);
                }
            }

        })
    })

    // 配置echartsi信息
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));

    option = {
        legend: {
            orient: 'vertical',
            left:'left',
            data: ['可用金额', '冻结金额', '总金额'],
        },
        series: [
            {
                name: '访问来源',
                type: 'pie', 
                radius: '55%',
                center: ['50%', '40%'],
                data: [
                    { value: usablemoney.innerText, name: '可用金额' },
                    { value: blockedmoney.innerText, name: '冻结金额' },
                    { value: totalmoney.innerText, name: '总金额' },
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

     // 使用刚指定的配置项和数据显示图表。
     myChart.setOption(option);

})