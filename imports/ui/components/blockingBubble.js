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
        state.set("gettingMoreElements")
        addNextItem()
    }  
})