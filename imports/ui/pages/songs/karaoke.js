import "./karaoke.html"

// METEOR ------------------------------------------------
Template.karaoke.onCreated(function(){
    // we need to add the css file dynamicaly cause we don't want to mess up
    // our namespace ou quoi.
    var fileref = document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", "karaoke.css")
    document.getElementsByTagName("head")[0].appendChild(fileref)
})

Template.karaoke.onRendered(function(){
	// ------------ APRÈS LA PRÉPARATION POUR QUE LES ÉlÉMENTS HTML SOIENT BIEN PRÉSENTS
	const INSTRU = document.getElementById("instru");
	const frameRate = 10; // 10 millisecondes entre chaque check de frame


	// ------------------------ ANIMATIONS ------------------------ //
	// ------------ CLIGNOTE
	const clignoteAnim = [{ opacity: 0 }, { opacity: 1 }];
	const clignoteOptions = {
		iteration: 1,
		fill: "forwards",
		duration: 100, // en millisecondes
		easing: "linear",
	};

	// ------------ BEAT
	const tailleAnim = [
		{ transform: "scale(1)" },
		{ transform: "scale(1.15)", offset: 0.05 },
		{ transform: "scale(1)" },
	];

	const tailleOptions = {
		iteration: 1,
		fill: "forwards",
		duration: 1100, // en millisecondes
		easing: "linear",
	};


	// ------------ TRIPLEBASS
	const tripleBassAnim = [
		{ transform: "scale(1)" },
		{ transform: "scale(1.04)", offset: 0.02 },
		{ transform: "scale(1)", offset: 0.13 },
		{ transform: "scale(1.06)", offset: 0.18 },
		{ transform: "scale(1)", offset: 0.3 },
		{ transform: "scale(1.12)", offset: 0.35 },
		{ transform: "scale(1)" },
	];

	const tripleBassOptions = {
		iteration: 1,
		fill: "forwards",
		duration: 1480, // en millisecondes
		easing: "linear",
	};

	// ------------ caisseClaire
	const caisseClaireAnim = [
		{ transform: "rotate(-3deg)" },
		{ transform: "rotate(0)" },
	];

	const caisseClaireOptions = {
		iteration: 1,
		fill: "none",
		duration: 100, // en millisecondes
		easing: "linear",
	};
})


// FUNCTIONS ------------------------------------------------
karaoke_startAnimation = function() {
	INSTRU.play();

	setTimeout(simpleBass, 400);
	setTimeout(simpleBass, 1950);
	setTimeout(simpleBass, 5900);

	setTimeout(tripleBass, 3700);

	setTimeout(caisseClaire, 1200);
	setTimeout(caisseClaire, 3200);
	setTimeout(caisseClaire, 5180);
	setTimeout(caisseClaire, 7170);

	const progress = document.getElementById("progress");
	setInterval(() => {
		// Temps en dixièmes de seconde
		const now = Math.trunc(INSTRU.currentTime * 10) / 10;
		progress.innerHTML = now;

		const slide = document.querySelector(`[data-slide="${now}"]`);

		if (slide && !slide.classList.contains("sing")) {
			// console.log("on affiche la frame");

			const singz = document.querySelectorAll(".sing");
			if (singz.length > 0) {
				singz[0].classList.remove("sing");
			}

			slide.classList.add("sing");
			karaoke_createAnimation(slide);
		}
	}, frameRate);
}

karaoke_createAnimation = function(slide) {
	switch (slide.id) {
		case "couplet1":
			console.log("couplet1");

			break;

		default:
			console.log("default");

			break;
	}
}

displayAfter = function(elem, milliseconds) {
	setTimeout(() => {
		elem.style.opacity = "1";
	}, milliseconds);
}

emptySlide = function(slide, milliseconds) {
	setTimeout(() => {
		for (let el of slide.children) {
			el.style.display = "none";
		}
	}, milliseconds);
}

clignote = function() {
	const visible = document.querySelector("#slides > div");
	visible.animate(clignoteAnim, clignoteOptions);

	const delays = [480, 640, 800, 960];
	for (let delay of delays) {
		setTimeout(() => {
			visible.animate(clignoteAnim, clignoteOptions);
		}, delay);
	}
}

simpleBass = function() {
	const visible = document.querySelector("#slides > div");
	visible.animate(tailleAnim, tailleOptions);
}


tripleBass = function() {
	const visible = document.querySelector("#slides > div");
	visible.animate(tripleBassAnim, tripleBassOptions);
}


caisseClaire = function() {
	const visible = document.querySelector("#slides > div");
	visible.animate(caisseClaireAnim, caisseClaireOptions);
}
