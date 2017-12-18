import React from 'react';
import ReactDOM from 'react-dom';
import './sass/index.scss';
import {App }from './router';

import registerServiceWorker from './registerServiceWorker';
//function Welcome(props) {
//return <h1>Hello, {props.name}</h1>;
//}

function Lala() {
  return (
   
	<App/>
    
  );
}

ReactDOM.render(
  <Lala />,
  document.getElementById('root')
);
