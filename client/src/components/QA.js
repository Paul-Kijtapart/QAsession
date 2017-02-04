import React from 'react';

// Component Dependency
import Question from './Question.js';
import QuestionList from './QuestionList.js';
import QuestionForm from './QuestionForm.js';

// Utils
import {
	postQuestion,
	removeQuestion,
	sendRequest
} from './../Utils.js';

class QA extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeQuestions: (props.route.questions || [])
		};

		this.numQuestions = this.state.activeQuestions.length;
		this.addQuestion = this.addQuestion.bind(this);
		this.onUpvote = this.onUpvote.bind(this);
	}

	addQuestion(question) {
		sendRequest('http://localhost:3000/questions', 'POST', question)
			.then(function(question) {
				this.setState(function(prevState) {
					let activeQuestions = prevState.activeQuestions.slice();
					activeQuestions.push(question);
					this.numQuestions++;
					return {
						activeQuestions: activeQuestions
					}
				});
			})
			.catch(function(reason) {
				console.log("Failed to add question.");
				console.error(reason);
			});
	}

	removeQuestion(questionID) {
		this.setState(function(prevState) {
			let activeQuestions = prevState.activeQuestions.slice();
			const question_index = activeQuestions.indexOf(question);
			if (question_index > -1) {
				activeQuestions.splice(question_index, 1);
			}
			return {
				activeQuestions: activeQuestions
			};
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
		return (
			<div className="QA">
				<QuestionForm 
					addQuestion = {this.addQuestion}
					numQuestions = {this.numQuestions}
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