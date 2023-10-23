export const lettre_tu = [
  {
    type: "SB",
    text: "Bonjour ! Je suis Thomas, ton conseiller du club du travail pour aujourd’hui.",
  },
  {
    type: "SB",
    text: "Vers l’âge de 7 ans, j’ai écrit une lettre au roi de mon pays pour leur demander de transformer les semaines en des semaines de 2 jours en alternance : lundi-dimanche.",
  },
  {
    type: "SB",
    text: "Je n’ai jamais su si mon père avait posté la lettre. Mais j’y repense souvent, surtout le mardi.",
  },
  {
    type: "---BB---",
    save: true,
    name: "qcm.lettre_semaine",
    label: "Que penses-tu de cette proposition ?",
    qcmOptions: [
      "Je proposerai plutôt des semaines vendredi-samedi",
      "J’aime pas le lundi",
      "J’aime pas le dimanche",
      "J’aime travailler tous les jours de la semaine",
      "Je ne sais jamais quel jour on est",
    ],
  },
  {
    type: "---BB---",
    name: "qcm.lettre_roi",
    label:
      "Penses-tu que le roi ait lu ma lettre et ait réfléchi avec attention à ma proposition ?",
    qcmOptions: ["oui"],
  },
  {
    type: "---BB---",
    save: true,
    name: "qcm.lettre_soluce",
    label:
      "Penses-tu que pour ma revendication se fasse entendre, j’aurais dû :",
    qcmOptions: [
      "Lancer une pétition en ligne",
      "Poster la lettre moi-même",
      "Faire une grève des bonbons",
      "Faire un tube avec Stromae",
      "Écrire à Mafalda",
    ],
  },
  {
    type: "SB",
    text: "Quoi qu’il en soit, je suis heureux de t’aider dans tes propres revendications aujourd’hui.",
  },
  {
    type: "---BB---",
    name: "qcm.lettre_trop",
    save: true,
    label: "De manière générale, trouves-tu que :",
    qcmOptions: [
      "Les journées sont trop courtes",
      "Il n'y a pas assez de rien",
      "Il y a trop de gens",
      "Il y a trop d’espaces",
      "Il n’y a rien de trop",
    ],
  },
  {
    type: "SB",
    text: "hum, intéressant.",
  },
  {
    type: "SB",
    text: "Tu vas pouvoir tirer une carte du tarot du travail. Cette carte évoque quelque chose que tu ne souhaites plus voir dans ton monde du travail à toi, en rapport avec ce « trop » ou ce « rien » que tu viens d’évoquer.",
  },
  {
    type: "---BB---",
    name: "getTarot",
    tirage: "present",
    label: "chargement...",
  },
  {
    type: "---BB---",
    name: "card.lettre_tarot",
    size: "l",
    label:
      "Prends un temps pour « décrire » la carte, ce que tu y vois, ce qui t’apparait. Il n’y a pas de bonnes réponses, tu peux dire tout ce qui te passe par la tête.",
  },
  {
    type: "---BB---",
    save: true,
    name: "card.lettre_tarotsmall",
    size: "s",
    label: "Comment résumerais-tu ton souhait?",
  },
  {
    type: "---BB---",
    save: true,
    name: "qcm.lettre_epinards",
    label: "De manière générale, que faudrait-il mettre dans les épinards ?",
    qcmOptions: [
      "Plus de beurre",
      "plus l’huile",
      "plus d’ail",
      "plus de sésame",
    ],
  },
  {
    type: "---BB---",
    save: true,
    name: "card.lettre_ou",
    size: "s",
    label:
      "Je me demandais, où te trouves-tu en ce moment? (tu peux inventer une adresse évocatrice)",
  },
  {
    type: "SB",
    text: "En Allemagne, le code du travail stipule que les travailleur.se.s doivent pouvoir voir le ciel depuis leur espace de travail.",
  },
  {
    type: "SB",
    text: "Peut-être as-tu déjà remarqué que quand tu cliquais sur les cartes réponses, tu pouvais voir d'autres réponses apparaître? Il s'agit de la dernière personne connectée au guichet avant toi.",
  },
  {
    type: "SB",
    text: "N'hésite pas à t'inspirer de ses réponses à tout moment. C'est une espèce d'ange-gardien.ne sur ton chemin aujourd'hui",
  },
  {
    type: "---BB---",
    name: "card.lettre_espaces",
    size: "s",
    save: true,
    label:
      "Et toi, que souhaiterais-tu améliorer par rapport à ton/tes espaces de travail ?",
  },
  {
    type: "SB",
    text: "Tu vas pouvoir tirer une seconde carte du tarot du travail du futur.",
  },
  {
    type: "---BB---",
    name: "getTarot",
    tirage: "futur",
    label: "chargement...",
  },
  {
    type: "---BB---",
    name: "card.lettre_tarot2",
    size: "s",
    label: "Que semble-t-elle t’indiquer par rapport à un espace rêvé futur ?",
  },
  {
    type: "---BB---",
    save: true,
    name: "card.lettre_tarot3",
    size: "s",
    label: "résume en une phrase ce que tu te souhaites pour un espace futur",
  },
  {
    type: "SB",
    text: "Prends maintenant quelques secondes pour penser à quelque chose que tu ne souhaites plus jamais avoir dans ton environnement de travail, que tu veux mettre derrière toi.",
  },
  {
    type: "SB",
    text: "Ça peut être quelqu’un, une odeur, une ambiance, un vêtement, une émotion.",
  },
  {
    type: "---BB---",
    name: "card.lettre_ennemi",
    size: "s",
    label: "Donne un nom à cette chose/personne .",
  },
  {
    type: "SB",
    text: "Ce qu’on va faire maintenant c’est que tu vas pouvoir lui tourner le dos.",
  },
  {
    type: "SB",
    text: "Dans quelques secondes tu vas pouvoir fermer les yeux, te retourner à 180° pour te retrouver dos à moi, et je vais l’incarner.",
  },
  {
    type: "SB",
    text: "Tu vas pouvoir envoyer toutes tes énergies vers moi en imaginant qu’elles sortent de ton dos et je vais les absorber grâce à un super pouvoir informatique.",
  },
  {
    type: "SB",
    text: "Ça s’appelle « tourner le dos à ce qui fait écran ». Je vais m’occuper de tout balancer dans un vortex numérique. Si ça t’aide tu peux imaginer que des milliers de serveurs informatiques dispersés dans le monde entier vont découper ta chose en des milliers de petits morceaux.",
  },
  {
    type: "SB",
    text: " Allez, C’est parti, quand tu veux, on y va et quand tu le sens, tu pourras revenir par ici, en te retournant le plus lentement possible jusqu’à me faire face à nouveau. Je suis prêt.",
  },
  {
    type: "---BB---",
    name: "play",
    label: "je suis de retour!",
  },
  {
    type: "---BB---",
    save: true,
    name: "card.lettre_turn",
    size: "s",
    label:
      "Fort-e de cette expérience, peux-tu me dire ce que tu aimerais mettre derrière toi, pour de bon ?",
  },
  {
    type: "SB",
    text: "J'ai trois dernières petites questions de rien du tout!",
  },
  {
    type: "---BB---",
    save: true,
    name: "card.lettre_boss",
    size: "s",
    label: "Dans le fond, qui est ton/ta boss ? (ça peut être un pseudo)",
  },
  {
    type: "---BB---",
    save: true,
    name: "card.lettre_blase",
    size: "s",
    label: "Et qui es-tu, pour ton boss ?",
  },
  {
    type: "---BB---",
    save: true,
    name: "card.lettre_adresse",
    size: "s",
    label:
      "Où se situe ton boss (tu peux donner sa véritable adresse si tu veux) :",
  },
  {
    type: "---BB---",
    name: "end",
    label: "conclure",
  },
];
