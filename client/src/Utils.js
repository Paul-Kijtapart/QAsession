// Plug-in modules
const path = require('path');

// Send Request to Server 
function sendRequest(url, method, data, timeout) {
	return new Promise(function(resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.onload = function() {
			if (xhr.status == 200) {
				resolve(xhr.response);
			} else {
				reject({
					status: xhr.status,
					type: xhr.responseType,
					message: xhr.responseText
				});
			}
		};

		xhr.onerror = function() {
			console.error('Request has Error.');
			reject({
				status: xhr.status,
				type: xhr.responseType,
				message: xhr.responseText
			});
		};

		if (timeout) {
			xhr.timeout = timeout;
			xhr.ontimeout = function() {
				console.error('Request has timed out.');
				reject({
					status: xhr.status,
					type: xhr.responseType,
					message: xhr.responseText
				});
			};
		}

		xhr.onabort = function() {
			console.error('Request has been Canceled.');
			reject({
				status: xhr.status,
				type: xhr.responseType,
				message: xhr.responseText
			});
		};
		xhr.send(data);
	});
};

/*
 * Retrieve All questions from Server
 * URL: "/questions"	
 */
function fetchQuestions() {
	return sendRequest(path.join('localhost', 'products'), 'GET');
};

/*
 * Insert New Question to the Server
 * URL: "/questions/:question_id"
 */
function postQuestion(question) {
	return sendRequest(path.join('localhost', 'products'), 'POST', question);
};

/*
 * Remove the question on the server
 * URL: "/questions/:question_id"
 */
function removeQuestion(question) {

};

/*
 * Upvote the question with corresponding ID on the Server
 * URL: '/questions/:question_id/upvote'
 */
function upvote(questionID) {
	return sendRequest(path.join('localhost', 'questions', 'questionID:', questionID, 'upvote'), 'POST');
};


export {
	sendRequest,
	fetchQuestions,
	postQuestion,
	upvote
};