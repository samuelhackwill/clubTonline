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
	this.test = "coucou je teste les scopes";

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

	console.log(v.right.querySelectorAll("p[class^=para]")[i], i);

	// v.right.querySelectorAll("p[class^=para]")[i].animate(v.keyframes, v.options);
	// v.center.querySelectorAll("p[class^=para]")[i].animate(v.keyframesCentre, v.optionsCenter);
	// v.left.querySelectorAll("p[class^=para]")[i].animate(v.keyframes, v.optionsLeft);

	// PROMISE ANIMATION ONFINISHED (éventuellement)
	// Promise.all(elem.getAnimations().map((animation) => animation.finished)).then(
	//   () => elem.remove()
	// );

}

boucleDefilement = function(v) {
	console.log("DEFILEMENT");

	const phrases = {
		right : v.right.querySelectorAll("p[class^=para]"),
		center : v.center.querySelectorAll("p[class^=para]"),
		left : v.left.querySelectorAll("p[class^=para]")
	}

	for (let i; i < phrases.right.length; i++) {
		setTimeout(() => { defilementTexte(v, i); }, 1000 * i);
	}

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

	let v = {
		left: document.getElementById("left"),
		center: document.getElementById("center"),
		right: document.getElementById("right")
	}

	v.options = {
		iterations: 1,
		fill: "backwards",
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

	setTimeout(eteintLumiere, 1000);
	setTimeout(fermePorte, 3000);

	setTimeout(() => {
		document.querySelector("main").classList.add("visible");

		boucleDefilement(v);

		a
	}, 5000);

	// lancer la musique aussi
	setTimeout(() => {
		document.getElementsById("instru").play();
	}, 5000);

	// 	const alors = setInterval(
	// 		defilementTexte,
	// 		delayCentre + delayCote + DURATION + 1000
	// 	);

}
