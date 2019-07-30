## 1 virtual-dom
主要理解react和vue的虚拟dom以及他们共有的diff算法,探索和dom实际操作的区别

## 2 virtual-dom的优化概念
1. 首先虚拟dom相当于是加了一个缓存,不是不操作dom而是减少对dom的操作数,减少重排和重绘的数量
2. diff算法,新旧虚拟dom进行一个比较,避免没有必要的dom操作

### 2.1 diff
1. 列表用key方便记录比较
2. 同层比较,如果同层不同那么就不向下层比较
3. 在列表key最好不要使用index
4. 如果key值发生变化,标记dirty需要重新渲染
虚拟dom在渲染在真实dom的时候并不是直接将虚拟dom赋值给新的html的innerHtml而是依次向下遍历如果顶层节点改变那么整个节点的innerHtml改变,依次向下遍历,遍历到具体的节点是否需要改变,但是这个过程是一次性的
5.优点:首先在节点的比队上是采用的js的形式,但是在渲染的过程中对整个过程的影响就非常大,当渲染改变小的时候用diff会导致整个个过程变慢，但是如果是多个节点或者像删除了第一个节点的变化就有了很大的优化

## 3 代码
#### 3.1 建立虚拟dom
		// 虚拟dom
		class  Element {
			constructor(type, props, children) {
				this.type = type;
				this.props = props;
				this.children = children;
			}
		}

		function createElement(type, props, children) {
			// 返回一个Element对象
			return new Element(type, props, children);
		}

		// 伪建立虚拟dom
		let vDom = createElement("ul", {class:"box"}, [createElement("li", {class: "box-li"}, ["1"]),createElement("li", {class:"box-li"}, ["2"]),createElement("li", {class: "box-li"}, [3])])

		// 将对象转为dom节点
		function createNode(node) {
			let el = document.createElement(node.type);
			for(key in node.props) {
				if(key === "value") {
					// 只有input需要value属性
					if(node.type.toUpperCase() === "INPUT" || node.type.toUpperCase() ==="TEXTAREA") {
						el.value = node.props[key];
					}
				} else {
					// 设置属性
					el.setAttribute(key, node.props[key]);
				}
			}
			return el;
		}

		// 建立文本节点
		// 将单个的节点元素组合成dom结构
		function createDom(node) {
		    let root = createNode(node);
		    if(node.children && node.children.length > 0) {
		    	node.children.forEach(function(item) {
		    		if(item instanceof Element) {
		    			// 是节点
		    			root.appendChild(createDom(item));
		    		} else {
		    			// 文本
		    			root.appendChild(document.createTextNode(item));
		    		}
		    	})
		    }
		    return root;
		}
		let dom = createDom(vDom);
		document.getElementsByTagName("body")[0].appendChild(dom);
    
#### 3.2 diff只做了解不写
通过先序的方式找到差异,然后将差异的部分打到真实的dom上
## 4 参考链接
https://juejin.im/post/5cf3c75de51d45572c05fff3
https://juejin.im/post/5cf7624d5188252f325d677e
