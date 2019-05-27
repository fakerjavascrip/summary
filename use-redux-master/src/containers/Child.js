import React from 'react'
import { connect } from "react-redux";
import Child from '../Child.jsx'
const mapStateToProps=(state)=>{
	return{
		name:state.name,
		age:state.age
	}
}


function mapDispatchToProps(dispatch){
	return{
		changename:(name,age)=>{dispatch({
			type:"CHANGE_NAME",
			name,
		})},
		changeage:(age)=>{dispatch({
			type:"CHANGE_AGE",
			age,
		})},
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(Child);