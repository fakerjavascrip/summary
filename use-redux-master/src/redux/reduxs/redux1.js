export default function redux1(state="",action){
	switch(action.type){
		case 'CHANGE_NAME':
		let lookupstate = state+"嘟嘟嘟";
		return lookupstate
		default:
		return state;
	}
}