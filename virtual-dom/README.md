## virtual-dom
主要理解react和vue的虚拟dom以及他们共有的diff算法,探索和dom实际操作的区别

## virtual-dom的优化概念
1. 首先虚拟dom相当于是加了一个缓存,不是不操作dom而是减少对dom的操作数
2. diff算法,新旧虚拟dom进行一个比较,避免没有必要的dom操作

### diff
1. 列表用key方便记录比较
2. 同层比较,如果同层不同那么就不向下层比较
3. 在列表key最好不要使用index
虚拟dom在渲染在真实dom的时候并不是直接将虚拟dom赋值给新的html的innerHtml而是依次向下遍历如果顶层节点改变那么整个节点的innerHtml改变,依次向下遍历,遍历到具体的节点是否需要改变,但是这个过程是一次性的

