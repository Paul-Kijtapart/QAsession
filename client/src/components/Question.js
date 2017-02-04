import React from 'react';

class Question extends React.Component {
	constructor(props) {
		super(props);
		this.upvote = this.upvote.bind(this);
	}

	// Upvote this question
	upvote(event) {
		event.preventDefault();
		this.props.onUpvote(this.props._id);
	}

	render() {
		const questionDetail = this.props.questionDetail;
		const name = this.props.name;
		const timeStamp = (this.props.date) ? this.props.date.toLocaleString() : "no timestamp";
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

export default Question;