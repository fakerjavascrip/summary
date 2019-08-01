所以hash可以直接用window的location去改变而history不可以只能去调用另外两个Api
### hash
#### 概念讲解
http://www.baidu.com/#/login  
hash改变不会触发浏览器刷新,hash改变会触发hashchange事件
#### 代码
### history
#### 概念讲解
pushState和replaceState这两个API改变url地址但不会发送请求  
调用这两个api会触发popstate事件
#### 代码
#### 参考链接
https://juejin.im/post/5b10b46df265da6e2a08a724
