import React from 'react';
import ReactDOM from 'react-dom';
import LookupForm from './LookupForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LookupForm />, div);
})
