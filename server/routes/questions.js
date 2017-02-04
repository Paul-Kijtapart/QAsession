const express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Question = mongoose.model('Question');

router.route('/:question_id/upvote')
	.put(function(req, res, next) {
		const question_id = req.params.question_id;
		if (question_id) {
			Question.update({
				_id: question_id
			}, {
				$inc: {
					rating: 1
				}
			}, function(err, rawResponse) {
				if (err) {
					console.error(err);
					res.status(500);
					res.json({
						error: err
					});
				}

				res.status(200);
				res.json({
					message: 'upvote ' + question_id,
					rawResponse: rawResponse
				});
			});
		} else {
			res.status(500);
			res.json({
				message: 'invalid question_id ' + question_id
			});
		}
	});

router.route('/:question_id')
	.delete(function(req, res, next) {
		const question_id = req.params.question_id;
		if (question_id) {
			Question.remove({
				_id: question_id
			}, function(err, status) {
				if (err) {
					console.error(err);
					res.status(500);
					res.json({
						error: err
					});
				}
				res.status(200);
				res.json({
					message: 'delete question ' + question_id,
					status: status
				});
			})
		} else {
			res.status(500);
			res.json({
				message: 'invalid question_id ' + question_id
			});
		}
	});

router.route('/')
	.get(function(req, res, next) {
		Question.find({}, function(err, questions) {
			if (err) {
				console.error(err);
				res.status(500);
				res.json({
					error: err
				});
			}
			res.status(200);
			res.json(questions);
		});
	})
	.post(function(req, res, next) {

		const question = req.body;
		console.log(req.body);
		console.log('Server: post question');
		console.log(question);
		if (question) {
			Question.create(question, function(err, status) {
				if (err) {
					console.error(err);
					res.status(500);
					res.json({
						error: err
					});
				}
				res.status(200);
				res.json({
					message: 'post question ',
					status: status
				});
			});
		} else {
			res.status(500);
			res.json({
				message: 'bodyParser cannot parse the Entity body of the Request'
			});
		}
	});

module.exports = router;