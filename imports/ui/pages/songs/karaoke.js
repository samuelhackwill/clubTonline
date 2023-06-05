import "./karaoke.html"

Template.karaoke.onCreated(function(){
    // we need to add the css file dynamicaly cause we don't want to mess up
    // our namespace ou quoi.
    var fileref = document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", "karaoke.css")
    document.getElementsByTagName("head")[0].appendChild(fileref)
})  