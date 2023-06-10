import "./show.html";
import "../layouts/feed.js";

// SB : static bubble
// ---BB--- : blocking bubble. on a mis des tirets du six pour plus de visibilité que ça bloque la progression et tout.

const whateverData = [
  { type: "SB", text: "bonjour c'est mathilde voici la première bulle" },
  { type: "SB", text: "bonjour c'est mathilde voici la deuxième bulle" },
  { type: "SB", text: "he ouais." },
  { type: "SB", text: "bonjour c'est mathilde voici la première bulle" },
  { type: "SB", text: "bonjour c'est mathilde voici la deuxième bulle" },
  { type: "SB", text: "he ouais." },
  { type: "SB", text: "bonjour c'est mathilde voici la première bulle" },
  { type: "SB", text: "bonjour c'est mathilde voici la deuxième bulle" },
  { type: "SB", text: "he ouais." },
  { type: "SB", text: "bonjour c'est mathilde voici la première bulle" },
  { type: "SB", text: "bonjour c'est mathilde voici la deuxième bulle" },
  { type: "SB", text: "he ouais." },
  { type: "SB", text: "bonjour c'est mathilde voici la première bulle" },
  { type: "SB", text: "bonjour c'est mathilde voici la deuxième bulle" },
  { type: "SB", text: "he ouais." },
  { type: "SB", text: "bonjour c'est mathilde voici la première bulle" },
  { type: "SB", text: "bonjour c'est mathilde voici la deuxième bulle" },
  { type: "SB", text: "he ouais." },
  { type: "SB", text: "bonjour c'est mathilde voici la première bulle" },
  { type: "SB", text: "bonjour c'est mathilde voici la deuxième bulle" },
  { type: "SB", text: "he ouais." },
  { type: "SB", text: "bonjour c'est mathilde voici la première bulle" },
  { type: "SB", text: "bonjour c'est mathilde voici la deuxième bulle" },
  { type: "SB", text: "he ouais." },
  { type: "SB", text: "bonjour c'est mathilde voici la première bulle" },
  { type: "SB", text: "bonjour c'est mathilde voici la deuxième bulle" },
  { type: "SB", text: "he ouais." },
  { type: "SB", text: "bonjour c'est mathilde voici la première bulle" },
  { type: "SB", text: "bonjour c'est mathilde voici la deuxième bulle" },
  { type: "SB", text: "he ouais." },
  { type: "---BB---", name: "play", label: "play" },
  { type: "SB", text: "this is hidden until we have user interaction." },
  { type: "SB", text: "this is also hidden until we have user interaction." },
  { type: "SB", text: "this is hidden until we have user interaction." },
  { type: "SB", text: "this is also hidden until we have user interaction." },
  { type: "SB", text: "this is hidden until we have user interaction." },
  { type: "SB", text: "this is also hidden until we have user interaction." },
  { type: "SB", text: "this is hidden until we have user interaction." },
  { type: "SB", text: "this is also hidden until we have user interaction." },
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
