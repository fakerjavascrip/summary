## 双向数据绑定
主要是实现双向数据绑定
从vue初始化,v-model,数据变化实现,通过defineProperty


## 自己总结

主要分为三个模块,observe,watch,Compile,设计模式采用发布订阅的模式

Observe模块是对对象进行遍历之后通过Object.defineProperty的方法去改变对象的get和set的方法

get中的内容相当于发布订阅的订阅模式当第一次实例化的时候将其添加在一个deep的实例中,这里deep的方法为存储当前对象被各个实例所使用的


## SelfVue
入口函数,参数传入一个对象包含ele,data对象;new该实例时
#### 初始化对象
有一个observe函数的入口,将data传入,递归的方法遍历所有属性值,调用defineProperty方法,实现对所有属性的监听;

调用Compile,将元素绑定在属性的订阅列表里,并当属性改变时候触发自己的run函数改变元素的text值
#### proxyKeys
将data中的属性值绑定给实例的属性


## Observe
判断对象的属性是否为对象,递归遍历属性,让每个属性都初始化
##### defineReactive
初始化对象的时候将传入的data对象的每个属性通过defineProperty创建一个订阅者列表(new Dep创建列表),当获取该属性的时候判断是否需要触发订阅从而将这个订阅者加入列表中,而另一个set设置当设置该属性的时候触发更新函数
#### Deep
存在一个数组,和两个原型方法addSub和notify一个是触发将订阅者加入列表,而另一个函数是当设置某个属性的时候触发该函数遍历该属性的订阅者列表从而触发更新,


## Watcher
主要是将绑定在dom上的属性存入订阅者模式,new Watcher实例就是相当于把传入的ele传入需要的属性的订阅者列表,
#### run
当属性值改变订阅列表触发run从而对dom元素的节点做出改变
#### get
某个dom实例第一次new Watcher的时候触发,将该实例的this通过强制触发defineproperty从而将实例的this加入订阅数组


## Compile(分为两块)
#### 指令获取模块
主要通过attributes去获取属性的数组,之后使用call去使用Array.prototype.forEach去遍历整个属性数组然后去执行函数,函数中通过判断属性的内容从而判断指令是哪个;

#### 加入属性订阅列表模块
当然另一个线关于绑定的数据从实例的根节点开始遍历子节点,当发现有{{}}那么就调用new Watcher触发将dom绑定在属性的订阅者列表中并且包含更新数据的函数,通过textContent来更换数据
