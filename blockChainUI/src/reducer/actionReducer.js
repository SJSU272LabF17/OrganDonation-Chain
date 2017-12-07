const defaultState = {
	firstName: "",
    lastName: "",
    email: "",
    age:0,
    address:"",
    zip:0,
    loginFailed:false,
    loginMsg:"",
    registerFailed:false,
    registerMsg:"",
    isloggedIn:false,
    testingAppts:[],
    transplantAppts:[],
    showRegisterDonorOrganSuccess: false,
    donorAppts : [],
    donorOrganList : [],
    recepeintList : []
}

export default function actionReducer (state = defaultState, action){
	const newState = {...state};
	switch(action.type){
		case 'loginSuccess':
			newState.name= action.payload.name;
			newState.firstName= action.payload.firstName;
		    newState.lastName= action.payload.lastName;
		    newState.email= action.payload.email;
		    newState.age= action.payload.age;
		    newState.userType= action.payload.userType;
		    newState.address= action.payload.address;
		    newState.zip= action.payload.zip;
		    newState.phone= action.payload.phone;
			newState.loginFailed= !action.payload.success;
			newState.loginMsg= action.payload.message;
			newState.id= action.payload._id;
			newState.isloggedIn= true;
			return newState;
		case 'loginFailed':
			newState.loginFailed= true;
			newState.loginMsg= action.payload.message;
			return newState;
		case 'registerSuccess':
			newState.name= action.payload.name;
			newState.userType= action.payload.userType;
		    newState.email= action.payload.email;
			newState.registerFailed= !action.payload.success;
			newState.registerMsg= action.payload.message;
			return newState;
		case 'registerFailed':
			newState.registerFailed= true;
			newState.registerMsg= action.payload.message;
			return newState;
		case 'retriveDonorByEmailSuccess':
			newState.name= action.payload.name;
			newState.firstName= action.payload.firstName;
		    newState.lastName= action.payload.lastName;
		    newState.email= action.payload.email;
		    newState.age= action.payload.age;
		    newState.userType= action.payload.userType;
		    newState.address= action.payload.address;
		    newState.zip= action.payload.zip;
		    newState.phone= action.payload.phone;
			newState.loginFailed= !action.payload.success;
			newState.loginMsg= action.payload.message;
			return newState;
		case 'getHospitalsbyZipSuccess':
			newState.hospitalByZip = action.payload;
			return newState;
		case 'registerDonorOrganSuccess':
			newState.organId = action.payload.organId;
			newState.showRegisterDonorOrganSuccess = true;
			return newState;
		case 'retriveTestingApptsSuccess':
			newState.testingAppts = action.payload;
			return newState;
		case 'retriveTransplantApptsSuccess':
			newState.transplantAppts = action.payload;
			return newState;
		case 'handleApproveOrganSuccess':
			return newState;
		case 'handleTransplantOrganSuccess':
			return newState;
		case 'retriveDonorApptsSuccess':
			if(action.payload && action.payload.length>0){
				newState.donorAppts = action.payload;
			} else {
				newState.donorAppts = [];
			}
			return newState;
		case 'retriveDonorOrgansSuccess':
		 	newState.donorOrganList = action.payload;
		 	return newState;
		 case 'retriveRecListSuccess':
		 	newState.recepeintList = action.payload;
		 	return newState;
		default:
			return newState;
	}
}