主要用于解决和实际使用redux,从而改善开发效率
### 基本概念
#### store
包含rudecer,任何地方可以调用store.dispatch(action)触发
#### reducer
store调用reducer,接受两个参数当前应用状态和action  
combineReducers会合并多个reducer为一个reducer,action会传递给多个子reducer处理,子reducer处理后会合并为一个状态
#### action
定义改变变量的方法,type
### React中调用redux
安装react-redux包
#### connect
把React和Redux的store连接起来
#### mapStateToProps
每次store状态更新执行一次,获取状态
#### mapDispatchToProps
定义函数执行dispatch,执行action
### Redux简单流程总结
组件dispatch触发action调用reducers产生新的state传给store那么之后将state更新传给组件重新栈实,一个单向数据流的过程
![image](https://user-gold-cdn.xitu.io/2018/4/11/162b3b40bd84b310?imageslim)
