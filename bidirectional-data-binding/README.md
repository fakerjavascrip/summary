## 双向数据绑定
主要是现在双向数据绑定
从vue初始化,v-model,数据变化实现,通过defineProperty


自己总结
主要分为三个模块,observe,watch,Compile,设计模式采用发布订阅的模式

Observe模块是对对象进行遍历之后通过Object.defineProperty的方法去改变对象的get和set的方法

get中的内容相当于发布订阅的订阅模式当第一次实例化的时候将其添加在一个deep的实例中,这里deep的方法为存储当前对象被各个实例所使用的

### SelfVue
入口函数,传入一个对象包含ele,data对象,methods执行函数
### Observe

### Watcher



### compile
主要通过attributes去获取属性的数组,之后使用call去使用Array.prototype.forEach去遍历整个属性数组然后去执行函数,函数中通过判断属性的内容从而判断指令是哪个;
