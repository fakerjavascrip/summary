// 单向链表的应用场景: 深拷贝的循环引用的判断
### 1. 单向链表
#### 1.1 概念讲解
对象建立,value,next指向下一个对象
#### 1.2 代码
		// 建立链表
		function Obj(value) {
			this.value = value;
		}
		let head = new Obj("这是头结点");
		let i;
		node = head;
		for(i=0; i<10; i++) {
			node.next = new Obj(i);
			node = node.next;
			if(node === 9) {
				node.next =null;
			}
		}
		console.log(head);
### 2. 双向链表
#### 2.1 概念讲解
对象建立,next指向下一个对象,pre指向上一个对象,头结点比较特殊,只指向下一个和被指向
#### 2.2 代码
和单向链表建立没啥区别

### 3.循环链表
#### 3.1 概念讲解
代码在下一个有

### 4. 链表判环
#### 4.1 概念讲解
a.next和b.next.next,如果两个相等那么是环,最多的次数为n次的循环
#### 4.2 代码
		// 建立链表
		function Obj(value) {
			this.value = value;
		}
		let head = new Obj("这是头结点");
		let i;
		node = head;
		for(i=0; i<10; i++) {
			node.next = new Obj(i);
			node = node.next;
			if(node.value === 9) {
				node.next = null;
			}
		}
    // 判断是否有环
		function Ring(head) {
			let first = head.next;
			let second = head.next.next;
			console.log(second);
			while(1){
				// 为了处理最后一个如果不存在的时候报错
				if(second.next === null){
					return false
				} else{
					if(second.next.next === null) {
						return false;
					} else {
						if(first === second) {
							return true;
						}					
					}
					first = first.next;
					second = second.next.next;
				}
			}
		}
		console.log(Ring(head));
#### 4.1 参考链接
https://juejin.im/post/5a215d226fb9a0452a3c20a9
### 5. 参考链接
https://github.com/biaochenxuying/blog/issues/34
