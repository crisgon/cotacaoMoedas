var $ = function(name){
	return document.querySelector(name);
};

//Captura elementos
var container = $(".container");
var dolar = $(".valor-dolar");
var euro  = $(".valor-euro");
var peso  = $(".valor-peso");
var libra = $(".valor-libra");
var teste = $(".teste");


//Faz conexão e retorna o JSON
var conexao = new XMLHttpRequest();
conexao.open("GET", "http://api.promasters.net.br/cotacao/v1/valores"); //abre uma conexão 

conexao.addEventListener("load", function(){
		var conteudoJson = JSON.parse(conexao.responseText); //converte o texto para um objeto js
		console.log(conteudoJson);
		dolar.innerHTML = conteudoJson.valores.USD.valor.toFixed(2);
		euro.innerHTML  = conteudoJson.valores.EUR.valor.toFixed(2);
		peso.innerHTML  = conteudoJson.valores.ARS.valor.toFixed(2);
		libra.innerHTML = conteudoJson.valores.GBP.valor.toFixed(2);
		teste.classList.add("fadeOut");
		container.classList.add("fadeIn");
});
	conexao.send(); // envia

	console.log(conexao.status);
