## js中循环遍历方式

**1.for循环(while，do...while等)**

```javascript
for(let i=0;i<arr.length;i++){//i是索引
    console.log(arr[i])
}
```

**2.for...in...(数组，对象)**

```javascript
for (let index in arr) {//index是索引
	console.log(index, arr[index]);
}
let obj={'name':'programmer','age':'22','height':'180'};
for(let i in obj){//i是键名
    console.log(i,obj[i])
}
```

**3.for...of...(数组或字符串，不能遍历对象)**

```javascript
for (let v of arr) {
	console.log(v);//v是数组元素
}
var str = "zhangsan";
for(var v of str){
      console.log(v);
}
```

**4.forEach(数组)**

```javascript
//forEach没有返回值的 
let ret = arr.forEach(function (value, index) {
	console.log(value, index);
});
console.log(ret);
```

**5.map(数组)**

```
//map: 每一次循环的返回值 加入一个新数组 最后 返回这个新数组 
let ret = arr.map(function (value, index) {
	console.log(value, index);
	return value + "A";
});
console.log(ret);
```

**6.filter(数组:过滤)**

```javascript
//filter: 过滤数据 
let ages = [17, 18, 19, 20];
let newAges = ages.filter(function (value, index) {
	console.log(value, index);
	return value > 18;
});
console.log(newAges);
```

**7.some(数组)**

```javascript
//some: 某一个返回值是true  整体返回的结果就是true
let ages = [17, 18, 19, 20];
let ret = ages.some(function (value, index) {
	console.log(value, index);
	return value > 19;
});
console.log(ret);
```

**8.every(数组)**

```javascript
//every: 每一个返回值是true  整体返回的结果才是true
var arr = [ 1, 2, 3, 4, 5, 6 ]; 
console.log( arr.every( function( item, index, array ){ 
        return item > 3; 
    })); 
false
```

