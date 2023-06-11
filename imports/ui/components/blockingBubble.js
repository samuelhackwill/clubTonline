import "./blockingBubble.html";

import { state } from "../layouts/feed.js";

_event = "";

Template.blockingBubble.helpers({
  isPlay() {
    if (this.name != undefined && this.name.startsWith("play")) {
      return true;
    }
  },
  isCard() {
    if (this.name != undefined && this.name.startsWith("card")) {
      return true;
    }
  },
  isForm() {
    if (this.name != undefined && this.name.startsWith("form")) {
      return true;
    }
  },
  getAnswer(t) {
    // console.log(t)
  },
});

Template.blockingBubble.events({
  "click .play"(event) {
    preventSafariScroll();
    if (event.target.dataset.clicked) {
      return;
    } else {
      state.set("gettingMoreElements");
      addNextItem();
      event.target.dataset.clicked = "true";
      event.target.classList.add("bg-gray-400", "pointer-events-none");
      event.target.classList.remove("bg-purple-500");
    }
  },

  "click .card"(event) {
    preventSafariScroll();
    event.target.parentElement.classList.add(
      "rotate-x-180",
      "pointer-events-none"
    );
    event.target.classList.add("opacity-0");
    addForm(event.target.id);
  },

  "submit .answer"(event) {
    event.preventDefault();

    _event = event;

    input = event.currentTarget[0];

    event.target.parentElement.parentElement.firstElementChild.innerHTML =
      input.value;

    event.target.classList.add("pointer-events-none");

    // rotate the bubble container and change bg
    event.target.parentElement.parentElement.classList.add("bg-purple-200");
    event.target.parentElement.parentElement.classList.remove(
      "rotate-x-180",
      "bg-white"
    );

    // hide the form container
    event.target.parentElement.classList.add("opacity-0");

    // show the card's back (with the answer)
    event.target.parentElement.parentElement.firstElementChild.classList.add(
      "pointer-events-none"
    );
    event.target.parentElement.parentElement.firstElementChild.classList.remove(
      "opacity-0"
    );
  },
});

isSafari = function () {
  return /safari/gim.test(navigator.userAgent);
};
