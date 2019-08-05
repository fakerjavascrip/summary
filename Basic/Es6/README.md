### 1. Generator
#### 概念讲解
#### 代码
### async await
#### 概念讲解
#### 代码
### class
#### 概念讲解
#### 代码
### module
#### 概念讲解
export导出多个值那么导入需要花括号,也可以分多次导入但是都需要花括号  
export default导出单一值,导入不需要花括号
#### 代码
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
