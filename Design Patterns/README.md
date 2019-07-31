### 单例模式
#### 概念讲解
单个变量变为一个对象
#### 代码
		// 单体模式
		let singleton = {
			attribute: true,
			method1: function() {},
			method2: function() {}
		}
### 构造函数
#### 概念讲解
和工厂模式不同在于使用了this
#### 代码
		function Obj(name,age) {
			this.name = name;
			this.age = age;
		}
		// 用new的形式创建对象
		let obj = new Obj("梁博",12);
    
### 工厂模式
#### 概念讲解
工厂模式和创建对象的构造函数存在区别,主要区别用没用this,没用this需要return  
简单工厂模式只是在函数中增加方法,而复杂是在prototype中
#### 代码
		// 复杂工厂模式
		Xml = function (){};
		Xml.prototype = {
			// prototype中的方法不可以直接调用会报错
			createXml: function() {
				let XMLHttp = null;
				if(window.XMLHttpRequest) {
					XMLHttp = new XMLHttpRequest();
				} else{
					XMLHttp = new ActiveXObject("Microsoft.XMLHTTP")
				}
				return XMLHttp;
			}
		}
		let child = function() {}
		child.prototype = new Xml();
		child.prototype.constructor = child;
		// 这里就可以直接调用了
		// 当然后边也可以重写方法
		child.prototype.createXml = function() {
			console.log("重写了方法");
		}
		child.prototype.createXml();
#### 参考链接
https://blog.csdn.net/qq_39512601/article/details/86803167

### 单例模式
#### 概念讲解
闭包实现new实例只进行一次
#### 代码
		// 单例模式
		let single = (function(){
			let unique;
			function getObj() {
				if(unique === undefined) {
					unique = new Obj();
				}
				return unique;
			}

			// 构造函数
			function Obj() {
				this.name = "梁博";
			}

			return {
				getObj: getObj
			}
		})();
    
### 发布订阅模式
#### 概念讲解
#### 代码

### 单例模式
#### 概念讲解
#### 代码
