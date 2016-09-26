// Czas trwania ruchu
var moveduration = 160;

function changeCube() {
	if ($('#space').hasClass('solid')) {
		$('#space').removeClass('solid').addClass('glass');
	}	else {
		$('#space').removeClass('glass').addClass('solid');
		}
}

function toggleHelp() {
	$('#help').toggle();
	if ($('#space').hasClass('help')){
		$('#space').removeClass('help');
	}	else {
		$('#space').addClass('help');
	}

}

function makeMove(move,polecenie) {
	// Przerywa wywołanie funkcji jeśli ta już została wywołana
	var noop = $('body').attr('class');
	if (noop !== 'z' && noop !== 'y' && noop !== '') {
		return;
	}

	// id - ytop, ybottom bezpośrednio określa ruch
	var id = polecenie;

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
			$('body').removeClass().addClass(id);
		}
}

$('#keys').click(toggleHelp);

$(document).keydown(function(e) {
    switch(e.which) {
        case 81: // Q
				makeMove('rotate','ytop');
        break;

        case 65: // A
				makeMove('rotate','ybottom');
        break;

				case 87: // W
				makeMove('rotate','zfront');
        break;

        case 83: // S
				makeMove('rotate','revzfront');
        break;

				case 69: // E
				makeMove('rotate','zback');
				break;

				case 68: // D
				makeMove('rotate','revzback');
				break;

				case 82: // R
				makeMove('rotate','revytop');
        break;

				case 70: // F
				makeMove('rotate','revybottom');
				break;

				case 70: // F
				makeMove('rotate','revybottom');
				break;

				case 90: // Z - podgląd kostki
				makeMove('rotate','z');
				break;

				case 88: // X - podgląd kostki
				makeMove('rotate','y');
				break;

				case 78: // N - zmiana wyglądu
				changeCube();
				break;

				case 77: // M - funkcja mieszająca kostkę
				var ymix = ['revytop','revybottom','ytop','ybottom'];
				var zmix = ['zback', 'zfront','revzback','revzfront'];

				var i = 0;
				var mixing = setInterval( function () {
						if (i < 27) {
							// Obrót kostki do osi X
							if (i === 12) {
								makeMove('rotate','ytop'); i++;
							} else if (i === 13) {
								makeMove('rotate','ybottom'); i++;
							} else if (i % 2 == 0) {
								makeMove('rotate',ymix[Math.floor((Math.random() * ymix.length) + 0)]); i++;
							} else {
								makeMove('rotate',zmix[Math.floor((Math.random() * zmix.length) + 0)]); i++;
							}
						} else { clearTimeout(mixing); }}, moveduration+120);
				break;

        default:
				return;
    }
});
