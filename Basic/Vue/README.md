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
watch监听数据的变化
### 5. v-show和v-if
v-show只是隐藏,v-if销毁组件
