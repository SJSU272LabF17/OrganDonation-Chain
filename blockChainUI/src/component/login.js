import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestLogin, requestRegister } from '../actions/allActions';

const mapStateToProps = (state) => {
  return {
    loginFailed: state.actionReducer.loginFailed,
    loginMsg: state.actionReducer.loginMsg,
    registerMsg: state.actionReducer.registerMsg,
    registerFailed: state.actionReducer.registerFailed,
    isloggedIn: state.actionReducer.isloggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  let actions = { requestLogin, requestRegister };
  return { ...actions, dispatch };
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName:"",
      lastName:"",
      username:"admin@admin.com",
      password:"admin",
      age:"",
      address:"",
      zip:"",
      showsignIn:true,
      showsAgreementError:true,
      userType: "User Type",
      showTyperror:false
    };

    this.handleFNChange = this.handleFNChange.bind(this);
    this.handleLNChange = this.handleLNChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePWChange = this.handlePWChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleZipChange = this.handleZipChange.bind(this);
    this.handleUserTypeChange = this.handleUserTypeChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleShowHide = this.handleShowHide.bind(this);
    this.handleAgreement = this.handleAgreement.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  handleFNChange(event) {
    this.setState({firstName: event.target.value});
  }

  handleLNChange(event) {
    this.setState({lastName: event.target.value});
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePWChange(event) {
    this.setState({password: event.target.value});
  }

  handleAgeChange(event) {
    this.setState({age: event.target.value});
  }

  handleAddressChange(event) {
    this.setState({address: event.target.value});
  }

  handleUserTypeChange(event){
    this.setState({userType: event.target.innerText, showTyperror:false});
  }

  handleZipChange(event) {
    this.setState({zip: event.target.value});
  }

  handleAgreement(event){
    this.setState({showsAgreementError: !this.state.showsAgreementError});
  }

  validateEmail(elementValue){      
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue); 
  }

  handleLogin(event) {
    if(this.validateEmail(this.state.username) && this.state.password && !this.state.showTyperror){
      this.props.dispatch(this.props.requestLogin(this.state));
      event.preventDefault();
    } else {
      this.setState({showTyperror:true});
    }
    //() => this.props.history.push('/userHome')
  }

  handleRegister(event) {
    if(!this.state.showsAgreementError && this.validateEmail(this.state.username) && this.state.password && this.state.firstName && this.state.lastName && !this.state.showTyperror){
      this.props.dispatch(this.props.requestRegister(this.state));
      event.preventDefault();
    } else if(this.state.showsAgreementError) {
      event.preventDefault();      
    }
  }

  handleShowHide(event){
    this.setState({showsignIn: !this.state.showsignIn});
  }

  componentWillMount(){
    if(sessionStorage.getItem('jwtToken')=="Donor"){
      this.props.history.push('/userHome');
    } else if(sessionStorage.getItem('jwtToken')=="Hospital"){
      this.props.history.push('/HospitalHome');
    } else {
      this.setState({showTyperror: true});
    }
  }

  componentWillReceiveProps(){
    if(sessionStorage.getItem('jwtToken')=="Donor"){
      this.props.history.push('/userHome');
    } else if(sessionStorage.getItem('jwtToken')=="Hospital"){
      this.props.history.push('/HospitalHome');
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img className="logo" src="images/logo.jpg" alt="logo"/><div className="logoTitle">Life Line</div>
        </header>
        <div className="row mainBox">
          <div className="col-md-6">
            <img className="logo big_logo" src="images/logo.jpg" alt="logo"/>
          </div>
          { this.state.showsignIn ? <div className="col-md-4">
            <div className="row">
              <div className="login-register-header">Sign in</div>
              <div className="login-register-switch">"Or "
                <a className="login-register-switch-link" onClick={this.handleShowHide}>create an account</a>
              </div>
            </div>
            <form>
              <div className="row">
                <div className="login-field">
                  <input required placeholder="Email" className="text-input-input autofocus" type="email" name="username" value={this.state.username} onChange={this.handleUsernameChange} />
                </div>
                <div className="login-field">
                  <input required placeholder="Password" className="text-input-input autofocus" type="password" name="password" value={this.state.password} onChange={this.handlePWChange} />
                </div>
                <div className="dropdown fullWidth">
                  <button className="btn btn-secondary dropdown-toggle fullWidth" type="button" id="registerType" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.state.userType}
                  </button>
                  <div className="dropdown-menu fullWidth" aria-labelledby="registerType">
                    <a className="dropdown-item" href="#" onClick={this.handleUserTypeChange}>Donor</a>
                    <a className="dropdown-item" href="#"  onClick={this.handleUserTypeChange}>Hospital</a>
                  </div>
                </div>
                <div className="remember-me">
                  <input type="checkbox" id="rememberMe" name="rememberMe" value="rememberMe"/>Remember me
                </div>
                <div className={this.props.loginFailed ? 'text-input-error-wrapper' : 'text-input-error-wrapper success'}>{this.props.loginMsg}</div>
                { this.state.showTyperror ? <div className="text-input-error-wrapper">Please choose type</div> : null}
                <input type="submit" className="btn login-button" value="login" onClick={this.handleLogin}/>
                <a href="" className="ForgotPass" onClick={this.showRegister}>Forgot your password?</a>
              </div>
            </form>
          </div> : null}
          { this.state.showsignIn ? null : <div className="col-md-4">
            <div className="row">
              <div className="login-register-header">Create an account</div>
              <div className="login-register-switch">"Or "
                <a className="login-register-switch-link" onClick={this.handleShowHide}>log in</a>
              </div>
            </div>
            <form>
            <div className="row">
              <div className="login-field">
                <input required placeholder="Email" className="text-input-input autofocus" type="email" name="username" value={this.state.username} onChange={this.handleUsernameChange} />
              </div>
              <div className="login-field">
                <input required placeholder="Password" className="text-input-input autofocus" type="password" name="password" value={this.state.password} onChange={this.handlePWChange} />
              </div>
              <div className="login-field">
                <input required placeholder="First Name" className="text-input-input autofocus" type="text" name="firstName" value={this.state.firstName} onChange={this.handleFNChange} />
              </div>
              <div className="login-field">
                <input required placeholder="Last Name" className="text-input-input autofocus" type="text" name="lastName" value={this.state.lastName} onChange={this.handleLNChange} />
              </div>
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="registerType" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  User Type
                </button>
                <div className="dropdown-menu" aria-labelledby="registerType">
                  <a className="dropdown-item" href="#" onClick={this.handleUserTypeChange}>Donor</a>
                  <a className="dropdown-item" href="#" onClick={this.handleUserTypeChange}>Hospital</a>
                </div>
              </div>
              <div className="login-field">
                <input required placeholder="Age" className="text-input-input autofocus" type="text" name="age" value={this.state.age} onChange={this.handleAgeChange} />
              </div>
              <div className="login-field">
                <input required placeholder="Address" className="text-input-input autofocus" type="text" name="address" value={this.state.address} onChange={this.handleAddressChange} />
              </div>
              <div className="login-field">
                <input required placeholder="Zip code" className="text-input-input autofocus" type="text" name="zip" value={this.state.zip} onChange={this.handleZipChange} />
              </div>
              <div className="remember-me">
                { this.state.showsAgreementError ? <div className="text-input-error-wrapper">Please agree to the terms of service</div> : null}
                { this.state.showTyperror ? <div className="text-input-error-wrapper">Please choose type</div> : null}
                <input type="checkbox" value={this.state.showsAgreementError?'FALSE':'TRUE'} id="rememberMe" name="agreementCheck" onChange={this.handleAgreement}/>I agree to <a target="_blank" href="html/agreement.html">Terms & conditions</a>
              </div>
              <div className={this.props.registerFailed ? 'text-input-error-wrapper' : 'text-input-error-wrapper success'}>{this.props.registerMsg}</div>
              <input type="submit" className="btn login-button" value="Create an account" onClick={this.handleRegister}/>
            </div></form>
          </div>}
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Login);