## this的8种指向和函数调用方式

### this的8种指向

**1.全局中：指向window**

```javascript
// 全局作用域
console.log(this === window) // true
```



**2.一般函数中：谁调用,指向谁**



**3.对象中：谁调用，指向谁**

```javascript
const yuan = {
	name: '小源',
	sex: 1,
	sayName() {
		console.log(this)//yuan
	}
}
```



**4.事件处理函数中：指向事件源**

```javascript
const btn = document.getElementById('btn')
	btn.addEventListener('click', function() {
	console.log(this) // <button id="btn">按钮</button>
})
```



**5.构造函数中：指向构造函数new出来的实例对象**

```javascript
function ChessPlayer(name, sex) {
	// 把属性和方法挂载到 this 上
	this.name = name
	this.sex = sex
	this.sayName = function() {
		console.log(this.name)//指向yuan
	}
}
const yuan = new ChessPlayer('小源', 1)
```



**6.定时器中：一般指向window，window.setTimeout()和window.setInterval()是window对象上的两个方法。**

```javascript
setTimeout(function() {
	console.log(this) // 1 秒后打印 window 对象
}, 1000)
```



**7.箭头函数中：指向该函数定义时所处的作用域，即箭头函数的上一级**

```javascript
// 1 秒后打印 this.id
function logId() {
	window.setTimeout(() => {
	console.log(this.id)//指向window上的id
	}, 1000)
}
var id = 21
logId.call({ id: 42 }) // 42
```



**8.call,apply,bind中：指向第一个参数。也是改变this指向的三个方法。**

```javascript
const yuan = {
	name: '小源',
	sex: 1,
	sayName(type, num) { // 自我介绍，传入擅长用棋的类型，以及初始棋子数
	console.log(`我是${this.name}，擅长用${type}，初始有${num}枚棋子`)
	}
}
yuan.sayName('黑棋', 113) // '小源'
yuan.sayName.call(pang, '黑棋', '118')//改变指向到pang
```



