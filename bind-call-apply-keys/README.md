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

