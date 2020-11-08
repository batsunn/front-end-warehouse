window.onload=function(){
    window.onscroll = function () {
        let sTop = document.documentElement.scrollTop
        if (sTop >= 300) {
            back.style = `display:block;
        cursor:pointer;`
        } else[
            back.style = `display:none;`
        ]
    }
    back.onclick = function () {
        let timeId = setInterval(backTop, 100)
        function backTop() {//每0.1s内执行的函数效果
            let t = 1000//设置总时间
            let speed = document.documentElement.scrollTop / t
            document.documentElement.scrollTop -= speed * 100
            if (document.documentElement.scrollTop <= 0) {
                clearInterval(timeId)
            }
        }
    }
}