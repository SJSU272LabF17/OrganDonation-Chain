import React, { Component } from 'react';
import { connect } from 'react-redux';
import {} from '../actions/allActions';
import Collapsible from 'react-collapsible';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';
import { retriveTestingAppts, retriveRecList, chooseRecepient } from '../actions/allActions';

const mapStateToProps = (state) => {
  return {
    userId: sessionStorage.getItem('userId'),
    firstName: state.actionReducer.firstName,
    lastName: state.actionReducer.lastName,
    email: state.actionReducer.email,
    isloggedIn: state.actionReducer.isloggedIn,
    testingAppts: state.actionReducer.testingAppts,
    recepeintList : state.actionReducer.recepeintList,
    showMessage: state.actionReducer.showMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  let actions = {retriveTestingAppts, retriveRecList, chooseRecepient};
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
			currentDonor: {},
			currentOrganInfo: {},
			currentDonorId:""
	     }
    	this.handleLogout = this.handleLogout.bind(this);
    	this.handleDropdownClick = this.handleDropdownClick.bind(this);

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
	    this.retriveTestingAppts = this.retriveTestingAppts.bind(this);
	    this.showDonor = this.showDonor.bind(this);
	    this.showOrganInfo = this.showOrganInfo.bind(this);
	    this.setCurrentOrgan = this.setCurrentOrgan.bind(this);
	    this.chooseRecepient = this.chooseRecepient.bind(this);
	}

	handleDropdownClick(e){
		this.setState({showLogout:!this.state.showLogout});
	}
    
    handleShareSearchChange(event){
    	this.setState({shareSearch: event.target.value});
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
		this.props.dispatch(this.props.retriveTestingAppts(this.props));
	}

	componentWillReceiveProps(nextProps){
	}

	handleLogout(){
	}

	retriveTestingAppts(){
		this.props.dispatch(this.props.retriveTestingAppts(this.props));
	}

	showDonor(temp){
		this.setState({currentDonor:temp});
	}

	showOrganInfo(temp){
		this.setState({currentOrganInfo:temp});
	}

	setCurrentOrgan(tempAppointment){
		this.setState({currentOrgan:tempAppointment.organ._id, appointmentId:tempAppointment._id});
		this.props.dispatch(this.props.retriveRecList(this.state));
		if(tempAppointment.donorId && tempAppointment.donorId._id){
			this.setState({currentDonorId:tempAppointment.donorId._id});
		}
	}

	chooseRecepient(recepient){
		this.props.dispatch(this.props.chooseRecepient(recepient, this.state));
		this.props.dispatch(this.props.retriveTestingAppts(this.props));
		this.setState({showSecondMarble: this.state.appointmentId});
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
				                <li className="active" onClick={this.retriveTestingAppts}>
				                    <TabLink to="section-checkUp"><a href="#section-profile" data-toggle="tab" className="tab-toggle active">Assign Recipient</a></TabLink>
				                </li>
				            </ul>
				        </nav>
				        <div className="tab-content content">
				        	<TabContent className="tab-pane fade in active show" for="section-checkUp">
					            <nav className="navbar navbar-default">
					                <div className="container-fluid">
					                    <div className="navbar-header">
					                        <h2>Assign Recipient</h2>
					                    </div>
					                </div>
					            </nav>
					            <div className="row">
					            	{this.props.testingAppts && this.props.testingAppts.length>0 ? this.props.testingAppts.map(step =>
							            <div className={"col-md-5 patientBox "+(this.state.showSecondMarble==step._id ? "iconDisabled ": "" )+(step.organ && step.organ.organTestInfo && step.status!="inactive" ?  "" : "hideBlock")}>
							            	<div className="patientBoxInner minWidth">
								            	<div className="boxTitle" data-toggle="modal" data-target="#organDetailsModal">{step.donorId.firstName+" "+step.donorId.lastName}</div>
								            	<div className="">
									            	<img className="patientBoxIcons" data-toggle="modal" data-target="#organDetailsModal" src="images/registered.png" alt="userIcon" onClick={this.showDonor.bind(this, step.donorId)}/>
									            	{ step.organ && step.organ.organTestInfo ? <img height="80px" className="patientBoxIcons organToOffer" data-toggle="modal" data-target="#chekUpDetailsModal" src="images/registered1.png" alt="userIcon" onClick={this.showOrganInfo.bind(this, step)}/> : null }
									            	{this.state.showSecondMarble==step._id ? <img className="patientBoxIcons organToOffer unos" src="images/unos.png" alt="userIcon" /> :
									            		<img className="patientBoxIcons float-right" data-toggle="modal" data-target="#chooseRecepientModal" src="images/add.png" alt="userIcon" onClick={this.setCurrentOrgan.bind(this, step)}/>}
									            </div>
									        </div>
						                </div>
						                )
						            : null }
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
				                    <p className="col-md-9 text-left">{this.state.currentDonor.firstName}</p> 
				                </div>
					            <div className="row">
				                    <p className="col-md-3 text-right">Last Name:</p>
				                    <p className="col-md-9 text-left">{this.state.currentDonor.lastName}</p> 
				                </div>
					            <div className="row">
				                    <p className="col-md-3 text-right">Age:</p>
				                    <p className="col-md-9 text-left">{this.state.currentDonor.age}</p> 
				                </div>
					            <div className="row">
				                    <p className="col-md-3 text-right">Address:</p>
				                    <p className="col-md-9 text-left">{this.state.currentDonor.address}</p> 
				                </div>
					            <div className="row">
				                    <p className="col-md-3 text-right">Email:</p>
				                    <p className="col-md-9 text-left">{this.state.currentDonor.email}</p> 
				                </div>
					            <div className="row">
				                    <p className="col-md-3 text-right">Zip code:</p>
				                    <p className="col-md-9 text-left">{this.state.currentDonor.zip}</p> 
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
			                	{this.state.currentOrganInfo && this.state.currentOrganInfo.sourceHospital && this.state.currentOrganInfo.sourceHospital.name ? <div className="row">
			                		<p className="col-md-3 text-right">Hospital ID:</p>
				                	<p className="col-md-9 text-left">{this.state.currentOrganInfo.sourceHospital.name}</p>
				                </div> : null }
			                	{this.state.currentOrganInfo && this.state.currentOrganInfo.organ && this.state.currentOrganInfo.organ.name ? <div className="row">
			                		<p className="col-md-3 text-right">Organ to Offer:</p>
				                	<p className="col-md-9 text-left">{this.state.currentOrganInfo.organ.name}</p>
				                </div> : null }
			                	{this.state.currentOrganInfo && this.state.currentOrganInfo.organ && this.state.currentOrganInfo.organ.organTestInfo && this.state.currentOrganInfo.organ.organTestInfo.bloodType ? <div className="row">
			                		<p className="col-md-3 text-right">Blood Type:</p>
				                	<p className="col-md-9 text-left">{this.state.currentOrganInfo.organ.organTestInfo.bloodType}</p>
				                </div> : null }
			                	{this.state.currentOrganInfo && this.state.currentOrganInfo.organ && this.state.currentOrganInfo.organ.organTestInfo && this.state.currentOrganInfo.organ.organTestInfo.class1Protein ? <div className="row">
			                		<p className="col-md-3 text-right">Class1 Protein:</p>
				                	<p className="col-md-9 text-left">{this.state.currentOrganInfo.organ.organTestInfo.class1Protein}</p>
				                </div> : null }
			                	{this.state.currentOrganInfo && this.state.currentOrganInfo.organ && this.state.currentOrganInfo.organ.organTestInfo && this.state.currentOrganInfo.organ.organTestInfo.class2Protein ? <div className="row">
			                		<p className="col-md-3 text-right">Class2 Protein:</p>
				                	<p className="col-md-9 text-left">{this.state.currentOrganInfo.organ.organTestInfo.class2Protein}</p>
				                </div> : null }
			                	{this.state.currentOrganInfo && this.state.currentOrganInfo.organ && this.state.currentOrganInfo.organ.organTestInfo && this.state.currentOrganInfo.organ.organTestInfo.lymphocytes ? <div className="row">
			                		<p className="col-md-3 text-right">Lymphocytes:</p>
				                	<p className="col-md-9 text-left">{this.state.currentOrganInfo.organ.organTestInfo.lymphocytes}</p>
				                </div> : null }
			                	{this.state.currentOrganInfo && this.state.currentOrganInfo.organ && this.state.currentOrganInfo.organ.organTestInfo && this.state.currentOrganInfo.organ.organTestInfo.HLA ? <div className="row">
			                		<p className="col-md-3 text-right">HLA:</p>
				                	<p className="col-md-9 text-left">{this.state.currentOrganInfo.organ.organTestInfo.HLA}</p>
				                </div> : null }
			                	{this.state.currentOrganInfo && this.state.currentOrganInfo.organ && this.state.currentOrganInfo.organ.organTestInfo && this.state.currentOrganInfo.organ.organTestInfo.class2Antigen ? <div className="row">
			                		<p className="col-md-3 text-right">Class2 Antigen:</p>
				                	<p className="col-md-9 text-left">{this.state.currentOrganInfo.organ.organTestInfo.class2Antigen}</p>
				                </div> : null }
			                	{this.state.currentOrganInfo && this.state.currentOrganInfo.organ && this.state.currentOrganInfo.organ.organTestInfo && this.state.currentOrganInfo.organ.organTestInfo.organSpecificInfo ? <div className="row">
			                		<p className="col-md-3 text-right">Organ Specific Info:</p>
				                	<p className="col-md-9 text-left">{this.state.currentOrganInfo.organ.organTestInfo.organSpecificInfo}</p>
				                </div> : null }
			                	{this.state.currentOrganInfo && this.state.organ && this.state.currentOrganInfo.organ.organTestInfo && this.state.currentOrganInfo.organ.organTestInfo.doctorNotes ? <div className="row">
			                		<p className="col-md-3 text-right">Doctor Notes:</p>
				                	<p className="col-md-9 text-left">{this.state.currentOrganInfo.organ.organTestInfo.doctorNotes}</p>
				                </div> : null }
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
			                	{this.props.recepeintList && this.props.recepeintList.length>0 ? this.props.recepeintList.map(step =>
				                <Collapsible className="col-md-12 text-right recepient" trigger={step.name}>
						            <div className="row">
					                    <p className="col-md-3 text-left"><span>Email : </span>
					                    <span>{step.name}</span></p>
					                    <p className="col-md-3 text-left"><span>Email : </span>
					                    <span>{step.email}</span></p>
					                    <p className="col-md-3 text-left"><span>Age:</span>
					                    <span>{step.age}</span></p> 
					                    <button type="button" className="col-md-2 btn btn-primary" data-dismiss="modal" onClick={this.chooseRecepient.bind(this, step)}>Choose</button> 
					                </div>
				                	<div className="row">
				                		<p className="col-md-3 text-left"><span>Hospital ID:</span>
					                	<span>{step.HospitalId}</span></p>
				                		<p className="col-md-3 text-left"><span>Organ to Needed:</span>
					                	<span>{step.organNeeded}</span></p>
				                		<p className="col-md-3 text-left"><span>Blood Type:</span>
					                	<span>{step.bloodType}</span></p>
				                		<p className="col-md-3 text-left"><span>class1 Protein:</span>
					                	<span>{step.class1Protein}</span></p>
					                </div>
				                	<div className="row">
				                		<p className="col-md-3 text-left"><span>Class2 Protein:</span>
					                	<span>{step.class2Protein}</span></p>
				                		<p className="col-md-3 text-left"><span>Lymphocytes:</span>
					                	<span>{step.lymphocytes}</span></p>
				                		<p className="col-md-3 text-left"><span>HLA:</span>
					                	<span>{step.HLA}</span></p>
				                		<p className="col-md-3 text-left"><span>Class2 Antigen:</span>
					                	<span>{step.class2Antigen}</span></p>
					                </div>
					            </Collapsible>)
					            : null }
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