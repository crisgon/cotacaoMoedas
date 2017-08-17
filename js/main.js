var $ = function(name){
	return document.querySelector(name);
};

var lis = document.querySelectorAll("li");
// var dolar = $(".dolar").getElementsByTagName("span");
// var euro = $(".euro").getElementsByTagName("span");
// var peso = $(".peso").getElementsByTagName("span");
// var bitcoin = $(".bitcoin").getElementsByTagName("span");

lis.forEach(function(indice){
	console.log(indice.getElementsByTagName("span"));
	
});
