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

class UnosHome extends Component {
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
		if(sessionStorage.getItem('userId')==null){
			this.props.history.push('/login');
		}
	}

	handleLogout(){
		sessionStorage.removeItem('currentFileId');
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
				                    <TabLink to="section-checkUp"><a href="#section-profile" data-toggle="tab" className="tab-toggle active">Assign recepient</a></TabLink>
				                </li>
				                <li>
				                    <TabLink to="section-hospital"><a href="#section-organ" data-toggle="tab" className="tab-toggle">Register Hospital</a></TabLink>
				                </li>
				            </ul>
				        </nav>
				        <div className="tab-content content">
				        	<TabContent className="tab-pane fade in active show" for="section-checkUp">
					            <nav className="navbar navbar-default">
					                <div className="container-fluid">
					                    <div className="navbar-header">
					                        <h2>Assign recepient</h2>
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
								            	{this.state.tranplantCompleted ? <img className="patientBoxIcons organToOffer" src="images/unos.jpg" alt="userIcon" /> :
								            		<img className="patientBoxIcons float-right" data-toggle="modal" data-target="#chooseRecepientModal" src="images/add.png" alt="userIcon" />}
								            </div>
								        </div>
					                </div>
					            </div>
				        	</TabContent>
				        </div>				        
			        	<TabContent for="section-hospital">
				            <nav className="navbar navbar-default">
				                <div className="container-fluid">
				                    <div className="navbar-header">
				                        <h2>Register Hospital</h2>
				                    </div>
				                </div>
				            </nav>
				            <div className="row">
			                    <p className="col-md-3 text-left"><span>Name : </span>
			                    <span value={this.props.name}>Hospital1</span> </p>
			                    <p className="col-md-3 text-left"><span>Email : </span>
			                    <span value={this.props.email}>admin@admin.com</span> </p>
			                    <p className="col-md-3 text-left"><span>Contact Number:</span>
			                    <span value={this.props.contactNumber}>25</span></p> 
			                    <p className="col-md-3 text-left"><span>Address:</span>
			                    <span value={this.props.address}>200 Rayland</span></p>
			                </div>
			                <input type="submit" className="btn login-button" value="Register New Hospital"/>
			        	</TabContent>
			        </Tabs>
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
			    <div id="chooseRecepientModal" className="modal fade" role="dialog">
			        <div className="modal-dialog verfiyModal">
			            <div className="modal-content">
			                <div className="modal-header">
			                    <h4 className="modal-title">Choose Recipient for the Organ</h4>
			                    <button type="button" className="close" data-dismiss="modal">&times;</button>
			                </div>
			                <div className="modal-body">
				                <Collapsible className="col-md-12 text-right recepient" trigger={this.props.firstName + "Admin" + this.props.firstName}>
						            <div className="row">
					                    <p className="col-md-3 text-left"><span>Email : </span>
					                    <span value={this.props.email}>admin@admin.com</span> </p>
					                    <p className="col-md-3 text-left"><span>Age:</span>
					                    <span value={this.props.age}>25</span></p> 
					                    <p className="col-md-3 text-left"><span>Address:</span>
					                    <span value={this.props.address}>200 Rayland</span></p> 
					                    <p className="col-md-3 text-left"><span>Zip code:</span>
					                    <span>95000</span></p>
					                </div>
				                	<div className="row">
				                		<p className="col-md-3 text-left"><span>Hospital ID:</span>
					                	<span value={this.props.HospitalId}></span></p>
				                		<p className="col-md-3 text-left"><span>Organ to Needed:</span>
					                	<span value={this.props.organNeeded}></span></p>
				                		<p className="col-md-3 text-left"><span>Blood Type:</span>
					                	<span value={this.props.bloodType}></span></p>
				                		<p className="col-md-3 text-left"><span>class1 Protein:</span>
					                	<span value={this.props.class1Protein}></span></p>
					                </div>
				                	<div className="row">
				                		<p className="col-md-3 text-left"><span>Class2 Protein:</span>
					                	<span value={this.props.class2Protein}></span></p>
				                		<p className="col-md-3 text-left"><span>Lymphocytes:</span>
					                	<span value={this.props.lymphocytes}></span></p>
				                		<p className="col-md-3 text-left"><span>HLA:</span>
					                	<span value={this.props.HLA}></span></p>
				                		<p className="col-md-3 text-left"><span>Class2 Antigen:</span>
					                	<span value={this.props.class2Antigen}></span></p>
					                </div>
					            </Collapsible>
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
)(UnosHome);