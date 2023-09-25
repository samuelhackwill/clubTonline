import "./feed.html";

import "../components/staticBubble.js";
import "../components/blockingBubble.js";
import "../components/dataBubble.js";

import { ReactiveDict } from 'meteor/reactive-dict'

export const savedAnswers = new ReactiveDict();
export const allAnswers = new ReactiveVar([]);
export const state = new ReactiveVar("gettingMoreElements");
_targetScenario = ""


// data : the feed doesn't need to subscribe to answers, but the blocking bubbles do.
// the feed needs to subscribe to scenarios.

Template.feed.helpers({
  feedState() {
    return state.get();
  },

  feedItems() {
    return dataFeed.get();
  },

  isDebugMode() {
    // only show debug tools when we are working locally
    return window.location.host == "localhost:3000";
  },
});

Template.feed.events({
  "click #footer"() {
    footer = document.getElementById("footer");
    if (footer.classList.contains("translate-y-[-25vh]")) {
      footer.classList.remove("translate-y-[-25vh]");
      footer.dataset.clicked = true;
    } else {
      footer.classList.add("translate-y-[-25vh]");
      footer.dataset.clicked = false;
    }
  },
});

Template.feed.onCreated(function(){
  feedIndex = new ReactiveVar(0);
  dataFeed = new ReactiveVar();
})

Template.feed.onRendered(function () {    
    // the data fridge contains all the data necessary for the game (cards, text, etc).
  dataFridge = this.data;

  // initiate the first bubbles here!
  setTimeout(() => {
    addNextItem();
  }, 100);

  // This is a hook used to animate insertions in the feed. It replaces normal behaviour by blaze, so you also have to manually tell blaze to add nodes.
  // see : https://forums.meteor.com/t/smooth-fade-in-fade-out-transitions-for-blaze-and-reactivevars/53242/5
  document.getElementById("feed")._uihooks = {
    insertElement: (node, next) => {
      next.parentNode.appendChild(node);
      setTimeout(function () {
        next.parentNode.lastChild.style.opacity = 1;
      }, 0);
    },
  };
});

addNextItem = function (Template) {
  // we need to initialize a tempFeed to hold the previous items of the feed in order not to erase them,
  // or to initialize an empty tempFeed to prevent errors.
  tempFeed = dataFeed.get() || [];
  tempFeedIndex = feedIndex.get();

  let nextItem = dataFridge[tempFeedIndex];

  if (nextItem == undefined) {
    state.set("finished");
    return;
  }
  if (nextItem.type != "SB") {
    state.set("waitingForUserAction");
    // we're not returning here because we do want to add blocking items before stoping the loop.
  } else {
    setTimeout(() => {
      addNextItem();
    }, 50);
  }

  tempFeed.push(nextItem);
  dataFeed.set(tempFeed);
  feedIndex.set((tempFeedIndex += 1));
};

addData = function (obj) {
  // this function is used to add data to the local reactive Var, which is used to populate the feed.
  // we will need to get the data from the proper database next ("scenarios") rather than just inserting random stuff like we're doing now.

  tempFeed = dataFeed.get() || [];
  tempFeed.push(obj);
  dataFeed.set(tempFeed);
};

addForm = function (data, _save) {
  tempFeed = dataFeed.get() || [];
  tempFeedIndex = feedIndex.get();

  _formSize = data.size || "m";

  _name = data.name.replace(/.+\./i, "");

  nextItem = { type: "---BB---", name: "form." + _name, size: _formSize, save:_save};

  tempFeed.push(nextItem);
  dataFeed.set(tempFeed);
};

addQcm = function (data, _save) {
  _name = data.name
  
  tempQcmOpts = [];

  for (var prop in data) {
    if (Object.prototype.hasOwnProperty.call(data, prop) && prop.startsWith("qcm")) {
      tempQcmOpts.push(data[prop]);
    }
  }

  tempFeed = dataFeed.get() || [];
  tempFeedIndex = feedIndex.get();

   __name = _name.replace(/.+\./i, "");

  nextItem = {
    type: "---BB---",
    name: "qcmForm." + __name,
    qcmOptions: tempQcmOpts,
    save: _save
  };

  tempFeed.push(nextItem);
  dataFeed.set(tempFeed);
};

getRandomQuestion = function(_name){
  tempFeed = dataFeed.get() || [];
  var result = tempFeed.filter(obj => {
  return obj.name === _name
  })

  if (result.length >1) {
    console.log("getRandomQuestion error, maybe form name duplicates in dataset?", result);
  }

  obj = result[0]

  stabilizeHeight(obj)
  obj.answered = true
}

stabilizeHeight = function(obj){
  domObj = document.getElementById(obj.name)
  obj.minHeight = domObj.offsetHeight
}