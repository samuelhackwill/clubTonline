import "./staticBubble.html";
import { Mailing } from "../../API/mailing/mailing.js";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.staticBubble.onCreated(function () {});

Template.staticBubble.events({
  "submit .subscribe"(event) {
    // Prevent default browser form submit
    event.preventDefault();

    input = event.currentTarget[0];

    Meteor.call("insertMail", input.value);

    // Clear form
    document.getElementById("inline-mail").value = "";
    document.getElementById("subscriptionButton").innerHTML = "Inscription OK!";
    document
      .getElementById("subscriptionButton")
      .classList.add("bg-green-500", "hover:bg-green-400");
    document
      .getElementById("subscriptionButton")
      .classList.remove("bg-purple-500", "hover:bg-purple-400");
  },

  "click .newGame"() {
    FlowRouter.go("/");
  },
});

Template.staticBubble.helpers({
  isSubscribe() {
    if (this.name != undefined && this.name == "mailForm") {
      return true;
    }
  },
  isLink() {
    if (this.name != undefined && this.name == "link") {
      return true;
    }
  },
  isSticker() {
    if (this.name != undefined && this.name == "sticker") {
      return true;
    }
  },
  isTextOnly() {
    if (this.name == undefined && this.text != undefined) {
      return true;
    }
  },
  isNewGame() {
    if (this.name != undefined && this.name.startsWith("newGame")) {
      return true;
    }
  },
});
