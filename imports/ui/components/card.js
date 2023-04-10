import "./card.html";

import { state } from "../layouts/feed.js";

// this is to add immediate reaction to touch events, because only using blaze event listeners OR css didn't seem to work and felt slow and unresponsive.

Template.card.onRendered(function () {
  console.log("card rendered");
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
  zob() {
    return this;
  },
});

cardTouched = function (t) {
  t.target.style.backgroundColor = "#F8B4B4";
};

cardUntouched = function (t) {
  // this should do different things en fonction du status
  t.target.style.backgroundColor = "#FDF2F2";

  if (state.get() == "card is fullscreen") {
    state.set("CARD CLICKED");
  }
};
