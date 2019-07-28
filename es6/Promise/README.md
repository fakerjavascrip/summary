// try catch 抛出异常
// promise的错误捕获像冒泡一样,then的第二个参数和catch的主要区别是,catch不能捕获自己第一个参数的错误
## 1. promise
#### 1.1 概念讲解
基本结构 => 实现状态 => 实现then方法 => 实现then异步 => 实现then返回promise(这一块比较复杂) => catch => finally
#### 1.2 代码
		// Promise
		// 三种状态,厨师,成功,失败
		const PENDING = 'pending';
		const FULFILLED = 'fulfilled';
		const REJECTED = 'rejected';

		function MyPromise(fuc) {
			let self = this; // 存储this
			// 实现异步调用
			self.onFulfilledCallbacks = [];
  			self.onRejectedCallbacks = [];
			self.value = null;
			self.reason = null;
			self.state = PENDING;
			function resolve(value) {
				if(self.state === PENDING) {
					self.state = FULFILLED;
					self.value = value;

					// 当promise没new前调用的then的resolve在现在执行
					self.onFulfilledCallbacks.forEach(function(fulfilledCallback) {
						fulfilledCallback();
					})
				}
			}

			function reject(reason) {
				if(self.state === PENDING) {
					self.state = REJECTED;
					self.reason = reason;

					// new promise前执行的reject在这执行
					self.onRejectedCallbacks.forEach(function(onRejectedCallback) {
						rejectedCallback();
					})
				}
			}
			try {
				fuc(resolve,reject);
			} catch(reason) {
				reject(reason);
			}
		}
		MyPromise.prototype.then = function(onFuifilled, onRejected) {
			let self = this;
			let promise2 = null;
			promise2 = new MyPromise((resolve,reject)=> {
			    // 当状态还为pending的时候调用了then那么进行缓存
				if(self.state === PENDING) {
					// onFuifilled是执行then时需要执行的函数
					self.onFulfilledCallbacks.push(()=>{
						try {
							// x为执行函数后的返回参数,因为要在下一个then用
							let x = onFuifilled(self.value);
							self.resolvePromise(promise, x, resolve, reject);
						} catch(reason) {
							reject(reason);
						}	
					})
					self.onRejectedCallbacks.push(()=>{
						try {
							let x = onRejected(self.reason);
							self.resolvePromise(promise2, x, resolve, reject);
						} catch(reason) {
							reject(reason);
						}
						onRejected(self.reason);
					})
				}

				// 正常状态改变后执行对应的resolve和reject,并取得返回的对应信息
				if (self.state === FULFILLED) {
					try {
						let x = onFuifilled(self.value);
						self.resolvePromise(promise2, x, resolve, reject)
					} catch (reason) {
						reject(reason);
					}
				}
				if (self.state === REJECTED) {
					try {
						let x = onRejected(self.reason);
						self.resolvePromise(promise2, x, resolve, reject);
					} catch (reason) {
						reject(reason);
					}
				}
			})
			// 将then后的promise返回
			return promise2;
		}
		MyPromise.prototype.resolvePromise = function(promise2, x, resolve, reject) {
			let self = this;
			let called = false; // 防止多次调用

			if(promise2 === x) {
				return reject(new TypeoError('循环引用'));
			}

			if(x !== null && (Object.prototype.toString.call(x) === '[object Function]')) {
				// x如果是对象或函数
				try {
					let then = x.then;
					if(typeof then === 'function') {
						then.call(x,(y) => {
							if(called) rturn;
							called = true;
							self.resolvePromise(promise2, y, resolve, reject);
						},(reason) => {
							reject(reason);
						})
					} else {
						resolve(x);
					}
				} catch (reason) {
					if(called) return;
					called = true;
					reject(reason);
				}
			} else {
				// x是普通的值,直接resolve
				resolve(x);
			}
		}

		MyPromise.prototype.catch = function(onRejected) {
		  	return this.then(null, onRejected);
		};
		// finally和上一个状态无关都会执行,只接受一个参数
		MyPromise.prototype.finally = function(fn) {
			// value为上一个then或promise传过来的正常或错误的信息
		    return this.then(value => {
		       fn();
		       return value;
		    }, reason => {
		        fn();
		        throw reason;
		    });
		};
		let promise = new MyPromise(function(resolve,reject){
			console.log("啊哈哈哈");
			resolve("石猫猫");
		});
		promise.then(function(res){
			return 1234;
		}).then(function(res){
			// then的第二个参数不能捕获该错误
			dasd
			console.log("啊哈哈");
		},function(res){
			console.log("then捕获错误");
		}).catch(function(){
			console.log("catch捕获");
		})
		
## 2.1 概念讲解
实现all, 实现race, 实现reject,实现resolve
## 2.2 代码
		// 实现all,race,resolve,reject
		MyPromise.all = function(arr) {
			return new MyPromise(function(resolve,reject){
				let result = [];

				arr.forEach((promise, index) => {
					promise.then((value) => {
						result[index] = value;

						if(result.length === arr.length) {
							// 返回正确结果的的数组
							resolve(result);
						}
					},reject)
				})
			})
		}

		MyPromise.race = function(arr){
			return new MyPromise(function(resolve,reject) {
				arr.forEach((promise, index) => {
					promise.then(value=>{
						resolve(value);
					},reject);
				})
			})
		}

		MyPromise.resolve = function() {
			return new Promise(function(resolve, reject) {
				resolve();
			})
		}
		MyPromise.reject = function() {
			return new Promise(function(resolve, reject) {
				reject();
			})
		}

