import "./blockingBubble.html";

import { feedIndex, state } from "../layouts/feed.js";

Template.blockingBubble.helpers({
  isPlay() {
    if (this.name != undefined && this.name.startsWith("play")) {
      return true;
    }
  },
  isCard() {
    // card names can be something like that : "card.something" or "qcm.tutoiement". But also, some feed elements have a name like "qcmForm.tutoiement", so we need to tell the helper not to select these form elements.
    if (
      this.name != undefined &&
      (this.name.startsWith("card") ||
        (this.name.startsWith("qcm") && !this.name.startsWith("qcmForm")))
    ) {
      return true;
    }
  },
  isCardAnswered(){
    if(this.name != undefined && this.name.startsWith("qcm") && this.answered != undefined){
      console.log(true)
    }else{
      console.log(false)
    }
    return;
  },
  isForm() {
    if (this.name != undefined && this.name.startsWith("form")) {
      return true;
    }
  },
  isQcmForm() {
    if (this.name != undefined && this.name.startsWith("qcmForm")) {
      return true;
    }
  },
  getQcmOptions() {
    if (this.qcmOptions == undefined) {
      return;
    }

    _qcmOptions = this.qcmOptions;
    rawHTML = {};

    for (let index = 0; index < _qcmOptions.length; index++) {
      attribute = "data-qcm-" + index;
      rawHTML[attribute] = _qcmOptions[index];
    }

    return rawHTML;
  },
  getFormSize(isItRowAttr) {
    if (isItRowAttr) {
      if (this.size == "s") {
        return { rows: "2" };
      }
      if (this.size == "m") {
        return { rows: "5" };
      }
      if (this.size == "l") {
        return { rows: "12" };
      }
    } else {
      if (this.size == "s") {
        return "100";
      }
      if (this.size == "m") {
        return "170";
      }
      if (this.size == "l") {
        return "340";
      }
    }
  }
});

Template.blockingBubble.events({
  "click .play"(event) {
    if (event.target.dataset.clicked) {
      return;
    } else {
      state.set("gettingMoreElements");
      addNextItem();
      event.target.dataset.clicked = "true";
      event.target.classList.add("bg-gray-200", "pointer-events-none");
      event.target.classList.remove("bg-purple-500");
    }
    return;
  },

  "click .qcmOption"(event) {
    allButtons = event.target.parentElement.children;
    for (let index = 0; index < allButtons.length; index++) {
      allButtons[index].classList.remove("bg-purple-500");
      allButtons[index].classList.add("bg-gray-200", "pointer-events-none");
    }
    event.target.classList.add("bg-purple-200", "text-black");
    event.target.classList.remove("text-white");

    state.set("gettingMoreElements");
    addNextItem();
    fadeQuestion(event);
  },

  "click .cardButton"(event) {
    event.target.parentElement.classList.add(
      "rotate-x-180",
      "pointer-events-none"
    );
    event.target.classList.add("opacity-0");

    if (event.target.id.startsWith("qcm")) {
      addQcm(event.target.id, event.target.dataset);
    } else {
      addForm(event.target.id, event.target.dataset);
    }
  },

  "submit .form"(event) {
    event.preventDefault();
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
    event.target.parentElement.parentElement.dataset.answered = true

    // show the card's back (with the answer)
    event.target.parentElement.parentElement.firstElementChild.classList.add(
      "pointer-events-none"
    );
    event.target.parentElement.parentElement.firstElementChild.classList.remove(
      "opacity-0"
    );

    state.set("gettingMoreElements");
    addNextItem();
    fadeQuestion(event);
    getRandomQuestion(event.target.id)
  },


  "click .formCard"(event){
    
    console.log("clickckckc")
    if(!document.getElementById("answersHolder").dataset.answered){return}

    // bool = event.target.dataset.clicked
    // bool = ! bool

    // console.log(bool)
    
    if (bool) {
      event.target.parentElement.classList.add(
        "rotate-x-180"
      );
      playerAnswer = "firstElementChild"
      archiveAnswer = "lastElementChild"
      event.target.parentElement.classList.remove("bg-purple-200")
      event.target.parentElement.classList.add(
        "bg-indigo-200"
      );  
    }else{
      event.target.parentElement.classList.remove(
        "rotate-x-180"
      );
      playerAnswer = "lastElementChild"
      archiveAnswer = "firstElementChild"
      event.target.parentElement.classList.add("bg-purple-200")
      event.target.parentElement.classList.remove(
        "bg-indigo-200"
        );  
      }
      
      // rotate the bubble container
      
      
      // // hide the player's answer
      event.target.parentElement[playerAnswer].classList.add("opacity-0");
      event.target.parentElement[playerAnswer].classList.remove("opacity-1");

    // show the other person's answer
    event.target.parentElement[archiveAnswer].classList.add(
      "opacity-1"
    );
    event.target.parentElement[archiveAnswer].classList.remove("opacity-0");    
  } 

});

fadeQuestion = function (event) {
  //  previousDiv = event.target.parentElement.previousElementSibling
  allCards = document.getElementsByClassName("card");
  previousCard = allCards[allCards.length - 1];
  if (previousCard) {
    previousCard.classList.remove("bg-purple-200");
    previousCard.classList.add("bg-white");
  }
};
