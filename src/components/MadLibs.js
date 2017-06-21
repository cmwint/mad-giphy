import React, { Component } from 'react';
import PropTypes from 'prop-types';

// styling
import './MadLibs.css';


class MadLibs extends Component {

  giphyfyMadLibs(event) {
    // prevent default to stop form from refreshing the page
    event.preventDefault();
    this.props.convertInputs();
    this.context.router.history.push('/mad-giphy/');
  }

  handleChange(i, e) {
    // pass this and the index to the method in the parent component that updates state
    this.props.addInputs(i, e.target.value);
  }

  render() {
    var madLibParts = this.props.displayMadLibs;
    if (!madLibParts) {
      return (
        <div>Loading...</div>
      )
    } else{
      return (
        <form className="mad-lib-form" onSubmit={(e) => this.giphyfyMadLibs(e)}>
          <p className="mad-lib-form__body">
            {
              // using arrow function to declare that callback
              // and keeping the correct this from the render method
              madLibParts.map((part, index) => {
                if(index % 2 === 0){
                  return <span
                      key={ index }
                      className="mad-lib-form__phrase">
                      { part }
                    </span>;
                }else{
                  return <input
                      key={ index }
                      type="text"
                      required
                      placeholder={ part }
                      id={ index }
                      className="mad-lib-form__input"
                      onChange={this.handleChange.bind(this, index)}
                    />;
                }
              })
            }
          </p>

          <div className="mad-lib-form__button">
            <button type="submit">
              <span>Giphy-fy me!</span>
            </button>
          </div>

        </form>
      );
    }
  }
}

// surfacing the router
MadLibs.contextTypes = {
  router: PropTypes.object
}

export default MadLibs;
