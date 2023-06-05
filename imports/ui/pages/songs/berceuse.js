import "./berceuse.html"

// CALCULS DES TIMINGS --------------------------------------------------
const profondeurPiece = parseFloat(
	window.getComputedStyle(document.body).getPropertyValue("--profondeur-piece")
);
const vw1 = parseFloat(document.documentElement.clientWidth / 100);

// Duration in seconds
const DURATION = 1000 * 100; // secondes

const BANDEAU = document.querySelector("#left .text-wrapper");
const bandeauWidth = parseFloat(
	getComputedStyle(BANDEAU).getPropertyValue("width")
);

const distanceCote = profondeurPiece * vw1 + bandeauWidth;
const distanceCentre = 100 * vw1 + bandeauWidth;

const durationCentre = (distanceCentre * DURATION) / distanceCote;

const VITESSE = distanceCote / DURATION; // En pixels par seconde
const delayCentre = (profondeurPiece * vw1) / VITESSE;
const delayCote = (100 * vw1) / VITESSE;

const options = {
	iterations: 1,
	fill: "both",
	duration: DURATION,
	easing: "linear",
};

let optionsCenter = JSON.parse(JSON.stringify(options));
optionsCenter.delay = delayCentre;
optionsCenter.duration = durationCentre;

let optionsLeft = JSON.parse(JSON.stringify(options));
optionsLeft.delay = delayCentre + delayCote;

const keyframes = [
	{ transform: "translate3d(0, 0, 0)", opacity: 0 },
	{ opacity: 1, offset: 0.01 },
	{ opacity: 1, offset: 0.99 },
	{ transform: `translate3d(-${distanceCote}px, 0, 0)`, opacity: 0 },
];

const keyframesCentre = [
	{ transform: "translate3d(0, 0, 0)", opacity: 0 },
	{ opacity: 1, offset: 0.01 },
	{ opacity: 1, offset: 0.99 },
	{ transform: `translate3d(-${distanceCentre}px, 0, 0)`, opacity: 0 },
];

// FONCTIONS --------------------------------------------------
function fermePorte() {
	console.log("PORTE");
	document.getElementById("porte").classList.add("fermed");
}

function eteintLumiere() {
	console.log("LUMIERE");
	document.querySelector("main").classList.add("nuit");
}

function defilementTexte() {
	console.log("DEFILEMENT");

	document.querySelector("#right .text-wrapper").animate(keyframes, options);
	document
		.querySelector("#center .text-wrapper")
		.animate(keyframesCentre, optionsCenter);
	document.querySelector("#left .text-wrapper").animate(keyframes, optionsLeft);
}

function startAnimation() {
	document.getElementById("ceparti").style.display = "none";

	setTimeout(eteintLumiere, 1000);
	setTimeout(fermePorte, 3000);
	setTimeout(() => {
		document.querySelector("main").classList.add("visible");
		defilementTexte();
	}, 4000);
	// lancer la musique aussi
	// setTimeout(musique, 5000);
	const alors = setInterval(
		defilementTexte,
		delayCentre + delayCote + DURATION + 1000
	);
}

// startAnimation();
eteintLumiere();

// METEOR --------------------------------------------------

Template.berceuse.onCreated(function(){
    // we need to add the css file dynamicaly cause we don't want to mess up
    // our namespace ou quoi.
    var fileref = document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", "berceuse.css")
    document.getElementsByTagName("head")[0].appendChild(fileref)
})
