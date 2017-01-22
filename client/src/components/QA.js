import React from 'react';

// A question posted by a user/admin
class Question extends React.Component {
	render() {
		return (
			<li className="Question">
			</li>
		);
	}
};

// Displays List of Active Questions 
class QuestionList extends React.Component {
	render() {
		return (
			<ul className="QuestionList">
			</ul>
		);
	}
};

class QuestionForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			question: "",
			name: ""
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleQuestionChange = this.handleQuestionChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
	}

	// Add the newly posted question to the List of Active questions
	handleSubmit(event) {
		event.preventDefault();
	}

	handleQuestionChange(event) {
		this.setState({
			question: event.target.value
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
					value={this.state.question} 
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


class QA extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeQuestions: []
		};
		this.addQuestion = this.addQuestion.bind(this);
	}

	// Add questions to activeQuestions list
	addQuestion(question) {
		this.setState(function(prevState) {
			let activeQuestions = prevState.activeQuestions.slice();
			activeQuestions.push(question);
			return {
				activeQuestions: question
			}
		});
	}

	render() {
		return (
			<div className="QA">
				<QuestionForm />
				<QuestionList />
			</div>
		);
	}
};


export default QA;