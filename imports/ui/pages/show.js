import "./show.html";
import "../layouts/feed.js";

// "SB" : static bubble. required attr : "text"
// "---BB---" : blocking bubble. optionnal attrs : "name"(qcm.<name>/card.<name>), "label", "qcmOptions"

const whateverData = [
  { type: "SB", text: "Bonjour, bienvenue sur le guichet du club travail." },
  { type: "SB", text: "Qui que vous soyez, vous êtes la bonne personne." },
  {
    type: "SB",
    text: "Et nous aussi, derrière votre écran, nous sommes la bonne personne.",
  },
  {
    type: "SB",
    text: "Nous allons passer un petit temps ensemble, une quinzaine de minutes.",
  },
  {
    type: "SB",
    text: "Nous n’allons pas nous voir, ni nous entendre, simplement nous parler. Installez-vous confortablement et si possible ouvrez cette page sur un ordinateur",
  },
  {
    type: "SB",
    text: "car les gsm c’est l’enfer sur terre.",
  },
  {
    type: "---BB---",
    name: "qcm.tutoie",
    label: "en fait, est-ce que ça va qu’on vous tutoie ou tu préfères qu’on vous vouvoie ?",
    qcmOptions : ["le vouvoiement c'est bien", "call me tu", "tiens et pourquoi pas les deux?"]
  },
  { type: "SB", text: "Ok c'est bien noté." },
  {
    type: "---BB---",
    name: "qcm.humeur",
    label: "Alors, dites-nous, de quelle humeur êtes-vous aujourd'hui?",
    qcmOptions : ["d’humeur à vraiment crier sur les toits avec un mégaphone", "plutôt d’humeur à la douceur et à aller me promener en forêt sans prévoir d’heure de retour ?", "d’humeur à écrire une lettre avec toutes mes idées géniales au ministre de l’emploi"]
  },
  {
    type: "---BB---",
    name: "card.test1",
    size: "s",
    label: "Tiens et regardez voir ça c'est une question petite pour voir à quoi ça ressemble.",
  },
  {
    type: "---BB---",
    name: "card.test2",
    size: "m",
    label: "Tiens et regardez voir ça c'est une question moyenne pour voir à quoi ça ressemble.",
  },
  {
    type: "---BB---",
    name: "card.test3",
    size: "l",
    label: "Tiens et regardez voir ça c'est une question grande pour voir à quoi ça ressemble.",
  },
  { type: "SB", text: "ok super c'est fini!" },
  { type: "---BB---", name: "play", label: "ah bon?" },
  { type: "SB", text: "oui." },
  { type: "SB", name: "sticker" },
  { type: "SB", text: "Bonjour, bienvenue sur le guichet du club travail." },
  { type: "SB", text: "Qui que vous soyez, vous êtes la bonne personne." },
  {
    type: "SB",
    text: "Et nous aussi, derrière votre écran, nous sommes la bonne personne.",
  },
  {
    type: "SB",
    text: "Nous allons passer un petit temps ensemble, une quinzaine de minutes.",
  },
];

Template.show.helpers({
  showData() {
    return whateverData;
  },
});
