import "./lettre.html"

// METEOR ------------------------------------------------------------
Template.lettre.onCreated(function() {
    // we need to add the css file dynamicaly cause we don't want to mess up
    // our namespace ou quoi.
    var fileref = document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", "/lettre.css")
    document.getElementsByTagName("head")[0].appendChild(fileref)

    this.autorun(() => {
        console.log(this)
    });
})

Template.lettre.helpers({
    getString(option) {
        return this.data.answers[option.hash.name]
    }
})

Template.lettre.onRendered(function() {
    // DECLARATIONS ------------------------------------------------------------
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    today = `${dd}/${mm}/${yyyy}`;

    const ville = document.getElementById("lieu");
    ville.innerHTML = `${ville.innerHTML}, le ${today}`;


    // Recalculer la taille des parties en px pour l'utiliser dans les calculs de translate3d()
    const rayon = document.getElementById("page").getBoundingClientRect().height / 6;
    console.log(rayon);
    document.getElementById('page').style.setProperty('--radius', `${rayon}px`);

})

// FUNCTIONS ------------------------------------------------
overflow = function(element) {
    if (element.scrollHeight > element.clientHeight) {
        return element.scrollHeight - element.clientHeight
    } else {
        return false
    }
}

randomNumber = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

imprimer = function() {
    console.log("Ça part à l'impression");
    document.getElementById("imprimer").style.opacity = "0";
    window.print();
}

lettre_startAnimation = function() {
    document.getElementById("page").style.color = "black";

    // Forcer la largeur des éléments alignés à droite pour avoir l'air écrit plus naturellement
    const right = document.getElementsByClassName("droite");

    for (let el of right) {
        el.style.width = `${el.getBoundingClientRect().width}px`;
    }

    const INSTRU = document.getElementById("typing-sound");
    INSTRU.play();

    const lol = document.getElementById("ceparti");
    lol.style.opacity = "0";

    const delay = 30;
    setTimeout(() => { lol.style.display = "none" }, delay);


    const textes = document.getElementsByClassName("type");
    let j = 1;
    for (let el of textes) {
        let contenu = el.innerText;
        el.innerHTML = " ";
        for (let i = 0; i < contenu.length; i++) {
            const offset = randomNumber(-10, 20);
            setTimeout(() => { el.innerHTML += contenu.charAt(i) }, (delay * j) + offset);

            j++;
        }
    }

    const imprimer = document.getElementById("imprimer");
    const signature = document.getElementById("signature");

    // Pause de l'INSTRU
    setTimeout(() => { INSTRU.pause() }, delay * j);

    setTimeout(function() {
        // signature.style.transform = "scaleX(1)";
        signature.style.opacity = "1";

        imprimer.style.display = "block";
        setTimeout(() => {
            imprimer.style.opacity = "1"
        }, delay);

        setTimeout(() => {
            document.querySelector(".retour-maison").style.opacity = "1";
        }, delay + 1000);

    }, (delay + 1) * j);

}
