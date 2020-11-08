$(function () {
    // 获取输入框的值
    $('#username').on('blur', validatausername)
    $('#pwd').on('blur', validatapwd)
    $('#cpwd').on('blur', validatacpwd)
    $('#email').on('blur', validataemail)
    $('#nickname').on('blur', validatanickname)
    // 验证用户名
    function validatausername() {
        let reg = /^[a-zA-Z0-9_\u4E00-\u9FA5]{3,16}$/; // 3到16位（字母，数字，下划线，中文）
        // 建立标杆
        let flag = false;
        let val = $('#username').val();
        // 非空验证
        if (!val) {
            $('#username').css('border', '1px solid red')
            $('#username-msg').html('请输入用户名').css('color', 'red')
            flag = false;
            // 正则验证
        } else if (!reg.test(val)) {
            $('#username').css('border', '1px solid red')
            $('#username-msg').html('3到16位（字母，数字，下划线，中文）').css('color', 'red')
            flag = false;
            // 发送ajax请求
        } else {
            $.ajax({
                url: 'http://139.9.177.51:3333/p2p/accrepeat',
                type: 'post',
                async: false, // 变成同步的
                data: {
                    username: val,
                },
                success: function (data) {
                    // 解构响应的数据
                    let { code, msg } = data;
                    // 请求成功
                    if (code === 200) {
                        $('#username').css('border', '1px solid green')
                        $('#username-msg').html('')
                        flag = true;
                        // 请求失败
                    } else if (code === 500) {
                        $('#username').css('border', '1px solid red')
                        $('#username-msg').html(msg).css('color', 'red')
                        flag = false;
                    }
                }
            })
        }
        // 返回标杆值，表面是否通过验证
        return flag;
    }
    // 验证密码
    function validatapwd() {
        let reg = /^(\w){3,12}$/; // 3-12个字母、数字、下划线
        let flag = false;
        let val = $('#pwd').val();
        if (!val) {
            $('#pwd').css('border', '1px solid red')
            $('#pwd-msg').html('请输入密码').css('color', 'red')
            flag = false;
        } else if (!reg.test(val)) {
            $('#pwd').css('border', '1px solid red')
            $('#pwd-msg').html(' 3-12个字母、数字、下划线').css('color', 'red')
            flag = false;
        } else {
            $('#pwd').css('border', '1px solid green')
            $('#pwd-msg').html('')
            flag = true;
        }
        return flag;
    }
    // 验证密码是否一致
    function validatacpwd() {
        let val = $('#cpwd').val();
        let val1 = $('#pwd').val();
        let flag = false;
        if (!val) {
            $('#cpwd').css('border', '1px solid red')
            $('#cpwd-msg').html('请确认密码').css('color', 'red')
            flag = false;
        } else if (val != val1) {
            $('#cpwd').css('border', '1px solid red')
            $('#cpwd-msg').html('两次密码不一致').css('color', 'red')
            flag = false;
        } else {
            $('#cpwd').css('border', '1px solid green')
            $('#cpwd-msg').html('')
            flag = true;
        }
        return flag;
    }
    // 验证邮箱格式
    function validataemail() {
        let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/; // 邮箱格式正确
        let flag = false;
        let val = $('#email').val();
        if (!val) {
            $('#email').css('border', '1px solid red')
            $('#email-msg').html('请输入邮箱').css('color', 'red')
            flag = false;
        } else if (!reg.test(val)) {
            $('#email').css('border', '1px solid red')
            $('#email-msg').html('邮箱格式不正确').css('color', 'red')
            flag = false;
        } else {
            $('#email').css('border', '1px solid green')
            $('#email-msg').html('')
            flag = true;
        }
        return flag;
    }
    // 验证昵称
    function validatanickname() {
        let reg = /^[a-zA-Z0-9_\u4E00-\u9FA5]{3,16}$/; // 3到16位（字母，数字，下划线，中文）
        let flag = false;
        let val = $('#nickname').val();
        if (!val) {
            $('#nickname').css('border', '1px solid red')
            $('#nickname-msg').html('请输入昵称').css('color', 'red')
            flag = false;
        } else if (!reg.test(val)) {
            $('#nickname').css('border', '1px solid red')
            $('#nickname-msg').html('3到16位（字母，数字，下划线，中文）').css('color', 'red')
            flag = false;
        } else {
            $('#nickname').css('border', '1px solid green')
            $('#nickname-msg').html('')
            flag = true;
        }
        return true;
    }


    $('#btn').on('click', function () {
        // 将5重方法装进数组
        let arr = [validatausername, validatapwd, validatacpwd, validataemail, validatanickname];
        // 建立新数组,循环映射新数组的标杆值||返回值
        let newarr = arr.map(function (fn) {
            return fn()
        })
        // 判断新数组每个值是否都为真
        let valid = newarr.every(function (v) {
            return v
        })
        // 如果为真，通过验证，可以注册
        if (valid) {
            // 发送注册ajax请求
            $.ajax({
                url: 'http://139.9.177.51:3333/p2p/reg',
                type: 'post',
                data: {
                    username: $('#username').val(),
                    pwd: $('#pwd').val(),
                    email: $('#email').val(),
                    nickname: $('#nickname').val(),
                },
                success: function (data) {
                    // 注册成功
                    let { code, msg } = data;
                    if (code === 200) {
                        alert(msg);
                        location.href = '../login.html';
                    }
                    // 注册失败
                    else if (code === 500) {
                        alert(msg);
                    }
                }
            })
        }
    })
})


