// 函数的prototype中的内容不能直接使用,只能通过new后的对象使用或prototype使用
### 单体模式
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
		// 需要将函数实例化
		let done = new child();
		done.createXml(); // 执行该方法
#### 参考链接
https://blog.csdn.net/qq_39512601/article/details/86803167

### 单例模式
#### 概念讲解
闭包实现new实例只进行一次,闭包的利处
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
订阅 => 发布 => 删除  
订阅是否返回一个id,可以在删除的时候使用
#### 代码
		// 发布订阅模式
		let pubsub = {};
		(function(q) {
			let arr = [];
			let subid = -1;
			// 发布消息
			q.publish = function(type, title) {
				for(key in arr) {
					if(key === type) {
						for(var i = 0; i< arr[key].length; i++) {
							arr[key][i].fuc(type,title);
						}
					}
				}
			}
			// 订阅消息
			q.register = function(type, fuc) {
				if(!arr[type]) {
					arr[type] = [];
				}

				let token = (++subid).toString();
				arr[type].push({
					token: token,
					fuc: fuc
				})
				return token;
			}

			//删除订阅
			q.delete = function (token) {
				for(m in arr) {
					if(arr[m]) {
						for(i=0; i<arr[m].length; i++) {
							if(arr[m][i].token === token) {
								// 删除该项
								arr[m].splice(i,1);
								return token;
							}
						}
					}
					return false;
				}
			}
		})(pubsub)
### 模板模式
#### 概念讲解
将需要执行的多个方法依次写在一个方法中执行,当然也可以修改这些方法通过继承
#### 代码
		// 模板模式
		let mode = function(){};
		mode.prototype.sayName =function() {
			console.log("梁博");
		}
		mode.prototype.sayAge = function() {
			console.log(20);
		}
		mode.prototype.merge = function() {
			this.sayName();
			this.sayAge();
		}
		let fuc = function(){}
		fuc.prototype = new mode();
		fuc.prototype.sayAge = function() {
			console.log("年龄是个秘密");
		}
		let done = new fuc();
		done.merge();// 梁博  年龄是个秘密
### 测略模式
#### 概念讲解
解决if的逻辑嵌套过多

### 参考链接
https://www.cnblogs.com/xianyulaodi/p/5827821.html#_label0
