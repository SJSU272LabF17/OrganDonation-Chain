import axios from 'axios';

export function requestLogin(state){
	return function (dispatch) {
		let temp = {
			"email":state.username,
			"password":state.password,
			"userType":state.userType
		};
		var data = {
			"email" : state.username,
			"password" : state.password,
			"userType":state.userType
		};
		sessionStorage.setItem('jwtToken', state.userType);
		sessionStorage.setItem('userId', state.username);
		return dispatch({type:"loginSuccess", payload: data});
		/*return axios.post("http://localhost:3001/login/", temp).then((response) => {
			if( response.data.token){
				sessionStorage.setItem('jwtToken', response.data.token);
				sessionStorage.setItem('userId', response.data.userId);
				sessionStorage.setItem('currentFileId', response.data.userId);
				dispatch({type:"loginSuccess", payload: response.data});
			}
		}).catch((err) => {
			 dispatch({type:"loginFailed", payload: err.response.data})
		})*/
	}
}

export function requestRegister(state){
	return function (dispatch) {
		let temp = {
			"email":state.username,
			"password":state.password,
			"firstName":state.firstName,
			"lastName":state.lastName,
			"age":state.age,
			"address":state.address,
			"zip":state.zip
		};
		dispatch({type:"registerSuccess", payload: temp});
		/*return axios.post("http://localhost:3001/register/", temp).then((response) => {
			 dispatch({type:"registerSuccess", payload: response.data})
		}).catch((err) => {
			 dispatch({type:"registerFailed", payload: err.response.data})
		})*/
	}
}