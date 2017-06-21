import React, { Component } from 'react';

// styling
import './MadGiphy.css';

class MadGiphy extends Component {

	getData() {
		var imageArray = this.props.gifImages.map((image, index) => {
      // edit each image string because it actually doesn't return a .gif file
      var imageGif = image.indexOf('-');
      image = image.substring(0, imageGif !== -1 ? imageGif : image.length);
      image = image + '.gif';

      return image;
    });

  	var phrasesArray = [];
		this.props.madLibsArray.map((phrase, index) => {
			if(index % 2 === 0) { // index is even
		    phrasesArray.push(phrase);
			}
  	})

		// merge two arrays
  	var finalMergedArray = phrasesArray.reduce(function(arr, v, i) {
		  return arr.concat(v, imageArray[i]); 
		}, []);

    // if state is empty
    if (!this.props.gifImages) {
    	return null;
    	// maybe add loading thing here
    }
    // when it's updated
    return (
    	finalMergedArray.map((part, index) => {
        if(index % 2 === 0){
          return <span
            key={ index }
            className="mad-giphy-output__phrase">
            { part }
            </span>;
          }else{
	          return <div key={index} className="mad-giphy-output__image">
	            <img key={index} src={part} />
	          </div>;
        }
	  	})
    )
	}

	render() {
    return (
      <div className="mad-giphy-output">
        {this.getData()}
      </div>
    )
	}
}

export default MadGiphy;
