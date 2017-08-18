var $ = function(name){ //Função para diminuir a escrita do querySelector
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

//Cria objeto que receberá os valores convertidos
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
			event.preventDefault(); //Evita que a pag seja carregada ao clicar no botão
			if(!validaForm(valorCampo.value)){
				conversoes.realToDolar = conversao(cotacoes.dolar, valorCampo.value);	
				conversoes.realToEuro  = conversao(cotacoes.euro, valorCampo.value);	
				conversoes.realToPeso  = conversao(cotacoes.peso, valorCampo.value);	
				conversoes.realToLibra = conversao(cotacoes.libra, valorCampo.value);	
		
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
				//Mostra os resultados apenas quando o usuário inserir um valor válido
				results.classList.add("fadeIn"); 
				results.style.opacity = "1";
				valorCampo.value = ""; // Limpa o campo
			}
		});

});
	conexao.send(); // envia

	//Faz a conversão das moedas
	function conversao(outraMoeda, real){
		return (real / outraMoeda).toFixed(2);		
	}

	//Tela de carregamento
	function loading(){
		load.classList.add("fadeOut");
		coinsForm.classList.add("fadeIn");
	}

	//Validação do formulário
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