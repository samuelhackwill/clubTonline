import "./blockingBubble.html";

import { state } from "../layouts/feed.js";

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
  isForm(){
    if (this.name != undefined && this.name.startsWith("form")) {
      return true;
    }
  }
});

Template.blockingBubble.events({
  "click .play"(event) {
    preventSafariScroll()
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
    preventSafariScroll()
    event.target.parentElement.classList.add("rotate-x-180");
    event.target.classList.add("opacity-0");
    addForm(event.target.id)
  },
});

isSafari = function () {
  return /safari/gim.test(navigator.userAgent);
};