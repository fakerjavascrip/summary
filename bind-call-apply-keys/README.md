## 1. bind
#### 1.1概念讲解
写在Function.prototype上,函数判断,第一个参数为绑定this的对象,第二个参数为参数数组
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
		  // 获取返回值
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
## 2. call

## 3. apply
