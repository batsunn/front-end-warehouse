// 文档加载事件
$(function () {
    // alert(1)
    //全选
    $('.allSel').change(function () {
        // alert(1)
        //获取当前全选的状态
        let status = $(this).prop('checked');

        //同步单个商品的状态值
        $('.singleSel').prop('checked', status);
        //把另一个全选设置状态值
        // $('.allSel').prop('checked',status);
        singlePrice($(this).closest('tr').siblings('tr').find('.reNum'));
        //总价和总量
        aconut();
    });

    //反选
    /* 
        思路:
            给单个商品选项注册点击事件

            定义标杆
            遍历获取到所有单个商品的状态值
                判定,如果有一个状态值为false 切换标杆

            判定标杆的值,对应设置到选中按钮上

    
    */

    $('.outSel').change(function () {
        // alert(1)
        //获取当前全选的状态
        $.each($('.singleSel'), function (index, value) {
            let status = $(this).prop('checked');
            $(this).prop('checked', !status);
        });
        //同步单个商品的状态值
        //把另一个全选设置状态值
        // $('.allSel').prop('checked',status);
        //总价和总量
        singlePrice($(this).closest('tr').siblings('tr').find('.reNum'));
        aconut();
    });

    //注册事件
    $('.singleSel').click(function () {
        // alert(1)
        //定义标杆
        let flag = true;

        //获取所有单个商品的状态值
        //let status=$(this).prop('checked');//只能获取当前单个商品的状态

        //遍历
        $('.singleSel').each(function (index, dom) {
            // console.log(dom)
            let status = $(this).prop('checked');
            // console.log(status);

            //判定状态值 进行切换标杆  只要有一个false就切换标杆
            if (!status) {// status进来时必需为false
                //切换标杆
                flag = false;

                //结束循环
                return false;

            }
        })

        // 判定标杆的状态,设置相应的全选按钮的状态值
        if (flag) {
            //全选
            $('.allSel').prop('checked', true);
        } else {
            //不进行全选
            $('.allSel').prop('checked', false);
        }
        singlePrice($(this).parent().siblings('td').find('.reNum'));
        //总价和总量
        aconut();

    })


    //数量增加
    $('.addNum').click(function () {
        //获取当前商品的数量
        let n = $(this).siblings('.num').val();

        //进行n增加  在原来的基础上进行加操作
        n++;

        //把操作后的n放入 input标签的value中
        $(this).siblings('.num').val(n);
        //小计
        singlePrice(this);
        //总价和总量
        aconut();

    })

    //数量减少
    $('.reNum').click(function () {
        //获取当前商品的数量
        let n = $(this).siblings('.num').val();

        //进行n减  在原来的基础上进行减操作
        n--;

        //判定
        if (n < 1) {
            return false;
        }

        //把操作后的n放入 input标签的value中
        $(this).siblings('.num').val(n);
        //小计
        singlePrice(this);
        //总价和总量
        aconut();
    })


    //小计功能:   小计=选中的单价*数量  
    function singlePrice(obj) {
        //获取选中数量
        let num = $(obj).siblings('.num').val()
        //获取当前选中商品的单价
        let sp = $(obj).closest('tr').find('.price').children('b').text();
        sp = parseInt(sp)
        num = parseInt(num)
        //计算小计
        let sconut = sp * num;
        //小数位处理
        sconut = Number(sconut.toFixed(2));
        $(obj).closest('tr').val(sconut)

        //把小计放入到指定位置中
    }


    //计算总价和总数量
    /* 
        思路: 
            1.使用变量来保存 总数量和总价格
            2.获取已选中的商品的数量和小计
    */

    function aconut() {
        //定义变量保存数据
        //总价格
        let allPrice = 0;
        //总数量
        let allNum = 0;

        //总数量---遍历获取  因为后期有很多商品
        $('.singleSel:checked').each(function () {
            let alln = parseInt($(this).closest('tr').find('.num').val());
            //进行累加操作
            allNum += alln

            //总价格
            let aprice = parseFloat($(this).closest('tr').val());
            //进行价格累加 
            allPrice += aprice;

        })

        //添加总数量到 numTotal
        $('.numTotal').text(allNum);

        //数据处理
        allPrice = allPrice.toFixed(2);
        //添加总价格到 priceTotal
        $('.priceTotal b').text(allPrice);


    }

    // $('.dbutton')[0].click(function(){

    // })
    let dbutton=document.querySelectorAll('.dbutton')
    for(let i=0;i<=dbutton.length-1;i++){
        dbutton[i].onclick=function(){
            if(i==0){
                $('.singleSel:checked').closest($('tr')).remove()
            }else{
                this.parentNode.parentNode.parentNode.removeChild( this.parentNode.parentNode)
               
            }
        }
    }










})