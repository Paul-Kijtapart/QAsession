import React from 'react';

// Component Dependency
import Question from './Question.js';


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
						_id={question._id}
						questionDetail={question.questionDetail}
						name={question.name}
						date={question.date}
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

export default QuestionList;