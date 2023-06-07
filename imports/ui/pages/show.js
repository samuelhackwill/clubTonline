import "./show.html";
import "../layouts/feed.js";

// SB : static bubble
// ---BB--- : blocking bubble. on a mis des tirets du six pour plus de visibilité que ça bloque la progression et tout.

const whateverData = [
    {type:"SB" ,text:"bonjour c'est mathilde voici la première bulle"},
    {type:"SB" ,text:"bonjour c'est mathilde voici la deuxième bulle"},
    {type:"SB" ,text:"he ouais."},
    {type:"---BB---" ,text:"THIS IS BLOCKING!"},
    {type:"SB" ,text:"this is hidden until we have user interaction."},
]

Template.show.helpers({
    showData() {
      return whateverData;
    },
});