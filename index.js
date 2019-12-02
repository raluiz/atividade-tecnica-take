const express = require('express');
const app = express();
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const http = require('http');

// Functions that will be used.
function getURL(url) {
	/*
	* Creates a XMLHttpRequest to get some URL's JSON
	*/
	var request = new XMLHttpRequest();
	request.open('GET', url, false);
	request.send();
	return request.responseText;
}

function order(rep) {
	/*
	* Order a list
	*/
	function byDate(a, b) {
		/*
		* Get two data vaiables from the list
		* Parse them to Date
		* Return their difference
		*/
		var dateA = new Date(a.created_at);
		var dateB = new Date(b.created_at);
		
		return dateA - dateB;
	}
	
	rep.sort(byDate);
	
	return rep;
}

function get_oldest(rep, n) {
	/*
	* Get avatar, title and subtitle from the five oldest rep
	*/
	var oldest = [];
	
	for(var i = 0; i < n; i++) {
		oldest.push(rep[i]);
	}
	
	return oldest;
}

// Getting Take's github data and ordering C# repos by creation date and acquiring only five of them.
const data = JSON.parse(getURL('https://api.github.com/users/takenet/repos'));

var rep = [];

for(n in data) {
	if(data[n].language == "C#") {
		rep.push(data[n]);
	}
}

rep = order(rep);
rep = get_oldest(rep, 5);

// Actions for each URL.
app.get('/repositories/', (req, res) => {
	/*
	* Returns the data acquired from the chosen URL.
	*/
	res.send(getURL('https://api.github.com/users/takenet/repos'));
});

app.get('/repositories/C_', (req, res) => {
	/*
	* Returns data about the five oldest C# repositories.
	*/
	res.send(JSON.stringify(rep));
});

app.get('/repositories/img', (req, res) => {
	/*
	* Returns a link to repositories' owner img.
	*/
	res.send(data[0].owner.avatar_url);
});

app.get('/repositories/C_/:n', (req, res) => {
	/*
	* Returns a repository data.
	*/
	const n = parseInt(req.params.n);
	
	res.send(rep[n]);
});
app.listen(3000, () => console.log('Listening on port 3000'));
