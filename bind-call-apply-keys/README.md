// ...是将对象解构,[...arguments]将解构内容转为数组
// throw new TypeError('Error');抛出错误异常
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
## 8. 
#### 8.1 概念讲解
#### 8.2代码
## 9. 
#### 9.1 概念讲解
#### 9.2代码
## 10. 
#### 10.1 概念讲解
#### 10.2代码
## 11. 
#### 11.1 概念讲解
#### 11.2代码
## 12. 
#### 12.1 概念讲解
#### 12.2代码
