import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Scroll from 'react-scroll';
import { Link, DirectLink, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import { getLatestTransactions } from '../actions/allActions';
import Pagination from 'react-js-pagination';

const mapStateToProps = (state) => {
  return {
    latestTransactions: state.actionReducer.latestTransactions,
    showMessage: state.actionReducer.showMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  let actions = {getLatestTransactions};
  return { ...actions, dispatch };
}

class Landing extends Component {
	constructor(props) {
    	super(props);    	
	    this.state = {
	    	activePage: 1
	    };
    	this.handlePageChange = this.handlePageChange.bind(this);
    }
	componentDidMount() { 
		Events.scrollEvent.register('begin', function(to, element) {
			//console.log("begin", arguments);
		}); 
		Events.scrollEvent.register('end', function(to, element) {
			//console.log("end", arguments);
		}); 
		scrollSpy.update();
		this.props.dispatch(this.props.getLatestTransactions());
	}
	componentWillUnmount() {
		Events.scrollEvent.remove('begin');
		Events.scrollEvent.remove('end');
	}
	scrollToTop() {
		scroll.scrollToTop();
	}
	scrollToBottom() {
		scroll.scrollToBottom();
	}
	scrollTo() {
		scroll.scrollTo(100);
	}
	scrollMore() {
		scroll.scrollMore(100);
	}
	handleSetActive(to) {
		//console.log(to);
	}
	handlePageChange(pageNumber){
		let tempTransactions = this.props.latestTransactions.slice((pageNumber-1)*5,pageNumber*5);
		this.setState({latestPageTransactions: []});
		this.setState({latestPageTransactions: tempTransactions});
		this.setState({activePage: pageNumber});
	}
	componentWillReceiveProps(nextProps){
		this.setState({latestPageTransactions: nextProps.latestTransactions.slice(0,5)});
	}

  render() {
    return (
        <div className="landingPage row">
		   <header>
				<h2><img className="landingPageLogo" src="images/logo.jpg"/></h2>
				<nav>
					<li>
						<Link activeClass="active" to="home" spy={true} smooth={true} offset={50} duration={500} onSetActive={this.handleSetActive}>
							Home
						</Link>
					</li>
					<li>
						<Link activeClass="active" to="transactions" spy={true} smooth={true} offset={50} duration={500}>
				        	Latest Transactions
				        </Link>
			        </li>
					<li>
						<Link activeClass="active" to="data" spy={true} smooth={true} offset={50} duration={500}>
				        	Data
				        </Link>
			        </li>
			        <li>
				        <Link activeClass="active" to="services" spy={true} smooth={true} offset={50} duration={500}>
				        	Services
				        </Link>
				    </li>
			        <li>
				        <Link activeClass="active" to="reviews" spy={true} smooth={true} offset={50} duration={500}>
				        	Reviews
				        </Link>
				    </li>
				    <li>
				        <Link className="test6" to="contact" spy={true} smooth={true} duration={500}>
				        	Contact Us
				        </Link>
				    </li>
				</nav>
			</header>
			<Element name="home" className="element">
				<section className="hero">
					<div className="background-image"></div>
					<h1>Organ Chain</h1>
					<h3>A gift that lives on.</h3>
					<a onClick={() => this.props.history.push('/login')} className="btn">I am in!</a>
				</section>
			</Element>
			<Element name="transactions" className="element">
				<section className="our-work">
					<h3 className="title">Latest Transactions</h3>
		            <div className="col-md-12">
			            <p className="col-md-6 text-left smallHeader"><span>Transaction ID</span></p>
			            <p className="col-md-3 text-left smallHeader"><span>Transaction Type</span></p>
			            <p className="col-md-3 text-left smallHeader"><span>Transaction Time</span></p>
			        </div>
					{this.state.latestPageTransactions && this.state.latestPageTransactions.length>0 ? this.state.latestPageTransactions.map(step =>
			            <div key={step.transactionId} className="col-md-12">
		                    <p className="col-md-6 text-left eachTransaction"><span>{step.transactionId}</span></p>
		                    <p className="col-md-3 text-left eachTransaction"><span>{step.transactionType.split(".")[step.transactionType.split(".").length-1]}</span></p>
		                    <p className="col-md-3 text-left eachTransaction"><span>{step.transactionTimestamp}</span></p> 
		                </div>)
		            : null }
			        <Pagination activePage={this.state.activePage}
			          itemsCountPerPage={5}
			          totalItemsCount={this.props.latestTransactions.length}
			          pageRangeDisplayed={10}
			          onChange={this.handlePageChange}/>
				</section>
			</Element>
			<Element name="data" className="element">
				<section className="our-work">
					<h3 className="title">Organ Donation Statistics</h3>
					<p>Currently there are candidates for transplant on the U.S. national waiting list. Nearly 2 out of every 3 people on the waiting list are over the age of 50.
						Almost 2,000 children under 18 are on the waiting list. Almost 70,000 people (58%) on the list are ethnic minorities.</p>
					<hr/>
					<ul className="grid">
						<li className="small backImg1"></li>
						<li className="large backImg2"></li>
						<li className="large backImg3"></li>
						<li className="small backImg4"></li>
					</ul>
				</section>
			</Element>
			<Element name="services" className="element">
				<section className="features">
					<h3 className="title">Services</h3>
					<p>Organ Chain is dedicated to the prevention and treatment of illness and enhancing the greater health of individuals, families and communities throughout USA.</p>
					<hr/>

					<ul className="grid">
						<li>
							<i className="fa fa-registered"></i>
							<h4>Register</h4>
							<p>You can make a difference for the thousands of people waiting for lifesaving and life enhancing transplants. Join in the effort. Help raise public awareness of organ, eye, and tissue donation—and encourage others to sign up to save lives.</p>
						</li>
						<li>
							<i className="fa fa-stethoscope"></i>
							<h4>Check Up</h4>
							<p>Testing to see if you can donate a kidney begins with a blood test. The test will determine your blood type and if it will match the recipient's blood (compatibility). If your blood type is compatible with the recipient, two more blood tests will be done (tissue typing and cross-matching).</p>
						</li>
						<li>
							<i className="fa fa-user-md"></i>
							<h4>Transplant</h4>
							<p>There are two types of surgery: laparoscopic and open nephrectomy. Most donors have laparoscopic. The transplant team will tell you which you are having before surgery.</p>
						</li>
					</ul>
				</section>
			</Element>
			<Element name="reviews" className="element">
				<section className="reviews">
					<h3 className="title">What people say:</h3>
					<p className="quote">This is truly awarding work help saving lives, advocate for recipients awaiting organ or tissue transplant.</p>
					<p className="author">— Patrick Farrell</p>

					<p className="quote">Thanks to Organ Chain, now i have the opportunity to see the world and all its beauty.</p>
					<p className="author">— George Smith</p>

					<p className="quote">People of all ages and medical histories should consider themselves potential donors, it will save lot of lives.</p>
					<p className="author">— Kevin Blake</p>
				</section>
			</Element>
			<Element name="contact" className="element">
				<section className="contact">
					<h3 className="title">Send me brochure</h3>	
					<p>People of all ages and background can be organ donors. If you are under age 18, your parent or guardian must give you permission to become a donor. If you are 18 or older you can show you want to be a donor by signing a donor card. You should also let your family know your wishes.</p>
					<hr/>
					<form>
						<input type="email" placeholder="Email"/>
						<a href="#" className="btn">Ask us!</a>
					</form>
				</section>
			</Element>
			<footer>
				<ul>
					<li><a href="#"><i className="fa fa-twitter-square"></i></a></li>
					<li><a href="#"><i className="fa fa-facebook-square"></i></a></li>
					<li><a href="#"><i className="fa fa-snapchat-square"></i></a></li>
					<li><a href="#"><i className="fa fa-pinterest-square"></i></a></li>
					<li><a href="#"><i className="fa fa-github-square"></i></a></li>
				</ul>
				<p>Made by <a href="#" target="_blank">CMPE 272 - Team 21</a>.</p>
			</footer>
	    </div>
    )
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Landing);