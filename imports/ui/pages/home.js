import "./home.html"

const waitingData = [
    {autoText:true, name:"bot-mathilde-1" ,text:
        ["Bonjour, bienvenue sur le guichet online du club travail.",
        "Je suis Samuel, le conseiller club travail spécialisé dans les réseaux informatiques.",
        "Avec mes collègues Thomas et Mathilde, nous sommes en train de préparer un nouvel espace bien-être, glamour & travail",
        "où l'on se posera notamment la question de savoir si le travail est à l'intérieur ou à l'extérieur de nous",
        "quel bruit fait notre travail, ou encore",
        "s'il est bien vrai que 'nul n'est si pauvre qu'il ne doive s'asseoir sur une citrouille.'",
        "comme le disait Thoreau.",
        "Nous vous donnons rendez-vous ici bientôt",
        "dès la fin juin",
        "Si vous voulez être tenu au courant de l'ouverture du guichet en ligne, vous pouvez vous inscrire ci-dessous :",
    ]},
    {autoText:true, name:"mailForm", form:true},
    {autoText:true, name:"linkNoFuturs", link:true},
]

export const dataFridge = new ReactiveVar(waitingData);