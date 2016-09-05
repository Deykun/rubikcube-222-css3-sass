// Czas trwania ruchu
var moveduration = 300;

function changeCube() {
	if ($('#space').hasClass('solid')) {
		$('#space').removeClass().addClass('glass');
	}	else {
		$('#space').removeClass().addClass('solid')
		}
}

function makeMove(move,polecenie) {
	// id - ytop, ybottom bezpośrednio określa ruch
	var id = this.id
	if (move === 'rotate') { id=polecenie; } // możnaby napisac funkcje pobierającą polecenia z kliknięć na kostce i wywołującą obrót tutaj to opcja pobierania id nie ze zdarzenia click przycisku, a wywowłania makeMove('rotate','ytop') w innej funkcji

	// Obrót w poziomie
	if (id === 'ytop' || id === 'revytop' || id === 'ybottom' || id === 'revybottom') {

		// y = 1 - górna ścianka, y = 2 dolna ścianka
		var y;
		if (id === 'ytop' || id === 'revytop') { y = 1; }
		if (id === 'ybottom' || id === 'revybottom') { y = 2; }

		// Order - określa kolejność w jakiej zamieniane są narożniki
		var order;
		if (id === 'ytop') { order = [2,3,1,0]; }
		if (id === 'revytop') {	order = [3,2,0,1]; }
		if (id === 'ybottom') { order = [2,3,1,0]; }
		if (id === 'revybottom') { order = [3,2,0,1]; }

		// Wskaźnik tablicy order
		var index;

		// Tablica z narożnkami (podwójna) [front, right]
		var corner = [];
		$('body').removeClass().addClass(id);

		// Funkcja setTimeout trwa dokładnie tyle co ruch w CSS
		// Po jego zakończeniu zotaje on cofnięty bez animacji, a naklejki zostają przeklejone
		setTimeout( function() {
			// Pętle pobierają dane o kolorach naklejek i zapisują je w tablicy corner
			for (var x = 1 ; x<3 ; x++) {
				for (var z = 1 ; z<3 ; z++) {
					var front = $('#x'+x+'y'+y+'z'+z+' > .front > div').attr('class');
					var top = $('#x'+x+'y'+y+'z'+z+' > .top > div').attr('class');
					var right = $('#x'+x+'y'+y+'z'+z+' > .right > div').attr('class');
					corner.push([front, top, right]);
					}
				}

			// Pętle podmieniają kolory naklejek w tablicy corner wykorzystując tablice order
			for (var x = 1 ; x<3 ; x++){
				for (var z = 1 ; z<3 ; z++){
					if (x === 1 && z === 1) {index = order[0];}
					if (x === 1 && z === 2) {index = order[1];}
					if (x === 2 && z === 1) {index = order[2];}
					if (x === 2 && z === 2) {index = order[3];}

					$('#x'+x+'y'+y+'z'+z+' > .front > div').removeClass().addClass(corner[index][0]);
					$('#x'+x+'y'+y+'z'+z+' > .top > div').removeClass().addClass(corner[index][1]);
					$('#x'+x+'y'+y+'z'+z+' > .right > div').removeClass().addClass(corner[index][2]);
					}
				}

			//Moment usunięcia klasy
		 	$('body').removeClass();
		}, moveduration);
	}

	/* Obrót w pionie */
	else if (id === 'zfront' || id === 'revzfront' || id === 'zback' || id === 'revzback') {

		// z = 1 - frontowa ścianka, y = 2 tylnia ścianka
		var z;
		if (id === 'zfront' || id === 'revzfront') { z = 1; }
		if (id === 'zback' || id === 'revzback') { z = 2; }

		// Order - określa kolejność w jakiej zamieniane są narożniki
		var order;
		if (id === 'zfront') { order = [2,0,3,1]; }
		if (id === 'revzfront') {	order = [1,3,0,2]; }
		if (id === 'zback') { order = [1,3,0,2]; }
		if (id === 'revzback') { order = [2,0,3,1]; }

		// Wskaźnik tablicy order
		var index;
		// Dodatkowy wskaźniki zamiany FRONT-TOP-RIGHT
		var indexside = [];

		// Tablica z narożnkami (potrójna) [front, top, right]
		var corner = [];
		$('body').removeClass().addClass(id);

		// Funkcja setTimeout trwa dokładnie tyle co ruch w CSS
		// Po jego zakończeniu zotaje on cofnięty bez animacji, a naklejki zostają przeklejone
		setTimeout( function() {
			// Pętle pobierają dane o kolorach naklejek i zapisują je w tablicy corner
			for (var x = 1 ; x<3 ; x++) {
				for (var y = 1 ; y<3 ; y++) {
					var front = $('#x'+x+'y'+y+'z'+z+' > .front > div').attr('class');
					var top = $('#x'+x+'y'+y+'z'+z+' > .top > div').attr('class');
					var right = $('#x'+x+'y'+y+'z'+z+' > .right > div').attr('class');
					corner.push([front, top, right]);
					}
				}

			// Pętle podmieniają kolory naklejek w tablicy corner wykorzystując tablice order
			for (var x = 1 ; x<3 ; x++){
				for (var y = 1 ; y<3 ; y++){
					if (x === 1 && y === 1) {
						index = order[0];
						switch (id) {
							case 'zfront':
							case 'revzback':
								indexside = [1, 2, 0];
								break;
							case 'revzfront':
							case 'zback':
								indexside = [1, 0, 2];
								break;
							}
						}
					if (x === 1 && y === 2) {
						index = order[1];
						switch (id) {
							case 'zfront':
							case 'revzback':
								indexside = [1, 0, 2];
								break;
							case 'revzfront':
							case 'zback':
								indexside = [1, 2, 0];
								break;
							}
						}
					if (x === 2 && y === 1) {
						index = order[2];
						switch (id) {
							case 'zfront':
							case 'revzback':
								indexside = [0, 2, 1];
								break;
							case 'revzfront':
							case 'zback':
								indexside = [2, 0, 1];
								break;
							}
						}
					if (x === 2 && y === 2) {
						index = order[3];
						switch (id) {
							case 'zfront':
							case 'revzback':
								indexside = [2, 0, 1];
								break;
							case 'revzfront':
							case 'zback':
								indexside = [0, 2, 1];
								break;
							}
						}

					$('#x'+x+'y'+y+'z'+z+' > .front > div').removeClass().addClass(corner[index][indexside[0]]);
					$('#x'+x+'y'+y+'z'+z+' > .top > div').removeClass().addClass(corner[index][indexside[1]]);
					$('#x'+x+'y'+y+'z'+z+' > .right > div').removeClass().addClass(corner[index][indexside[2]]);
					}
				}

			//Moment usunięcia klasy
		 	$('body').removeClass();
		}, moveduration);
	}

	/* Podglądy */
	else {
		if ($('body').hasClass(id)){
			$('body').removeClass();
		}	else {
			$('body').removeClass().addClass(id);
		}}

	$('button').removeClass('selected');
	var selected = $('body').attr('class');
	if (selected === 'y' || selected === 'z'){
		$('#'+selected).addClass('selected');
	}
}

$('.moves button, .view button').click( makeMove );
$('.settings button').click( changeCube );
