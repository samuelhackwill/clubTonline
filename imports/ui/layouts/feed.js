import "./feed.html";

import "../components/bubble.js";
import "../components/sticker.js";
import "../components/deck.js";
import "../components/card.js";

import { dataFridge } from "../pages/home.js";
import { dataFeed } from "../pages/show.js";

export const state = new ReactiveVar("reading");

Template.feed.helpers({
  feedState() {
    return state.get();
  },

  feedItems() {
    // console.log("getting new data, miam! ", dataFeed.get())
    return dataFeed.get();
  },
});

// This is a hook used to animate insertions in the feed. It replaces normal behaviour by blaze, so you also have to manually tell blaze to add nodes.

// see : https://forums.meteor.com/t/smooth-fade-in-fade-out-transitions-for-blaze-and-reactivevars/53242/5
Template.feed.onCreated(function(){
  console.log(dataFridge.get())
})


Template.feed.onRendered(function () {
  
  document.getElementById("feed")._uihooks = {
    insertElement: (node, next) => {
      //console.log("DOM INSERTION DETECTED", "NODE ", node, "NEXT ", next.parentNode)

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

      // individual cards have to be heavily Css-modified to look different than when they are displayed in full screen. Also we have to modify the css of nested elements in the node, so carefull if you modify the html structure of the component.

      if(node.getAttribute("id") == "theCard"){
        paragraph = node.children[1].children[0]||undefined
        if (!paragraph) {
          console.log("ERROR! check the html structure of card component", node)
        }
        paragraph.classList.remove("text-6xl")
        paragraph.classList.remove("p-24")
        paragraph.classList.add("text-2xl")
        paragraph.classList.add("p-6")

        // we could add a bit of randomness here to make it nicer.

        node.style.transform = "rotateY(180deg) translate(-50%, 30px) rotate(-2deg)"
      }
    },
  };

  index = 0;

  setTimeout(() => {
    // this is to welcome peeps in the feed! a bot speaks basically.
    displayIntro()
  }, 100);

});

displayIntro = function(){

  tempFeed = dataFeed.get() || [];

  // find the intro in the fridge. For the example we're using mathilde's intro here.
  let result = dataFridge.get().filter(obj => {
    return obj.name === "bot-mathilde-1"
  })

  // find what we've already displayed of the intro and or stop
  if(index < result[0].text.length){
    const element = {}
    element.autoText = true
    element.onlyText = true
    element.text = result[0].text[index];
    tempFeed.push(element)
    dataFeed.set(tempFeed);   
    
    index ++

    setTimeout(() => {
      // this is to welcome peeps in the feed! a bot speaks basically.
      displayIntro()
    }, 50);

  }else{
    // let result = dataFridge.get().filter(obj => {
    //   return obj.name === "deck-intro"
    // })
    // console.log("all text from intro already pushed to feed", result)
    // tempFeed.push(result[0])
    // dataFeed.set(tempFeed);   
    let form = dataFridge.get().filter(obj => {
      return obj.name === "mailForm"
    }) 

    const element1 = {}
    element1.autoText = true
    element1.form = true
    tempFeed.push(element1)
    

    let link = dataFridge.get().filter(obj => {
      return obj.name === "linkNoFuturs"
    })

    const element2 = {}
    element2.autoText = true
    element2.link = true
    tempFeed.push(element2)

    dataFeed.set(tempFeed);  

    setTimeout(() => {
      showAllFeedFuckThisShit = document.getElementById("feed").children
      for (let x = 0; x < showAllFeedFuckThisShit.length; x++) {
        showAllFeedFuckThisShit[x].style.opacity=1
      }      
    }, 10);

    return
  }
}

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

keepLastCardInFeed = function (lastCard) {
  console.log("lastCard", lastCard)
  obj = {}
  obj.card = true
  obj.cards = [lastCard]

  tempData = dataFeed.get()
  tempData.push(obj)

  
  dataFeed.set(tempData);
  console.log("after card insert ", tempData)
};

removeDeckFromFeed = function(){
  tempData = dataFeed.get();

  var index = tempData.findIndex(function(obj) {
    return obj.hasOwnProperty("deck")
  });

  removedDeck = tempData.splice(index, 1)  
  dataFeed.set(tempData)
  
  keepLastCardInFeed(removedDeck[0].cards.pop())
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
    // pffhffhfh this is to get rid of the "dos" which is visible on the transition when we click on the card.
    document.getElementById("offscreen").children[0].children[0].innerHTML = "" 
  }, {once:true});

  // make the feed invisible
  feed = document.getElementById("feed")
  feed.style.opacity = "0";
  feed.addEventListener("transitionend", removeDeckFromFeed,{once:true})
};