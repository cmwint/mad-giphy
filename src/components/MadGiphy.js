import React, { Component } from 'react';

class MadGiphy extends Component {

	getData() {
        if (!this.props.gifImages) {
        	return null;
        }
        return (
        	this.props.gifImages.map((image, index) => {
        		// edit each image string because it actually doesn't return a .gif file
				var imageGif = image.indexOf('-');
				image = image.substring(0, imageGif !== -1 ? imageGif : image.length);
				image = image + '.gif';

        		return <img key={index} src={image} alt="Gif image" />
        	})
        )
	}

	render() {
        return (
            <div>{this.getData()}</div>
        )
	}
}

export default MadGiphy;
