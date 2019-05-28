//Observer
//入口的文件,该一块的内容相当于发不订阅模式的订阅模块
//将每个属性使用defineProperty增加
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
		//当更新调用丁约着的方法
		this.subs.forEach(function(sub){
			sub.update();
		})
	}
}
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
	Object.defineProperty(data,key,{
		enumerable: true,
		configurable: true,
		get: function() {
			if(Dep.addSub(Dep.target)) { //判断是否需要添加订阅者
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



//Watcher
//检测文件,当属性发生变化触发相应的函数
//相当于发布订阅模式中的发布模块
function Watche(vm,exp,cb){
	this.cb = cb;
	this.vm = vm;
	this.exp = exp;
	this.value = this.get(); //加在订阅器的操作
}

Watcher.prototype = {
	update: function() {
		this.run();
	},
	run: function(){
		let var = this.vm.data(this.exp);
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
function SelfVue (data,el,exp) {
	this.data = data;
	observe(data);
	el.innerHTNL = this.datat[exp];
	new Watcher(this, exp, function (value) {
		el.innerHTML = value;
	})
	return this;
}

observe(data);


//构建vue实例
let selfVue = new SelfVue({
	name: "hello word"
},ele,'name')

Window.setTimeout(function () {
	console.log('name的值发生了改变');
	selfVue.data.name = 'canfoo';
},2000);



