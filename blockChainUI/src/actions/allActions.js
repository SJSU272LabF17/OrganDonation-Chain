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
			 sessionStorage.setItem('organId', response.data._id);
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

export function hospitalSelectedForCheckUp(hospital, state){
	return function(dispatch){
		let temp = {
			organ : sessionStorage.getItem('organId'),
			sourceHospital : hospital._id,
			donorId: sessionStorage.getItem('userId'),
			date : hospital.chekUpDate
		};
		return axios.post("http://localhost:3001/appointment/donor", temp).then((response) => {
			 dispatch({type:"hospitalSelectedForCheckUpSuccess", payload: response.data})
		}).catch((err) => {
			 dispatch({type:"hospitalSelectedForCheckUpFailed", payload: err.response.data})
		})		
	}
}

export function retriveTestingAppts(state){
	return function(dispatch){
		return axios.get("http://localhost:3001/appointment/testing").then((response) => {
			 dispatch({type:"retriveTestingApptsSuccess", payload: response.data})
		}).catch((err) => {
			 dispatch({type:"retriveTestingApptsFailed", payload: err.response.data})
		})
	}
}

export function retriveDonorAppts(state){
	return function(dispatch){
		return axios.get("http://localhost:3001/appointment/testing/"+sessionStorage.getItem('userId')).then((response) => {
			 dispatch({type:"retriveDonorApptsSuccess", payload: response.data})
		}).catch((err) => {
			 dispatch({type:"retriveDonorApptsFailed", payload: err.response.data})
		})
	}
}

export function retriveTransplantAppts(){
	return function(dispatch){
		return axios.get("http://localhost:3001/appointment/transplant").then((response) => {
			 dispatch({type:"retriveTransplantApptsSuccess", payload: response.data})
		}).catch((err) => {
			 dispatch({type:"retriveTransplantApptsFailed", payload: err.response.data})
		})
	}
}

export function retriveDonorOrgans(){
	return function(dispatch){
		return axios.get("http://localhost:3001/organ/"+sessionStorage.getItem('userId')).then((response) => {
			 dispatch({type:"retriveDonorOrgansSuccess", payload: response.data})
		}).catch((err) => {
			 dispatch({type:"retriveDonorOrgansFailed", payload: err.response.data})
		})
	}
}

export function retriveRecList(){
	return function(dispatch){
		return axios.get("http://localhost:3001/recipient/").then((response) => {
			 dispatch({type:"retriveRecListSuccess", payload: response.data})
		}).catch((err) => {
			 dispatch({type:"retriveRecListFailed", payload: err.response.data})
		})
	}
}

export function handleApproveOrgan(state){
	return function(dispatch){
		var organTestInfoTemp = {
			personStatus:state.personStatus,
			bloodType:state.bloodType,
			class1Protein:state.class1Protein,
			class2Protein:state.class2Protein,
			lymphocytes:state.lymphocytes,
			HLA:state.HLA,
			organToOffer:state.organToOffer,
			class2Antigen:state.class2Antigen,
			organSpecificInfo:state.organSpecificInfo,
			doctorNotes:state.doctorNotes
		}
		var temp = {
			organTestInfo : organTestInfoTemp,
	        sourceHospital : sessionStorage.getItem('userId'),
	        appointmentId : state.appointmentId
		}
		return axios.put("http://localhost:3001/organ/"+state.currentOrgan, temp).then((response) => {
			 dispatch({type:"handleApproveOrganSuccess", payload: response.data})
		}).catch((err) => {
			 dispatch({type:"handleApproveOrganFailed", payload: err.response.data})
		})
	}
}

export function handleTransplantOrgan(state){
	return function(dispatch){
		var temp = {
	        targetHospital : sessionStorage.getItem('userId'),
	        appointmentId : state.appointmentId,
	        organ: state.currentOrgan
		}
		return axios.post("http://localhost:3001/appointment/complete", temp).then((response) => {
			 dispatch({type:"handleTransplantOrganSuccess", payload: response.data})
		}).catch((err) => {
			 dispatch({type:"handleTransplantOrganFailed", payload: err.response.data})
		})
	}
}

export function registerRecepeint(state){
	return function(dispatch){
		var organTestInfoTemp = {
			personStatus:state.personStatus,
			bloodType:state.bloodType,
			class1Protein:state.class1Protein,
			class2Protein:state.class2Protein,
			lymphocytes:state.lymphocytes,
			HLA:state.HLA,
			organToOffer:state.organToOffer,
			class2Antigen:state.class2Antigen,
			organSpecificInfo:state.organSpecificInfo,
			doctorNotes:state.doctorNotes
		}
		var temp = {
			name: state.firstName+" "+state.lastName,
		    age: state.age,
		    organ: state.organNeeded,
		    hospital: sessionStorage.getItem('userId'),
		    email: state.email,
		    address: {
		        street: state.address,
		        zip: state.zip
		    },
			testInfo : organTestInfoTemp
		}
		return axios.post("http://localhost:3001/recipient/", temp).then((response) => {
			 dispatch({type:"registerRecepeintSuccess", payload: response.data})
		}).catch((err) => {
			 dispatch({type:"registerRecepeintFailed", payload: err.response.data})
		})
	}
}

export function chooseRecepient(recipient, state){
	return function(dispatch){
		let temp = {
			date : new Date(),
			targetHospital : recipient.hospital,
			recId: recipient._id,
			organ : recipient.chekUpDate
		};
		return axios.post("http://localhost:3001/appointment/unos", temp).then((response) => {
			 dispatch({type:"hospitalSelectedForCheckUpSuccess", payload: response.data})
		}).catch((err) => {
			 dispatch({type:"hospitalSelectedForCheckUpFailed", payload: err.response.data})
		})		
	}
}