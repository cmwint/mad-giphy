import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MadLibs extends Component {
  giphyfyMadLibs(event) {
      // prevent default to stop form from refreshing the page
      event.preventDefault();

      // on submit, get date selected and get harvest API data from date

      // then move the url from home page (/) to /mad-giphy
      this.context.router.history.push('/mad-giphy/');
  }
  render() {
    return (
      <div className="MadLibs">
        <h2>hi hello this is a mad lib!</h2>

        <form className="date-selector" onSubmit={(e) => this.giphyfyMadLibs(e)}>
              <h3>Giphy-fy this stuff</h3>
              <button type="submit">yay go me!</button>
        </form>

      </div>
    );
  }
}

// surfacing the router
MadLibs.contextTypes = {
  router: PropTypes.object
}

export default MadLibs;
