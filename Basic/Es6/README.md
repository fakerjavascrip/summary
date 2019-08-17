### 1. Generator
#### 1.1 概念理解
yield: next执行到下一个yield;yield本身没有返回值,next的参数可以作为上一个yield的返回值，v8引擎开始忽略第一次next的参数  
throw: 捕获错误,让错误在内部出现外部也可以捕获  
return: return后的内容不再执行; return方法的参数是value; 会先执行finally延迟执行return  
三者: next将yield替换为参数值,throw将yield替换为抛出错误,return将yield替换为return
yield * 可以让generator中嵌套generator执行  
#### 1.2 参考链接
http://es6.ruanyifeng.com/#docs/generator
### 2. async await
#### 2.1概念讲解
自带执行器,更好的语义,更广的适用性,返回值是promise
返回值: 是Promise;可使用then和catch的方法,出错后可以被catch捕获; 返回的promise必须等待异步操作执行完才执行then回调; 如果有一个await出错那么后边的await不会执行,使用try catch解决
await: 可以是promise或者基本值
#### 2.2 参考链接
https://juejin.im/post/596e142d5188254b532ce2da
### 3. class
#### 3.1 概念讲解
constructor: 相当于构造函数  
类内部相当于prototype,可以设置get和set  
静态方法: 方法前加static可以直接调用,new不调用  
特点: 不存在变量提升,默认严格模式
#### 3.2 代码
### 4. module
#### 4.1 概念讲解
export导出多个值那么导入需要花括号,也可以分多次导入但是都需要花括号  
export default导出单一值,导入不需要花括号
#### 4.2 代码
    // 1.export
    //a.js
    export const str = "blablabla~";
    export function log(sth) { 
      return sth;
    }

    //b.js导入
    import { str, log } from 'a'; //也可以分开写两次，导入的时候带花括号


    // 2.export default
    //a.js
    const str = "blablabla~";
    export default str;

    // b.js导入
    import str from 'a'; //导入的时候没有花括号
