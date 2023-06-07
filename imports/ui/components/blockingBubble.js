import "./blockingBubble.html";

import {state} from "../layouts/feed.js"

Template.blockingBubble.helpers({
    isAction(){
      if (this.name != undefined && this.name == "action") {
        return true
      }
    },
})

Template.blockingBubble.events({
    'click .action'(event) {
        console.log("action!")
        state.set("gettingMoreElements")
        addNextItem()
    }  
})