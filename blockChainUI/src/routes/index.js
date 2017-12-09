import React from 'react';
import {BrowserRouter , Route, Switch} from 'react-router-dom';
import Login from '../component/login';
import Landing from '../component/landing';
import UserHome from '../component/userHome';
import HospitalHome from '../component/hospitalHome';
import UnosHome from '../component/unosHome';

export default function() {
	return (<BrowserRouter>
		<Switch>
			<Route path="/" exact render={props => <Landing {...props}/>}/>
			<Route path="/login" exact render={props => <Login {...props} />}/>
			<Route path="/userHome" exact render={props => <UserHome {...props} />}/>
			<Route path="/hospitalHome" exact render={props => <HospitalHome {...props} />}/>
			<Route path="/unosHome" exact render={props => <UnosHome {...props} />}/>
		</Switch>
	</BrowserRouter>);
}