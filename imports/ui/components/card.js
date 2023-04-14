import "./card.html";

import { state } from "../layouts/feed.js";

// this is to add immediate reaction to touch events, because only using blaze event listeners OR css didn't seem to work and felt slow and unresponsive.

Template.card.onRendered(function () {
  console.log(
    "card rendered, adding event listener to ",
    this.firstNode.parentElement.lastElementChild
  );
  this.firstNode.parentElement.lastElementChild.addEventListener(
    "touchstart",
    cardTouched
  );
  this.firstNode.parentElement.lastElementChild.addEventListener(
    "touchend",
    cardUntouched
  );
});

Template.card.helpers({
  cardData() {
    return this;
  }
});

cardTouched = function (t) {
  t.target.style.backgroundColor = "#F8B4B4";
};

cardUntouched = function (t) {
  // this should do different things en fonction du status
  t.target.style.backgroundColor = "#FDF2F2";

  console.log("is state reading ? ", state.get(), state.get() == "reading");

  if (state.get() == "reading") {
    pickCard(t);
  }

  if (state.get() == "card is fullscreen") {
    confirmCard(t);
  }
};

pickCard = function (t) {
  state.set("card moving offscreen");

  elem = document.getElementById("deck").lastElementChild;
  elem.style.transform = "rotate(6deg) rotateY(180deg) translateY(100vh)";

  elem.addEventListener("transitionend", () => {
    state.set("card is offscreen");
    cardFullScreener();
  },{ once: true });
};

confirmCard = function (t) {
  state.set("CARD CLICKED, returning to feed...");
  theCard = t.target.parentElement
  theCard.removeEventListener("touchend", cardUntouched);
  theCard.removeEventListener("touchstart", cardTouched);

  theCard.addEventListener("transitionend", function(){
    console.log(this.style.display = "none")
    state.set("reading...")
  });

  theCard.style.opacity = "0"

  
  document.getElementById("feed").style.opacity="1"

  t.target.style.backgroundColor = "#FDF2F2";
};
