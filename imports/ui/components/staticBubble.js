import "./staticBubble.html";
import { Mailing } from "../../API/mailing/mailing.js";

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
});

Template.staticBubble.helpers({
  isSubscribe() {
    if (this.name != undefined && this.name == "mailForm") {
      return true;
    }
  },
  isLink() {
    if (this.name != undefined && this.name == "linkNoFuturs") {
      return true;
    }
  },
  isTextOnly() {
    if (this.name == undefined && this.text != undefined) {
      return true;
    }
  },
  isBumper() {
    if (this.name === "bumper") {
      return true;
    }
  },
});
