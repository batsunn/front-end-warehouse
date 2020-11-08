window.onload=function(){
    // 如果有多个轮播图,加上ID或者class进行区分,保留类名swiper-container
    var Swiper1 = new Swiper('#swiper1', {
        // 轮播图的播放方向，也可以是vertical纵向方向
        direction: 'horizontal',
        //循环模式，无线循环
        loop: true,
        // 不自动播放，但是可以滑动
        // autoplay:true,
        // 自动播放设置
        autoplay: {
            // 切换时间
            delay: 1000,
            // 当切换到最后一张时自动停止播放，默认为true
            stopOnLastSlide: false,
            //用户操作后是否禁止autoplay，默认为true
            disableOnInteraction: false,
        },
        // 播放每一张的速度
        speed: 1000,
        // 如果需要分页器，即下面的小圆点
        pagination: {
            el: '.swiper-pagination',
        },
        // 按钮
    });

    // 如果有多个轮播图,加上ID或者class进行区分,保留类名swiper-container
    var Swiper2 = new Swiper('#swiper2', {
        // 轮播图的播放方向，也可以是vertical纵向方向
        direction: 'horizontal',
        //循环模式，无线循环
        loop: true,
        // 不自动播放，但是可以滑动
        // 如果需要分页器，即下面的小圆点
        pagination: {
            el: '.swiper-pagination',
        },
    });

    var mySwiper2 = new Swiper('.swiper-container3', {
        // 轮播图的播放方向，也可以是vertical纵向方向
        direction: 'vertical',
        //循环模式，无线循环
        loop: true,
        // 不自动播放，但是可以滑动
        autoplay: {
            // 切换时间
            delay: 3000,
            // 当切换到最后一张时自动停止播放，默认为true
            stopOnLastSlide: false,
            //用户操作后是否禁止autoplay，默认为true
            disableOnInteraction: false,
        },
    });

    let lastTime = function () {
        let timeId = setInterval(function () {
            let oldDate = new Date()
            let newDate = new Date('2020-10-01 00:00:00')
            let cha = newDate - oldDate
            let hour = Math.floor(cha / 1000 / 60 / 60 % 24)
            if(hour<10){
                hour=`0${hour}`
            }
            let minute = Math.floor(cha / 1000 / 60 % 60)
            if(minute<10){
                minute=`0${minute}`
            }
            let seconds = Math.floor(cha / 1000 % 60)
            if(seconds<10){
                seconds=`0${seconds}`
            }
            let time = `${hour}:${minute}:${seconds}`
            let span=document.querySelector('.seckill>div>p>span:last-child')
            span.innerHTML = `${time}`
        }, 1000)
    }
    lastTime()

    let input=document.querySelector('header input')
    input.onclick=function(){
        location.href='search.html'
    }


}
