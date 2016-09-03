function zmienOs() {
	var id = this.id

	if ($('body').hasClass(id)){
		$('body').removeClass();
	}	else {
		$('body').removeClass();
		//setTimeout jest po to żeby dwa ruchy nienakładały się na siebie
		setTimeout( function(){ $('body').addClass(id); console.log(id);}, 400);
	}
}

$('button').click(zmienOs);
