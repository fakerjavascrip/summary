<<<<<<< HEAD
		//Observer
		//入口的文件,该一块的内容相当于发不订阅模式的订阅模块
		//将每个属性使用defineProperty增加
		function observe(data){
			//订阅的入口
			if(!data|| typeof data!='object'){
				return;
			}
			Object.key(data).forEach((key) => {
				defineReactive(data,key,data[key]);
			});
		}
		function defineReactive(data,key,val){
			//订阅,增加获取和设置的方法
			observe(val);
			let dep = new Dep();
			Object.defineProperty(data,key,{
				enumerable: true,
				configurable: true,
				get: function() {
					if(Dep.target) { //判断是否需要添加订阅者
						dep.addSub(Dep.target);//添加一个订阅者
					}
					return val;
				},
				set: function(newVal) {
					if(newVal === val) {
						return;
					}
					val = newVal;
					console.log('属性' + key + '已经被监听了了,现在值已经改变为' + newVal);
					dep.notfiy();
				},
			})
		}


		function Dep (){
			//每个属性的订阅者
			this.subs = [];
		}
		Dep.prototype = {
			//订阅者的方法
			addSub: function(sub) {
				//增加订阅者
				this.subs.push(sub);
			},
			notfiy: function(){
				//当更新调用方法
				this.subs.forEach(function(sub){
					sub.update();
				})
			}
		}



		//Watcher
		//检测文件,当属性发生变化触发相应的函数
		//相当于发布订阅模式中的发布模块
		function Watche(vm,exp,cb){
			this.cb = cb; //执行的函数
			this.vm = vm; //实例的this指向
			this.exp = exp;
			this.value = this.get(); //加在订阅器的操作
		}

		Watcher.prototype = {
			update: function() {
				this.run();
			},
			run: function(){
				let value = this.vm.data[this.exp];
				let oldVal = this.value;
				if(value !== oldVal) {
					this.value = value;
					this.cb.call(this.vm,value,oldVal);
				}
			},
			get: function(){
				Dep.target = this; //缓存自己
				let value = this.vm.data[this.exp] //强制执行监听器里的get
				Dep.target = null; //释放自己
				return value;
			}
		}
=======

			// new实例
			function SelfVue (options) {
			    var self = this;
			    //当前对象实例就只允许对象数据传入
			    this.data = options.data;
			 	
			 	// 修改为访问key就可以直接访问到data[key]的值
			    Object.keys(this.data).forEach(function(key) {
			        self.proxyKeys(key);
			    });
			 	
			    observe(this.data);
			    el.innerHTML = this.data[exp];
			    new Watcher(this, exp, function (value) {
			        el.innerHTML = value;
			    });
			    return this;
			    // new Compile(options.el, this);
			}
			// 设置proxyKeys函数
			SelfVue.prototype = {
			    proxyKeys: function (key) {
			        var self = this;
			        Object.defineProperty(this, key, {
			            enumerable: false,
			            configurable: true,
			            get: function proxyGetter() {
			                return self.data[key];
			            },
			            set: function proxySetter(newVal) {
			                self.data[key] = newVal;
			            }
			        });
			    }
			}
			// new 一个实例出来
			new SelfVue({
				// vue绑定哪个div
			        el: '.box',
			        // vue传入的data数据
			        data: {
			            title: 'hello world',
			            name: 'canfoo'
			        },
			    });

		//关联Observer和Watcher
		function SelfVue (options) {
		    var self = this;
		    this.vm = this;
		    this.data = options;
		 
		    Object.keys(this.data).forEach(function(key) {
		        self.proxyKeys(key);
		    });
		 
		    observe(this.data);
		    new Compile(options, this.vm);
		    return this;
		}

		observe(data);


		// 构建vue实例
		let selfVue = new SelfVue({
			name: "hello word"
		},ele,'name');

		Window.setTimeout(function () {
			console.log('name的值发生了改变');
			selfVue.data.name = 'canfoo';
		},2000);


		// Compile
		// 获取dom解析进行绑定
		function nodeToFragment (el) {
			// 创建文档片段
			let fragment = document.createDocumentFragment();
			let child = el.firstChild;
			while (child) {
				// 将 Dom元素移入fragment中
				fragment.appendChild(child);
				child = el.firstChild;
			}
			return fragment;
		}

		function compileElement (el) {
		    var childNodes = el.childNodes;
		    var self = this;
		    [].slice.call(childNodes).forEach(function(node) {
		        var reg = /\{\{(.*)\}\}/; // 正则
		        var text = node.textContent;
		 
		        if (self.isTextNode(node) && reg.test(text)) {  // 判断是否是符合这种形式{{}}的指令
		            self.compileText(node, reg.exec(text)[1]);
		        }
		 
		        if (node.childNodes && node.childNodes.length) {
		            self.compileElement(node);  // 继续递归遍历子节点
		        }
		    });
		},
		function compileText (node, exp) {
		    var self = this;
		    var initText = this.vm[exp];
		    updateText(node, initText);  // 将初始化的数据初始化到视图中
		    new Watcher(this.vm, exp, function (value) {  // 生成订阅器并绑定更新函数
		        self.updateText(node, value);
		    });
		},
		function updateText (node, value) {
		    node.textContent = typeof value == 'undefined' ? '' : value;
		}
=======
			// Compile
			function compile (node) {
				// 调用通过attributes从而判断是否绑定指令,元素节点以递归的形式
			    var nodeAttrs = node.attributes;
			    var self = this;
			    Array.prototype.forEach.call(nodeAttrs, function(attr) {
			        var attrName = attr.name;
			        if (self.isDirective(attrName)) {
			            var exp = attr.value;
			            var dir = attrName.substring(2);
			            if (self.isEventDirective(dir)) {  // 事件指令
			                self.compileEvent(node, self.vm, exp, dir);
			            } else {  // v-model 指令
			                self.compileModel(node, self.vm, exp, dir);
			            }
			            node.removeAttribute(attrName);
			        }
			    });
			}

			function compileElement (el) {
				// 调用根元素进行遍历将每个用到{{}}的元素new Watcher加入各自的属性的订阅列表中
			    var childNodes = el.childNodes;
			    var self = this;
			    [].slice.call(childNodes).forEach(function(node) {
			        var reg = /\{\{(.*)\}\}/;
			        var text = node.textContent;
			 
			        if (self.isTextNode(node) && reg.test(text)) {  // 判断是否是符合这种形式{{}}的指令
			            self.compileText(node, reg.exec(text)[1]);
			        }
			 
			        if (node.childNodes && node.childNodes.length) {
			            self.compileElement(node);  // 继续递归遍历子节点
			        }
			    });
			},
			function compileText (node, exp) {
			    var self = this;
			    var initText = this.vm[exp];
			    updateText(node, initText);  // 将初始化的数据初始化到视图中
			    new Watcher(this.vm, exp, function (value) {  // 生成订阅器并绑定更新函数
			        self.updateText(node, value);
			    });
			},
			function updateText (node, value) {
			    node.textContent = typeof value == 'undefined' ? '' : value;
			}
>>>>>>> f71f6384ce1ab4f572f767cf5857e591167ad9a1
