### 1. 组件通信
#### 概念讲解
一:bind绑定事件通信  
父组件:v-on:test = "fuc"  子组件: this.emit("test",传入的参数);  
二:传递对象修改属性
三:v-model修改
model初始化,this.$emit调用
直接用this.$emit("input",传入参数)调用
### 2. 定义公用方法
#### 概念讲解
vuex中
window中
server.js中
mixins
### 3.缓存
#### 概念讲解
vuex
window
keep-alive
全局组件
storage
### 4. 生命周期
#### 概念讲解
beforeCreate,created,beforeMounte,mounted,beforeUpdate,updated,beforeDestroy,destroyed  
dom渲染在mounted中已经完成渲染
### 5. computed和watch的区别
#### 概念讲解
computed定义一个属性,调用的时候触发
watch某个数据变化做一些事请，当变化参数传入老数据和新数据并做出操作  
watch缓存,computed不缓存
### 6. v-show和v-if
#### 概念讲解
v-show只是隐藏,v-if销毁组件
### 7. data和props
#### 概念讲解
相同:操作改变,模板渲染数据会发生同步变化  
不同:data任何情况都可以修改数据类型和数据,props为静态数据,子组件不可以直接修改数据以及不可修改父组件数据;
### 8. data
#### 概念讲解
data必须是函数,是因为组件可能被多处使用,但是数据得是私有
### 10. vue编译过程
#### 概念讲解
先生成抽象语法树(AST)再得到render函数返回值是Vnode,其中包含标签名子节点文本等等
### 11. vue和react
#### 概念讲解
相同:都支持ssr,都有Virtual DOM,都提供合理的钩子函数,
不同:vue提供指令,v-model和state,vue为minxins而react为HOC
#### 参考链接
https://juejin.im/post/5b8b56e3f265da434c1f5f76
### 总结性链接
https://juejin.im/post/5ab2ff496fb9a028c06ab78f
https://juejin.im/post/59ffb4b66fb9a04512385402
