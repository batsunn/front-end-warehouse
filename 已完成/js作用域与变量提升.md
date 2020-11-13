## js 的作用域和变量声明提升

### 一.ES5中的作用域

* 作用域分为全局(window)，局部(函数体内)，块级(ES6新增)

***1.*****全局变量**：声明在**函数外部的变量**，所有**直接赋值**的变量都属于全局变量。在代码中任何地方都能访问到的对象拥有全局作用域。

**（1）最外层函数和在最外层函数外面定义的变量拥有全局作用域**

```javascript
        var c=6;
		function test() {
            var a=1;
            b = 1;
        }
        test();//先调用函数，如果不调用，a,b都未声明
		console.log(c); //6
        console.log(b); //1
        console.log(a);//脚本错误
        console.log(window.a); //undefined
		console.log(window.b); //undefined
		console.log(window.c); //undefined
```

**（2）所有window对象的属性拥有全局作用域**

一般情况下，window对象的内置属性都拥有全局作用域，例如window.name、window.location、window.top等等。

***2.*****局部变量**：声明在函数内部的变量，和全局作用域相反，局部作用域一般只在固定的代码片段内可访问到，最常见的例如函数内部，所有在一些地方也会看到有人把这种作用域称为函数作用域（**所有没有var直接赋值的变量都属于全局变量**）

        function test() {
    
          var a=1;
    
          b = 1;
    
        }
    
        test();//先调用函数，如果不调用，a,b都未声明
    
        console.log(b); //1
    
        console.log(a);//脚本错误




### 二.ES6中的作用域

#### 1、ES6的块级作用域

**(1)let声明的变量只在块级有效。**

         function func(a) {
            if (true) {
                //let声明i
                let i = 6;
                //在if内打印i值
                console.log('inside: ' + i); //6
            }
            //在if外，再次打印i值
            console.log('outside: ' + i); //i is not defined
        };
        func(0)
**(2)let没有‘变量提升’的特性，而却有‘暂时性死区（temporal dead zone）’的特性。**

```
function func(){
    //在let声明前，打印i
    console.log(i);//i is not defined
    let i;
};
```
**（3）可以解决闭包问题**

        var arr = [];
        for(var i = 0; i < 2; i++){
            arr[i] = function(){
                console.log(i);
            };
        };
        arr[1]();//2
        
        var arr = [];
        for(let i = 0; i < 2; i++){
            arr[i] = function(){
                console.log(i);
            };
        };
        arr[1]();//1


### 三.变量声明提升

####  1.变量定义

**可以使用var定义变量，变量如果没有赋值，那变量的初始值为`undefined`。**



####  2.函数优先

    var getName = function(){
        console.log(2);
    }
    function getName (){
        console.log(1);
    }
    getName();
    
    function getName(){    //函数声明提升到顶部
        console.log(1);
    }
    var getName;    //变量声明提升
    getName = function(){    //变量赋值依然保留在原来的位置
        console.log(2);
    }
    getName();    // 最终输出：2
**函数声明`function getName(){}`的声明会被提前到顶部。而函数表达式`var getName = function(){}`则表现出变量声明提升。因此在这种情况下，getName也是一个变量，因此这个变量的声明也将提升到底部，而变量的赋值依然保留在原来的位置。需要注意的是，函数优先，虽然函数声明和变量声明都会被提升，但是函数会首先被提升，然后才是变量。**