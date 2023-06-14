import "./show.html";
import "../layouts/feed.js";

// "SB" : static bubble. required attr : "text"
// "---BB---" : blocking bubble. optionnal attrs : "name"(qcm.<name>/card.<name>), "label", "qcmOptions"

const whateverData = [
  { type: "SB", text: "Bonjour, bienvenue sur le guichet du club travail." },
  { type: "SB", text: "Qui que vous soyez, vous êtes la bonne personne." },
  {
    type: "SB",
    text: "Et nous aussi, derrière votre écran, nous sommes la bonne personne.",
  },
  {
    type: "SB",
    text: "Nous allons passer un petit temps ensemble, une quinzaine de minutes.",
  },  
  {
    type: "---BB---",
    name: "end",
    label: "conclure"
  },
  {
    type: "SB",
    text: "Nous n’allons pas nous voir, ni nous entendre, simplement nous parler. Installez-vous confortablement et si possible ouvrez cette page sur un ordinateur",
  },
  {
    type: "SB",
    text: "car les gsm c’est l’enfer sur terre.",
  },
  {
    type: "---BB---",
    name: "qcm.tutoie",
    label:
      "en fait, est-ce que ça va qu’on vous tutoie ou tu préfères qu’on vous vouvoie ?",
    qcmOptions: [
      "le vouvoiement c'est bien",
      "call me tu",
      "tiens et pourquoi pas les deux?",
    ],
  },
  { type: "SB", text: "Ok c'est bien noté." },
  {
    type: "---BB---",
    name: "qcm.humeur",
    label: "Alors, dites-nous, de quelle humeur êtes-vous aujourd'hui?",
    qcmOptions: [
      "d’humeur à vraiment crier sur les toits avec un mégaphone",
      "plutôt d’humeur à la douceur et à aller me promener en forêt sans prévoir d’heure de retour ?",
      "d’humeur à écrire une lettre avec toutes mes idées géniales au ministre de l’emploi",
    ],
  },
  {
    type: "---BB---",
    name: "card.test1",
    size: "s",
    label:
      "Tiens et regardez voir ça c'est une question petite pour voir à quoi ça ressemble.",
  },
  {
    type: "---BB---",
    name: "card.test2",
    size: "m",
    label:
      "Tiens et regardez voir ça c'est une question moyenne pour voir à quoi ça ressemble.",
  },
  {
    type: "---BB---",
    name: "card.test3",
    size: "l",
    label:
      "Tiens et regardez voir ça c'est une question grande pour voir à quoi ça ressemble.",
  },
  { type: "SB", text: "ok super c'est fini!" },
  { type: "---BB---", name: "play", label: "ah bon?" },
  { type: "SB", text: "oui." },
  { type: "SB", name: "sticker" },
  { type: "SB", text: "Bonjour, bienvenue sur le guichet du club travail." },
  { type: "SB", text: "Qui que vous soyez, vous êtes la bonne personne." },
  {
    type: "SB",
    text: "Et nous aussi, derrière votre écran, nous sommes la bonne personne.",
  },
  {
    type: "SB",
    text: "Nous allons passer un petit temps ensemble, une quinzaine de minutes.",
  },

];

Template.show.helpers({
  showData() {
    return whateverData;
  },
});

Template.show.onRendered(function(){
// Call the function to replace Y scrolling with X scrolling
replaceYScrollWithXScroll();
})

// scroll events :
// some peeps will be on their laptop, with a trackpad
// some peeps will be on their computer, with a keyboard and mouse
// some peeps will be on their phone / tablet, with touch events
// some peeps will be disabled and won't be able to use this website.
function replaceYScrollWithXScroll() {
  let accumulatedDeltaY = 0;
  let lastTimestamp = 0;

  function wheel(event) {
    // we want to return straight away if we detect a touch pad to keep the native
    // directionnal scroll which is much better than our hacky side scroll.
    isTouchPad = event.wheelDeltaY
      ? event.wheelDeltaY === -3 * event.deltaY
      : event.deltaMode === 0;
    if (isTouchPad) {
      // apparently this is also triggered by maj+scroll.
      console.log(
        "isTouchPad ",
        isTouchPad,
        " removing event listener to keep the nice native scroll."
      );
      document.removeEventListener("wheel", wheel, { passive: false });
      return;
    }

    const timestamp = performance.now();
    const delta = Math.sign(event.deltaY);

    if (delta !== 0) {
      event.preventDefault();

      if (timestamp - lastTimestamp > 100) {
        accumulatedDeltaY = 0;
      }

      accumulatedDeltaY += Math.abs(event.deltaY);
      lastTimestamp = timestamp;

      const slowScrollThreshold = 100; // Adjust this value to control the threshold for slow scrolling
      const mediumScrollThreshold = 300; // Adjust this value to control the threshold for medium scrolling
      const fastScrollThreshold = 500; // Adjust this value to control the threshold for fast scrolling
      const slowScrollAmount = 50; // Adjust this value to control the scroll amount for slow scrolling
      const mediumScrollAmount = 500; // Adjust this value to control the scroll amount for medium scrolling
      const fastScrollAmount = 1200; // Adjust this value to control the scroll amount for fast scrolling

      let scrollAmount = slowScrollAmount;

      if (accumulatedDeltaY < slowScrollThreshold) {
        scrollAmount = slowScrollAmount;
      }
      if (accumulatedDeltaY >= fastScrollThreshold) {
        scrollAmount = fastScrollAmount;
      } else if (accumulatedDeltaY >= mediumScrollThreshold) {
        scrollAmount = mediumScrollAmount;
      }

      window.scrollBy({
        left: delta * scrollAmount,
        behavior: "smooth",
      });
    }
  }

  document.addEventListener("wheel", wheel, { passive: false });
}