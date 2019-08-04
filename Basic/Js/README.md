### 1. 延迟脚本
#### 概念讲解
defer="defer":预先下载但是延迟执行
async 哪个脚本先下载完先执行哪个
### 2. with
#### 概念讲解
with先在局部寻找变量,之后再到location对象中寻找
#### 代码
		with(location) {
			let name = name;
			let age = age;
		}
### 3. 正则
#### 概念讲解
.省略匹配一个字符, +可以出现多次或最少一次, *可以出现任意多次, \d数字, \w字符, []一个字符或某类字符, {}数量的范围,  ()包含一个表达式, \转义, ^正则开始, $正则结束
#### 参考链接
https://blog.csdn.net/makerbeen/article/details/88970528
### 4.eval
#### 概念讲解
参数是字符串,但是会解析成js代码,其中的内容不会提前声明,只有在执行eval的时候才会定义
### 5. 数组方法
#### 概念讲解
栈和队列: push,pop,shift,unshift  
重排方法: reverse,sort  
操作方法: concat,slice,splice  
位置方法: indexOf,lastIndexOf  
迭代方法: every,some,filter,forEach,map  
归并方法: reduce,reduceRight
### 6. 包装类型的方法
#### 概念讲解
charAt(index): 获取当前位置的字符  
slice==substring==substr:两个参数,1起始位置,2获取长度  
trim: 删除前置空格;  
tolowerCase,toUpperCase:转为全大写或小写;  
replace: 替换字符,第一个参数可以为正则也可以为字符串,2参数为代替的字符串;  
split:分割为数组;  
match:和正则差不多;  
数组相同的方法: concat,indexOf,lastIndexOf
#### 概念讲解
### 7. 随机整数
#### 概念讲解
Math.floor(Math.random()*100);0-100的随机整数
### 8. Object的基本方法和属性
#### 概念讲解
constructor() 指向Object  
hasOwnProperty(propertyName) 判断是否为构造函数中的属性  
isPrototypeOf(object) 传入对象是否是当前对象的原型  
toString，toLocalString，ValueOf返回对象的字符串形式
### 9. 
