import "./feed.html";

import "../components/staticBubble.js";
import "../components/blockingBubble.js";

const dataFeed = new ReactiveVar();
const dataFridge = new ReactiveVar();
export const state = new ReactiveVar("gettingMoreElements");
export let feedIndex = new ReactiveVar(0);

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

Template.feed.onCreated(function () {
});

Template.feed.onRendered(function () {
  // the data fridge contains all the data necessary for the game (cards, text, etc).
  dataFridge.set(this.data);

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

addNextItem = function () {
  // we need to initialize a tempFeed to hold the previous items of the feed in order not to erase them,
  // or to initialize an empty tempFeed to prevent errors.

  tempFeed = dataFeed.get() || [];
  tempFeedIndex = feedIndex.get();

  let nextItem = dataFridge.get()[tempFeedIndex];

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

addForm = function (questionName, formSize) {
  tempFeed = dataFeed.get() || [];
  tempFeedIndex = feedIndex.get();

  _formSize = formSize.size || "m"

  _name = questionName.replace(/.+\./i, "");

  nextItem = { type: "---BB---", name: "form." + _name, size:_formSize};

  tempFeed.push(nextItem);
  dataFeed.set(tempFeed);
};

addQcm = function (questionName, qcmOptions){
  tempQcmOpts = []

  for (var prop in qcmOptions) {
    if (Object.prototype.hasOwnProperty.call(qcmOptions, prop)) {
      tempQcmOpts.push(qcmOptions[prop])
    }
  }

  tempFeed = dataFeed.get() || [];
  tempFeedIndex = feedIndex.get();

  _name = questionName.replace(/.+\./i, "");

  nextItem = { type: "---BB---", name: "qcmForm." + _name, qcmOptions: tempQcmOpts};

  tempFeed.push(nextItem);
  dataFeed.set(tempFeed);
}