$(function () {
    // 取出当前用户id
    var id = JSON.parse(localStorage.getItem('user')).id
    // 给按钮添加绑定眼蛤工卡事件
    $('#cardbtn').on('click', function () {
        // 发送绑定银行卡的ajax
        $.ajax({
            url: 'http://139.9.177.51:3333/p2p/bindCard',
            type: 'post',
            data: {
                userid: id,
                bankName: $('#bankName').val(),
                branchName: $('#branchName').val(),
                cardNumber: $('#cardNumber').val(),
            },
            success: function (data) {
                let { msg, code } = data;
                if (code === 200) {
                    alert(msg);
                    $('#myModal').modal('hide');
                    // 绑定成功再调用一次银行卡列表页面渲染事件
                    getcardlist();
                } else if (code === 500) {
                    alert(msg);
                }
            }
        })


    })

    // 获取银行卡列表，渲染
    function getcardlist() {
        $.ajax({
            url: 'http://139.9.177.51:3333/p2p/cardList',
            type: 'get',
            data: {
                userid: id,
            },
            success: function (data) {
                let { code, msg } = data;
                if (code === 200) {
                    var cardlist = data.data;
                    var result = '';
                    for (let i = 0; i < cardlist.length; i++) {
                        result += `
                        <div class="col-sm-5">
                        <div class="card">
                            <div class="card-body">
                              <h4 class="card-title">${cardlist[i].bankName}</h4>
                              <p class="card-text">${cardlist[i].branchName}</p>
                              <h5>${cardlist[i].cardNumber}</h5>
                            </div>
                          </div>
                    </div> `
                    }
                    $('.cardlist .row').html(result);
                } else if (code === 500) {
                    alert(msg);
                }
            }

        })
    }
    // 先调用一次银行卡列表渲染事件
    getcardlist();

})