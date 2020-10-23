$(function () {
    // 选项卡切换
    let li = document.querySelectorAll('.tab li')
    for (let i = 0; i < li.length; i++) {
        li[i].onclick = function () {
            if (i == 0) {
                li[0].classList.remove('active')
                li[1].classList.remove('active')
                li[0].classList.add('active')
                tab1.classList.remove('show')
                tab2.classList.remove('show')
                tab1.classList.add('show')
            } else if (i == 1) {
                li[0].classList.remove('active')
                li[1].classList.remove('active')
                li[1].classList.add('active')
                tab1.classList.remove('show')
                tab2.classList.remove('show')
                tab2.classList.add('show')
            }
        }
    }
    // 获取本地用户名进行渲染
    let username = JSON.parse(localStorage.user).username
    $('#head-username').html(`<a href="index.html#personal">${username}</a>`)
    // 给注销添加点击事件
    $('#unbind').on('click', function () {
        localStorage.clear();//清除本地储存
        location.href = '../index.html';
    })
    // 渲染银行卡列表
    $.ajax({
        url: 'http://139.9.177.51:3333/p2p/cardList',
        type: 'get',
        data: {
            userid: JSON.parse(localStorage.user).id
        },
        success: function (data) {
            let { code, msg } = data;
            if (code === 200) {
                var data = data.data;
                let result = '';
                for (let j = 0; j < data.length; j++) {
                    result += `
                            <tr>
                                <td><span><img src="./images/bank_list.png" alt=""></span>${data[j].bankName}</td>
                                <td>${data[j].userid}</td>
                                <td>${data[j].cardNumber}</td>
                                <td>${data[j].branchName}</td>
                            </tr>
                            `
                }
                $('#cardlist').html(result);
            }
        }
    })
    // 渲染充值列表
    $.ajax({
        url: 'http://139.9.177.51:3333/p2p/cardList',
        type: 'get',
        data: {
            userid: JSON.parse(localStorage.getItem('user')).id
        },
        success: function (data) {
            let { code, msg } = data;
            let res = '';
            if (code === 200) {
                var data = data.data;
                for (let k = 0; k < data.length; k++) {
                    res += `   <option value=${data[k].id}>${data[k].bankName}${data[k].cardNumber}(${data[k].branchName})</option>`

                }
                $('#cardselect').html(res);
                $('#tradenumber').val($('#cardselect').val() + '000')
                $('#cardselect').on('change', selected)

            }
        }
    })
    // 进行交易号数据处理
    function selected() {
        $('#tradenumber').val($('#cardselect').val() + '000');
    }
    // 给充值按钮添加点击事件
    $('#investmoney').on('click', function () {
        $.ajax({
            url: ' http://139.9.177.51:3333/p2p/charge',
            type: 'post',
            data: {
                userid: JSON.parse(localStorage.getItem('user')).id,
                money: $('#money').val(),
                cardid: $('#cardselect').val()
            },
            success: function (data) {
                let { code, msg } = data;
                if (code === 200) {
                    alert(msg);
                    location.href = 'index.html#personal/account';
                }
            }
        })
    })

})
