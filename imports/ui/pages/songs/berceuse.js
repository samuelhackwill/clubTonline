import "./berceuse.html"

// METEOR --------------------------------------------------

Template.berceuse.onCreated(function() {
	// we need to add the css file dynamicaly cause we don't want to mess up
	// our namespace ou quoi.
	var fileref = document.createElement("link")
	fileref.setAttribute("rel", "stylesheet")
	fileref.setAttribute("type", "text/css")
	fileref.setAttribute("href", "berceuse.css")
	document.getElementsByTagName("head")[0].appendChild(fileref)
})

Template.berceuse.onRendered(function() {

})

// FONCTIONS --------------------------------------------------
fermePorte = function() {
	console.log("PORTE");
	document.getElementById("porte").classList.add("fermed");
}

eteintLumiere = function() {
	console.log("LUMIERE");
	document.querySelector("main").classList.add("nuit");
}

defilementTexte = function(v, i) {
	console.log("DEFILEMENT");

	document.querySelectorAll("#right .text-wrapper p")[i].animate(v.keyframes, v.options);
	document
		.querySelectorAll("#center .text-wrapper p")[i]
		.animate(v.keyframesCentre, v.optionsCenter);
	document.querySelectorAll("#left .text-wrapper p")[i].animate(v.keyframes, v.optionsLeft);

}

berceuse_startAnimation = function() {

		// CALCULS DES TIMINGS --------------------------------------------------
		let a = {};

		a.profondeurPiece = parseFloat(
			window.getComputedStyle(document.body).getPropertyValue("--profondeur-piece")
		);

		a.vw1 = parseFloat(document.documentElement.clientWidth / 100);

		// Duration in seconds
		a.DURATION = 1000 * 5; // secondes

		a.BANDEAU = document.querySelector("#left .text-wrapper");
		a.bandeauWidth = parseFloat(
			getComputedStyle(a.BANDEAU).getPropertyValue("width")
		);

		a.distanceCote = a.profondeurPiece * a.vw1 + a.bandeauWidth;
		a.distanceCentre = 100 * a.vw1 + a.bandeauWidth;
		a.durationCentre = (a.distanceCentre * a.DURATION) / a.distanceCote;
		a.VITESSE = a.distanceCote / a.DURATION; // En pixels par seconde
		a.delayCentre = (a.profondeurPiece * a.vw1) / a.VITESSE;
		a.delayCote = (100 * a.vw1) / a.VITESSE;

		// console.dir(a);

		let v = {
			right: document.getElementById("right"),
			left: document.getElementById("left"),
			center: document.getElementById("center")
		}

		v.options = {
			iterations: 1,
			fill: "both",
			duration: a.DURATION,
			easing: "linear",
		};

		v.optionsCenter = JSON.parse(JSON.stringify(v.options));
		v.optionsCenter.delay = a.delayCentre;
		v.optionsCenter.duration = a.durationCentre;

		v.optionsLeft = JSON.parse(JSON.stringify(v.options));
		v.optionsLeft.delay = a.delayCentre + a.delayCote;

		v.keyframes = [
			{ transform: "translate3d(0, 0, 0)", opacity: 0 },
			{ opacity: 1, offset: 0.01 },
			{ opacity: 1, offset: 0.99 },
			{ transform: `translate3d(-${a.distanceCote}px, 0, 0)`, opacity: 0 },
		];

		v.keyframesCentre = [
			{ transform: "translate3d(0, 0, 0)", opacity: 0 },
			{ opacity: 1, offset: 0.01 },
			{ opacity: 1, offset: 0.99 },
			{ transform: `translate3d(-${a.distanceCentre}px, 0, 0)`, opacity: 0 },
		];

	document.getElementById("ceparti").style.display = "none";

	// setTimeout(eteintLumiere, 1000);
	// setTimeout(fermePorte, 3000);

	setTimeout(() => {
		document.querySelector("main").classList.add("visible");
		defilementTexte(v, 3);
	}, 500);

	// lancer la musique aussi
	// setTimeout(musique, 5000);

	// 	const alors = setInterval(
	// 		defilementTexte,
	// 		delayCentre + delayCote + DURATION + 1000
	// 	);

}
