import './feed.html'

import '../components/card.js'
import '../components/bubble.js'

data = new ReactiveVar()

Template.feed.helpers({
	getBubbles(){
        return data.get()
	}
})

// This is a hook used to animate insertions in the feed.
Template.feed.onRendered(function(){
    document.getElementById("feed")._uihooks = {
        insertElement: (node, next) => {
            // console.log("DOM INSERTION DETECTED", "NODE ", node, "NEXT ", next.parentNode)
            next.parentNode.appendChild(node)

            setTimeout(function(){
                next.parentNode.lastChild.style.opacity = 1
            },30)
        }
    }
})

addData = function(){
    // this function is used to add data to the local reactive Var, which is used to populate the feed.
    // we will need to get the data from the proper database next ("scenarios") rather than just inserting random stuff like we're doing now.
    tempArr = data.get() || []
    tempArr.push({left:false, who:"Samuel", text:"BLABLABLABA."})
    data.set(tempArr)
}