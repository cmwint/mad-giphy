import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

// routing
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// components
import MadLibs from './components/MadLibs';
import MadGiphy from './components/MadGiphy';
import Error404 from './components/Error404';
import Footer from './components/Footer';
//import registerServiceWorker from './registerServiceWorker';

import './index.css';

class App extends Component {

	constructor() {
	    super();

	    this.getNewMadLibs = this.getNewMadLibs.bind(this);
	    this.addInputs = this.addInputs.bind(this);
	    this.convertInputs = this.convertInputs.bind(this);
	    
	    this.state = {
	    	title: '',
	    	madLibsArray: [],
	    	madLibsInput: {},
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

	addInputs(index, value) {
		// take a copy of the state
	    const madLibsInput = {...this.state.madLibsInput};
	    // then add in new objects from field inputs
	    madLibsInput[index] = value;
	    // set state with added objects in it
	    this.setState({ madLibsInput });
	}

	convertInputs() {
		function getRandomNum(min, max) {
			return Math.floor(Math.random() * (max - min) + min);
		}
		// make a copy of state
		const giphyReplace = {...this.state.giphyReplace};
		// for every key/value in the madLibsInput state
		for(var key in this.state.madLibsInput) {
			// save the value
		    var value = this.state.madLibsInput[key];
		    // call out to the GIPHY api, searching that value
		    axios.get(`http://api.giphy.com/v1/gifs/search?q=${value}&api_key=dc6zaTOxFJmzC`)
		      .then(response => {
				// then add in new key value pair with file of a random gif matching that value
				giphyReplace[key] = response.data.data[getRandomNum(1,15)].images.downsized_small.mp4;
				// set state with added new giphy image associated with key
				this.setState({ giphyReplace });
		      });
		}
		
	}

	render() {
		return(
			<div className="mad-giphy-app">
				<div className="mad-giphy-app__wrap">
					<h1>{this.state.title}</h1>
					<BrowserRouter>
						<Switch>
							<Route path='/' render={routeProps => <MadLibs {...routeProps} displayMadLibs={this.state.madLibsArray} convertInputs={this.convertInputs} addInputs={this.addInputs} />} />
							<Route path="/mad-giphy/" component={MadGiphy} />
							<Route component={Error404} />
						</Switch>
					</BrowserRouter>
				</div>
				<Footer />
			</div>
		);
	}
}

render(<App />, document.getElementById('root'));
//registerServiceWorker();
