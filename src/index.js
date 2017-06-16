import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

// routing
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import MadLibs from './components/MadLibs';
import MadGiphy from './components/MadGiphy';
import Error404 from './components/Error404';
//import registerServiceWorker from './registerServiceWorker';

import './index.css';

class App extends Component {

	constructor() {
	    super();

	    this.getNewMadLibs = this.getNewMadLibs.bind(this);
	    
	    this.state = {
	    	madLibsJson: {},
	    	giphyReplace: {},
	    };
	}

	componentDidMount(){
		this.getNewMadLibs();
	}

	getNewMadLibs() {
		function getRandomNum(min, max) {
		  return Math.floor(Math.random() * (max - min) + min);
		}
		axios.get(`http://madlibz.herokuapp.com/api/random?minlength=${getRandomNum(5,10)}&maxlength=${getRandomNum(18,24)}`)
	      .then(res => {
	        const randomMadLib = res.request.responseText;
    		this.setState({
				madLibsJson: randomMadLib
			});
	      });
	}

	render() {
		return(
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={MadLibs} />
					<Route exact path='/' render={routeProps => <MadLibs {...routeProps} dispalyMadLibs={this.state.madLibsJson}/>} />
					<Route exact path="/mad-giphy/" component={MadGiphy} />
					<Route component={Error404} />
				</Switch>
			</BrowserRouter>
		);
	}
}


// using the render method from the react-dom package
// first thing we pass it is what component we would like to render
// this is JSX since it's kinda like our own tag
// then the last thing is what DOM element it should render out to
	//render(<App />, document.querySelector('#ohHello'));

render(<App />, document.getElementById('root'));
//registerServiceWorker();
