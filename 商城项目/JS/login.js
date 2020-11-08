window.onload = function () {
    let lis = document.querySelector('#section .login-box ul img')
    let img = document.querySelector('#section .code-box .relative .pic1')
    let box1 = document.querySelector('.login-box')
    let box2 = document.querySelector('.code-box')
    lis.onclick = function () {
        box1.style = `display:none;`
        box2.style = `display:flex;`
    }
    img.onclick = function () {
        box1.style = `display:block;`
        box2.style = `display:none;`
    }

    let form = document.querySelector('form')
    let empty = document.querySelector('#section .empty')
    let fail = document.querySelector('#section .loginfalse')
    username.oninput= function () {
        empty.classList.add('on')
        fail.classList.remove('on')
    }
    form.onsubmit = function () {
        let uvalue = username.value
        let pvalue = pwd.value
        let ureg = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/
        let preg = /^[a-zA-Z]\w{5,17}$/
        let uresult = ureg.test(uvalue)
        let presult = preg.test(pvalue)
        if (!uresult || !presult) {
            empty.classList.remove('on')
            fail.classList.add('on')
            return false
        } else {
            empty.classList.add('on')
            fail.classList.remove('on')
            return true
        }
    }
   
}
