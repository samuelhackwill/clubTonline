import "./berceuse.html"

// import { Songs} from "../../../API/songs/songs.js";

// METEOR --------------------------------------------------

Template.berceuse.onCreated(function() {
	// we need to add the css file dynamicaly cause we don't want to mess up
	// our namespace ou quoi.
	var fileref = document.createElement("link")
	fileref.setAttribute("rel", "stylesheet")
	fileref.setAttribute("type", "text/css")
	fileref.setAttribute("href", "/berceuse.css")
	document.getElementsByTagName("head")[0].appendChild(fileref)

	this.autorun(() => {
		console.info(this)
	  });
})

Template.berceuse.helpers({
	getString(option){
		const pasMajuscule = [
			"berceuse_abri",
			"berceuse_foret",
			"berceuse_sac",
			"berceuse_odeur"
		];

		if (pasMajuscule.includes(option.hash.name)) {
			let string = this.data.answers[option.hash.name];
			return string.charAt(0).toLowerCase() + string.slice(1);

		} else {
			return this.data.answers[option.hash.name];
		}
	}

})

// FONCTIONS --------------------------------------------------
defilementTexte = function(v, phrases, i) {
	phrases.right[i].animate(v.keyframes, v.options);
	phrases.center[i].animate(v.keyframesCentre, v.optionsCenter);
	phrases.left[i].animate(v.keyframes, v.optionsLeft);

	console.info(i);
	return Promise.all(phrases.right[i].getAnimations().map((animation) => animation.finished))
}

fadeOut = function(instru) {
    var fadeAudio = setInterval(function () {
        // Only fade if volume not at zero already
	if (instru.volume === 0.0) {
		clearInterval(fadeAudio);
		instru.pause();
        } else if (instru.volume >= 0.1) {
		instru.volume -= 0.1;
        }

    }, 300);

}

boucleDefilement = function(v) {
	console.info("DEFILEMENT");

	const phrases = {
		right: v.right.querySelectorAll("p[class^=para]"),
		center: v.center.querySelectorAll("p[class^=para]"),
		left: v.left.querySelectorAll("p[class^=para]")
	}

	defilementTexte(v, phrases, 0)
		.then(() => defilementTexte(v, phrases, 1))
		.then(() => defilementTexte(v, phrases, 2))
		.then(() => defilementTexte(v, phrases, 3))
		.then(() => defilementTexte(v, phrases, 4))
		.then(() => defilementTexte(v, phrases, 5))
		.then(() => defilementTexte(v, phrases, 6))
		.then(() => defilementTexte(v, phrases, 0))
		.then(() => {
			fadeOut(instru);

			// afficher bouton retour
			document.querySelector(".retour-maison").style.display = "block";

			setTimeout(() => {
				document.querySelector(".retour-maison").style.opacity = "1";
			}, 1000);

		})
		.catch(e => console.error(e, "J'ai déconné"));

}

berceuse_startAnimation = function() {
	// CALCULS DES TIMINGS --------------------------------------------------
	let a = {};

	a.profondeurPiece = parseFloat(
		window.getComputedStyle(document.body).getPropertyValue("--profondeur-piece")
	);

	a.vw1 = parseFloat(document.documentElement.clientWidth / 100);

	// Duration in seconds
	a.DURATION = 11.5 * 1000;

	a.BANDEAU = document.querySelector("#left .text-wrapper");
	a.bandeauWidth = parseFloat(
		getComputedStyle(a.BANDEAU).getPropertyValue("width")
	);

	// Lots of math
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

	const prom = new Promise(function(resolve, reject) {
		setTimeout(() => {
			document.querySelector("main").classList.toggle("nuit");
			resolve("LUMIÈRE");
			document.getElementById("instru").play();
		}, 1000);
	})

	prom.then(() => {
		return new Promise(function(resolve, reject) {
			setTimeout(() => {
				document.getElementById("porte").classList.add("fermed");
				resolve("PORTE");
			}, 2000);
		})

	}).then(() => {
		return new Promise(function(resolve, reject) {
			setTimeout(() => {
				boucleDefilement(v);
				resolve("BOUCLE");
			}, 1000);
		})

	}).catch(err => console.log("OUPSI", err));

}
