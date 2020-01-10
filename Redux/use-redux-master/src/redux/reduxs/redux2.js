//为空但是状态传进来了
export default function redux1(state={},action){
	switch(action.type){
		case 'CHANGE_AGE':
		// 这里只是深拷贝了最外层的对象,内层对象还是浅拷贝,可以采用...的方式拷贝
		let lookupstate = Object.assign({},state);
		// 深拷贝了state
		let lookupstate = [...state];
		lookupstate=["1","2","3"];
		return lookupstate
		case 'CHANGE_FAMILY':
		let findfamily = Object.assign({},state);
		findfamily.family=["1","2"];
		return findfamily
		default:
		//这里才是返回最初状态的原因
		return state;
	}
}