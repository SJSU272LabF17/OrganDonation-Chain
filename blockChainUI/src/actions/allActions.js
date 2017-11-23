import axios from 'axios';

export function requestLogin(state){
	return function (dispatch) {
		let temp = {
			"email":state.username,
			"password":state.password,
			"userType":state.userType
		};
		//return dispatch({type:"loginSuccess", payload: data});
		if(state.userType=="Hospital"){
			return axios.post("http://localhost:3001/hospital/login/", temp).then((response) => {
					sessionStorage.setItem('userId', response.data._id);
					sessionStorage.setItem('email', state.username);
					sessionStorage.setItem('userType', state.userType);
					dispatch({type:"loginSuccess", payload: response.data});
			}).catch((err) => {
				 dispatch({type:"loginFailed", payload: err.response.data})
			})
		} else {
			return axios.post("http://localhost:3001/donor/login/", temp).then((response) => {
					sessionStorage.setItem('userId', response.data._id);
					sessionStorage.setItem('email', state.username);
					sessionStorage.setItem('userType', state.userType);
					dispatch({type:"loginSuccess", payload: response.data});
			}).catch((err) => {
				 dispatch({type:"loginFailed", payload: err.response.data})
			})
		}
	}
}

export function requestRegister(state){
	return function (dispatch) {
		let temp = {
			"email":state.username,
			"password":state.password,
			"userType":state.userType,
			"name":state.name,
			"firstName":state.firstName,
			"lastName":state.lastName,
			"age":state.age,
			"address":state.address,
			"zip":state.zip,
			"phone":state.phone
		};
		if(state.userType=="Hospital"){
			return axios.post("http://localhost:3001/hospital", temp).then((response) => {
				 dispatch({type:"registerSuccess", payload: response.data})
			}).catch((err) => {
				 dispatch({type:"registerFailed", payload: err.response.data})
			})
		} else {			
			return axios.post("http://localhost:3001/donor", temp).then((response) => {
				 dispatch({type:"registerSuccess", payload: response.data})
			}).catch((err) => {
				 dispatch({type:"registerFailed", payload: err.response.data})
			})
		}
	}
}

export function retriveDonorByEmail(state){
	return function (dispatch) {
		let temp = {
			"email":state.username,
			"password":state.password,
			"userType":state.userType,
			"name":state.name,
			"firstName":state.firstName,
			"lastName":state.lastName,
			"age":state.age,
			"address":state.address,
			"zip":state.zip,
			"phone":state.phone
		};
		return axios.get("http://localhost:3001/donor/"+sessionStorage.getItem('email')).then((response) => {
			 dispatch({type:"retriveDonorByEmailSuccess", payload: response.data})
		}).catch((err) => {
			 dispatch({type:"retriveDonorByEmailFailed", payload: err.response.data})
		})
	}
}

export function registerDonorOrgan(state){
	return function(dispatch){
		let temp = {
			name : state.organName,
    		donorId: sessionStorage.getItem('userId')
		};
		return axios.post("http://localhost:3001/organ/", temp).then((response) => {
			 dispatch({type:"registerDonorOrganSuccess", payload: response.data})
		}).catch((err) => {
			 dispatch({type:"registerDonorOrganFailed", payload: err.response.data})
		})		
	}
}

export function getHospitalsByZip(state){
	return function(dispatch){
		return axios.get("http://localhost:3001/hospital/"+parseInt(state.zip)).then((response) => {
			 dispatch({type:"getHospitalsbyZipSuccess", payload: response.data})
		}).catch((err) => {
			 dispatch({type:"getHospitalsbyZipFailed", payload: err.response.data})
		})
	}
}

export function hospitalSelectedForCheckUp(hospital){
	return function(dispatch){
		return axios.get("http://localhost:3001/hospital/"+parseInt(hospital.name)).then((response) => {
			 dispatch({type:"getHospitalsbyZipSuccess", payload: response.data})
		}).catch((err) => {
			 dispatch({type:"getHospitalsbyZipFailed", payload: err.response.data})
		})		
	}
}