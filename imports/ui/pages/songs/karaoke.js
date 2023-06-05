import "./karaoke.html"

// METEOR ------------------------------------------------
Template.karaoke.onCreated(function() {
	// we need to add the css file dynamicaly cause we don't want to mess up
	// our namespace ou quoi.
	var fileref = document.createElement("link")
	fileref.setAttribute("rel", "stylesheet")
	fileref.setAttribute("type", "text/css")
	fileref.setAttribute("href", "karaoke.css")
	document.getElementsByTagName("head")[0].appendChild(fileref)
})

Template.karaoke.onRendered(function() {
	// ------------ PRÉPARATION / VALIDATION

	const couplet1 = document.getElementById("couplet1");
	const couplet2 = document.getElementById("couplet2");
	const content = couplet1.children[0].innerHTML.split(" ");

	// Reset element couplet
	couplet1.innerHTML = "";

	const nombreMots = 10;
	const divider = content.length / nombreMots;

	for (let i = 0; i <= Math.trunc(divider); i++) {
		let el = document.createElement("p");
		el.innerHTML = content.splice(0, nombreMots).join(" ");
		if (i < Math.ceil(divider) / 2) {
			couplet1.appendChild(el);
		} else {
			couplet2.appendChild(el);
		}
	}

	// ------------ APRÈS LA PRÉPARATION POUR QUE LES ÉlÉMENTS HTML SOIENT BIEN PRÉSENTS
	const INSTRU = document.getElementById("instru");
	const SLIDES = document.querySelectorAll(".sing");
	const frameRate = 10; // 10 millisecondes entre chaque check de frame

	// ------------------------ ANIMATIONS ------------------------ //
	// ------------ CLIGNOTE
	const clignoteOptions = {
		iteration: 1,
		fill: "both",
		duration: 40, // en millisecondes
		easing: "linear",
	};

	// ------------ BEAT
	const tailleAnim = [
		{ transform: "scale(1)" },
		{ transform: "scale(1.1)", offset: 0.05 },
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

	// ------------ enchaine
	const enchaineAnim = [
		{ opacity: 0 },
		{ opacity: 1, offset: 0.01 },
		{ opacity: 1, offset: 0.6 },
		{ opacity: 0 },
	];

	const enchaineOptions = {
		iteration: 1,
		fill: "both",
		duration: 800, // en millisecondes
		easing: "linear",
	};

	// ------------ moto
	const motoAnim = [
		{ transform: "translateX(0) rotate(-15deg)" },
		{ transform: "translateX(26) rotate(-40deg)", offset: 0.16 },
		{ transform: "translateX(33vw) rotate(-35deg)", offset: 0.23 },
		{ transform: "translateX(35vw) rotate(-60deg)", offset: 0.25 },
		{ transform: "translateX(40vw) rotate(-45deg)", offset: 0.30 },
		{ transform: "translateX(50vw) rotate(-70deg)", offset: 0.40 },
		{ transform: "translateX(55vw) rotate(-50deg)", offset: 0.45 },
		{ transform: "translateX(60vw) rotate(-60deg)", offset: 0.50 },
		{ transform: "translateX(65vw) rotate(-55deg)", offset: 0.55 },
		{ transform: "translateX(80vw) rotate(-70deg)", offset: 0.70 },
		{ transform: "translateX(85vw) rotate(-55)", offset: 0.75 },
		{ transform: "translateX(130vw) rotate(-25deg)" }
	];

	const motoOptions = {
		iteration: 1,
		fill: "both",
		duration: 1000 * 3.781, // en millisecondes
		easing: "ease-out",
	};

})


// FUNCTIONS ------------------------------------------------
karaoke_startAnimation = function() {
	INSTRU.play();

	document.querySelector("main").style.transform = "scale(1)";
	document.querySelector("main").style.opacity = "1";

	// CAISSECLAIRE
	setTimeout(() => {
		// repeat toutes les 2 secondes 16 fois
		let counter = 0;
		const caisseClaireGo = setInterval(() => {
			if (counter >= 15) {
				clearInterval(caisseClaireGo);
			}
			caisseClaire();
			counter++;
		}, 2000);
	}, 1000 * 14.907);

	// CLIGNOTE
	const timestampsClignote = [15.4, 23.329, 31.26, 47.15];

	for (const stamp of timestampsClignote) {
		setTimeout(clignote, 1000 * stamp);
	}

	// SIMPLEBASS
	const timestampsBass = [
		15.891, 17.612, 21.577, 23.852, 25.573, 27.817, 31.782, 33.503, 37.468,
		39.681, 41.433, 43.617
	];

	for (const stamp of timestampsBass) {
		setTimeout(simpleBass, 1000 * stamp);
	}

	// TRIPLEBASS
	setTimeout(tripleBass, 1000 * 19.364); // invisible pour l'instant
	setTimeout(tripleBass, 1000 * 35.255);

	// MOTO
	setTimeout(() => {
		document.getElementById("moto").style.opacity = "1";
		moto();
	}, 1000 * 11.004); // invisible pour l'instant

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
		case "titre":
			console.log("titre");

			for (let i = 1; i <= slide.children.length - 1; i++) {
				const el = slide.children[i];
				displayAfter(el, 1000 * 2 * i);
			}


			break;

		case "intro":
			console.log("intro");
			displayAfter(slide.children[0], 1000 * 1);
			displayAfter(slide.children[1], 1000 * 2);
			emptySlide(slide, 3000);

			break;

		case "couplet1":
			console.log("couplet1");
			for (let i = 0; i <= slide.children.length - 1; i++) {
				const el = slide.children[i];
				displayAfter(el, 1000 * 2 * i);
			}

			break;

		case "couplet2":
			console.log("couplet2");
			for (let i = 0; i <= slide.children.length - 1; i++) {
				const el = slide.children[i];
				displayAfter(el, 1000 * 2 * i);
			}

			emptySlide(slide, 3849);

			break;

		case "refrain":
			console.log("refrain");
			displayAfter(slide.querySelector(".enchaine"), 1300 * 1);
			displayAfter(document.getElementById("x2"), 1000 * 2.5);
			emptySlide(slide, 6000);

			break;

		case "bruitTravail":
			console.log("bruitTravail");
			for (let i = 0; i <= slide.children.length - 1; i++) {
				const el = slide.children[i];
				displayAfter(el, 1000 * 2 * i);
			}

			break;

		case "refrain2":
			console.log("refrain2");
			displayAfter(slide.querySelector(".enchaine"), 1000 * 1);

			break;

		case "conclusion":
			console.log("conclusion");
			emptySlide(slide, 3000);
			displayAfter(slide.querySelector(".enchaine"), 2000);

			break;

		case "outro1":
			console.log("outro1");
			for (let i = 0; i <= slide.children.length - 1; i++) {
				const el = slide.children[i];
				displayAfter(el, 1000 * 1 * i);
			}

			emptySlide(slide, 1000 * 3);

			break;

		case "outro2":
			console.log("outro2");
			for (let i = 0; i <= slide.children.length - 1; i++) {
				const el = slide.children[i];
				displayAfter(el, 1000 * 2 * i);
			}

			emptySlide(slide, 1000 * 3.5);

			break;

		default:
			console.log("default");

			break;
	}
}

displayAfter = function(elem, milliseconds) {
	setTimeout(() => {
		if (elem.classList.contains("enchaine")) {
			// rajouter un super effet position aléatoire
			elem.style.opacity = "1";
			for (let i = 0; i < elem.children.length; i++) {
				setTimeout(() => {
					enchaine(elem.children[i]);
				}, 160 * i);
			}
		} else {
			elem.style.opacity = "1";
		}
	}, milliseconds);
}

emptySlide = function(slide, milliseconds) {
	setTimeout(() => {
		for (let el of slide.querySelectorAll("p:not(.enchaine)")) {
			el.style.display = "none";
		}
	}, milliseconds);
}

enchaine = function(el) {
	el.animate(enchaineAnim, enchaineOptions);
}

clignote = function() {
	// console.log("---------> CLIGNOTE");

	const visible = document.querySelector(".sing");

	const delays = [20, 160, 320, 480];
	let currentScale = 1;
	for (const [i, delay] of delays.entries()) {
		const downScale = 0.95;
		const clignoteAnim = [
			{ opacity: 1, transform: `scale(currentScale)` },
			{
				opacity: 0,
				transform: `scale(${1 * downScale ** (i + 1)})`,
				offset: 0.01,
			},
			{ opacity: 1, transform: `scale(${1 * downScale ** (i + 1)})` },
		];

		currentScale;

		setTimeout(() => {
			visible.animate(clignoteAnim, clignoteOptions);
		}, delay);
	}
}

simpleBass = function() {
	const visible = document.querySelector(".sing");
	visible.animate(tailleAnim, tailleOptions);
}

tripleBass = function() {
	const visible = document.querySelector(".sing");
	visible.animate(tripleBassAnim, tripleBassOptions);
}

caisseClaire = function() {
	const visible = document.querySelector(".sing");
	visible.animate(caisseClaireAnim, caisseClaireOptions);
}

moto = function() {
	const motoEl = document.getElementById("moto");
	motoEl.animate(motoAnim, motoOptions);
}
