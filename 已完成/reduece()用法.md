## reduce()用法

```javascript
//arr表示原数组
//prev表示上一次调用返回值或初始值，最开始没有初始值，就为数组第一项
//cur 表示当前正在处理的数组元素
//index 表示当前正在处理的数组元素的索引，若提供 init 值，则索引为0，否则索引为1
//init为初始值
arr.reduce(function(prev,cur,index,arr){
...
}, init);
```

**1.0数组求和**

```javascript
var arr = [3,9,4,3,6,0,9];
var sum=arr.reduce(function(prev,cur)=>{
      return pre+cur;
},0)
//初始值为0，cur的值为数组第一项3，相加之后返回值为3作为下一轮回调的prev值
```

**2.0求数组最大值**

```javascript
var arr = [3,9,4,3,6,0,9];
var max=arr.reduce(function(prev,cur)=>{
      return Matn.max(prev,cur);
})
//没有初始值，数组第一项3为初始值，cur的值为数组第二项9，返回值9作为第二轮prev进行调用
```

**3.0数组去重**

```javascript
var arr = [3,9,4,3,6,0,9];
var newArr = arr.reduce(function (prev, cur) {
    prev.indexOf(cur) === -1 && prev.push(cur);
    return prev;
},[]);
```



