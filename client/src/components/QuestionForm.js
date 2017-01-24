import React from 'react';

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

export default QuestionForm;