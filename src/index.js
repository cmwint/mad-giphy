import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

// routing
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// components
import MadLibs from './components/MadLibs';
import MadGiphy from './components/MadGiphy';
import Error404 from './components/Error404';
//import registerServiceWorker from './registerServiceWorker';

import './index.css';

class App extends Component {

	constructor() {
	    super();

	    this.getNewMadLibs = this.getNewMadLibs.bind(this);
	    this.convertInputs = this.convertInputs.bind(this);
	    
	    this.state = {
	    	title: '',
	    	madLibsArray: [],
	    	madLibsInput: [],
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
		axios.get(`http://madlibz.herokuapp.com/api/random?minlength=${getRandomNum(1,15)}&maxlength=${getRandomNum(16,30)}`)
	      .then(res => {
	        let randomMadLib = res.request.responseText;
	      	// turn string from API into JSON
	        randomMadLib = JSON.parse(randomMadLib);
	      	// merge blanks and value arrays so they aren't separate
	        let mergeMadLibArray = randomMadLib.value.reduce(function(arr, v, i) {
                  return arr.concat(v, randomMadLib.blanks[i]); 
               }, []);
	      	// remove weird last three empty values
	        mergeMadLibArray.splice(-3,3);

    		this.setState({
				title: randomMadLib.title,
				madLibsArray: mergeMadLibArray
			});
	      });
	}

	convertInputs() {
		console.log('hello');
	}

	render() {
		return(
			<div className="mad-giphy-app">
				<h1>{this.state.title}</h1>
				<BrowserRouter>
					<Switch>
						<Route path='/' render={routeProps => <MadLibs {...routeProps} displayMadLibs={this.state.madLibsArray} convertInputs={this.convertInputs} />} />
						<Route path="/mad-giphy/" component={MadGiphy} />
						<Route component={Error404} />
					</Switch>
				</BrowserRouter>
			</div>
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
