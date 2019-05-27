import {createStore} from 'redux';
// import reducers from './reducers';
import { combineReducers} from 'redux';
import redux1 from './reduxs/redux1.js';
import redux2 from './reduxs/redux2.js';
// let lists = {
// 	name:""
// }
let  haha= {
	//设置初始状态,与redux无关,只是与程序使用props有关
	name:"哈哈",
	age:{
		num:"12",
		sex:"男"
	}
}
const reducers = combineReducers({
	//指定子reducer,处理变量
	name:redux1,
	age:redux2
})
//第二个参数为初始状态
//状态主要来源于reducer
let store = createStore(reducers,haha);
export default store;