$(function () {
    // 计算总金额
    function compute() {
        var totalMoney = 0;
        $(".list .items .active").each(function (index, item) {
            // console.log(item)
            //closest  找到指定class名的祖先元素
            var listItem = $(item).closest(".items");
            //获取单价
            var price = listItem.find(".total").text();
            //获取数目
            var num = listItem.find("input").val();
            totalMoney += price * num;
        });
        $(".total-money").html(totalMoney);
        $(".total-number").html($(".list .items .active").length)
    }
    compute();
    $(".list .items .select").click(function () {
        //判断当前点击的select是否有active类，有说明要取消勾选，没有说明要勾选。
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        } else {
            $(this).addClass("active");
        }
        //如果列表中的select和激活的数目一致，说明是全选中，否则是没有全选。
        if ($(".list .items .select").length == $(".list .items .active").length) {
            $(".count .select").addClass("active");
        } else {
            $(".count .select").removeClass("active");
        }
        //重新计算价格
        compute()
    });

    //全选和反选
    $(".count .select").click(function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(".list .items .select").removeClass("active");
        } else {
            $(this).addClass("active");
            $(".list .items .select").addClass("active");
        }

        //重新计算价格
        compute()
    })

    // 加减
    $(".list .caculate span").click(function () {
        var opt = $(this).text();
        var $input = $(this).siblings("input");
        var num = $input.val();
        // if (opt == "-") {
        //     num--;
        // } else {
        //     num++;
        // }
        opt == "-" ? num-- : num++;
        num = num < 1 ? 1 : num;
        $input.val(num);
        compute();
    });

    // $(".list .items input").change(function () {
    //     var reg = /(^[1-9]\d*$)/;
    //     if (reg.test($(this).val())) {
    //     }else{
    //         alert("请输入正确的数目");
    //         $(this).val("1");
    //     }
    //     compute();
    // })

});