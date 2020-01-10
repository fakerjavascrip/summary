import React from 'react'
class Child extends  React.Component{
    componentDidMount(){
    }
    constructor(props,context){
        super(props,context);
        this.state={
            
        }
    }
    render(){
        console.log(this.props)
        return(
            <div onClick={()=>{this.props.changename([1,2,3,4])}}>{this.props.name}+{typeof this.props.age}</div>
        )
    }
}
export default Child;