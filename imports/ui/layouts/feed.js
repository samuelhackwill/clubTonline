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

Template.feed.onCreated(function(){
  // because of the strategy we use to display bubbles (a grid which overflows to the right), we can't use margins or 
  // other stuff to make some space on the right side of a column of bubbles. We have to use an invisible bumper element
  // which needs to always be present in the dataFeed.
  tempFeed = [{ type: "SB", name:"bumper" }]
  dataFeed.set(tempFeed)
})

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

      // the bumper needs to ALWAYS be at the end of the feed.
      if (node.id == "bumper") {
        setTimeout(function () {
          next.parentNode.appendChild(node);
        },0)
        return
      }

      next.parentNode.appendChild(node);

      // after adding the node, we change the opacity to have a nice animation.
      // lastchild is always bumper though, so we need to get the previous sibling.
      setTimeout(function () {
        next.parentNode.lastChild.previousSibling.style.opacity = 1;
      }, 30);
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
    console.log("WE ARRIVED AT THE END OF TIMES")
    state.set("waitingForUserAction");
    // we are returning here because we don't want to add an empty object to the feed.
    beforeBumperIndex = tempFeed.length-1
    console.log("before bumper index ", beforeBumperIndex, " arr ", dataFeed.get())
    tempFeed.splice(beforeBumperIndex, 0, nextItem)
    dataFeed.set(tempFeed);
    feedIndex.set((tempFeedIndex += 1));
    // but we do want the bumper.  
    return;
  }
  console.log("add next item", nextItem.type)
  if (nextItem.type != "SB") {
    console.log("HUH WHATS THAT, a blocking bubble or the bumper?")
    state.set("waitingForUserAction");
    // we're not returning here because we do want to add blocking items before stoping the loop.
  } else {    
    setTimeout(() => {
      console.log("adding stuff timeout")
      addNextItem();
    }, 50);
  }

  console.log("adding stuff here")
  beforeBumperIndex = tempFeed.length-1
  tempFeed.splice(beforeBumperIndex, 0, nextItem)
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
