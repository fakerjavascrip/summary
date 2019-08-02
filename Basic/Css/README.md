### 1. position的sticky
#### 概念讲解
初始设置top无用,当父级div距离视窗顶部top时在父级中滑动,保持和视窗top的高度
#### 代码
      <!DOCTYPE html>
      <html>
      <head>
        <title>sticky</title>
        <style type="text/css">
          .box {
            position: relative;
            width: 300px;
            height: 1300px;
            background-color: blue;
            margin: auto;
          }

          .child {
            position: sticky;
            width:  100px;
            height: 100px;
            background-color: green;
            top: 100px;
          }
        </style>
      </head>
      <body>
        <div class="box">
          <div class="child">hello</div>
        </div>
      </html>
### 2. 水平垂直居中
#### 概念讲解
margin,translate移动,flex改变布局
#### 代码
		  /*用margin偏移*/
      .box {
        position: relative;
        width: 200px;
        height: 200px;
        top: 50%;
        left: 50%;
        margin: -100 0 0 -100px;
      }

      /*用translate偏移*/
      .box {
        position: relative;
        width: 200px;
        height: 200px;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
      }

      /*用margin:auto;*/
      .box {
        position: absolute;
        width: 200px;
        height: 200px;
        left: 0;right: 0;top: 0;bottom: 0;
        margin: auto;
      }

      /*用flex*/
      .box {
        position: relative;
        width: 200px;
        height: 200px;
        justify-content: center;
        align-items: center;
      }
### 3. RequestAnimationFrame
#### 概念讲解
只是当页面不是激活状态的时候会停止调用,节省cpu的利用率  
会将每一帧中的dom操作结合成一次执行减少重排和重绘  
只执行一次,相当于setTimeout,帧率时1s/60
#### 参考链接
https://www.cnblogs.com/libin-1/p/6096067.html
### 4. BFC
#### 概念讲解
触发BFC:根元素,float不为none,position为absolute或fixed,overflow:不是visible的元素  
划分：BFC包含上下文中的所有子元素,不包括新创建的BFC子元素的内部元素  
BFC的效果:BFC让内部的元素与BFC外部的元素隔离开,不能相互影响  
同一BFC:会互相影响比如margin重叠
#### 参考链接
https://juejin.im/post/59b73d5bf265da064618731d
## 5.CB
#### 概念讲解
static/relative cb就是父级元素的contanit,怪异盒模型也只是width
fixed cb是html窗口  
absolute 若父级是块级元素cb是padding-block,内联元素比较复杂一般也不这样做
#### 参考链接
https://www.cnblogs.com/fsjohnhuang/p/5295859.html
### 6. 点击穿透
#### 概念讲解
