$(function () {
    // 去除本地储存的数据
    let user = JSON.parse(localStorage.getItem('user'));
    // 判断是否登录
    var islogin = user ? true : false;
    // 如果登录
    if (islogin) {
        // 渲染导航栏
        $('#nav-login').html(`<a href="#personal">${user.username}</a>`);
        $('#nav-register').html(`<a href="account-recharge.html">赶快充值</a>`);
        $('#nav-off').html(`<a href="#">注销</a>`);
        $('#nav-invest').html(`<a href="#invest">我要投资</a>`)
        $('#nav-borrow').html(`<a href="#borrow">我要借款</a>`)
        $('#nav-personal').html(`<a href="#personal">个人中心</a>`)
        // 如果没有登录
    } else {
        // 渲染导航栏
        $('#nav-login').html(`<a href="login.html">登录</a>`);
        $('#nav-register').html(`<a href="register.html">注册</a>`);
        $('#nav-invest').html(`<a href="#">我要投资</a>`)
        $('#nav-borrow').html(`<a href="#">我要借款</a>`)
        $('#nav-personal').html(`<a href="#">个人中心</a>`)
        $('#navList li').on('click', function () {
            alert('请先登录');
            location.href = '../login.html';
        });

    }

    // 给注销绑定注销事件
    $('#nav-off').on('click', 'a', function () {
        localStorage.clear();//清除本地储存
        location.href = '../index.html';
    });


    // 加载页面的方法
    function loadPage() {
        var hash = location.hash.substr(1) // 获取hash的值
        // 判断： 根据不同的hash地址 加载不同的页面到content中 局部替换更新
        switch (hash) {
            case 'invest':
                $('#content').load('../pages/invest.html') // 加载投资
                break;

            case 'borrow':
                $('#content').load('../pages/borrow.html') // 加载借款
                break;

            case 'borrow-apply':
                $('#content').load('../pages/borrow-apply.html') // 加载借款申请
                break;

            case 'borrow-details':
                $('#content').load('../pages/borrow-details.html') // 加载借款申请
                break;
            /* ------------ 个人中心开始 -------------- */

            case 'personal':
                // 先加载个人中心 再加载子页面
                loadChildPage('personal/borrow-items')
                break;

            case 'personal/borrow-items':
                // 先加载个人中心 再加载子页面
                loadChildPage('personal/borrow-items')
                break;

            case 'personal/borrow-apply':
                // 先加载个人中心 再加载子页面
                loadChildPage('personal/borrow-apply')
                break;

            case 'personal/account':
                // 先加载个人中心 再加载子页面
                loadChildPage('personal/account')
                break;

            case 'personal/realname':
                // 先加载个人中心 再加载子页面
                loadChildPage('personal/realname')
                break;

            case 'personal/account-flow':
                // 先加载个人中心 再加载子页面
                loadChildPage('personal/account-flow')
                break;

            case 'personal/details':
                // 先加载个人中心 再加载子页面
                loadChildPage('personal/details')
                break;

            case 'personal/personal-data':
                // 先加载个人中心 再加载子页面
                loadChildPage('personal/personal-data')
                break;

            case 'personal/card':
                // 先加载个人中心 再加载子页面
                loadChildPage('personal/card')
                break;

            case 'personal/invest-record':
                // 先加载个人中心 再加载子页面
                loadChildPage('personal/invest-record')
                break;


            /* ------------ 个人中心结束 -------------- */

            default:
                $('#content').load('../pages/main.html') // 加载主页【默认】
                break;
        }

        // 切换激活效果
        changeNavActive(hash)
    }

    // 初始化调用
    loadPage()

    // 监听hash变化
    window.onhashchange = loadPage

    /* 加载二级页面 */
    function loadChildPage(hash) {
        // 判断个人中心有还是没有
        var isPersonalExit = $('#rightcontent').length == 1 ? true : false;

        // 如果只是点击左侧导航 直接加载页面即可
        if (isPersonalExit) {
            $('#rightcontent').load(`../pages/${hash}.html`) // 加载 个人中心/账户信息
            changeNavChildActive(`${hash}`)
        } else {
            // 如果刷新 必须先加载个人中心 再加载子页面
            $('#content').load('../pages/personal.html', function () {
                $('#rightcontent').load(`../pages/${hash}.html`) // 加载 个人中心/账户信息
                changeNavChildActive(`${hash}`)
            })
        }
    }


    /* 切换激活效果 - 一级激活 */
    function changeNavActive(hash) {
        if (hash == 'borrow-apply') {
            hash = 'borrow';
        }
        if(hash=='borrow-details'){
            hash='invest';
        }
        hash = hash.split('/')[0]
        $('#navList li').removeClass('on')
        if (hash != "") {
            $(`#navList a[href="#${hash}"]`).parent('li').addClass('on');
        } else {
            $('#navList li:first').addClass('on')
        }
    }

    /* 切换激活效果 - 二级激活 */
    function changeNavChildActive(hash) {
        $('#leftMenu dd').removeClass('active')
        $('#leftMenu dt').removeClass('active')
        $(`#leftMenu a[href="#${hash}"]`).parent().addClass('active')
    }



})