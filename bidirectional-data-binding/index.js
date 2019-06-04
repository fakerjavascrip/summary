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