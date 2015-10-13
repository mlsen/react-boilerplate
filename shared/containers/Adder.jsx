import React from 'react';
import {addName} from 'actions';
import {connect} from 'react-redux';

@connect(state => ({names: state.names}))
export default class Adder extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    let name = this.refs.name;
    this.props.dispatch(addName(name.value));
    name.value = '';
  }

  render() {
    const {names, dispatch} = this.props;

    return (
      <div>
        <ul>
          {names.map((name, index) => {
            return <li key={index}>{name}</li>;
          })}
        </ul>
        <hr />
        <div>
          <input type='text' ref='name' />
          <button onClick={this.handleSubmit}>Add name</button>
        </div>
      </div>
    );
  }
}
