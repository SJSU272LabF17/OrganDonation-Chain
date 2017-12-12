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
    recepeintList : [],
    latestTransactions : [],
    showMessage: ""
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
			newState.loginMsg= "Login Successfully!";
			newState.id= action.payload._id;
			newState.isloggedIn= true;
			return newState;
		case 'loginFailed':
			newState.loginFailed= true;
			newState.loginMsg= "Login failed!";
			return newState;
		case 'registerSuccess':
			newState.name= action.payload.name;
			newState.userType= action.payload.userType;
		    newState.email= action.payload.email;
			newState.registerFailed= !action.payload.success;
			newState.registerMsg= "Registration Completed Successfully!";
			return newState;
		case 'registerFailed':
			newState.registerFailed= true;
			newState.registerMsg= "Registration failed!";
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
		case 'hospitalSelectedForCheckUpSuccess':
			newState.showMessage = "Appointment successfully booked!";
			alert(newState.showMessage);
			return newState;
		case 'getHospitalsbyZipSuccess':
			newState.hospitalByZip = action.payload;
			return newState;
		case 'registerDonorOrganSuccess':
			newState.organId = action.payload.organId;
			newState.showRegisterDonorOrganSuccess = true;
			newState.showMessage = "Organ Successfully Registered! Please schedule an appointment to nearest hospital!";
			alert(newState.showMessage);
			return newState;
		case 'registerDonorOrganFailed':
		case 'handleApproveOrganFailed':
		case 'handleTransplantOrganFailed':
			newState.showMessage = action.payload.message;
			alert(newState.showMessage);
			return newState;		
		case 'retriveTestingApptsSuccess':
			newState.testingAppts = action.payload;
			return newState;
		case 'retriveTransplantApptsSuccess':
			newState.transplantAppts = action.payload;
			return newState;
		case 'handleApproveOrganSuccess':
			newState.showMessage = "Organ tested and approved!";
			alert(newState.showMessage);
			return newState;
		case 'handleTransplantOrganSuccess':
			newState.showMessage = "Congratulations!! Organ transplant completed!";
			alert(newState.showMessage);
			return newState;
		case 'chooseRecepientSuccess':
			newState.showMessage = "Recipient assigned!";
			alert(newState.showMessage);
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
		case 'getLatestTransactionsSuccess':
			newState.latestTransactions = action.payload;
			return newState;
		case 'handleLogoutSuccess':
			newState.isloggedIn= false;
			newState.loginMsg= "Logged out Successfully!";
			return newState;
		case 'registerRecepeintSuccess':
			newState.showMessage= "Recipient Successfully registered!";
			alert(newState.showMessage);
			return newState;
		case 'retriveDonorByEmailFailed':
		case 'getHospitalsbyZipFailed':
		case 'retriveTestingApptsFailed':
		case 'retriveTransplantApptsFailed':
		case 'retriveDonorApptsFailed':
		case 'retriveDonorOrgansFailed':
		case 'retriveRecListFailed':
		case 'getLatestTransactionsFailed':
		case 'registerRecepeintFailed':
		case 'chooseRecepientFailed':
		case 'hospitalSelectedForCheckUpFailed':
			newState.showMessage= action.payload.message;
			alert(newState.showMessage);
			return newState;
		default:
			return newState;
	}
}