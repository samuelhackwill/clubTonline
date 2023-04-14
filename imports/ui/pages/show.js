import "./show.html";
import "../layouts/feed.js";

const whateverData = [
    {autoText:true, left:true, name:"bot-mathilde-1" ,text:
        [
        "bonjour c'est mathilde voici la première bulle",
        "voilà je vais vous tirer les cartes attention vous êtes prêtes?",
        "voici un gros bloc de texte for no reason.nvoici un gros bloc de texte for no reason. voici un gros bloc de texte for no reason. voici un gros bloc de texte for no reason. voici un gros bloc de texte for no reason. voici un gros bloc de texte for no reason."
        ]
    },
    {autoText:true, left:true, name:"bot-mathilde-2" ,text:
        [
        "ahh bravo vous avez fini votre premier tas félicitations",
        "next tas now",
        ]
    },
    {autoText:true, left:true, name:"bot-mathilde-3" ,text:
        [
        "avec juste une seule bulle pour la feinte"
        ]
    },
    {deck:true, name:"deck-intro",cards:
        [
            'est-ce que tu gagnes dix mille euros par seconde?', 'est ce que tu manges des coutri crisp le matin?', 'est ce que tu te lèves à 3 heures douze comme tout le monde?'
        ]
    }
]

export const dataFridge = new ReactiveVar(whateverData);
export const dataFeed = new ReactiveVar();

