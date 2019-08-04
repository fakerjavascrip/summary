### 1. 延迟脚本
#### 概念讲解
defer="defer":预先下载但是延迟执行
async 哪个脚本先下载完先执行哪个
### 2. with
#### 概念讲解
with先在局部寻找变量,之后再到location对象中寻找
#### 代码
		with(location) {
			let name = name;
			let age = age;
		}
### 3. 
