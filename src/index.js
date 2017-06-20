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
		
		var promiseArray = [];
		// for every key/value in the madLibsInput state
		for(var key in this.state.madLibsInput) {
			// save the value
		    var value = this.state.madLibsInput[key];
		    // call out to the API
		    var promise = axios.get(`http://api.giphy.com/v1/gifs/search?q=${value}&api_key=dc6zaTOxFJmzC`);
		    // save it to an array
		    promiseArray.push(promise);

		}
		Promise.all(promiseArray).then((response) => {
			var index = 1;
			const giphyReplace = {...this.state.giphyReplace};
			for(var object in response) {
				// get giphy images
				var value = response[object].data.data[getRandomNum(1,15)].images.downsized_small.mp4;
				// update state
				giphyReplace[index] = value;
				// set state with added objects in it
				this.setState({ giphyReplace });
				// increment by 2 to align with madLibsInput
				index += 2;
			}
		})
	}

	render() {
		return(
			<div className="mad-giphy-app">
				<div className="mad-giphy-app__wrap">
					<h1>{this.state.title}</h1>
					<BrowserRouter>
						<Switch>
							<Route exact path='/' render={routeProps => <MadLibs {...routeProps} gifImages={this.state.giphyReplace} displayMadLibs={this.state.madLibsArray} convertInputs={this.convertInputs} addInputs={this.addInputs} />} />
							<Route exact path="/mad-giphy/" render={routeProps => <MadGiphy {...routeProps} gifImages={this.state.giphyReplace} madLibsInput={this.state.madLibsInput} madLibsArray={this.state.madLibsArray} />} />
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
