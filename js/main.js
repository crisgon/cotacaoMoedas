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
		document.body.style.overflow = "scroll"; // Libera o scroll quando a pag carrega

		botao.addEventListener("click", function(event){
			event.preventDefault();
			if(!validaForm(valorCampo.value)){
				console.log(conversoes.realToDolar = conversao(cotacoes.dolar, valorCampo.value));	
				console.log(conversoes.realToEuro  = conversao(cotacoes.euro, valorCampo.value));	
				console.log(conversoes.realToPeso  = conversao(cotacoes.peso, valorCampo.value));	
				console.log(conversoes.realToLibra = conversao(cotacoes.libra, valorCampo.value));	
		
				if(valorCampo.value == 1) {
					valorReal.textContent = valorCampo.value + " real";
				}else{
				 valorReal.textContent = valorCampo.value + " reais";
				}
				var i = 0;
				Object.keys(conversoes).forEach(function(item){ //Percorre todo o objeto
					 console.log(item + " = " + conversoes[item]);
					 lis[i].querySelector(".valor-convertido").textContent = conversoes[item] + " ";
					 i++;
				});
				results.classList.add("fadeIn");
				results.style.opacity = "1";
				valorCampo.value = "";
			}
		});

});
	conexao.send(); // envia

	function conversao(outraMoeda, real){
		return (real / outraMoeda).toFixed(2);		
	}


	function loading(){
		load.classList.add("fadeOut");
		coinsForm.classList.add("fadeIn");
	}


	function validaForm(valor){
		if(valor <= 0){
			var error = document.querySelector(".mensagem-error");
			error.classList.remove("tooltip-error");
			setTimeout(function(){
				error.classList.add("fadeOut");
				error.classList.add("tooltip-error");
			},2000);
			error.classList.remove("fadeOut");
			return true;
		}
	}