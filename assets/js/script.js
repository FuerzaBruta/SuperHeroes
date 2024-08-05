let btnBuscarHeroe = document.querySelector(".btn");
let Caracteristicas;

btnBuscarHeroe.addEventListener("click", function(){
    let txtNumeroHeroe = document.querySelector("#txtNumeroHeroe");
})

$.ajax({
    type: "GET", /* BUSCANDO */
    url: `https://www.superheroapi.com/api.php/5a023eec52da1cb935bd773c7cb6f241/${txtNumeroHeroe.value}`,
    dataType: "json",
    success: function (response) {
        console.log(response);
        Caracteristicas = response.name;
        console.log(Caracteristicas);
        
    }
});

var chart = new CanvasJS.Chart("chartContainer", {
	theme: "light2", // "light1", "light2", "dark1", "dark2"
	exportEnabled: true,
	animationEnabled: true,
	title: {
		text: "Estadísticas de Poder"
	},
	data: [{
		type: "pie",
		startAngle: 25,
		toolTipContent: "<b>{label}</b>: {y}%",
		showInLegend: "true",
		legendText: "{label}",
		indexLabelFontSize: 16,
		indexLabel: "{label} - {y}%",
		dataPoints: [
			{ y: 51.08, label: "durability" },
			{ y: 27.34, label: "speed" },
			{ y: 10.62, label: "strength" },
			{ y: 5.02, label: "intelligence" },
			{ y: 4.07, label: "combat" },
			{ y: 1.22, label: "power" },
		]
	}]
});
chart.render();