window.onload = function () {
    // 获取返回键
    let back = document.querySelector('header>span')
    // 获取输入框
    let input = document.querySelector('header input')
    // 获取添加搜索记录的列表
    let ul = document.querySelector('ul')
    // 获取页面中删除按钮的数组
    let btn1 = document.querySelectorAll('#task button')
    // 获取清除按钮
    let clear = document.querySelector('.history span')
    // 点击返回首页
    back.onclick = function () {
        location.href = 'index.html'
    }
    // 获取当前搜索框的值
    let search = document.querySelector('header button')
    search.onclick = function () {
        let ival = input.value
        if (ival) {
            let localkey = localStorage.getItem('todo')
            // 如果存在
            if (localkey) {
                // 数据转对象
                let arr = JSON.parse(localkey)
                // 添加新数据
                arr.push({
                    'content': ival,
                })
                // 数组转 JSON
                let msg = JSON.stringify(arr)
                // 存储到本地
                localStorage.setItem('todo', msg)
                //渲染
                rander()
            } else {  // 不存在
                // 创建数组保存数据
                let arr = []
                // 添加新数据
                arr.push({
                    'content': ival,
                })
                // 数组转 JSON
                let msg = JSON.stringify(arr)
                // 存储到本地
                localStorage.setItem('todo', msg)
                //渲染
                rander()
            }
        }
        input.value = ``
    }
    // 渲染函数
    function rander() {
        // 清除section里面所有li
        ul.innerHTML = ``
        // //获取当前本地数据todo
        let localkey = localStorage.getItem('todo')
        // 转数组
        let arr = JSON.parse(localkey)
        // //数组遍历,获取每一条数据
        // //数组遍历,获取每一条数据
        if (arr!=null) {
            for (let i = arr.length - 1; i >= 0; i--) {
                //添加到页面
                ul.innerHTML += `
                     <li>
                         ${arr[i].content}
                     </li>
                     `
            }
        }
        // 调用点击删除函数
        // darr()
    }
    // 判断，是否本地存在数据，如果本地不为空，就进行渲染页面
    if (localStorage.getItem('todo') != null) {
        rander();
    }

    // 清除所有搜索记录函数
    clear.onclick = function () {
        if (localStorage.getItem('todo')) {
            // 删除所有本地数据
            localStorage.clear('todo')
            // 最后再调用一次渲染函数，使本地数据渲染到页面上
            rander();
        }

    }


}