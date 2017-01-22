import React from 'react';
import ReactDOM from 'react-dom';
import {
	Router,
	Route,
	Link,
	browserHistory
} from 'react-router';

ReactDOM.render((
	<Router history={browserHistory}>
	    <Route path="/logIn" component={LogIn}/>
	    <Route path="/QA" component={QA}/>
	</Router>
), document.getElementById('app'));