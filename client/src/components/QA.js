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
	}

	render() {
		const questionDetail = this.props.questionDetail;
		const name = this.props.name;
		const timeStamp = this.props.timeStamp;
		return (
			<li className="Question">
				<button
					onChange={this.upvote}
				> 
				Like 
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
			if (q1.rating > q2.rating) {
				return 1;
			} else if (q1.rating < q2.rating) {
				return -1;
			} else {
				return 0;
			}
		});

		return (
			<ul className="QuestionList">
				{activeQuestions}
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
	}

	// Add the newly posted question to the List of Active questions
	handleSubmit(event) {
		event.preventDefault();
		const timeStamp = new Date().toLocaleString();
		const numQuestions = this.props.numQuestions;
		const question =
			(<Question
				key={numQuestions}
				id={numQuestions}
				questionDetail = {this.state.questionDetail}
				name = {this.state.name}
				timeStamp = {timeStamp}
				rating={0}
			/>);
		this.props.addQuestion(question);
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
				activeQuestions: activeQuestions
			}
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
				/>
			</div>
		);
	}
};


export default QA;