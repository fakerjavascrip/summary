//为空但是状态传进来了
export default function redux1(state={},action){
	switch(action.type){
		case 'CHANGE_AGE':
		let lookupstate = Object.assign({},state);
		lookupstate.sex="女";
		return lookupstate
		default:
		//这里才是返回最初状态的原因
		return state;
	}
}