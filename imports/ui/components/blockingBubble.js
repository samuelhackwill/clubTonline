import "./blockingBubble.html";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

import {
  otherAnswers,
  allAnswers,
  savedAnswers,
  state,
} from "../layouts/feed.js";

Template.blockingBubble.helpers({
  // isGold(){
  //   if(this.save == true && !this.name.startsWith("qcm")){
  //     return "border-solid border-4 border-white outline-offset-[-5px]"
  //   }else{
  //     return
  //   }
  // },

  isPlay() {
    if (this.name != undefined && this.name.startsWith("play")) {
      return true;
    }
  },
  isEnd() {
    if (this.name != undefined && this.name.startsWith("end")) {
      return true;
    }
  },
  isDataBubble() {
    if (
      this.name == "getScenario" ||
      this.name == "getTarot" ||
      this.name == "getAllSongs"
    ) {
      return true;
    } else {
      return false;
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
  },
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
  "click .end"(event) {
    this._songUUID = uuidv4();
    data = {};
    data.answers = savedAnswers.all();
    data.scenario = savedAnswers.get("qcmForm.humeur");

    _scenario = _targetScenario.replace(/\_.+/i, "");

    Meteor.call(
      "makeSong",
      this._songUUID,
      data,
      _scenario,
      (error, result) => {
        console.log(error, result);
      }
    );
    Meteor.call(
      "insertAnswers",
      allAnswers.get(),
      _scenario,
      (error, result) => {
        console.log(error, result);
      }
    );

    event.target.classList.remove(
      "bg-purple-500",
      "text-white",
      "hover:bg-purple-400"
    );
    event.target.classList.add(
      "bg-green-500",
      "text-black",
      "pointer-events-none"
    );
    event.target.innerHTML = "chargement ...";

    setTimeout(() => {
      document.getElementById("feed").classList.add("opacity-0");
    }, 500);

    setTimeout(() => {
      FlowRouter.go("song", { _uuid: this._songUUID }, { scenario: _scenario });
    }, 1000);
  },

  "click .qcmOption"(event) {
    allButtons = event.target.parentElement.children;
    for (let index = 0; index < allButtons.length; index++) {
      allButtons[index].classList.remove("bg-purple-500");
      allButtons[index].classList.add("bg-gray-200", "pointer-events-none");
    }
    event.target.classList.add("bg-purple-200", "text-black");
    event.target.classList.remove("text-white");

    // we need to put some answers on the side for consumption by the songs template.
    // we could have made a db query also but storing the data locally is faster.
    if (event.target.parentElement.dataset.save) {
      _key = event.target.parentElement.dataset.name.replace(/.+\./i, "");
      savedAnswers.set(_key, event.target.innerHTML.trim());
    }

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

    save = event.target.dataset.save;

    if (event.target.dataset.name.startsWith("qcm")) {
      addQcm(event.target.dataset, save);
    } else {
      addForm(event.target.dataset, save);
    }
  },

  "submit .form"(event) {
    event.preventDefault();
    input = event.currentTarget[0].value.trim();

    event.target.parentElement.parentElement.firstElementChild.innerHTML =
      input;

    event.target.classList.add("pointer-events-none");

    // rotate the bubble container and change bg
    event.target.parentElement.parentElement.classList.add("bg-purple-200");
    event.target.parentElement.parentElement.classList.remove(
      "rotate-x-180",
      "bg-white"
    );

    // hide the form container
    event.target.parentElement.classList.add("opacity-0");
    event.target.parentElement.parentElement.dataset.answered = true;

    // show the card's back (with the answer)
    event.target.parentElement.parentElement.firstElementChild.classList.add(
      "pointer-events-none"
    );
    event.target.parentElement.parentElement.firstElementChild.classList.remove(
      "opacity-0"
    );

    // we need to put some answers on the side for consumption by the songs template.
    // we could have made a db query also but storing the data locally is faster.
    if (event.target.parentElement.parentElement.dataset.save) {
      _key = event.target.parentElement.parentElement.dataset.name.replace(
        /.+\./i,
        ""
      );
      savedAnswers.set(_key, input);
    }

    // and we also need to keep all answers to populate the database at
    // the end of the experience.
    _allAnswers = allAnswers.get();
    _allAnswers.push({
      name: event.target.parentElement.parentElement.dataset.name,
      answer: input,
    });
    allAnswers.set(_allAnswers);

    state.set("gettingMoreElements");
    addNextItem();
    fadeQuestion(event);
    getRandomQuestion(event.target.id);

    Meteor.call("getAnswers", this, (error, result) => {
      if (!error) {
        otherAnswers.set(this.name, result.answer);
        console.log(this.name, "getting random answer from db", result.answer);
      } else {
        console.log(error);
      }
    });
  },

  "click .formCard"(event) {
    card = document.getElementById("container." + event.target.dataset.name);
    // the formCard first holds a form object with which the user needs to interact, so
    // we don't want to start animating the div before it's been transformed in a place to store
    // other player's answers
    if (!card || !card.dataset.answered) {
      return;
    }

    if (card.dataset.clicked == "false") {
      card.classList.add("rotate-x-180");
      card.classList.remove("bg-purple-200");
      card.classList.add("bg-indigo-200");
      card.firstElementChild.classList.add("opacity-0");
      card.firstElementChild.classList.remove("opacity-1");
      card.lastElementChild.classList.add("opacity-1");
      card.lastElementChild.classList.remove("opacity-0");

      card.dataset.clicked = "true";
    } else {
      card.classList.remove("rotate-x-180");
      card.classList.add("bg-purple-200");
      card.classList.remove("bg-indigo-200");
      card.lastElementChild.classList.add("opacity-0");
      card.lastElementChild.classList.remove("opacity-1");
      card.firstElementChild.classList.add("opacity-1");
      card.firstElementChild.classList.remove("opacity-0");

      card.dataset.clicked = "false";
    }
  },
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

uuidv4 = function () {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};

// getFile = function(){
//   const testFolder = './';

//   fs.readdirSync(testFolder).forEach(file => {
//     console.log(file);
//   });

// }
