import "./feed.html";

import "../components/bubble.js";

import { dataFridge } from "../pages/home.js";
import { dataFeed } from "../pages/show.js";

export const state = new ReactiveVar("reading");

Template.feed.helpers({
  feedState() {
    return state.get();
  },

  feedItems() {
    return dataFeed.get();
  }
});

Template.feed.onRendered(function () {
  
  // This is a hook used to animate insertions in the feed. It replaces normal behaviour by blaze, so you also have to manually tell blaze to add nodes.
  // see : https://forums.meteor.com/t/smooth-fade-in-fade-out-transitions-for-blaze-and-reactivevars/53242/5
  document.getElementById("feed")._uihooks = {
    insertElement: (node, next) => {
      //console.log("DOM INSERTION DETECTED", "NODE ", node, "NEXT ", next.parentNode)

      next.parentNode.appendChild(node);

      setTimeout(function () {
        next.parentNode.lastChild.style.opacity = 1;
        updateScroll();
      }, 30);
    },
  };

  index = 0;

  setTimeout(() => {
    // this is to welcome peeps in the feed! a bot speaks basically.
    displayIntro()
  }, 100);

});

displayIntro = function(){
  console.log("display intro, ", index)

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