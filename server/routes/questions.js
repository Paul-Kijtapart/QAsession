const express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

router.route('/:question_id/upvote')
	.post(function(req, res, next) {
		const question_id = req.params.question_id;
		res.status(200);
		res.json({
			message: 'post upvote ' + question_id
		});
	});

router.route('/:question_id')
	.post(function(req, res, next) {
		const question_id = req.params.question_id;
		res.status(200);
		res.json({
			message: 'post question ' + question_id
		});

	})
	.delete(function(req, res, next) {
		const question_id = req.params.question_id;
		res.status(200);
		res.json({
			message: 'delete question ' + question_id
		});
	});

router.route('/')
	.get(function(req, res, next) {
		res.status(200);
		res.json({
			message: 'get all questions'
		});
	});

module.exports = router;