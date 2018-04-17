
import getters from './getters.js';

var state = {
	token: ""
}
const mutations = {
	login(state,data){
		localStorage.token = data;
		state.token = data;
	}
}


export default{
	state,
	mutations,
	getters
}
