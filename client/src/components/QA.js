import React from 'react';

// A question posted by a user/admin
class Question extends React.Component {
	constructor(props) {
		super(props);
		this.upvote = this.upvote.bind(this);
	}

	// Upvote this question
	upvote(event) {
		event.preventDefault();
		this.props.onUpvote(this.props.id);
	}

	render() {
		const questionDetail = this.props.questionDetail;
		const name = this.props.name;
		const timeStamp = this.props.timeStamp;
		const rating = this.props.rating;
		return (
			<li className="Question">
				<button
					onClick={this.upvote}
				> 
				{rating} 
				</button>
				<span> {questionDetail} </span>
				<span> {name} </span>
				<span> {timeStamp} </span>
			</li>
		);
	}
};

// Displays List of Active Questions 
class QuestionList extends React.Component {
	render() {
		var activeQuestions = this.props.activeQuestions;

		// Order questions by its Rating
		activeQuestions.sort(function(q1, q2) {
			if (q1.rating < q2.rating) {
				return 1;
			} else if (q1.rating > q2.rating) {
				return -1;
			} else {
				return 0;
			}
		});

		// Convert the corresponding Question Component
		var questions = activeQuestions.map(function(question, index) {
			return (<Question
						key={index}
						id={question.id}
						questionDetail={question.questionDetail}
						name={question.name}
						timeStamp={question.timeStamp}
						rating={question.rating}
						onUpvote={this.props.onUpvote} 
					/>);
		}.bind(this));

		return (
			<ul className="QuestionList">
				{questions}
			</ul>
		);
	}
};

class QuestionForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			questionDetail: "",
			name: ""
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleQuestionChange = this.handleQuestionChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.clearInput = this.clearInput.bind(this);
	}

	clearInput() {
		this.setState({
			questionDetail: "",
			name: ""
		});
	}

	// Add the newly posted question to the List of Active questions
	handleSubmit(event) {
		event.preventDefault();
		const timeStamp = new Date().toLocaleString();
		const numQuestions = this.props.numQuestions;
		const question = {
			id: numQuestions,
			questionDetail: this.state.questionDetail,
			name: this.state.name,
			timeStamp: timeStamp,
			rating: 0
		};
		this.props.addQuestion(question);
		this.clearInput();
	}

	handleQuestionChange(event) {
		this.setState({
			questionDetail: event.target.value
		});
	}

	handleNameChange(event) {
		this.setState({
			name: event.target.value
		});
	}

	render() {
		return (
			<div className="QuestionForm">
			<h1> Submit a question </h1>
			<form onSubmit={this.handleSubmit}>
				<input
					onChange={this.handleQuestionChange}
					value={this.state.questionDetail} 
					type="text"
					placeholder="Ask anything"
				/>
				<input
					onChange={this.handleNameChange}
					value={this.state.name} 
					type="text" 
					placeholder="Your name" 
				/>
				<input type="submit" value="submit" />
			</form>
			</div>
		);
	}
};

// Send Request to Server 
function sendRequest(url, timeout, method, data, onSuccess, onFailure, ) {
	var numAttempt = 5;
	return function() {
		var xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.onload = function() {
			if (xhr.status == 200) {
				onSuccess();
			} else {
				numAttempt--;
				onFailure();
			}
		};

		xhr.onerror = function() {
			console.error('Request has Error.');
			numAttempt--;
			onFailure();
		};

		xhr.timeout = timeout;
		xhr.ontimeout = function() {
			console.error('Request has timed out.');
			numAttempt--;
			onFailure();
		};

		xhr.onabort = function() {
			console.error('Request has been Canceled.');
			numAttempt = 0;
			onFailure();
		};

		if (numAttempt > 0) {
			xhr.send(data);
		} else {
			alert('Reached Max Number of Attempts. Please wait and try against later.');
		}
	};
};

function upvote(questionID) {
	console.log('Send upvote Request to user at');
	return;
};


class QA extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeQuestions: []
		};
		this.addQuestion = this.addQuestion.bind(this);
		this.onUpvote = this.onUpvote.bind(this);
	}

	// Add questions to activeQuestions list
	addQuestion(question) {
		this.setState(function(prevState) {
			let activeQuestions = prevState.activeQuestions.slice();
			activeQuestions.push(question);
			return {
				activeQuestions: activeQuestions
			}
		});
	}

	onUpvote(questionID) {
		const activeQuestions = this.state.activeQuestions.slice();
		const questionIndex = activeQuestions.findIndex(function(question) {
			return (question.id === questionID);
		});
		if (questionIndex === -1) {
			console.error('Cannot find matching id');
			return;
		}
		activeQuestions[questionIndex].rating++;
		this.setState({
			activeQuestions: activeQuestions
		});
	}

	render() {
		const numQuestions = this.state.activeQuestions.length;
		return (
			<div className="QA">
				<QuestionForm 
					addQuestion = {this.addQuestion}
					numQuestions = {numQuestions}
				/>
				<QuestionList 
					activeQuestions = {this.state.activeQuestions}
					onUpvote = {this.onUpvote}
				/>
			</div>
		);
	}
};


export default QA;