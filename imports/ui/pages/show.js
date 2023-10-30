import "./show.html";
import "../layouts/feed.js";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.show.onCreated(function () {
  intro = [
    { type: "SB", text: "Bonjour, bienvenue sur le guichet du club travail." },
    {
      type: "SB",
      text: "le club travail vous propose une expérience interactive où vous allez pouvoir vous exprimer sur votre rapport au travail.",
    },
    { type: "SB", text: "Qui que vous soyez, vous êtes la bonne personne." },
    {
      type: "SB",
      text: "Et nous aussi, derrière votre écran, nous sommes la bonne personne.",
    },
    {
      type: "SB",
      text: "Nous allons passer un petit temps ensemble, une quinzaine de minutes, à nous écrire.",
    },
    {
      type: "SB",
      text: "Mettez vous à l'aise, et si possible ouvrez cette page sur un ordinateur.",
    },

    // ᕕ( ᐛ )ᕗ
    // CAUTION : DO NOT change this bubble without also changing the dataBubble
    // onCreated function. (the data bubble needs to check what was answered to this
    // qcm to decide which collection to subscribe to).
    {
      type: "---BB---",
      name: "qcm.humeur",
      label: "Alors, dites-nous, de quelle humeur êtes-vous aujourd'hui?",
      qcmOptions: [
        "d’humeur à mordre mon ordinateur",
        "plutôt d’humeur à faire une sieste en forêt",
        "d’humeur à écrire une lettre au ministre de l’emploi",
      ],
      save: true,
    },

    // ᕕ( ᐛ )ᕗ
    // CAUTION : DO NOT change also this bubble without also changing the dataBubble
    // onCreated function. (the data bubble needs to check what was answered to this
    // qcm to decide which collection to subscribe to).

    {
      type: "---BB---",
      name: "qcm.tutoie",
      label:
        "en fait, est-ce que ça va qu’on vous tutoie ou tu préfères qu’on vous vouvoie ?",
      qcmOptions: ["le vouvoiement c'est bien", "je préfère tu"],
      save: true,
    },
    {
      type: "---BB---",
      name: "getScenario",
      label: "chargement...",
    },
  ];
});

Template.show.helpers({
  showData() {
    //console.log("FEED showData", intro);
    return intro;
  },
});

Template.show.onRendered(function () {
  // Call the function to replace Y scrolling with X scrolling
  replaceYScrollWithXScroll();
  document.body.classList.add("bg-yellow-clubT");
  document.body.classList.remove("bg-indigo-200");
});

// scroll events :
// some peeps will be on their laptop, with a trackpad
// some peeps will be on their computer, with a keyboard and mouse
// some peeps will be on their phone / tablet, with touch events
// some peeps will be disabled and won't be able to use this website.
replaceYScrollWithXScroll = function () {
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
};

goToSongs = function () {
  FlowRouter.go("/bibliotheque");
};

goToShow = function () {
  FlowRouter.go("/");
};

reload = function () {
  FlowRouter.reload();
};
