var $ = function(name){
	return document.querySelector(name);
};

//Captura elementos
var results    = $(".results");
var lis 	   = results.querySelectorAll("li");
var valorReal  = $(".valor-real-form");
var coinsForm  = $(".coins-form");
var dolar      = $(".valor-dolar");
var euro       = $(".valor-euro");
var peso       = $(".valor-peso");
var libra      = $(".valor-libra");
var load       = $(".load");
var botao      = $(".botao");
var valorCampo = $(".valor-real");
var cotacoes = {
	dolar: undefined,
	euro: undefined,
	peso: undefined,
	libra: undefined
}

var conversoes = {
	realToDolar: undefined,
	realToEuro: undefined,
	realToPeso: undefined,
	realToLibra: undefined
}


//Faz conexão e retorna o JSON
var conexao = new XMLHttpRequest();
conexao.open("GET", "http://api.promasters.net.br/cotacao/v1/valores"); //abre uma conexão 

conexao.addEventListener("load", function(){
		var conteudoJson = JSON.parse(conexao.responseText); //converte o texto para um objeto js
		console.log(conteudoJson);
		dolar.innerHTML = cotacoes.dolar = conteudoJson.valores.USD.valor.toFixed(2); //Define o valor da variavel e add no html
		euro.innerHTML  = cotacoes.euro  = conteudoJson.valores.EUR.valor.toFixed(2);
		peso.innerHTML  = cotacoes.peso  = conteudoJson.valores.ARS.valor.toFixed(2);
		libra.innerHTML = cotacoes.libra = conteudoJson.valores.GBP.valor.toFixed(2);

		loading();



		botao.addEventListener("click", function(event){
			event.preventDefault();
			console.log(conversoes.realToDolar = conversao(cotacoes.dolar, valorCampo.value));	
			console.log(conversoes.realToEuro  = conversao(cotacoes.euro, valorCampo.value));	
			console.log(conversoes.realToPeso  = conversao(cotacoes.peso, valorCampo.value));	
			console.log(conversoes.realToLibra = conversao(cotacoes.libra, valorCampo.value));	

			valorReal.textContent = valorCampo.value;
		var i = 0;
		Object.keys(conversoes).forEach(function(item){ //Percorre todo o objeto
			 console.log(item + " = " + conversoes[item]);
			 lis[i].querySelector(".valor-convertido").textContent = conversoes[item];
			 i++;
			})
	});
		
});
	conexao.send(); // envia

	function conversao(outraMoeda, real){
		return (outraMoeda * real).toFixed(2);		
	}


	function loading(){
		load.classList.add("fadeOut");
		coinsForm.classList.add("fadeIn");
	}


