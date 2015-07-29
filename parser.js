var string = "Gostaria de comprar uma bela casa para os meus filhos, com uma linda vista para a mata, que contenha um jardim e uma piscina.";

var parser = function(str) {

	if (typeof str !== 'string') log('Err');

	var strUpper,
		strArray;

	strUpper = str.toUpperCase();
	strArray = strUpper.match(/\S+/g);
	
	console.log(strArray);
}

function log(msg) {
	console.log(msg);
	process.exit(1);
}

parser(string);