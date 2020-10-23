$(function () {
    // 获取地址栏参数,得到借款类型
    var index="value=2".lastIndexOf("=");
    let urldata=window.location.search.substr(1).substring(index+1);
    // 渲染处理过后的借款类型
    $('#typeicon').html(Type(urldata));
    // 添加借款事件www
    $('#borrowbtn').on('click', function () {
        $.ajax({
            url: 'http://139.9.177.51:3333/p2p/borrow',
            type: 'post',
            data: {
                userid: JSON.parse(localStorage.getItem('user')).id,
                borrowType: urldata,
                borrowmoney: $('#borrowmoney').val(),
                interest: $('#interest').val(),
                borrowtime: $('#borrowtime').val(),
                repaytype: $('.radio-inline input:checked').val(),
                minbid: $('#minbid').val(),
                bouns: $('#bouns').val(),
                days: $('#days').val(),
                title: $('#title').val(),
                info: $('#info').val(),
            },
            success: function (data) {
                let {msg,code}=data;
                if(code===200){
                    alert(msg);
                    location.href='#personal';
                }else if(code===500){
                    alert(msg);
                }
            }
        })
    })
    

  
    // 借款类型(1信用贷 2车易贷 3房易贷)
    function Type(data) {
        switch (data) {
            case '1':
                data="信用贷";
                $('#typeicon').css('background-color','#40d47e');
                break;
            case '2':
                data="车易贷";
                $('#typeicon').css('background-color','#ec7e20');
                break;
            case '3':
                data="房易贷";
                $('#typeicon').css('background-color','#2ca2ee');
                break;

            default:
                data="信用标";
                break;
        }
        return data;
    }

})