### ES6箭头函数和函数的调用方式

**ES6箭头函数**

**(1)函数体内的this对象，就是函数定义时所处的对象，而不是调用时所在的对象；**

**(2)不可以当作「构造函数」，也就是说，不可以使用new命令，否则会抛出一个错误；**

**(3)没有arguments对象；**

**(4)当函数参数只有一个，括号可以省略；但是没有参数时，括号不可以省略**

**(5)箭头函数有两种格式，一种只包含一个表达式，省略掉了{ ... }和return。还有一种可以包含多条语句，这时候就不能省略{ ... }和return!!!!只有一个表达式时，如果不省略花括号，就不能省略return**



### 函数的调用方式

**1.一般函数调用**

```javascript
function sayHello() { // 函数声明
	console.log('Hello ITSource.')
}
sayHello()
```



**2.作为对象的方法调用**

```javascript
const obj = {
	method: function() {
	console.log('Hello ITSource.')
	}
}
log()
```



**3.作为回调函数调用**

```javascript
// 定时器回调
window.setTimeout(() => {
	console.log('Hello ITSource.')
}, 1000)
```



**4call，bind，apply**

```javascript
var user={
    name:'小貂禅',
    age:20
}
function fn(){
    console.log(this)
}
fn()//window,window是调用者
fn.call(user)
//user={name:'小貂禅',age:20},this指向第一个参数，user为调用者，多用来改变函数中this的指向
//apply和call的用法一致，不过后面的参数用数组形式表达
//函数.call(调用者,参数1,参数2,...)=函数.apply(调用者,[参数1,参数2,...])
```



**5作为构造函数调用**

```javascript
function Student(name,age){
    this.name=name;
    this.age=age;
    this.study(){
        console.log(this.name+'正在学习')
    }
}
const student=new Student('小貂禅',18)
student.study()
```



**6.IIFE(自执行函数)**

```javascript
;(function() {//没有函数名
console.log('IIFE')
})();
```







