import "./feed.html";

import "../components/bubble.js";
import "../components/sticker.js";
import "../components/deck.js";
import "../components/card.js";

import { dataFridge } from "../pages/show.js";
import { dataFeed } from "../pages/show.js";

export const state = new ReactiveVar("reading");

Template.feed.helpers({
  feedState() {
    return state.get();
  },

  feedItems() {
    return dataFeed.get();
  },
});

// This is a hook used to animate insertions in the feed. It replaces normal behaviour by blaze, so you also have to manually tell blaze to add nodes.

// see : https://forums.meteor.com/t/smooth-fade-in-fade-out-transitions-for-blaze-and-reactivevars/53242/5

Template.feed.onRendered(function () {
  document.getElementById("feed")._uihooks = {
    insertElement: (node, next) => {
      // console.log("DOM INSERTION DETECTED", "NODE ", node, "NEXT ", next.parentNode)

      next.parentNode.appendChild(node);

      setTimeout(function () {
        next.parentNode.lastChild.style.opacity = 1;
        updateScroll();
      }, 30);

      // deck of cards have a special behaviour : it has nested hidden elements which need to be animated individually
      if (node.getAttribute("data-deckOfCards")) {
        cards = node.children;
        howManyCards = cards.length;
        cardIndex = 0;

        cardFadeInAnimation = setInterval(function () {
          if (cardIndex >= howManyCards) {
            updateScroll();
            clearInterval(cardFadeInAnimation);
            allAuras = document.getElementsByClassName("aura");
            for (let index = 0; index < allAuras.length; index++) {
              allAuras[index].style.opacity = 1;
            }
            return;
          }
          document.getElementById("deck").children[cardIndex].style.transform =
            "translateY(0px)";
          document.getElementById("deck").children[cardIndex].style.opacity = 1;
          cardIndex++;
        }, 250);
      }
    },
  };
});

addData = function (obj) {
  // this function is used to add data to the local reactive Var, which is used to populate the feed.

  // we will need to get the data from the proper database next ("scenarios") rather than just inserting random stuff like we're doing now.

  tempFeed = dataFeed.get() || [];
  tempFeed.push(obj);
  dataFeed.set(tempFeed);
};

updateScroll = function () {
  var element = document.getElementById("feed");
  element.scrollTop = element.scrollHeight;
};

removeCardFromFeed = function () {
  tempData = dataFeed.get();
  tempData[tempData.length - 1].cards.pop();
  dataFeed.set(tempData);
};

removeDeckFromFeed = function(){
  tempData = dataFeed.get();
  var check = tempData.some(obj => obj.hasOwnProperty("deck"));
  console.log(check)
}

// we need a function to remove the card from its parents (to get rid of unwanted transforms & al) and to display it almost at full screen.
cardFullScreener = function () {
  // get last card
  allCards = document.getElementsByClassName("card") || [];
  theCard = allCards[allCards.length - 1];

  // place the card in the middle of the div and make it bigger
  theCard.style.transform = "translate(-50%, -50%) rotateY(180deg)";
  theCard.style.width = "88vw";
  theCard.style.left = "50%";
  theCard.style.top = "50%";
  theCard.style.top = "50%";
  theCard.children[1].style.borderRadius = "4rem";

  // append node and bring everyting on screen
  offscreenContainer = document.getElementById("offscreen");
  offscreenContainer.appendChild(theCard);
  offscreenContainer.style.transform = "translateY(-100%)";

  offscreenContainer.addEventListener("transitionend", () => {
    state.set("card is fullscreen");
  });

  // make the feed invisible
  feed = document.getElementById("feed")
  feed.style.opacity = "0";
  feed.addEventListener("transitionend", removeDeckFromFeed)

  // remove deck from feed when animation finished

};
