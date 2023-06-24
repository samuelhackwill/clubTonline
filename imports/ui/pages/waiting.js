import "./waiting.html";

const waitingData = [
  {
    type: "SB",
    text: "Bonjour, bienvenue sur le guichet online du club travail.",
  },
  {
    type: "SB",
    text: "Je suis Samuel, le conseiller club travail spécialisé dans les réseaux informatiques.",
  },
  {
    type: "SB",
    text: "Avec mes collègues Thomas et Mathilde, nous sommes en train de préparer un nouvel espace bien-être, glamour & travail",
  },
  {
    type: "SB",
    text: "où l'on se posera notamment la question de savoir si le travail est à l'intérieur ou à l'extérieur de nous",
  },
  { type: "SB", text: "quel bruit fait notre travail, ou encore" },
  {
    type: "SB",
    text: "s'il est bien vrai que 'nul n'est si pauvre qu'il ne doive s'asseoir sur une citrouille.'",
  },
  { type: "SB", text: "comme le disait Thoreau." },
  { type: "SB", text: "Nous vous donnons rendez-vous ici bientôt" },
  { type: "SB", text: "de l'autre côté de l'été," },
  { type: "SB", text: "au mois de Septembre." },
  {
    type: "SB",
    text: "Si vous voulez être tenu au courant de l'ouverture du guichet en ligne, vous pouvez vous inscrire ci-dessous :",
  },
  { type: "SB", name: "mailForm" },
  { type: "SB", name: "linkNoFuturs" },
];

Template.waiting.helpers({
  waitingData() {
    return waitingData;
  },
});
