import React, { Component } from 'react';
import { connect } from 'react-redux';
import {} from '../actions/allActions';
import Collapsible from 'react-collapsible';
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
  let actions = {};
  return { ...actions, dispatch };
}

class HospitalHome extends Component {
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
			organNeeded:"",
			personStatus:"",
			bloodType:"",
			class1Protein:"",
			class2Protein:"",
			lymphocytes:"",
			HLA:"",
			class2Antigen:"",
			organSpecificInfo:"",
			doctorNotes:"",
			tranplantCompleted: false
	     }
    	this.handleLogout = this.handleLogout.bind(this);
    	this.handleDropdownClick = this.handleDropdownClick.bind(this);
    	this.handleApproveOrgan = this.handleApproveOrgan.bind(this);

	    this.handleFNChange = this.handleFNChange.bind(this);
	    this.handleLNChange = this.handleLNChange.bind(this);
	    this.handleAgeChange = this.handleAgeChange.bind(this);
	    this.handleEmailChange = this.handleEmailChange.bind(this);
	    this.handleAddressChange = this.handleAddressChange.bind(this);
	    this.handleZipChange = this.handleZipChange.bind(this);

	    this.handleOrganNeededChange = this.handleOrganNeededChange.bind(this);
	    this.handlePersonStatusChange = this.handlePersonStatusChange.bind(this);
	    this.handleBloodTypeChange = this.handleBloodTypeChange.bind(this);
	    this.handleClass1ProteinChange = this.handleClass1ProteinChange.bind(this);
	    this.handleClass2ProteinChange = this.handleClass2ProteinChange.bind(this);
	    this.handleLymphocytesChange = this.handleLymphocytesChange.bind(this);
	    this.handleHLAChange = this.handleHLAChange.bind(this);
	    this.handleClass2AntigenChange = this.handleClass2AntigenChange.bind(this);
	    this.handleOrganSpecificInfoChange = this.handleOrganSpecificInfoChange.bind(this);
	    this.handleDoctorNotesChange = this.handleDoctorNotesChange.bind(this);
	    this.handleOrganToOfferChange = this.handleOrganToOfferChange.bind(this);
	    this.handleHospitalIdChange = this.handleHospitalIdChange.bind(this);
	    this.handleTransplantOrgan = this.handleTransplantOrgan.bind(this);
	}

	handleDropdownClick(e){
		this.setState({showLogout:!this.state.showLogout});
	}
    
    handleShareSearchChange(event){
    	this.setState({shareSearch: event.target.value});
    }

    handleApproveOrgan(){
    	//this.props.dispatch(this.props.handleApproveOrgan(this.state));
    }

	handleFNChange(event){
    	this.setState({firstName: event.target.value});
    }

    handleLNChange(event){
    	this.setState({lastName: event.target.value});
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

    handleAgeChange(event){
    	this.setState({age: event.target.value});
    }

    handleOrganNeededChange(event){
    	this.setState({organNeeded: event.target.value});
    }

    handlePersonStatusChange(event){
    	this.setState({personStatus: event.target.value});
    }

    handleBloodTypeChange(event){
    	this.setState({bloodType: event.target.value});
    }

    handleClass1ProteinChange(event){
    	this.setState({class1Protein: event.target.value});
    }

    handleClass2ProteinChange(event){
    	this.setState({class2Protein: event.target.value});
    }

    handleLymphocytesChange(event){
    	this.setState({lymphocytes: event.target.value});
    }

    handleHLAChange(event){
    	this.setState({HLA: event.target.value});
    }

    handleClass2AntigenChange(event){
    	this.setState({class2Antigen: event.target.value});
    }

    handleOrganSpecificInfoChange(event){
    	this.setState({organSpecificInfo: event.target.value});
    }

    handleDoctorNotesChange(event){
    	this.setState({doctorNotes: event.target.value});
    }

    handleOrganToOfferChange(event){
    	this.setState({organToOffer: event.target.value});
    }

    handleHospitalIdChange(event){
    	this.setState({HospitalId: event.target.value});
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

	handleTransplantOrgan(){
		this.setState({tranplantCompleted:true});
		//this.props.dispatch(this.props.handleTransplantOrgan(this.state));
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
				                    <TabLink to="section-checkUp"><a href="#section-checkUp" data-toggle="tab" className="tab-toggle active">Appointments For Organ Test</a></TabLink>
				                </li>
				                <li>
				                    <TabLink to="section-recipient"><a href="#section-recipient" data-toggle="tab" className="tab-toggle">Register Recipients</a></TabLink>
				                </li>
				                <li>
				                    <TabLink to="section-transplant"><a href="#section-transplant" data-toggle="tab" className="tab-toggle">Appointments for Transplant</a></TabLink>
				                </li>
				            </ul>
				        </nav>
				        <div id="content" className="tab-content content">
				        	<TabContent className="tab-pane fade in active show" for="section-checkUp">
					            <nav className="navbar navbar-default">
					                <div className="container-fluid">
					                    <div className="navbar-header">
					                        <h2>Appointments For Organ Test
						                        <div className="rightPart">
											        <header className="pageHeader col-md-12">
											            <div className="top-menu-container col-md-6">
											                <img className="userIcon" onClick={this.handleDropdownClick} src="images/userIcon.png" alt="userIcon" /> {this.state.showLogout ?
											                <ul className="userDropdown">
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
						            <div className="col-md-4 patientBox">
						            	<div className="patientBoxInner">
							            	<div className="boxTitle" data-toggle="modal" data-target="#organDetailsModal">Amy</div>
							            	<div className="">
								            	<img className="patientBoxIcons" data-toggle="modal" data-target="#organDetailsModal" src="images/registered.png" alt="userIcon" />
								            	{this.state.organToOffer ? <img height="80px" data-toggle="modal" data-target="#chekUpDetailsModal" className="patientBoxIcons organToOffer" src="images/registered1.png" alt="userIcon" /> : null}
								            	<img className={"patientBoxIcons float-right "+ (this.state.organToOffer ? 'iconDisabled' :null )} data-toggle="modal" data-target="#verfiyModal" src="images/add.png" alt="userIcon" />
								            </div>
								        </div>
					                </div>
					            </div>
				        	</TabContent>
				        	<TabContent for="section-recipient">
					            <div id="section-recipient" className="tab-pane fade">
						            <nav className="navbar navbar-default">
						                <div className="container-fluid">
						                    <div className="navbar-header">
						                        <h2>Register Recipients
							                        <div className="rightPart">
												        <header className="pageHeader col-md-12">
												            <div className="top-menu-container col-md-6">
												                <img className="userIcon" onClick={this.handleDropdownClick} src="images/userIcon.png" alt="userIcon" /> {this.state.showLogout ?
												                <ul className="userDropdown">
												                    <li value="logout" onClick={this.handleLogout}>Logout</li>
												                </ul>:null}
												            </div>
												        </header>
												    </div>
											    </h2>
						                    </div>
						                </div>
						            </nav>
						            <Collapsible className="col-md-12 text-right" trigger="Personal Details">
							            <div className="row">
						                    <p className="col-md-2 text-right">First Name:</p>
						                    <input className="col-md-10 text-left text-input-input autofocus" type="text" value={this.props.lastName} onChange={this.handleLNChange} />
						                </div>
							            <div className="row">
						                    <p className="col-md-2 text-right">Last Name:</p>
						                    <input className="col-md-10 text-left text-input-input autofocus" type="text" value={this.props.lastName} onChange={this.handleLNChange} />
						                </div>
							            <div className="row">
						                    <p className="col-md-2 text-right">Age:</p>
						                    <input className="col-md-10 text-left text-input-input autofocus" type="text" value={this.props.age} onChange={this.handleAgeChange} />
						                </div>
							            <div className="row">
						                    <p className="col-md-2 text-right">Address:</p>
						                    <input className="col-md-10 text-left text-input-input autofocus" type="text" value={this.props.address} onChange={this.handleAddressChange} />
						                </div>
							            <div className="row">
						                    <p className="col-md-2 text-right">Email:</p>
						                    <input className="col-md-10 text-left text-input-input autofocus" type="text" value={this.props.email}  onChange={this.handleEmailChange} />
						                </div>
							            <div className="row">
						                    <p className="col-md-2 text-right">Zip code:</p>
						                    <input className="col-md-10 text-left text-input-input autofocus" type="text" value={this.props.zip}  onChange={this.handleZipChange} />
						                </div>
						            </Collapsible>
									<Collapsible className="col-md-12 text-right" trigger="Medical Details">
										<div className="row">
										    <p className="col-md-2 text-right">Organ Needed:</p>
										    <input className="col-md-10 text-left text-input-input autofocus" type="text" value={this.props.organNeeded}  onChange={this.handleOrganNeededChange} />
										</div>
										<div className="row">
										    <p className="col-md-2 text-right">Person Status:</p>
										    <input className="col-md-10 text-left text-input-input autofocus" type="text" value={this.props.personStatus}  onChange={this.handlePersonStatusChange} />
										</div>
										<div className="row">
										    <p className="col-md-2 text-right">Blood Type:</p>
										    <input className="col-md-10 text-left text-input-input autofocus" type="text" value={this.props.bloodType}  onChange={this.handleBloodTypeChange} />
										</div>
										<div className="row">
										    <p className="col-md-2 text-right">Class1 Protein:</p>
										    <input className="col-md-10 text-left text-input-input autofocus" type="text" value={this.props.class1Protein}  onChange={this.handleClass1ProteinChange} />
										</div>
										<div className="row">
										    <p className="col-md-2 text-right">Class2 Protein:</p>
										    <input className="col-md-10 text-left text-input-input autofocus" type="text" value={this.props.class2Protein}  onChange={this.handleClass2ProteinChange} />
										</div>
										<div className="row">
										    <p className="col-md-2 text-right">Lymphocytes:</p>
										    <input className="col-md-10 text-left text-input-input autofocus" type="text" value={this.props.lymphocytes}  onChange={this.handleLymphocytesChange} />
										</div>
										<div className="row">
										    <p className="col-md-2 text-right">HLA:</p>
										    <input className="col-md-10 text-left text-input-input autofocus" type="text" value={this.props.HLA}  onChange={this.handleHLAChange} />
										</div>
										<div className="row">
										    <p className="col-md-2 text-right">Class2 Antigen:</p>
										    <input className="col-md-10 text-left text-input-input autofocus" type="text" value={this.props.class2Antigen}  onChange={this.handleClass2AntigenChange} />
										</div>
										<div className="row">
										    <p className="col-md-2 text-right">Organ Specific Info:</p>
										    <input className="col-md-10 text-left text-input-input autofocus" type="text" value={this.props.organSpecificInfo}  onChange={this.handleOrganSpecificInfoChange} />
										</div>
										<div className="row">
										    <p className="col-md-2 text-right">Doctor Notes:</p>
										    <input className="col-md-10 text-left text-input-input autofocus" type="text" value={this.props.doctorNotes}  onChange={this.handleDoctorNotesChange} />
										</div>
									</Collapsible>
					                <input type="submit" className="btn login-button" value="Register Recipient"/>
					        	</div>
				        	</TabContent>
				        	<TabContent for="section-transplant">
					            <div id="section-transplant" className="tab-pane fade">
						            <nav className="navbar navbar-default">
						                <div className="container-fluid">
						                    <div className="navbar-header">
						                        <h2>Appointment For Transplant
							                        <div className="rightPart">
												        <header className="pageHeader col-md-12">
												            <div className="top-menu-container col-md-6">
												                <img className="userIcon" onClick={this.handleDropdownClick} src="images/userIcon.png" alt="userIcon" /> {this.state.showLogout ?
												                <ul className="userDropdown">
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
							            <div className="col-md-5 patientBox">
							            	<div className={"patientBoxInner "+ (this.state.tranplantCompleted ? 'iconDisabled' :null )}>
								            	<div className="boxTitle" data-toggle="modal" data-target="#organDetailsModal">Amy</div>
								            	<div className="">
									            	<img className="patientBoxIcons" data-toggle="modal" data-target="#organDetailsModal" src="images/registered.png" alt="userIcon" />
									            	<img height="80px" className="patientBoxIcons organToOffer" data-toggle="modal" data-target="#chekUpDetailsModal" src="images/registered1.png" alt="userIcon" />
									            	<img height="80px" className="patientBoxIcons unos" data-toggle="modal" data-target="#recepientDetailsModal" src="images/unos.png" alt="userIcon" />
									            	{this.state.tranplantCompleted ? <img className="patientBoxIcons organToOffer" src="images/logo.jpg" alt="userIcon" /> :
									            		<img className="patientBoxIcons float-right" data-toggle="modal" data-target="#tranplantModal" src="images/add.png" alt="userIcon" />}
									            </div>
									        </div>
						                </div>
						            </div>
					        	</div>
				        	</TabContent>
				        </div>
			        </Tabs>
			    </div>
			    <div id="verfiyModal" className="modal fade" role="dialog">
			        <div className="modal-dialog verfiyModal">
			            <div className="modal-content">
			                <div className="modal-header">
			                    <h4 className="modal-title">Organ Approval Details</h4>
			                    <button type="button" className="close" data-dismiss="modal">&times;</button>
			                </div>
			                <div className="modal-body">
			                    Hospital ID:
			                    <input className="text-input-input autofocus" type="text" value={this.props.HospitalId} onChange={this.handleHospitalIdChange} /> 
			                    Organ to Offer:
			                    <input className="text-input-input autofocus" type="text" value={this.props.organToOffer} onChange={this.handleOrganToOfferChange} /> 
			                    Blood Type:
			                    <input className="text-input-input autofocus" type="text" value={this.props.bloodType} onChange={this.handleBloodTypeChange}/>
			                    Class1 Protein:
			                    <input className="text-input-input autofocus" type="text" value={this.props.class1Protein} onChange={this.handleClass1ProteinChange} />
			                    Class2 Protein:
			                    <input className="text-input-input autofocus" type="text" value={this.props.class2Protein} onChange={this.handleClass2ProteinChange} />
			                    Lymphocytes:
			                    <input className="text-input-input autofocus" type="text" value={this.props.lymphocytes} onChange={this.handleLymphocytesChange} />
			                    HLA:
			                    <input className="text-input-input autofocus" type="text" value={this.props.HLA} onChange={this.handleHLAChange} />
			                    Class2 Antigen:
			                    <input className="text-input-input autofocus" type="text" value={this.props.class2Antigen} onChange={this.handleClass2AntigenChange} />
			                    Organ Specific Info:
			                    <input className="text-input-input autofocus" type="text" value={this.props.organSpecificInfo} onChange={this.handleOrganSpecificInfoChange} />
			                    Doctor Notes:
			                    <input className="text-input-input autofocus" type="text" value={this.props.doctorNotes} onChange={this.handleDoctorNotesChange} />
			                </div>
			                <div className="modal-footer">
			                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleApproveOrgan}>Approve Organ</button>
			                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
			                </div>
			            </div>
			        </div>
			    </div>
			    <div id="tranplantModal" className="modal fade" role="dialog">
			        <div className="modal-dialog verfiyModal">
			            <div className="modal-content">
			                <div className="modal-header">
			                    <h4 className="modal-title">Organ Approval Details</h4>
			                    <button type="button" className="close" data-dismiss="modal">&times;</button>
			                </div>
			                <div className="modal-body">
			                	<Collapsible className="col-md-12 text-right" trigger="Generic Details">
				                    Hospital ID:
				                    <input className="text-input-input autofocus" type="text" value={this.props.HospitalId} onChange={this.handleHospitalIdChange} /> 
				                    Organ to tranplant:
				                    <input className="text-input-input autofocus" type="text" value={this.props.organToOffer} onChange={this.handleOrganToOfferChange} /> 				                    
					            </Collapsible>
					            <Collapsible className="col-md-12 text-right" trigger="Donor's Data">
				                    Blood Type:
				                    <input className="text-input-input autofocus" type="text" value={this.props.bloodType} onChange={this.handleBloodTypeChange}/>
				                    Class1 Protein:
				                    <input className="text-input-input autofocus" type="text" value={this.props.class1Protein} onChange={this.handleClass1ProteinChange} />
				                    Class2 Protein:
				                    <input className="text-input-input autofocus" type="text" value={this.props.class2Protein} onChange={this.handleClass2ProteinChange} />
				                    Lymphocytes:
				                    <input className="text-input-input autofocus" type="text" value={this.props.lymphocytes} onChange={this.handleLymphocytesChange} />
				                    HLA:
				                    <input className="text-input-input autofocus" type="text" value={this.props.HLA} onChange={this.handleHLAChange} />
				                    Class2 Antigen:
				                    <input className="text-input-input autofocus" type="text" value={this.props.class2Antigen} onChange={this.handleClass2AntigenChange} />
				                    Organ Specific Info:
				                    <input className="text-input-input autofocus" type="text" value={this.props.organSpecificInfo} onChange={this.handleOrganSpecificInfoChange} />
				                    Doctor Notes:
				                    <input className="text-input-input autofocus" type="text" value={this.props.doctorNotes} onChange={this.handleDoctorNotesChange} />
					            </Collapsible>
					            <Collapsible className="col-md-12 text-right" trigger="Recipient's Data">						            
				                    Blood Type:
				                    <input className="text-input-input autofocus" type="text" value={this.props.bloodType} onChange={this.handleBloodTypeChange}/>
				                    Class1 Protein:
				                    <input className="text-input-input autofocus" type="text" value={this.props.class1Protein} onChange={this.handleClass1ProteinChange} />
				                    Class2 Protein:
				                    <input className="text-input-input autofocus" type="text" value={this.props.class2Protein} onChange={this.handleClass2ProteinChange} />
				                    Lymphocytes:
				                    <input className="text-input-input autofocus" type="text" value={this.props.lymphocytes} onChange={this.handleLymphocytesChange} />
				                    HLA:
				                    <input className="text-input-input autofocus" type="text" value={this.props.HLA} onChange={this.handleHLAChange} />
				                    Class2 Antigen:
				                    <input className="text-input-input autofocus" type="text" value={this.props.class2Antigen} onChange={this.handleClass2AntigenChange} />
				                    Organ Specific Info:
				                    <input className="text-input-input autofocus" type="text" value={this.props.organSpecificInfo} onChange={this.handleOrganSpecificInfoChange} />
				                    Doctor Notes:
				                    <input className="text-input-input autofocus" type="text" value={this.props.doctorNotes} onChange={this.handleDoctorNotesChange} />
					            </Collapsible>
			                </div>
			                <div className="modal-footer">
			                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleTransplantOrgan}>Organ Transplant Completed!</button>
			                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
			                </div>
			            </div>
			        </div>
			    </div>
			    <div id="chekUpDetailsModal" className="modal fade" role="dialog">
			        <div className="modal-dialog verfiyModal">
			            <div className="modal-content">
			                <div className="modal-header">
			                    <h4 className="modal-title">Organ Approval</h4>
			                    <button type="button" className="close" data-dismiss="modal">&times;</button>
			                </div>
			                <div className="modal-body">
			                	<div className="row">
			                		<p className="col-md-3 text-right">Hospital ID:</p>
				                	<p className="col-md-9 text-left" value={this.props.HospitalId}></p>
				                </div>
			                	<div className="row">
			                		<p className="col-md-3 text-right">Organ to Offer:</p>
				                	<p className="col-md-9 text-left" value={this.props.organToOffer}></p>
				                </div>
			                	<div className="row">
			                		<p className="col-md-3 text-right">Blood Type:</p>
				                	<p className="col-md-9 text-left" value={this.props.bloodType}></p>
				                </div>
			                	<div className="row">
			                		<p className="col-md-3 text-right">Class1 Protein:</p>
				                	<p className="col-md-9 text-left" value={this.props.class1Protein}></p>
				                </div>
			                	<div className="row">
			                		<p className="col-md-3 text-right">Class2 Protein:</p>
				                	<p className="col-md-9 text-left" value={this.props.class2Protein}></p>
				                </div>
			                	<div className="row">
			                		<p className="col-md-3 text-right">Lymphocytes:</p>
				                	<p className="col-md-9 text-left" value={this.props.lymphocytes}></p>
				                </div>
			                	<div className="row">
			                		<p className="col-md-3 text-right">HLA:</p>
				                	<p className="col-md-9 text-left" value={this.props.HLA}></p>
				                </div>
			                	<div className="row">
			                		<p className="col-md-3 text-right">Class2 Antigen:</p>
				                	<p className="col-md-9 text-left" value={this.props.class2Antigen}></p>
				                </div>
			                	<div className="row">
			                		<p className="col-md-3 text-right">Organ Specific Info:</p>
				                	<p className="col-md-9 text-left" value={this.props.organSpecificInfo}></p>
				                </div>
			                	<div className="row">
			                		<p className="col-md-3 text-right">Doctor Notes:</p>
				                	<p className="col-md-9 text-left" value={this.props.doctorNotes}></p>
				                </div>
			                </div>
			                <div className="modal-footer">
			                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
			                </div>
			            </div>
			        </div>
			    </div>
			    <div id="organDetailsModal" className="modal fade" role="dialog">
			        <div className="modal-dialog">
			            <div className="modal-content">
			                <div className="modal-header">
			                    <h4 className="modal-title">Organ Registration Details</h4>
			                    <button type="button" className="close" data-dismiss="modal">&times;</button>
			                </div>
			                <div className="modal-body">
					            <div className="row">
				                    <p className="col-md-3 text-right">First Name:</p>
				                    <p className="col-md-9 text-left" value={this.props.firstName}>Admin</p> 
				                </div>
					            <div className="row">
				                    <p className="col-md-3 text-right">Last Name:</p>
				                    <p className="col-md-9 text-left" value={this.props.lastName}>Admin</p> 
				                </div>
					            <div className="row">
				                    <p className="col-md-3 text-right">Age:</p>
				                    <p className="col-md-9 text-left" value={this.props.age}>25</p> 
				                </div>
					            <div className="row">
				                    <p className="col-md-3 text-right">Address:</p>
				                    <p className="col-md-9 text-left" value={this.props.address}>200 Rayland</p> 
				                </div>
					            <div className="row">
				                    <p className="col-md-3 text-right">Email:</p>
				                    <p className="col-md-9 text-left" value={this.props.email}>admin@admin.com</p> 
				                </div>
					            <div className="row">
				                    <p className="col-md-3 text-right">Zip code:</p>
				                    <p className="col-md-9 text-left" value={this.props.firstName}>95000</p> 
				                </div>
			                </div>
			                <div className="modal-footer">
			                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
			                </div>
			            </div>
			        </div>
			    </div>			    
			    <div id="recepientDetailsModal" className="modal fade" role="dialog">
			        <div className="modal-dialog verfiyModal">
			            <div className="modal-content">
			                <div className="modal-header">
			                    <h4 className="modal-title">Recipient's Data</h4>
			                    <button type="button" className="close" data-dismiss="modal">&times;</button>
			                </div>
			                <div className="modal-body">
			                	<div className="row">
			                		<p className="col-md-3 text-right">Hospital ID (where recipient is registered):</p>
				                	<p className="col-md-9 text-left" value={this.props.HospitalId}></p>
				                </div>
			                	<div className="row">
			                		<p className="col-md-3 text-right">Organ to Needed:</p>
				                	<p className="col-md-9 text-left" value={this.props.organToOffer}></p>
				                </div>
			                	<div className="row">
			                		<p className="col-md-3 text-right">Blood Type:</p>
				                	<p className="col-md-9 text-left" value={this.props.bloodType}></p>
				                </div>
			                	<div className="row">
			                		<p className="col-md-3 text-right">Class1 Protein:</p>
				                	<p className="col-md-9 text-left" value={this.props.class1Protein}></p>
				                </div>
			                	<div className="row">
			                		<p className="col-md-3 text-right">Class2 Protein:</p>
				                	<p className="col-md-9 text-left" value={this.props.class2Protein}></p>
				                </div>
			                	<div className="row">
			                		<p className="col-md-3 text-right">Lymphocytes:</p>
				                	<p className="col-md-9 text-left" value={this.props.lymphocytes}></p>
				                </div>
			                	<div className="row">
			                		<p className="col-md-3 text-right">HLA:</p>
				                	<p className="col-md-9 text-left" value={this.props.HLA}></p>
				                </div>
			                	<div className="row">
			                		<p className="col-md-3 text-right">Class2 Antigen:</p>
				                	<p className="col-md-9 text-left" value={this.props.class2Antigen}></p>
				                </div>
			                	<div className="row">
			                		<p className="col-md-3 text-right">Organ Specific Info:</p>
				                	<p className="col-md-9 text-left" value={this.props.organSpecificInfo}></p>
				                </div>
			                	<div className="row">
			                		<p className="col-md-3 text-right">Doctor Notes:</p>
				                	<p className="col-md-9 text-left" value={this.props.doctorNotes}></p>
				                </div>
			                </div>
			                <div className="modal-footer">
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
)(HospitalHome);