import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
  <h1>Helloo</h1>
); // vibes

function AddRow() {
  function handleClick(e) {
    e.preventDefault();
    console.log('Add row.');
  }
  <button onClick={handleClick}>
    Add Row
  </button>
}

ReactDOM.render(<App/>, document.getElementById('app'));