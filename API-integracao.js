var script = document.createElement('script');
script.src = 'https://api.github.com/users/takenet/repos?callback=get_rep';

document.getElementsByTagName('head')[0].appendChild(script);

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

function get_rep(response) {
	/*
	* Receive an URL response
	* Get it's data and meta
	* Get all repository that has C# as a language
	*/
	var meta = response.meta;
	var data = response.data;
	var rep = [];
	
	for(n in data) {
		if(data[n].language == "C#") {
			rep.push(data[n]);
		}
	}
	
	rep = order(rep);
	rep = get_oldest(rep, 5);
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
