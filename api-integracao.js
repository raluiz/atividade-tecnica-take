function foo(response) {
  var meta = response.meta;
  var data = response.data;
  console.log(meta);
  console.log(data);
}

var script = document.createElement('script');
script.src = 'https://api.github.com/users/takenet/repos?callback=get_data';

document.getElementsByTagName('head')[0].appendChild(script);



function order(rep) {
	/*
	* Ordena uma lista
	*/
	function byDate(a, b) {
		/*
		* Obtém duas variáveis de data de uma lista
		* Converte-as em data
		* Retorna a diferença entre elas para comparação
		*/
		var dateA = new Date(a.created_at);
		var dateB = new Date(b.created_at);
		
		return dateA - dateB;
	}
	
	rep.sort(byDate);
}

function get_data(response) {
	/*
	* Recebe a resposta de uma da URL carregada
	* Obtém o meta e o data fornecido por ela
	* Obtém todos os repositórios que contém C# como linguagem
	*/
	var meta = response.meta;
	var data = response.data;
	var rep = [];
	
	for(n in data) {
		if(data[n].language == "C#") {
			rep.push(data[n]);
		}
	}
	console.log(rep);
	exhibit_rep(rep, 0);
	exhibit_rep(rep, 1);
	exhibit_rep(rep, 2);
	exhibit_rep(rep, 3);
	exhibit_rep(rep, 4);
}

function exhibit_rep(rep, n) {
	/*
	* Obtém o avatar, título e subtítulo de um repositório especificado
	*/
	var avatar = rep[n].owner.avatar_url;
	var title = rep[n].name;
	var subtitle = rep[n].description;
	
	console.log(avatar);
	console.log(title);
	console.log(subtitle);
}
