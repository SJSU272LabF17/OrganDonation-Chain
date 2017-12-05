import React, { Component } from 'react';
import { connect } from 'react-redux';
import { retriveDonorByEmail, registerDonorOrgan, getHospitalsByZip, hospitalSelectedForCheckUp } from '../actions/allActions';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';

const mapStateToProps = (state) => {
  return {
    userId: sessionStorage.getItem('userId'),
    firstName: state.actionReducer.firstName,
    lastName: state.actionReducer.lastName,
    age: state.actionReducer.age,
    address: state.actionReducer.address,
    zip: state.actionReducer.zip,
    email: state.actionReducer.email,
    organName: state.actionReducer.organName,
    isloggedIn: state.actionReducer.isloggedIn,
    hospitalByZip: state.actionReducer.hospitalByZip,
    showRegisterDonorOrganSuccess : state.actionReducer.showRegisterDonorOrganSuccess
  }
}

const mapDispatchToProps = (dispatch) => {
  let actions = { retriveDonorByEmail, registerDonorOrgan, getHospitalsByZip, hospitalSelectedForCheckUp};
  return { ...actions, dispatch };
}

class UserHome extends Component {
	constructor(props) {
    	super(props);    	
	    this.state = {
			showLogout:false,
			showOptions:"",
			shareSearch:"",
			recentShowOptions:"",
			firstName:"",
			lastName:"",
			email:"",
			age:"",
			address:"",
			zip:"",
			organType:"Choose Organ"
	     }
    	this.handleDropdownClick = this.handleDropdownClick.bind(this);
    	this.handleLogout = this.handleLogout.bind(this);

	    this.handleFNChange = this.handleFNChange.bind(this);
	    this.handleLNChange = this.handleLNChange.bind(this);
	    this.handleAgeChange = this.handleAgeChange.bind(this);
	    this.handleEmailChange = this.handleEmailChange.bind(this);
	    this.handleAddressChange = this.handleAddressChange.bind(this);
	    this.handleZipChange = this.handleZipChange.bind(this);
	    this.handleOrganNameChange = this.handleOrganNameChange.bind(this);
	    this.hospitalSelectedForCheckUp = this.hospitalSelectedForCheckUp.bind(this);
	    this.handleOrganTypeChange = this.handleOrganTypeChange.bind(this);
	}

	handleDropdownClick(e){
		this.setState({showLogout:!this.state.showLogout});
	}

    handleFNChange(event){
    	this.setState({firstName: event.target.value});
    }

    handleLNChange(event){
    	this.setState({lastName: event.target.value});
    }

    handleAgeChange(event){
    	this.setState({age: event.target.value});
    }

    handleEmailChange(event){
    	this.setState({email: event.target.value});
    }

    handleAddressChange(event){
    	this.setState({address: event.target.value});
    }

    handleZipChange(event){
    	this.setState({zip: event.target.value});
    }

    handleOrganNameChange(event){
    	this.setState({organName: event.target.value});
    }

	componentDidMount(){
		this.props.dispatch(this.props.retriveDonorByEmail(this.props));
	}

	componentWillReceiveProps(nextProps){
		if(sessionStorage.getItem('userId')==null){
			this.props.history.push('/login');
		}
	}

  handleLogout(){
  	sessionStorage.removeItem('userType');
  	sessionStorage.removeItem('userId');
  	this.setState({showLogout:!this.state.showLogout});
  	this.props.history.push('/login');
  }

  hospitalSelectedForCheckUp(hospital){
  	this.props.dispatch(this.props.hospitalSelectedForCheckUp(hospital, this.props));
  }

  handleOrganTypeChange(event){
  	this.setState({organType:event.target.innerText});
  	this.props.dispatch(this.props.getHospitalsByZip(this.props));
  }

  render() {
    return (
    	<div className="homePage">
		    <div className="wrapper">
			    <Tabs className="tabs tabs-1">
			        <nav id="sidebar">
			            <div className="sidebar-header">
			                <h3>Organ Chain</h3>
			            </div>
			            <ul className="list-unstyled components">
			                <li className="active">
			                    <TabLink to="section-profile"><a href="#section-profile" data-toggle="tab" className="tab-toggle active">Profile</a></TabLink>
			                </li>
			                <li>
			                    <TabLink to="section-organ"><a href="#section-organ" data-toggle="tab" className="tab-toggle">Donate An Organ</a></TabLink>
			                </li>
			                <li>
			                    <TabLink to="section-appointment"><a href="#section-appointment" data-toggle="tab" className="tab-toggle">Appointment For Check Up</a></TabLink>
			                </li>
			            </ul>
			        </nav>
			        <div id="content" className="tab-content content">
			        	<TabContent className="tab-pane fade in active show" for="section-profile">
				            <nav className="navbar navbar-default">
				                <div className="container-fluid">
				                    <div className="navbar-header">
				                        <h2>User Profile
					                        <div className="rightPart">
										        <header className="pageHeader col-md-12">
										            <div className="top-menu-container col-md-6">
										                <img className="userIcon" onClick={this.handleDropdownClick} src="images/userIcon.png" alt="userIcon" /> {this.state.showLogout ?
										                <ul className="userDropdown">
										                    <li value="profile" onClick={()=> this.setState({showLogout:!this.state.showLogout})} data-toggle="modal" data-target="#profileModal">Profile</li>
										                    <li value="logout" onClick={this.handleLogout}>Logout</li>
										                </ul>:null}
										            </div>
										        </header>
										    </div>
									    </h2>
				                    </div>
				                </div>
				            </nav>
				            <div className="row">
			                    <p className="col-md-2 text-right">First Name:</p>
			                    <p className="col-md-10 text-left" value={this.props.firstName}>{this.props.firstName}</p> 
			                </div>
				            <div className="row">
			                    <p className="col-md-2 text-right">Last Name:</p>
			                    <p className="col-md-10 text-left" value={this.props.lastName}>{this.props.lastName}</p> 
			                </div>
				            <div className="row">
			                    <p className="col-md-2 text-right">Age:</p>
			                    <p className="col-md-10 text-left" value={this.props.age}>{this.props.age}</p>
			                </div>
				            <div className="row">
			                    <p className="col-md-2 text-right">Address:</p>
			                    <p className="col-md-10 text-left" value={this.props.address}>{this.props.address}</p>
			                </div>
				            <div className="row">
			                    <p className="col-md-2 text-right">Email:</p>
			                    <p className="col-md-10 text-left" value={this.props.email}>{this.props.email}</p>
			                </div>
				            <div className="row">
			                    <p className="col-md-2 text-right">Zip code:</p>
			                    <p className="col-md-10 text-left" value={this.props.zip}>{this.props.zip}</p>
			                </div>
			        	</TabContent>
			        	<TabContent for="section-organ">
				            <nav className="navbar navbar-default">
				                <div className="container-fluid">
				                    <div className="navbar-header">
				                        <h2>Donate Organ
					                        <div className="rightPart">
										        <header className="pageHeader col-md-12">
										            <div className="top-menu-container col-md-6">
										                <img className="userIcon" onClick={this.handleDropdownClick} src="images/userIcon.png" alt="userIcon" /> {this.state.showLogout ?
										                <ul className="userDropdown">
										                    <li value="profile" onClick={()=> this.setState({showLogout:!this.state.showLogout})} data-toggle="modal" data-target="#profileModal">Profile</li>
										                    <li value="logout" onClick={this.handleLogout}>Logout</li>
										                </ul>:null}
										            </div>
										        </header>
										    </div>
									    </h2>
				                    </div>
				                </div>
				            </nav>
				            <div className="row">
			                    <p className="col-md-2 text-right">Organ Type:</p>
			                    <input className="col-md-10 text-left text-input-input autofocus" type="text" value={this.props.organName} onChange={this.handleOrganNameChange} />
			                </div>
			                <input type="submit" className="btn login-button" value="Register My Organ!" onClick={() => this.props.dispatch(this.props.registerDonorOrgan(this.state))} data-toggle="modal" data-target="#registerDonorOrganSuccessModal"/>
			        	</TabContent>
			            <TabContent for="section-appointment">
				            <nav className="navbar navbar-default">
				                <div className="container-fluid">
				                    <div className="navbar-header">
				                        <h2>Available Appointments near your location
					                        <div className="rightPart">
										        <header className="pageHeader col-md-12">
										            <div className="top-menu-container col-md-6">
										                <img className="userIcon" onClick={this.handleDropdownClick} src="images/userIcon.png" alt="userIcon" /> {this.state.showLogout ?
										                <ul className="userDropdown">
										                    <li value="profile" onClick={()=> this.setState({showLogout:!this.state.showLogout})} data-toggle="modal" data-target="#profileModal">Profile</li>
										                    <li value="logout" onClick={this.handleLogout}>Logout</li>
										                </ul>:null}
										            </div>
										        </header>
										    </div>
									    </h2>
				                    </div>
				                </div>
				            </nav>				            
			                <div className="dropdown halfWidth">
			                  <button className="btn btn-secondary dropdown-toggle halfWidth" type="button" id="organType" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			                    {this.state.organType}
			                  </button>
			                  <div className="dropdown-menu halfWidth" aria-labelledby="organType">
			                    <a className="dropdown-item" href="#" onClick={this.handleOrganTypeChange}>Heart</a>
			                    <a className="dropdown-item" href="#"  onClick={this.handleOrganTypeChange}>Liver</a>
			                  </div>
			                </div>
			                {this.state.organType=="Choose Organ" ? null :
					            <div className="list-group">
					            	{this.props.hospitalByZip && this.props.hospitalByZip.length>0 ? this.props.hospitalByZip.map(step =>
					            		<div href="#" key={step.name} className="list-group-item list-group-item-action flex-column align-items-start">
						            		<div className="d-flex w-100 justify-content-between">
										      <h5 className="mb-1">{step.name}</h5>
										      <small><span>zip:</span><span>{step.zip}</span></small>
										    </div>
										    <p className="mb-1">{step.address}</p>
										    <small><span>Slot Available: </span><span>{step.chekUpDate}</span></small>
										    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#appointmentBookedModal" onClick={this.hospitalSelectedForCheckUp.bind(this, step)}>Choose</button>
										</div>
					            	) : null}
								</div>}
			        	</TabContent>
			        </div>
			    </Tabs>
		    </div>
	    	<div id="registerDonorOrganSuccessModal" className="modal fade" role="dialog">
		        <div className="modal-dialog">
		            <div className="modal-content">
		                <div className="modal-header">
		                    <h4 className="modal-title">Registration Successful!</h4>
		                    <button type="button" className="close" data-dismiss="modal">&times;</button>
		                </div>
		                <div className="modal-body">
		                    <p>Congratulations on taking first step towards saving a life!! Now you can schedule an appointment at nearest hospital.</p>
		                </div>
		                <div className="modal-footer">
		                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => {
                            this.props.history.push('/login')
                        }}>Close</button>
		                </div>
		            </div>
		        </div>
		    </div>
	    	<div id="appointmentBookedModal" className="modal fade" role="dialog">
		        <div className="modal-dialog">
		            <div className="modal-content">
		                <div className="modal-header">
		                    <h4 className="modal-title">Appointment Booked!</h4>
		                    <button type="button" className="close" data-dismiss="modal">&times;</button>
		                </div>
		                <div className="modal-body">
		                    <p>Congratulations!! Appointment successfully scheduled at hospital.</p>
		                </div>
		                <div className="modal-footer">
		                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => {
                            this.props.history.push('/login')
                        }}>Close</button>
		                </div>
		            </div>
		        </div>
		    </div>
		    <div id="profileModal" className="modal fade" role="dialog">
		        <div className="modal-dialog">
		            <div className="modal-content">
		                <div className="modal-header">
		                    <h4 className="modal-title">User Profile</h4>
		                    <button type="button" className="close" data-dismiss="modal">&times;</button>
		                </div>
		                <div className="modal-body">
		                    First Name:
		                    <input className="text-input-input autofocus" type="text" value={this.props.firstName} onChange={this.handleFNChange} /> Last Name:
		                    <input className="text-input-input autofocus" type="text" value={this.props.lastName} onChange={this.handleLNChange} /> email:
		                    <input disabled className="text-input-input autofocus" type="text" value={this.props.email} /> User Overview:
		                    <input className="text-input-input autofocus" type="text" value={this.props.userOverview} onChange={this.handleUserOverviewChange} /> Work Data:
		                    <input className="text-input-input autofocus" type="text" value={this.props.workData} onChange={this.handleEducationDataChange} /> Education Data:
		                    <input className="text-input-input autofocus" type="text" value={this.props.educationData} onChange={this.handleWorkDataChange} /> Contact Number:
		                    <input className="text-input-input autofocus" type="text" value={this.props.contactNumber} onChange={this.handleContactChange} /> Interests:
		                    <input className="text-input-input autofocus" type="text" value={this.props.interests} onChange={this.handleInterestChange} />
		                </div>
		                <div className="modal-footer">
		                    <button type="button" className="btn btn-primary" onClick={this.changeUserProfile}>Save changes</button>
		                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
		                </div>
		            </div>
		        </div>
		    </div>
		</div>
    )
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(UserHome);