import React from 'react'
import { connect } from "react-redux";
import Child from '../Child.jsx';
// import thunk from 'redux-thunk';
const mapStateToProps=(state)=>{
	return{
		// 这里可以通过props调用属性
		name:state.name,
		age:state.age
	}
}


function mapDispatchToProps(dispatch){
	return{
		// 可以传递参数,比如这个函数在redux中通过action.name调用
		// 也可以发起异步请求
		changename:(name,age)=>{setTimeout(function(){
			dispatch({
				type:"CHANGE_NAME",
				name,
			})
		},2000)},
		changeage:(age)=>{dispatch({
			type:"CHANGE_AGE",
			age,
		})},
		changefamily:(age)=>{dispatch({
			type:"CHANGE_FAMILY",
			age,
		})},
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(Child);