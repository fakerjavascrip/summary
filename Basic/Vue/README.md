### 1. 组件通信
#### 概念讲解
一:bind绑定事件通信  
父组件:v-on:test = "fuc"  子组件: this.emit("test",传入的参数);  
二:传递对象修改属性
三:v-model修改
model初始化,this.$emit调用
直接用this.$emit("input",传入参数)调用
### 2. 定义公用方法
vuex中
window中
server.js中
mixins
### 3.缓存
vuex
window
keep-alive
全局组件
storage
### 3. 生命周期
beforeCreate,created,beforeMounte,mounted,beforeUpdate,updated,beforeDestroy,destroyed
### 4. computed和watch的区别
computed定义一个属性,调用的时候触发
watch某个数据变化做一些事请，当变化参数传入老数据和新数据并做出操作
### 5. v-show和v-if
v-show只是隐藏,v-if销毁组件
### 6. data和props
相同:操作改变,模板渲染数据会发生同步变化  
不同:data任何情况都可以修改数据类型和数据,props为静态数据,子组件不可以直接修改数据以及不可修改父组件数据;
### 7. data
data必须是函数,是因为组件可能被多处使用,但是数据得是私有
### 参考链接
https://juejin.im/post/5ab2ff496fb9a028c06ab78f
