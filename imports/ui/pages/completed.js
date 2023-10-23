import "./completed.html";

const outro = [
  {
    type: "SB",
    text: "Merci d'avoir pris du temps sur le guichet du Club Travail.",
  },
  {
    type: "SB",
    text: "Quelles que furent vos réponses, c'était les bonnes.",
  },
  {
    type: "SB",
    text: "Vous faites maintenant partie de la compilothèque du Club Travail.",
  },
  {
    type: "SB",
    text: "Si vous voulez profiter des textes et poésies fabriqués par d'autres internautes, cliquez sur les titres.",
  },
  {
    type: "SB",
    text: "Pour nous contacter: clubtravaille@gmail.com",
  },
  {
    type: "SB",
    name: "newGame",
    label: "commencer une nouvelle partie",
  },
  {
    type: "---BB---",
    name: "getAllSongs",
    label: "Chargement de toutes les chansons...",
  },
];

Template.completed.helpers({
  endData() {
    return outro;
  },
});

Template.completed.onRendered(function () {
  // Call the function to replace Y scrolling with X scrolling
  replaceYScrollWithXScroll();
  setTimeout(function () {
    document.body.classList.remove("bg-yellow-clubT");
    document.body.classList.add("bg-indigo-200");
    document.getElementById("footer").classList.remove("bg-yellow-clubT");
    document.getElementById("footer").classList.add("bg-indigo-200");
  }, 0);
});
