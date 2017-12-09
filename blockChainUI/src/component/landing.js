import React, { Component } from 'react';
import Scroll from 'react-scroll';
import {scroller} from 'react-scroll';


let Link       = Scroll.Link;
let Element    = Scroll.Element;
let Events     = Scroll.Events;
let scroll     = Scroll.animateScroll;
let scrollSpy  = Scroll.scrollSpy;

export default class Landing extends Component {
	componentDidMount() { 
		Events.scrollEvent.register('begin', function(to, element) {
			console.log("begin", arguments);
		}); 
		Events.scrollEvent.register('end', function(to, element) {
			console.log("end", arguments);
		}); 
		scrollSpy.update(); 
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
		console.log(to);
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