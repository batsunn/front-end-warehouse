window.onload=function(){
    let dd=document.querySelectorAll('.clothing .part3 dd')
    for(let i=0;i<=dd.length-1;i++){
        dd[i].onmouseover=function(){
            for(let j=0;j<=dd.length-1;j++){
                dd[j].classList.remove('on')
            }
            this.classList.add('on')
        }
    }
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


}
