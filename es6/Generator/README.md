#### 1.1 概念理解
yield: next执行到下一个yield;yield本身没有返回值,next的参数可以作为上一个yield的返回值，v8引擎开始忽略第一次next的参数  
throw: 捕获错误,让错误在内部出现外部也可以捕获  
return: return后的内容不再执行; return方法的参数是value; 会先执行finally延迟执行return  
三者: next将yield替换为参数值,throw将yield替换为抛出错误,return将yield替换为return  
yield * 可以让generator中嵌套generator执行  
#### 1.2 参考链接
http://es6.ruanyifeng.com/#docs/generator
