import "./completed.html";

const outro = [
  {
    type: "SB",
    text: "Wah super merci d'avoir participé à club travail online!.",
  },
  {
    type: "SB",
    text: "c'était super, ben dites-donc on s'est bien amusey",
  },
  {
    type: "SB",
    text: "tenez regardez ça c'est toutes les autres chansons qui ont été écrites par les autres pélos:",
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
