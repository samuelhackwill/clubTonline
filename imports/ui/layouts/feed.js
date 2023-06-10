import "./feed.html";

import "../components/staticBubble.js";
import "../components/blockingBubble.js";

dataFeed = new ReactiveVar();
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

Template.feed.onCreated(function(){
  // because of the strategy we use to display bubbles (a grid which overflows to the right), we can't use margins or 
  // other stuff to make some space on the right side of a column of bubbles. We have to use an invisible bumper element
  // which needs to always be present in the dataFeed.
  tempFeed = [{ type: "bumper" }]
  dataFeed.set(tempFeed)
})

Template.feed.onRendered(function () {
  dataFridge.set(this.data);

  // This is a hook used to animate insertions in the feed. It replaces normal behaviour by blaze, so you also have to manually tell blaze to add nodes.
  // see : https://forums.meteor.com/t/smooth-fade-in-fade-out-transitions-for-blaze-and-reactivevars/53242/5
  document.getElementById("feed")._uihooks = {
    insertElement: (node, next) => {
      //console.log("DOM INSERTION DETECTED", "NODE ", node, "NEXT ", next.parentNode)

      next.parentNode.appendChild(node);

      setTimeout(function () {
        console.log(feedIndex.get())
        next.parentNode.lastChild.style.opacity = 1;
      }, 30);
    },
  };

  setTimeout(() => {
    // this is to welcome peeps in the feed! a bot speaks basically.
    addNextItem();
  }, 100);
});

addNextItem = function () {
  // we need to initialize a tempFeed to hold the previous items of the feed in order not to erase them,
  // or to initialize an empty tempFeed to prevent errors.
  tempFeed = dataFeed.get() || [];
  tempFeedIndex = feedIndex.get();

  let nextItem = dataFridge.get()[tempFeedIndex];

  if (nextItem == undefined) {
    state.set("waitingForUserAction");
    // we are returning here because we don't want to add an empty object to the feed.
    return;
  }
  if (nextItem.type !== "SB") {
    state.set("waitingForUserAction");
    // we're not returning here because we do want to add blocking items before stoping the loop.
  } else {
    setTimeout(() => {
      addNextItem();
    }, 50);
  }

  beforeBumperIndex = tempFeed.length-1
  // tempFeed.splice(beforeBumperIndex, 0, nextItem)
  tempFeed.push(nextItem)
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
