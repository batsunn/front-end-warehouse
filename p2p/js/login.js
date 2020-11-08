$(function () {
    // 给登录按钮绑定点击事件
    $('#btn').on('click', function () {
        // 发送ajax请求
        $.ajax({
            url: 'http://139.9.177.51:3333/p2p/login',
            type: 'post',
            data: {
                username: $('#username').val(),
                pwd: $('#pwd').val()
            },
            success: function (data) {
                let { code, msg } = data;
                if (code === 200) {
                    // 取出响应的数据||登录用户的数据
                    var data = data.data;
                    // 存入本地
                    localStorage.setItem('user', JSON.stringify(data));
                    alert(msg);
                    location.href = '../index.html';
                } else if (code === 500) {
                    alert(msg);
                    $('#username').val('');
                    $('#pwd').val('');
                }
            }
        })
    })


})