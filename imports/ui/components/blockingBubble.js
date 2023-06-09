import "./blockingBubble.html";

import {state} from "../layouts/feed.js"

Template.blockingBubble.helpers({
    isPlay(){
      if (this.name != undefined && this.name.startsWith("play")) {
        return true
      }
    },
    isCard(){
      if (this.name != undefined && this.name.startsWith("card")) {
        return true
      }
    },
})

Template.blockingBubble.events({
    'click .play'(event) {
      if (event.target.dataset.clicked) {
        return
      }else{
        state.set("gettingMoreElements")
        addNextItem()
        event.target.dataset.clicked="true"
        event.target.classList.add("bg-gray-400", "pointer-events-none")
      }
    },

    'click .card'(event){
      event.target.parentElement.classList.add("rotate-x-180")
      event.target.classList.add("opacity-0")
    }
})