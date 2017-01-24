import React from 'react';
import ReactDOM from 'react-dom';
import {
	Router,
	Route,
	Link,
	browserHistory
} from 'react-router';

// Components
import QA from './components/QA.js';
import LogIn from './components/LogIn.js';

// Utils
import {
	fetchQuestions
} from './Utils.js';

class HI extends React.Component {
	render() {
		return (
			<div>
				<h1>  What is going on??? </h1>
			</div>
		);
	}
};

// Start the Web Application by getting all the existing questions from Server
fetchQuestions()
	.catch(function(reason) {
		console.error(reason);
	})
	.then(function(questions) {
		var temp = [];
		ReactDOM.render((
			<Router history={browserHistory}>
		<Route path="/" component={HI} />
	    <Route path="/logIn" component={LogIn}/>
	    <Route path="/QA" component={QA} questions={temp}/>
	</Router>
		), document.getElementById('root'));
	});