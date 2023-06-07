import "./show.html";
import "../layouts/feed.js";

const whateverData = [
    {left:true, name:"bot-mathilde-1" ,text:
        [
        "bonjour c'est mathilde voici la première bulle",
        "voilà je vais vous tirer les cartes attention vous êtes prêtes?",
        "voici un gros bloc de texte for no reason.nvoici un gros bloc de texte for no reason. voici un gros bloc de texte for no reason. voici un gros bloc de texte for no reason. voici un gros bloc de texte for no reason. voici un gros bloc de texte for no reason.",
        "blablabalb labal balb alb lab lablbalb alba oui le tirage de cartes yehsu hodh oauhd oqsud ouqshd oqush djndf qjlknefz ljfnqdslfj nqflj nezqfljqnsdf lqenz fljqsdnf oqeznflqjsdnf laezjfnljn jdlsfn",
        "dljf nld fjnqdkj fnqsdkj fnsdqfkjn dsqkj fnqlj nfdsljdsfn"
        ]
    }
]

export const dataFridge = new ReactiveVar(whateverData);
export const dataFeed = new ReactiveVar();

