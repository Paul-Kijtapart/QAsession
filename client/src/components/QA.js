import React from 'react';

// Component Dependency
import Question from './Question.js';
import QuestionList from './QuestionList.js';
import QuestionForm from './QuestionForm.js';

class QA extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeQuestions: (props.route.questions || [])
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