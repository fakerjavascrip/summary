<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title></title>
</head>
	<body>
		<div class="box">
			<div>hello</div>
		</div>
		<script type="text/javascript">

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


			// Observe
			function defineReactive(data, key, val) {
				// 继续将子属性传入obser入口判断是否为对象如果是递归调用defineReactive
			    observe(val);
			    // 创建订阅者列表,每个属性创建单独的实例保存各自的订阅者
			    var dep = new Dep(); 
			    // 调用defineProperty方法修改get和set的方法
			    Object.defineProperty(data, key, {
			        enumerable: true,
			        configurable: true,
			        get: function() {
			        	// Dep.target只有通过Watcher才能触发不为空从而触发dep.addSub
			            if (Dep.target) {
			            	// 如果有地方获取该属性那么将这个地方加入当前属性的订阅者列表
			                dep.addSub(Dep.target);
			            }
			            return val;
			        },
			        set: function(newVal) {
			            if (val === newVal) {
			                return;
			            }
			            val = newVal;
			            // 如果存在数据的变动那么数据更新
			            console.log('属性' + key + '已经被监听了，现在值为：“' + newVal.toString() + '”');
			            dep.notify(); // 如果数据变化，通知所有订阅者
			        }
			    });
			}
			 
			 // observe入口函数
			function observe(data) {
			    if (!data || typeof data !== 'object') {
			        return;
			    }
			    // 遍历对象的每一个属性
			    Object.keys(data).forEach(function(key) {
			        defineReactive(data, key, data[key]);
			    });
			};

			// Dep函数
			function Dep () {
				// 订阅者的列表
			    this.subs = [];
			}
			Dep.prototype = {
			    addSub: function(sub) {
			    	// 将订阅者存入列表
			        this.subs.push(sub);
			    },
			    notify: function() {
			    	// 遍历整个订阅者列表做出更新
			        this.subs.forEach(function(sub) {
			        	// 触发每个dom绑定的在Watcher中的run函数,可以更新也可以触发别的
			            sub.run();
			        });
			    }
			};


			// Watcher函数
			// vm是vue实例,exp为data中的某个属性,cb为更新某个节点数据的函数
			function Watcher(vm, exp, cb) {
			    this.cb = cb; // 更新函数
			    this.vm = vm; // vue实例
			    this.exp = exp; // 属性
			    this.value = this.get();  // 将自己添加到订阅器的操作
			}
			 
			Watcher.prototype = {
			    run: function() {
			        var value = this.vm.data[this.exp];
			        var oldVal = this.value;
			        if (value !== oldVal) {
			            this.value = value;
			            // 调用更新函数,比如对dom元素的text做出改变
			            this.cb.call(this.vm, value, oldVal);
			        }
			    },
			    get: function() {
			        Dep.target = this;  // 缓存自己
			        var value = this.vm.data[this.exp]  // 强制执行监听器里的get函数
			        Dep.target = null;  // 释放自己
			        return value;
			    }
			};

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
		</script>
	</body>
</html>
