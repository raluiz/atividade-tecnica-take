const express = require('express');
const app = express();
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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

function getData(req) {
	/*
	* Request data about user's github repository.
	* If user doesn't exist, returns null.
	*/
	const data = JSON.parse(getURL('https://api.github.com/users/'+ req.params.user + '/repos'));
	
	if(data.message === "Not Found") {
		return null;
	} else {
		return data;
	}
}

function getByLanguage(data, req) {
	/*
	* Get repos that has a specific language.
	*/
	
	var rep = [];
	
	if(req.params.language == "C_") {
		req.params.language = "C#";
	}
	for(n in data) {
		if(data[n].language == req.params.language) {
			rep.push(data[n]);
		}
	}
	
	return rep;
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


// Actions for each URL.
app.get('/repositories/:user', (req, res) => {
	/*
	* If user exists, sends data about it's repos.
	*/
	const data = getData(req);
	
	if(data == null) {
		res.send(null);
	} else {
		res.send(data);
	}
});

app.get('/repositories/:user/:language', (req, res) => {
	/*
	* Returns data about an user's repo that has a specific language.
	*/
	const data = getData(req);
	var rep = [];
	
	if(data == null) {
		res.send("User not found");
	} else {
		var rep = getByLanguage(data, req);
		
		if(rep.length > 0) {
			res.send(JSON.stringify(rep));
		} else {
			res.send(null);
		}
	}
});

app.get('/repositories/:user/img', (req, res) => {
	/*
	* Returns a link to repositories' owner img.
	*/
	const data = getData(req);
	
	if(data == null) {
		res.send(null);
	} else {
		res.send(data[0].owner.avatar_url);
	}
});

app.get('/repositories/:user/:language/:i', (req, res) => {
	/*
	* Returns an user's i oldest repos that has a specific language.
	*/
	const data = getData(req);
	var rep = [];
	
	if(data == null) {
		res.send("User not found");
	} else {
		const i = parseInt(req.params.i);
		
		var rep = getByLanguage(data, req);
		
		rep = order(rep);
		
		if(rep.length >= i) {
			rep = get_oldest(rep, i);
			res.send(JSON.stringify(rep));
		} else {
			res.send(null);
		}
	}
});

app.listen(3000, () => console.log('Listening on port 3000'));
