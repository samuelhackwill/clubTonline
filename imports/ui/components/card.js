import './card.html'

// this is to add immediate reaction to touch events, because only using blaze event listeners OR css didn't seem to work and felt slow and unresponsive.

Template.card.onRendered(function(){
    this.firstNode.parentElement.lastElementChild.addEventListener("touchstart", touched);
    this.firstNode.parentElement.lastElementChild.addEventListener("touchend", untouched);
})

touched = function(t){
    t.target.style.backgroundColor = "#F8B4B4"
}

untouched = function(t){
    t.target.style.backgroundColor = "#FDF2F2"
}