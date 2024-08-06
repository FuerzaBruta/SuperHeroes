$(document).ready(function () {
	// Capturo la información ingresada mediante eventos del DOM con jQuery
	$('#btn').click(function () {
		let IdHeroe = $('#IdHeroe').val();

		// Compruebo la informacion ingresada por el usuario, la cual, solo debe ser un número, si es texto dara error
		if (!$.isNumeric(IdHeroe)) {
			alert('ingresa un número del 1 al 731 para encontrar tu SuperHero.');
			return;
		}

		// Implemento funciones para separar la captura de la información ingresada por el usuario con la consulta a la API
		getHeroData(IdHeroe);
	});


	// Función para consultar la API
	function getHeroData(IdHeroe) {
		// Consultar la API mediante AJAX con la sintaxis de jQuery
		$.ajax({
			method: 'GET',
			url: `https://www.superheroapi.com/api.php/5a023eec52da1cb935bd773c7cb6f241/${IdHeroe}`,
			dataType: "json",
			success: function (response) {
				// Implemento estructuras condicionales para generar alertas cuando existan errores en la búsqueda
				if (response.response === 'error') {
					alert('Superhéroe no encontrado.');
				} else {
					// Renderizar la información recibida por la API dinámicamente utilizando tarjetas de Bootstrap
					displayHeroInfo(response);

					// Emplear la librería de gráficos CanvasJS, para mostrar dinámicamente información específica de cada superhéroe
					renderChart(response.powerstats);
				}
			}
		});
	}

	//Función para mostrar la información del superhéroe
	function displayHeroInfo(heroe) {
		$('#heroInfo').html(`
            <div class="card" style="width: 50%;">
                <div class="row">
                    <div class="col-md-6">
                        <img src="${heroe.image.url}" class="card-img heroe-image" alt="${heroe.name}">
                    </div>
                    <div class="col-md-6">
                        <div class="card-body">
                            <h5 class="card-title">${heroe.name}</h5>
                            <p class="card-text">Nombre completo: ${heroe.biography['full-name']}</p>
                            <p class="card-text">Inteligencia: ${heroe.powerstats.intelligence}</p>
                            <p class="card-text">Fuerza: ${heroe.powerstats.strength}</p>
                            <p class="card-text">Velocidad: ${heroe.powerstats.speed}</p>
                            <p class="card-text">Durabilidad: ${heroe.powerstats.durability}</p>
                            <p class="card-text">Poder: ${heroe.powerstats.power}</p>
                            <p class="card-text">Combate: ${heroe.powerstats.combat}</p>
                        </div>
                    </div>
                </div>
            </div>
        `);
	}



	//Función para renderizar el gráfico con CanvasJS
	function renderChart(powerstats) {
		let dataPoints = [];
		// Utilizar ciclos y métodos para arreglos u objetos que permitan recorrer, ordenar y mostrar la información
		$.each(powerstats, function (key, value) {
			dataPoints.push({ label: key.charAt(0).toUpperCase() + key.slice(1), y: parseInt(value) });
		});

		let chart = new CanvasJS.Chart("chartContainer", {
			animationEnabled: true,
			animationEnabled: true,
			title: {
				text: `Estadísticas de Poder`
			},
			data: [{
				type: "pie",
				startAngle: 25,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 19,
				indexLabel: "{label} - {y}",
				dataPoints: dataPoints
			}]
		});
		chart.render();
	}
});