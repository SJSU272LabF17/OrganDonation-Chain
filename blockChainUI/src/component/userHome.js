import React, { Component } from 'react';
import { connect } from 'react-redux';
import { } from '../actions/allActions';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';

const mapStateToProps = (state) => {
  return {
    userId: sessionStorage.getItem('userId'),
    firstName: state.actionReducer.firstName,
    lastName: state.actionReducer.lastName,
    email: state.actionReducer.email,
    isloggedIn: state.actionReducer.isloggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  let actions = { };
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
	     }
    	this.handleDropdownClick = this.handleDropdownClick.bind(this);
    	this.handleLogout = this.handleLogout.bind(this);

	    this.handleFNChange = this.handleFNChange.bind(this);
	    this.handleLNChange = this.handleLNChange.bind(this);
	    this.handleAgeChange = this.handleAgeChange.bind(this);
	    this.handleEmailChange = this.handleEmailChange.bind(this);
	    this.handleAddressChange = this.handleAddressChange.bind(this);
	    this.handleZipChange = this.handleZipChange.bind(this);
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

	componentDidMount(){
		//this.props.dispatch(this.props.retriveRecentFileList(this.props));
	}

	componentWillReceiveProps(nextProps){
		if(sessionStorage.getItem('jwtToken')==null){
			this.props.history.push('/login');
		}
	}

  handleLogout(){
  	sessionStorage.removeItem('currentFileId');
  	sessionStorage.removeItem('jwtToken');
  	sessionStorage.removeItem('userId');
  	this.setState({showLogout:!this.state.showLogout});
  	this.props.history.push('/login');
  }

  render() {
    return (
    	<div className="homePage">
		    <div className="wrapper">
			    <Tabs className="tabs tabs-1">
			        <nav id="sidebar">
			            <div className="sidebar-header">
			                <h3>Life Line</h3>
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
			                    <p className="col-md-10 text-left" value={this.props.firstName}>Admin</p> 
			                </div>
				            <div className="row">
			                    <p className="col-md-2 text-right">Last Name:</p>
			                    <p className="col-md-10 text-left" value={this.props.lastName}>Admin</p> 
			                </div>
				            <div className="row">
			                    <p className="col-md-2 text-right">Age:</p>
			                    <p className="col-md-10 text-left" value={this.props.age}>25</p> 
			                </div>
				            <div className="row">
			                    <p className="col-md-2 text-right">Address:</p>
			                    <p className="col-md-10 text-left" value={this.props.address}>200 Rayland</p> 
			                </div>
				            <div className="row">
			                    <p className="col-md-2 text-right">Email:</p>
			                    <p className="col-md-10 text-left" value={this.props.email}>admin@admin.com</p> 
			                </div>
				            <div className="row">
			                    <p className="col-md-2 text-right">Zip code:</p>
			                    <p className="col-md-10 text-left" value={this.props.firstName}>95000</p> 
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
			                    <input className="col-md-10 text-left text-input-input autofocus" type="text" value={this.props.organType} onChange={this.handleFNChange} />
			                </div>
			                <input type="submit" className="btn login-button" value="Register My Organ!"/>
			        	</TabContent>
			            <TabContent for="section-appointment">
				            <nav className="navbar navbar-default">
				                <div className="container-fluid">
				                    <div className="navbar-header">
				                        <h2>Appointment For Checkup
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
				            <h2>Available Appointments near your location</h2><p></p>
				            <div class="list-group">
							  <div href="#" class="list-group-item list-group-item-action flex-column align-items-start">
							    <div class="d-flex w-100 justify-content-between">
							      <h5 class="mb-1">Stanford Liver Transplant Program</h5>
							      <small>3 miles away</small>
							    </div>
							    <p class="mb-1">200 Jose Figueres Ave #395, San Jose, CA 95116</p>
							    <small>5:18 PM Saturday, November 4, 2017 (PDT)</small>
							    <button type="button" className="btn btn-primary">Choose</button>
							  </div>
							  <div href="#" class="list-group-item list-group-item-action flex-column align-items-start">
							    <div class="d-flex w-100 justify-content-between">
							      <h5 class="mb-1">Liver Disease Management & Transplant</h5>
							      <small class="text-muted">10.5 miles away</small>
							    </div>
							    <p class="mb-1">1471 Saratoga Ave, San Jose, CA 95129</p>
							    <small class="text-muted">5:18 PM Saturday, November 4, 2017 (PDT)</small>
							    <button type="button" className="btn btn-primary">Choose</button>
							  </div>
							  <div href="#" class="list-group-item list-group-item-action flex-column align-items-start">
							    <div class="d-flex w-100 justify-content-between">
							      <h5 class="mb-1">Jenesis Lipoplasty & Laser</h5>
							      <small class="text-muted">22 miles away</small>
							    </div>
							    <p class="mb-1">1471 Saratoga Ave, San Jose, CA 95129</p>
							    <small class="text-muted">5:18 PM Saturday, November 4, 2017 (PDT)</small>
							    <button type="button" className="btn btn-primary">Choose</button>
							  </div>
							</div>
			        	</TabContent>
			        </div>
			    </Tabs>
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