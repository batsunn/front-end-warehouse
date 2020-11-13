## js的奇葩知识

**1.Function.protype的类型是function，自定义函数的protype是对象**

```javascript
typeof Function.protype==='function'//true
function fn(){}
typeof fn.protype==='object'//true
```

**2.isNaN和Number.isNaN的区别**

isNaN本意是通过Number方法把参数转换成数字类型，如若转换成功，则返回false，反之返回true，它只是判断参数是否能转成数字，不能用来判断是否严格等于NaN。

Number.isNaN方法用来判断一个值是否严格等于NaN

```javascript
var num=10
var str='abc'
console.log(isNaN(num))//判断是否是数值,false
console.log(isNaN(str))//true
console.log(Number.isNaN(num))//判断是否是NaN，false
console.log(Number.isNaN(num))//false
```

**3.new一个构造函数返回的是一个实例对象，如果构造函数自带返回值，返回非对象类型不生效**

```javascript
function People(){}
const people=new People();//People

function People(){
    return 1;
}
const people=new People();//People

function People(){
    return {
        name:'小貂禅'
    };
}
const people=new People();//{name:'小貂禅'}
```

**4.函数表达式(非声明函数)中的函数名不可覆盖**

```javascript
const a=function fn(){
    a=100;
    return a;
}
a();//Function,如果设置var a=100,加相关声明关键词是可以覆盖的
```

**5.严格模式下，函数的this是undefined而不是Window**

**6.浮点操作不精确，慎用！**

```javascript
0.5-0.4!==0.1//true
```

**7.===比较的是内存地址，而>=比较的是转换后的值**

```java
{}==={}//false
//隐式转换toString()
{}>={}//true
```

**8.parseInt太小的数字有bug**

```javascript
parseInt(0.000000000000898)//4
```

**9.**

```javascript
1+null//
1+undefined//NaN
Number(null)//0
Number(undefined)//NaN
```

