import React, { Component } from 'react';
import PropTypes from 'prop-types';

// styling
import './MadLibs.css';


class MadLibs extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    var madLibParts = this.props.displayMadLibs;
    return (
      <form className="mad-lib-form" onSubmit={this.handleSubmit}>
        <p className="mad-lib-form__body">
          {
            madLibParts.map(function(part, index){
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
                    placeholder={ part }
                    className="mad-lib-form__input"
                    onChange={this.props.handleChange}
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

// surfacing the router
MadLibs.contextTypes = {
  router: PropTypes.object
}

export default MadLibs;
