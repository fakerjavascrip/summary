export default function redux1(state="",action){
	switch(action.type){
		case 'CHANGE_NAME':
		let lookupstate = action.name;
		return lookupstate
		default:
		return state;
	}
}