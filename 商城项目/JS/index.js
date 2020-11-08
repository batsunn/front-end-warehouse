window.onscroll = function () {
    
    let sTop = document.documentElement.scrollTop
    // 找到版心
    let con = document.querySelectorAll('.container')
    let n = con.length
    let l = con[n - 6].offsetTop - 150
    //显示隐藏 
    if (sTop >= l) {
        back.style = `display:flex;
        cursor:pointer;`
        twocode.style = `display:flex;
        cursor:pointer;`
    } else {
        back.style = `display:none;`
        twocode.style = `display:none;`
    }


    // 固定头部
    let search = document.querySelector('.search')
    let abtop = document.querySelector('.bottom>.cf>.fr')
    let nav = document.querySelector('.bottom .nav')
    let logo = document.querySelector('.bottom .logo')
    let container = document.querySelector('.bottom>.cf')
    if (sTop > 300) {
        fixedtop.appendChild(logo)
        fixedtop.appendChild(search)
        fixedtop.classList.add('bottom')
        search.classList.add('fr')
        fixedtop.style = `display:flex;
        background:#fff;
        width:100%;
        justify-content: center;
        `
        logo.style = `margin-right:100px;`
    }
    else {
        abtop.insertBefore(search, nav)
        container.insertBefore(logo, abtop)
        fixedtop.classList.remove('bottom')
        search.classList.remove('fr')
        fixedtop.style = ``
        logo.style = ``
    }
}


// 回到顶部
let aDom = document.querySelectorAll('#back a')
let len = aDom.length
// 找到版心
let con = document.querySelectorAll('.container')
let n = con.length
// 设置定时器
let timeId, timeId1
for (let i = 0; i <= len - 1; i++) {
    // 判断点击的按钮类型
    if (i < 5) {
        aDom[i].onclick = function () {
            // 清除所有定时器
            clearInterval(timeId)
            clearInterval(timeId1)
            // 获取滚动条到顶部距离
            sTop = document.documentElement.scrollTop
            // 判断滚动条往上还是往下移
            if (sTop > con[i + n - 7].offsetTop) {
                // 开启定时器
                timeId = setInterval(function () {
                    // 缓慢到达效果
                    sTop = document.documentElement.scrollTop
                    let t = 500
                    let cha = sTop - con[i + n - 7].offsetTop + 150
                    let speed = cha / t
                    document.documentElement.scrollTop -= speed * 100
                    if (cha <= 0) {
                        clearInterval(timeId)
                    }
                }, 50);
            } else {
                timeId = setInterval(function () {
                    // 缓慢到达效果
                    sTop = document.documentElement.scrollTop
                    let t = 500
                    let cha = con[i + n - 7].offsetTop - sTop - 150
                    let speed = cha / t
                    document.documentElement.scrollTop += speed * 100
                    // 判断是否达到
                    if (cha <= 0) {
                        clearInterval(timeId)
                    }
                }, 50);
            }
        }
    } else {
        // 回到顶部
        aDom[5].onclick = function () {
            // 清除所有定时器
            clearInterval(timeId)
            clearInterval(timeId1)
            // 开启定时器
            timeId1 = setInterval(function () {
                let sTop = document.documentElement.scrollTop
                let t = 500
                let speed = sTop / t
                document.documentElement.scrollTop -= speed * 100
                // 判断是否达到
                if (sTop <= 0) {
                    clearInterval(timeId1)
                }
            }, 50);
        }
    }

}
    // banner切换
    let li = document.querySelectorAll('#banner li')
    let lilen = li.length
    for (let i = 0; i <= lilen - 1; i++) {
        li[i].onmouseover = function () {
            li[i].classList.add('onopen')
        }
        li[i].onmouseout = function () {
            li[i].classList.remove('onopen')
        }
    }
    // 轮播图1
    var mySwiper = new Swiper('.swiper-container', {
        // 轮播图的方向，也可以是vertical方向
        direction: 'horizontal',
        //播放速度
        loop: true,
        // 自动播放时间
        autoplay: {
            delay: 2000,
            stopOnLastSlide: false,
            disableOnInteraction: false, //用户操作后是否禁止autoplay
        },
        // 播放的速度
        speed: 1000,
        // 如果需要分页器，即下面的小圆点
        pagination: {
            el: '.swiper-pagination',
        },
        // 这样，即使我们滑动之后， 定时器也不会被清除
        autoplayDisableOnInteraction: false,
    });

    // 轮播图2
    var swiper = new Swiper('.swiper-container1', {
        slidesPerView: 4,//设置每次展示数量
        spaceBetween: 15,//设置每个距离
        slidesPerGroup: 3,//设置几组
        loop: true,
        speed: 2000,//设置播放的速度
        loopFillGroupWithBlank: true,
        //按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        //自动播放设置
        autoplay: {
            delay: 1000,
            stopOnLastSlide: false,
            disableOnInteraction: false, //用户操作后是否禁止autoplay
        },
    });


    // 倒计时
    let lastTime = function () {
        //设置倒计时总时长
        let cha = 35126
        //设置计时器
        let timeId = setInterval(function () {
            //计算小时
            let hour = Math.floor(cha / 60 / 60 % 24)
            if (hour < 10) {
                hour = `0${hour}`
            }
            //计算分钟
            let minute = Math.floor(cha / 60 % 60)
            if (minute < 10) {
                minute = `0${minute}`
            }
            //计算秒数
            let seconds = Math.floor(cha % 60)
            if (seconds < 10) {
                seconds = `0${seconds}`
            }
            cha--
            //将时分秒写入对应位置
            timehour.innerHTML = `${hour}`
            timeminute.innerHTML = `${minute}`
            timeseconds.innerHTML = `${seconds}`
        }, 1000)//每秒执行一次
    }
    lastTime()//调用函数

    // 轮播图3

    var mySwiper1 = new Swiper('.swiper-container3', {
        // 轮播图的方向，也可以是vertical方向
        direction: 'horizontal',
        //播放速度
        loop: true,
        // 自动播放时间
        autoplay: {
            delay: 1000,
            stopOnLastSlide: false,
            disableOnInteraction: false, //用户操作后是否禁止autoplay
        },
        // 播放的速度
        speed: 1000,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // 如果需要分页器，即下面的小圆点
        // pagination: {
        //     el: '.swiper-pagination',
        // },
        // 这样，即使我们滑动之后， 定时器也不会被清除
        // observer: true,
        // observeParents: true,
        // setWrapperSize: true,
        autoplayDisableOnInteraction: false,
    });


    // 选项卡
    $('.leisure .right p a').on('mouseover', function () {
        // 给a标签添加类名病移除其他a标签类名
        $(this).siblings().removeClass('on')
        $(this).addClass('on')
        // 找到a标签所在的一组选项
        let arr = $(this).parent().children($('a'))
        let len = arr.length
        let index
        // 循环，找到含有类名On的a标签，取出其索引
        for (let i = 0; i <= len - 1; i++) {
            if ($(arr[i]).hasClass('on')) {
                index = i
            }
        }
        // 给a标签所在的模块中对应的索引的div盒子，给他添加类名，其他div移除类名
        $(this).parent().siblings('div').removeClass('show')
        $(this).parent().siblings('div').eq(index).addClass('show')
    })

