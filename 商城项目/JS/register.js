window.onload = function () {
    let step1 = document.querySelector('#register .agreement button')
    let step2 = ptn2
    let div = document.querySelectorAll('#register ul li div')
    let form = document.querySelector('#register form')
    let agreement = document.querySelector('#register .agreement')
    let success = document.querySelector('#register .success')
    step1.onclick = function () {
        div[0].classList.add('on')
        div[1].classList.remove('on')
        div[3].classList.add('on')
        div[2].classList.remove('on')
        agreement.style.display = 'none'
        form.style.display = 'block'
    }
    $('#myform').validate({
        //key:value
        //规则
        rules: {
            truename: {
                required: true,
                isTruename: true
            },
            username: {
                required: true,
                isUser: true
            },
            pwd: {
                required: true,
                isPwd: true
            },
            surePwd: {
                required: true,
                equalTo: '#pwd1'
            },
            tel: {
                required: true,
                isTel: true
            },
            email:{
                required: true,
                isTel: true
            }
        },
        submitHandler:function(form) {
            div[3].classList.remove('on')
                        div[2].classList.add('on')
                        div[5].classList.add('on')
                        div[4].classList.remove('on')
                        form.style.display = 'none'
                        success.style.display = 'block'
        },
        //提示信息
        messages: {
            truename: {
                required: '请输入真实姓名'
            },
            username: {
                required: '请输入用户名'
            },
            pwd: {
                required: "请输入密码"
            },
            surePwd: {
                required: '请再次确认密码',
                equalTo: '两次密码不一致'
            },
            tel: {
                required: '请输入手机号',
                isTel: '请输入正确的手机号码'
            },
            email:{
                required: '请输入邮箱',
                isTel: '请输入正确的邮箱'
            }
        }
    })
    jQuery.validator.addMethod("isTruename", function (value, element) {
        var tel = /^[\u4e00-\u9fa5]{2,4}$/;
        return this.optional(element) || (tel.test(value));
    }, "真实姓名不存在!!!");

    jQuery.validator.addMethod("isUser", function (value, element) {
        var tel = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
        return this.optional(element) || (tel.test(value));
    }, "用户名不合法!!!");

    //密码规则
    jQuery.validator.addMethod("isPwd", function (value, element) {
        var tel = /^[a-zA-Z]\w{5,17}$/;
        return this.optional(element) || (tel.test(value));
    }, "密码格式不正确!!!");

    jQuery.validator.addMethod("isTel", function (value, element) {
        var length = value.length;
        var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        return this.optional(element) || (length == 11 && mobile.test(value));
    }, "请填写正确的手机号码");//可以自定义默认提示信息

    


}