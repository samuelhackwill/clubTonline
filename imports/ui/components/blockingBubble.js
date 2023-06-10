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

    // Meteor.call("insertMail", input.value);

    event.target.parentElement.parentElement.firstElementChild.innerHTML =
      input.value;

    console.log("rotate this guy ", event.target.parentElement.parentElement);
    console.log(
      "show this guy ",
      event.target.parentElement.parentElement.firstElementChild
    );

    event.target.parentElement.parentElement.classList.add(
      "rotate-x-0",
      "bg-purple-200"
    );
    event.target.parentElement.classList.add("opacity-0");
    event.target.parentElement.parentElement.firstElementChild.classList.add(
      "pointer-events-none"
    );
    event.target.parentElement.parentElement.firstElementChild.classList.remove(
      "opacity-0"
    );

    // Clear form
    // document.getElementById("inline-mail").value = "";
    // document.getElementById("subscriptionButton").innerHTML = "Inscription OK!";
    // document
    //   .getElementById("subscriptionButton")
    //   .classList.add("bg-green-500", "hover:bg-green-400");
    // document
    //   .getElementById("subscriptionButton")
    //   .classList.remove("bg-purple-500", "hover:bg-purple-400");
  },
});

isSafari = function () {
  return /safari/gim.test(navigator.userAgent);
};
