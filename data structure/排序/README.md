// 时间复杂度: 最大次幂; 空间复杂度: 用了多少内存,排序一般都是O(1);  
// 二分法:取左和右两个数字/2的整数取出中间数字,之后如果不等小于那就右边移动位置,大于就左边移动位置
### 1. 冒泡排序
#### 1.1 概念讲解
只会交换相邻的两个元素;时间复杂度:平均为O(n2),最佳为O(n),最差为O(n2);
#### 1.2 代码
		// 冒泡排序,由小到大
		arr = [1,2,3,4,5,6,7];
		function bubbling(arr) {
			let i, j, num, flag; // 优化增加flag当已经排序正确结束循环
			for(i=0; i<arr.length; i++) {
				flag = 1;
				for(j=0; j<arr.length-i; j++) {
					if(arr[j] > arr[j+1]) {
						flag = 2;
						num = arr[j];
						arr[j] = arr[j+1];
						arr[j+1] = num;
					}
				}
				if(flag===1)
					break;
			}
			return arr;
		}
		console.log(bubbling(arr));
### 2. 选择排序
#### 2.1 概念讲解
先将最小的换在头部,然后依次往后
#### 2.2 代码
		// 选择排序,由小到大
		let arr =[2,4,1,6,5,7,2]; 
		function Choice(arr) {
			let i, j, num;
			for(i=0; i<arr.length; i++) {
				for(j=i+1; j<arr.length; j++) {
					if(arr[i] > arr[j]) {
						num = arr[i];
						arr[i] = arr[j];
						arr[j] = num;
					}
				}
			}
			return arr;
		}
		console.log(Choice(arr));
### 3. 插入排序
#### 3.1 概念讲解
如果该元素（已排序）大于新元素，将该元素移到下一位置;直到大于前一个元素进行插入
#### 3.2 代码
		// 直接插入排序,由小到大
		let arr =[2,4,1,6,5,7,2]; 
		function Insert(arr) {
			let i, j, num;
			for(i=1; i<arr.length; i++) {
				num = arr[i];
				for(j=i-1; j>=0; j--) {
					if(num < arr[j]) {
						arr[j+1] = arr[j];
						arr[j] = num;
					} else {
						break;
					}
				}
			}
			return arr;
		}
		console.log(Insert(arr));
### 4. 快速排序
#### 4.1 概念讲解
时间复杂度: 最佳O(nlogn),最差O(n2),平均O(nlogn);空间复杂度:O(logn);
![](https://camo.githubusercontent.com/b6a25e0ffc22377177c2dc8113e113bd34adc284/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f31323839303831392d336532396239643264393336393035642e706e673f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970253743696d61676556696577322f322f772f31323430)
#### 4.2 代码
		// 快速排序,由小到大
		let arr = [11,3,9,7,1,2, 5];
		function Fast(arr) {
			if(arr.length <=1) {
				return arr;
			}
			let left = [];
			let right = [];
			let midindex = Math.floor(arr.length/2);
			let midnum = arr.splice(midindex,1);
			let num = midnum[0];
			for(i=0; i<arr.length; i++) {
				if(arr[i]<num) {
					left.push(arr[i]);
				} else {
					right.push(arr[i]);
				}
			}
			return Fast(left).concat(num,Fast(right));
		}
		console.log(Fast(arr));
### 5. 参考链接
https://github.com/biaochenxuying/blog/issues/42
