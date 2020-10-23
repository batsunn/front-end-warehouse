$(function () {
    // 渲染借款详情页面
    $.ajax({
        url: 'http://139.9.177.51:3333/p2p/getborrowinfo',
        type: 'get',
        data: {
            // 接受上个页面传过来的参数
            borrowid: window.location.href.split("?")[1].split("=")[1],
        },
        success: function (data) {
            let { msg, code } = data;
            if (code === 200) {
                var data = data.data;
                // 处理数据
                data.borrowType = Type(data.borrowType);
                data.repaytype = repaytype(data.repaytype);
                // 渲染到页面
                $('#username').html(data.username);
                $('#title').html(`
                ${data.title}
                    <small><label class="label label-primary">${data.borrowType}</label></small>
                `);
                $('#borrowmoney').html(`${data.borrowmoney}.00元`);
                $('#interest').html(`${data.interest}%`);
                $('#borrowtime').html(`${data.borrowtime}月`);
                $('#repaytype').html(data.repaytype);
                $('#minbid').html(`${data.minbid}.00元`);
                $('#days').html(`${data.days}天`);
                $('#restmoney').html(`${data.borrowmoney - data.ownmoney}.00元`);
            }
        }
    })
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

    $('#investbtn').on('click', function () {
        $('#borrow-title').text($('#title').text());
        $('#borrow-money').text($('#borrowmoney').text());
        $('#needmoney').text($('#restmoney').text());
    })

    $('#cardbtn').on('click', function () {
        $.ajax({
            url: 'http://139.9.177.51:3333/p2p/invest',
            type: 'post',
            data: {
                userid: JSON.parse(localStorage.getItem('user')).id,
                borrowid: window.location.search.split("?")[1].split("=")[1],
                chargemoney: $('#cardNumber').val()
            },
            success: function (data) {
                let { code, msg } = data;
                if (code === 200) {
                    alert(msg);
                    location.href = '#personal/invest-record';
                } else if (code === 500) {
                    alert(msg);
                    $('#cardNumber').val('');
                }
            }
        })

    })



})