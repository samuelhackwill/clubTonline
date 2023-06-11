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
    text: "voilà et j'ai aussi mangé une tartine, miam",
  },
  {
    type: "SB",
    text: "j'avais mis du beurre dessus.",
  },
  { type: "SB", text: "ok." },
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
  {
    type: "---BB---",
    name: "card.countryCrisp",
    label: "Est ceq ue vous mangez des countri crisp le matin??",
  },
  {
    type: "---BB---",
    name: "qcm.countryCrisp",
    label: "et si vous deviez choisir entre vos goûts préférés de countri crisp ça serait quoi??",
    qcmOptions : ["goût mégôt", "goût carton", "fraise", "en fait j'ai pas vraiment de goût préféré, moi ce que j'aime dans le vie c'est l'imprévu, l'infra-mince des quaker oats en quelque sorte vous voyez ce que je veux dire?"]
  },
  { type: "SB", text: "ok super ben écoutez je vais vous vouvoyer hein." },
  {
    type: "SB",
    text: "ou alors vous tutoyuer en fait c'est pas encore implémenté hihi.",
  },
];

Template.show.helpers({
  showData() {
    return whateverData;
  },
});
