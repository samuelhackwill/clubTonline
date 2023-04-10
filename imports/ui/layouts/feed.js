import './feed.html'

import '../components/bubble.js'
import '../components/sticker.js'
import '../components/deck.js'

import {data} from '../pages/show.js'
const state = new ReactiveVar("chatting")

Template.feed.helpers({
    feedState(){
        return state.get()
    },

	feedItems(){
        return data.get()
	}
})

// This is a hook used to animate insertions in the feed. It replaces normal behaviour by blaze, so you also have to manally tell blaze to add nodes.

// see : https://forums.meteor.com/t/smooth-fade-in-fade-out-transitions-for-blaze-and-reactivevars/53242/5

Template.feed.onRendered(function(){
    document.getElementById("feed")._uihooks = {
        insertElement: (node, next) => {
            // console.log("DOM INSERTION DETECTED", "NODE ", node, "NEXT ", next.parentNode)
            
            next.parentNode.appendChild(node)

            setTimeout(function(){
                next.parentNode.lastChild.style.opacity = 1
                updateScroll()
            },30)

            // deck of cards have a special behaviour : it has nested hidden elements which need to be animated individually
            if(node.getAttribute("data-deckOfCards")){
            
                cards = node.children
                howManyCards = cards.length
                cardIndex = 0
    
                cardFadeInAnimation = setInterval(function(){
                    if(cardIndex >= howManyCards){
                        updateScroll()
                        clearInterval(cardFadeInAnimation)
                        allAuras = document.getElementsByClassName("aura")
                        for (let index = 0; index < allAuras.length; index++) {
                            allAuras[index].style.opacity=1;
                        }
                        return
                    }
                    document.getElementById("deck").children[cardIndex].style.transform = "translateY(0px)"
                    document.getElementById("deck").children[cardIndex].style.opacity = 1
                    cardIndex ++
                },250)
    
            }

        }
    }
})

Template.feed.events({
    'click .card'(event) {
        // attach event listener to end of animation on the element
        // animate element
        state.set("card moving offscreen")

        elem = document.getElementById("deck").lastElementChild
        elem.style.transform = "rotate(6deg) rotateY(180deg) translateY(100vh)" 
        
        elem.addEventListener("transitionend", () => {
          console.log("transition ended");
          state.set("card is offscreen")
          cardFullScreener()
          removeCardFromFeed()
        });
        
    }
})

addData = function(obj){
    // this function is used to add data to the local reactive Var, which is used to populate the feed.

    // we will need to get the data from the proper database next ("scenarios") rather than just inserting random stuff like we're doing now.

    tempFeed = data.get() || []
    tempFeed.push(obj)
    data.set(tempFeed)
}

updateScroll = function(){
    var element = document.getElementById("feed");
    element.scrollTop = element.scrollHeight;
}

removeCardFromFeed = function(){
    tempData = data.get()
    tempData[tempData.length-1].cards.pop()
    data.set(tempData)
}

cardFullScreener = function(){
    allCards = document.getElementsByClassName("card") || []
    theCard = allCards[allCards.length-1]

    document.getElementById("__blaze-root").appendChild(theCard)
}