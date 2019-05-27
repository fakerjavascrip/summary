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
            <div onClick={this.props.changeage}>{this.props.age.sex}+"dasdas"</div>
        )
    }
}
export default Child;