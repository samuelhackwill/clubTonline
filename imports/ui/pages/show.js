import "./show.html";
import "../layouts/feed.js";

// SB : static bubble
// ---BB--- : blocking bubble. on a mis des tirets du six pour plus de visibilité que ça bloque la progression et tout.

const whateverData = [
  { type: "SB", text: "bonjour c'est mathilde voici la première bulle" },
  { type: "SB", text: "bonjour c'est mathilde voici la deuxième bulle" },
  {
    type: "SB",
    text: "bonjour c'est mathilde voici la troisième bulle, qui va être un peu plus grande parce que j'ai plein de choses à vous dire. Par exemple, hier j'ai mangé une soupe de cresson et c'était franchement pas mal.",
  },
  {
    type: "SB",
    text: "après je voulais aussi vous dire que je travaille avec deux developpeurs vraiment talentueux, ils s'appellent samuel et thomas.",
  },
  {
    type: "SB",
    text: "en plus d'être extrèmement bons il sont aussi très sympa.",
  },
  { type: "SB", text: "et beaux." },
  { type: "SB", text: "ouais." },
  { type: "SB", text: "ouais." },
  { type: "SB", text: "ouais." },
  { type: "SB", text: "ouais." },
  { type: "SB", text: "ouais." },
  { type: "SB", text: "ouais." },
  { type: "SB", text: "ouais." },
  { type: "SB", text: "ouais." },
  { type: "SB", text: "ouais." },
  { type: "SB", text: "ouais." },
  { type: "SB", text: "ouais." },
  { type: "SB", text: "ouais." },
  { type: "SB", text: "ouais." },
  { type: "SB", text: "ouais." },
  { type: "SB", text: "ouais." },
  { type: "SB", text: "ouais." },
  { type: "SB", text: "ouais." },
  { type: "SB", text: "ouais." },
  { type: "SB", text: "ouais." },
  { type: "---BB---", name: "play", label: "play" },
  { type: "SB", text: "this is hidden until we have user interaction." },
  { type: "SB", text: "this is also hidden until we have user interaction." },
  {
    type: "---BB---",
    name: "card.tutoie",
    label: "Est ce qu'on se tutoie, ou alors est-ce qu'on se vouvoie?",
  },
  { type: "SB", text: "ok you got the idea." },
];

Template.show.helpers({
  showData() {
    return whateverData;
  },
});
