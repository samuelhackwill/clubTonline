import "./lettre.html"

// METEOR ------------------------------------------------------------
Template.lettre.onCreated(function(){
    // we need to add the css file dynamicaly cause we don't want to mess up
    // our namespace ou quoi.
    var fileref = document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", "lettre.css")
    document.getElementsByTagName("head")[0].appendChild(fileref)
})

Template.lettre.onRendered(function(){

    // DECLARATIONS ------------------------------------------------------------
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    today = `${dd}/${mm}/${yyyy}`;

    const ville = document.getElementById("lieu");
    ville.innerHTML = `${ville.innerHTML}, le ${today}`;

    const textes = document.getElementsByClassName("type");

    // Forcer la largeur des éléments alignés à droite pour avoir l'air écrit plus naturellement
    const right = document.getElementsByClassName("droite");
    for (let el of right) {
        el.style.width = `${el.getBoundingClientRect().width}px`;
    }

    // Recalculer la taille des parties en px pour l'utiliser dans les calculs de translate3d()
    const rayon = document.getElementById("page").getBoundingClientRect().height / 6;
    document.getElementById('page').style.setProperty('--radius', `${rayon}px`);

})


// FUNCTIONS ------------------------------------------------------------
function overflow(element) {
    if (element.scrollHeight > element.clientHeight) {
        return element.scrollHeight - element.clientHeight
    } else {
        return false
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function imprimer() {
    console.log("Ça part à l'impression");
    window.print();
}

function startAnimation() {
    document.getElementById("page").style.color = "black";

    const lol = document.getElementById("ceparti");
    lol.style.opacity = "0";
    setTimeout(() => { lol.style.display = "none" }, 50);

    let j = 1;
    for (let el of textes) {
        let contenu = el.innerText;
        el.innerHTML = " ";
        for (let i = 0; i < contenu.length; i++) {
            // const delay = randomNumber(-10, 20);
            const delay = 0;
            setTimeout(() => { el.innerHTML += contenu.charAt(i) }, (50 * j) + delay);
            j++;
        }
    }

    const imprimer = document.getElementById("imprimer");
    const signature = document.getElementById("signature");
    setTimeout(function() {

        // signature.style.transform = "scaleX(1)";
        signature.style.opacity = "1";

        imprimer.style.display = "block";
        setTimeout(() => imprimer.style.opacity = "1", 50);
    }, 51 * j);
}