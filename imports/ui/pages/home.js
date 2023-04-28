import "./home.html"

const waitingData = [
    {autoText:true, name:"bot-mathilde-1" ,text:
        ["Bonjour, bienvenue au club travail online.",
        "Je suis Samuel, le conseiller club travail spécialisé dans les réseaux informatiques.",
        "Mes camarades Mathilde Maillard et Thomas Bris arriveront bientôt pour animer cette expérience en ligne",
        "où l'on se posera notamment la question de savoir si le travail est à l'intérieur ou à l'extérieur de nous,",
        "quel bruit fait notre travail, ou encore",
        "s'il est bien vrai que 'nul n'est si pauvre qu'il ne doive s'asseoir sur une citrouille.'",
        "comme le disait Thoreau.",
        "Nous vous donnons rendez-vous ici, la semaine du 19 Juin,",
        "pendant la pause café,",
        "à votre bureau ",
        "chez vous,",
        "ou sur vos genoux où que vous soyez,",
        "sur guichet.clubtravail.be",
        "si vous voulez recevoir un mail quand le site sera prêt, vous pouvez vous inscrire ci-dessous :)",
    ]},
    {autoText:true, name:"mailForm", form:true},
    {autoText:true, name:"linkNoFuturs", link:true}
]

export const dataFridge = new ReactiveVar(waitingData);