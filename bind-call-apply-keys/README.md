// ...是将对象解构,[...arguments]将解构内容转为数组
// throw new TypeError('Error');抛出错误异常
// 两个~ ~是按位取整,heMath.floor()的功能相似
// 无法掌握循环次数适合用while,反之用for
## 1. call
#### 1.1概念讲解
多个参数,返回值为变量
写在Function.prototype上,函数判断,call有多个参数
[...arguments]将参数转为数组
throw new TypeError('not funciton')抛出错误
#### 1.2代码
		// 实现call函数
		// 将this进行改变挂载在第一个参数上执行
		Function.prototype.mycall = function (context) {
		  if (typeof this !== 'function') {
		  	// 当绑定不是函数的时候抛出错误
		    throw new TypeError('not a funciton')
		  }
		  // 判断是否存在第一个参数,如果不存在绑定在window对象上
		  context = context || window;
		  // 将函数赋值给第一个变量
		  context.fn = this;
		  // 获取第二个参数数组
		  let arg = [...arguments].slice(1);
		  // 获取返回值,将数组拆分为一个一个
		  let result = context.fn(...arg);
		  // 删除函数对象
		  delete context.fn
		  return result
		} 

		let a =function(){
			// 执行的this为改变绑定的函数
			console.log(this);
			return 1;
		};
		let c=function(){
		};
		a.mycall(c);

## 2. apply
#### 2.1 概念讲解
接受两个参数,返回值为运算后的变量,call的区别主要是在于对参数的处理上,call是有多个参数而apply只有两个参数一个指向和一个数组
#### 2.2 代码
	// 参数是一个数组
	Function.prototype.myapply = function (context) {
	  if (typeof this !== 'function') {
	    throw new TypeError('not funciton')
	  }
	  context = context || window
	  context.fn = this
	  let result
	  if (arguments[1]) {
	    // 不管是call还是apply在调用的时候参数都要展开
	    result = context.fn(...arguments[1])
	  } else {
	    result = context.fn()
	  }
	  delete context.fn
	  return result
	}


## 3. bind
#### 3.1 概念讲解
在bind中包了一层apply,多个参数,返回值为函数
#### 3.2 代码
		// 实现bind
		Function.prototype.bind =  function(context) {
			if(typeof this != 'function') {
				throw new TypeError('Error');
			}
			let _this = this;
			let args = [...arguments].sliced(1);
			return function F(){
				if(this instanceof F) {
					// new了一下bind后的函数
					return new _this(...args,...arguments)
				} else {
					// 正常调用bind用apply实现
					return _this.apply(context,arg.content(...arguments));
				}
			}
		}

## 4. instanceof
#### 4.1 概念讲解
在a.__proto__链式中存在b.prototype那么a就是b的实例
#### 4.2 代码
		// instanceof
		function instanceof(left, right) {
			let leftValue = left.__proto__;
			let rightValue  = right.prototype;
			while(true) {
				if(leftValue === null) {
					// 如果最后指向null证明不存在直接返回false
					return false;
				}
				if(leftValue === rightValue) {
					return true;
				}
				//  
				leftValue = leftValue.__proto__;
			}
		}

## 5. new
#### 5.1 概念讲解
正常构造函数执行那么就是将变量加在了全局对象中,而new只不过是让新对象调用构造函数将内容加在新对象里
创建新对象,__proto__指向构造函数的原型,将构造函数作用域赋值给新对象,this指向当前对象,执行构造函数中的代码为这个对象添加属性,返回新对象
#### 5.2 代码
		// 实现new的操作
		function Mynew(fuc){
			//创建对象
			let obj= {
				// 添加__proto__的指向
				__proto__: fuc.prototype
			};
			//将值加入对象中,其实就是改变this的指向执行,本来正常执行就加入到了全局中
			fuc.call(obj,...arguments);
			// 返回对象s
			return obj;
		}

## 6. 深拷贝
#### 6.1 概念讲解
建立一个对象可以让子对象可以比对父级对象是否和子对象相等
对象三个属性:创建属性,原obj属性,parent像链表一样找到父级的属性
其实就是比对子对象的obj和父对象的obj看是否相等,如果相等那么子对象直接赋值父对象创建对象(createparent)
#### 6.2代码
			objb = {
				age:12,
			}
			obja = {
				age:22
			}
			objb.name = obja;
			obja.name = objb;
			function deepCopy(obj,parent=null){
				let copy = obj instanceof Array ? [] : {};
				let _parent = parent;
				while(_parent){
					// 先判断第一次的parent
					if(_parent.obj === obj){
						// 当前的obj和父级的obj相等那么循环引用
						// 返回父级的创造parent即可
						return _parent.createparent;
					}
					_parent = _parent.parent;
				}
				for(key in obj){
					if(typeof obj[key] === 'object'){
						copy[key] = deepCopy(obj[key],{
							createparent:copy,
							parent:parent,
							obj:obj
						});
					} else {
						copy[key] = obj[key];
					}
				}
				return copy;
			}
			let t = deepCopy(obja);
## 7. setTimeout实现setInterval
#### 7.1 概念讲解
先执行一次,之后将自己放在函数中递归调用
#### 7.2代码
		// setTimeout和setInterval存在于window对象中
		window.MysetInterval = function(fuc,time){
			function open(){
				// 递归自己调用自己
				fuc();
				setTimeout(open,time);
			}
			// 首次调用
			setTimeout(open,time);
		}
		MysetInterval(function(){
			console.log("你好");
		},1000)
## 8. 数组乱序
#### 8.1 概念讲解
一个新数组arr1存储,一个arr.length的随机数,每次取出随机数random对应位置的数字,删除数组取出位置的内容(splice)
#### 8.2代码
		// 数组乱序
		let arr = [1,2,3,4,5,6,7];
		function Disorder(arr){
			let arr1 = [];
			// 随机数,记录length
			let random,length,i;
			length = arr.length;
			for(i=0; i<length; i++) {
				random = Math.round(Math.random()*(arr.length-1));
				arr1.push(arr[random]);
				arr.splice(random,1);
			}
		}
		Disorder(arr);
## 9. 拆分url
#### 9.1 概念讲解
将参数的字符串拆出来,将每一项拆出来,再将一项拆成属性和值放入对象
#### 9.2代码
		// url拆解参数
		url = "www.baidu.com?name=梁某&age=12&sex=男";
		function Split (url) {
			// 有几类字符串拆几次,拆除只有参数的字符串
			let arr1 = url.split("?");
			let obj = [];
			// 将每个字符串拆分
			let arr2 = arr1[1].split("&");
			let i = 0;
			for(i=0; i<arr2.length; i++) {
				// 将每一项拆分为对象
				obj[arr2[i].split("=")[0]] = arr2[i].split("=")[1];
			}
			return obj;
		}
		let t = Split(url);
## 10. 大数字相加
#### 10.1 概念讲解
字符串相加返回字符串,split拆分字符串为数组,pop从结尾开始相加,一个标记值确定是否进位
#### 10.2代码
		// 大数相加
		let num1 = "12345678";
		let num2 = "9999992";
		function maxAdd(num1,num2) {
			let arr1,arr2,res,temp;
			arr1 = num1.split("");
			arr2 = num2.split("");
			// 结果res为字符串,temp的初始值为0
			res = "",temp=0;
			// 无法掌控循环次
			while(arr1.length || arr2.length || temp) {
				// ~~将数字转为整数和Math.floor差不多
				temp += ~~arr1.pop() + ~~arr2.pop();
				res = (temp%10)+res;
				temp = temp>9;
			}
			return res;
		}
		let t = maxAdd(num1,num2);

## 11. 每个字符出现次数
#### 11.1 概念讲解
遍历整个字符串,如果存在那么+1,如果不存在那么创建初始化
#### 11.2代码
		// 字符出现次数
		str = "adsjkasdbasbxasd";
		function getNum(str) {
			let arr = str.split("");
			let obj = [];
			for(i=0; i<arr.length; i++) {
				for(j=0; j<obj.length; j++) {
					if(arr[i] === obj[j].name) {
						obj[j].num +=1; 
						break;
					}
				}
				if(j === obj.length) {
					obj.push({name:arr[i],num:1})
				}
			}
			return obj;
		}
		let t = getNum(str);
		console.log(t);

## 12. 数组扁平化
#### 12.1 概念讲解
数组遍历,不是数组那么push,是数组那么递归
#### 12.2代码
		//数组扁平化
		let arrt = [[1,2,3,4],1,2,3,4,5,6];
		function Flat(arr){
			// 不定义i那么i就成了全局变量,那样所有函数会公用一个i
			let arr1 = [],i;
			console.log(arr.length)
			for(i=0; i<arr.length; i++){
				if(Array.isArray(arr[i])){
					// 直接将返回数组与要扁平化的数组concat起来
					arr1 = arr1.concat(Flat(arr[i]));
				} else{
					arr1.push(arr[i]);
				}
			}
			return arr1;
		}
		let t = Flat(arrt);
		console.log(t);

## 13. 数组去重
#### 13.1 概念讲解
遍历一遍,当后边和前边的数字相等那么删除,之后向后移动保证前边的数字是唯一的
#### 13.2代码
		//数组去重
		let arrt = [1,2,3,2,1,3,4,2,7,2];
		function Removal(arr){
			for(i=0; i<arr.length; i++) {
				for(j=i+1; j<arr.length; j++) {
					if(arr[i] === arr[j]){
						arr.splice(j,1);
						j--;
					}
				}
			}
			return arr;
		}
		let t = Removal(arrt);
		console.log(t);
## 14. 
#### 14.1 概念讲解
#### 14.2代码
## 15. 
#### 15.1 概念讲解
#### 15.2代码
## 16. 
#### 16.1 概念讲解
#### 16.2代码
## 17 
#### 17.1 概念讲解
#### 17.2代码
## 18. 
#### 18.1 概念讲解
#### 18.2代码
## 19. 
#### 19.1 概念讲解
#### 19.2代码
## 20. 
#### 20.1 概念讲解
#### 20.2代码
## 12. node控制请求数量
#### 12.1 概念讲解
一个标记值确定现在正在请求的数量,当新的请求进来判断正在请求是否满了,如果满了将请求存在数组中,当有一个请求结束,那么从数组中取出请求
#### 12.2代码
	//控制请求数量的办法
	let reqNum = 0;
	let limitReg = 20;
	let arrhttp = [];
	asyc function testSize(req,res){
		reqNum++;
		if(reqNum>limitReg){
			console.log("当前请求大于20");
			let httpmsg = {
				req:req,
				res:res,
			}
			arrhttp.push(httpmsg);
		}
		else{
			//直接执行请求
			textHadle(req,res);
		}
	}
	async function textHadle(req,res){
		console.log("你好");
		nextreq(res,data);
	}
	function nexreq(res,data){
		reqNum--;
		res.send(data);
		if(reqNum>0){
			let httpmsg = arrhttp.shift();
			testSize(httpmsg.req,)
		}
	}
