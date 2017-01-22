const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
var app = new express();

// server static assets 
app.use(express.static(path.join(__dirname, 'public')));

// Handles all routes so you do not get a not found error
app.get('*', function(request, response) {
	response.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Need this for Router to work
app.listen(port, function() {
	console.log('Listening on port ' + port);
});