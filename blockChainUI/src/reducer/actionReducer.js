const defaultState = {
	firstName: "",
    lastName: "",
    email: "",
    userId: 0,
    age:0,
    address:"",
    zip:0,
    loginFailed:false,
    loginMsg:"",
    registerFailed:false,
    registerMsg:"",
    isloggedIn:false
}

export default function actionReducer (state = defaultState, action){
	const newState = {...state};
	switch(action.type){
		case 'loginSuccess':
			newState.firstName= action.payload.firstName;
		    newState.lastName= action.payload.lastName;
		    newState.email= action.payload.email;
		    newState.userId= action.payload.userId;
			newState.loginFailed= !action.payload.success;
			newState.loginMsg= action.payload.message;
			newState.isloggedIn= true;
			return newState;
		case 'loginFailed':
			newState.loginFailed= true;
			newState.loginMsg= action.payload.message;
			return newState;
		case 'registerSuccess':
			newState.firstName= "";
		    newState.lastName= "";
		    newState.email= "";
		    newState.userId= 0;
			newState.registerFailed= !action.payload.success;
			newState.registerMsg= action.payload.message;
			return newState;
		case 'registerFailed':
			newState.registerFailed= true;
			newState.registerMsg= action.payload.message;
			return newState;
		default:
			return newState;
	}
}