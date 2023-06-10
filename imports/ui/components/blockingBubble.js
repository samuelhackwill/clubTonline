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
});

Template.blockingBubble.events({
  "click .play"(event) {
    // this is a hack to prevent safari from auto-scrolling to the center of the page for no reason when
    // we click on play.
    if (isSafari()) {
      positionBeforeClick = window.scrollX
      window.addEventListener("scroll", function safariScroll(e){
        e.preventDefault();
        window.scrollTo(positionBeforeClick, 0);
        window.removeEventListener("scroll", safariScroll, true);
      }, true);
    }

    if (event.target.dataset.clicked) {
      return;
    }else{
      state.set("gettingMoreElements");
      addNextItem();
      event.target.dataset.clicked = "true";
      event.target.classList.add("bg-gray-400", "pointer-events-none");
      event.target.classList.remove("bg-purple-500");
    }
  },

  "click .card"(event) {
    event.target.parentElement.classList.add("rotate-x-180");
    event.target.classList.add("opacity-0");
  },
});

isSafari = function(){
  return /safari/gmi.test(navigator.userAgent)
}