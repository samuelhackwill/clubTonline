export const lettre_vous = [
  {
    type: "SB",
    text: "Bonjour ! Je suis Thomas, votre conseiller du Club Travail pour aujourd’hui.",
  },
  {
    type: "SB",
    text: "Vers l’âge de 7 ans, j’ai écrit une lettre au roi de mon pays pour lui demander de transformer les semaines en des semaines de 2 jours uniquement composées de lundis et de dimanches.",
  },
  {
    type: "SB",
    text: "Je n'ai jamais su si mon père avait posté la lettre. Mais j'y repense souvent, surtout le mardi.",
  },
  {
    type: "---BB---",
    save: true,
    name: "qcm.lettre_semaine",
    label: "Que pensez-vous de cette proposition ?",
    qcmOptions: [
      "Je proposerais plutôt des semaines vendredi-samedi",
      "Je n’aime pas le lundi",
      "Je n’aime pas le dimanche",
      "J’aime travailler tous les jours de la semaine",
      "Je ne sais jamais quel jour on est",
    ],
  },
  {
    type: "---BB---",
    name: "qcm.lettre_roi",
    label:
      "Pensez-vous que le roi ait lu ma lettre et ait réfléchi avec attention à ma proposition ?",
    qcmOptions: ["Oui"],
  },
  {
    type: "---BB---",
    save: true,
    name: "qcm.lettre_soluce",
    label:
      "Pensez-vous que pour ma revendication se fasse entendre, j'aurais dû :",
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
    text: "Quoi qu’il en soit, je suis heureux de vous aider dans vos propres revendications aujourd’hui.",
  },
  {
    type: "---BB---",
    name: "qcm.lettre_trop",
    save: true,
    label: "De manière générale, trouvez-vous que :",
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
    text: "Hum, intéressant.",
  },
  {
    type: "SB",
    text: "Vous allez bientôt voir apparaître une carte du tarot du travail.",
  },
  {
    type: "SB",
    text: "Cette carte évoque quelque chose que vous ne souhaitez plus voir dans votre monde du travail à vous, en rapport avec ce « trop » ou ce « rien ».",
  },
  {
    type: "---BB---",
    name: "getTarot",
    label: "chargement...",
  },
  {
    type: "---BB---",
    name: "card.lettre_tarot",
    size: "l",
    label:
      "Prenez un temps pour « lire » la carte et décrivez-moi ce que vous y voyez, ce qui vous apparaît. Il n’y a pas de bonnes réponses, vous pouvez dire tout ce qui vous passe par la tête.",
  },
  {
    type: "---BB---",
    save: true,
    name: "card.lettre_tarotsmall",
    size: "s",
    label:
      "Comment résumeriez-vous alors ce que vous souhaitez en terme de trop ou de rien ?",
  },
  {
    type: "---BB---",
    save: true,
    name: "qcm.lettre_epinards",
    label: "De manière générale, que faudrait-il mettre dans les épinards ?",
    qcmOptions: [
      "Plus de beurre",
      "Plus d’huile",
      "Plus d’ail",
      "Plus de sésame",
    ],
  },
  {
    type: "SB",
    text: "Peut-être avez-vous déjà remarqué que quand vous cliquiez sur les cartes réponses, vous pouviez voir d'autres réponses apparaître ?",
  },
  {
    type: "SB",
    text: "Il s'agit d'une réponse choisie au hasard parmi toutes les réponses reçues par le guichet.",
  },
  {
    type: "---BB---",
    save: true,
    name: "card.lettre_ou",
    size: "s",
    label:
      "Je me demandais, où vous trouvez-vous en ce moment ? (vous pouvez inventer une adresse évocatrice)",
  },
  {
    type: "SB",
    text: "En Allemagne, le code du travail stipule que les travailleur·se·s doivent pouvoir voir le ciel depuis leur espace de travail.",
  },

  {
    type: "---BB---",
    name: "card.lettre_espaces",
    size: "s",
    save: true,
    label:
      "Et vous, que souhaiteriez-vous améliorer par rapport à vos espaces de travail ?",
  },
  {
    type: "SB",
    text: "Vous allez maintenant voir apparaître une seconde carte du tarot du travail du futur.",
  },
  {
    type: "---BB---",
    name: "getTarot",
    label: "chargement...",
  },
  {
    type: "---BB---",
    name: "card.lettre_tarot2",
    size: "s",
    label:
      "Que semble-t-elle vous indiquer par rapport à un espace rêvé futur ?",
  },
  {
    type: "---BB---",
    save: true,
    name: "card.lettre_tarot3",
    size: "s",
    label: "Résumez en une phrase ce que tu te souhaites pour un espace futur",
  },
  {
    type: "SB",
    text: "Prenez maintenant quelques secondes pour penser à quelque chose que vous ne souhaitez plus jamais avoir dans votre environnement de travail, que vous voulez mettre derrière vous.",
  },
  {
    type: "SB",
    text: "Ça peut être quelqu’un, une odeur, une ambiance, un vêtement, une émotion.",
  },
  {
    type: "---BB---",
    name: "card.lettre_ennemi",
    size: "s",
    save: true,
    label: "Donnez un nom ou un surnom à cette chose/personne.",
  },
  {
    type: "SB",
    text: "Ce qu’on va faire maintenant, c’est que vous allez pouvoir lui tourner le dos.",
  },
  {
    type: "SB",
    text: "Dans quelques secondes, vous allez pouvoir fermer les yeux, vous retourner à 180° pour vous retrouver dos à moi, et je vais l’incarner.",
  },
  {
    type: "SB",
    text: "Vous allez pouvoir envoyer toutes vos énergies vers moi en imaginant qu’elles sortent de votre dos, et je vais les absorber grâce à un super pouvoir informatique.",
  },
  {
    type: "SB",
    text: "Ça s’appelle « tourner le dos à ce qui fait écran ». Je vais m’occuper de tout jeter dans un vortex numérique. Si ça vous aide, vous pouvez imaginer que des milliers de serveurs informatiques dispersés dans le monde entier vont découper votre chose en des milliers de petits morceaux.",
  },
  {
    type: "SB",
    text: "Allez, c’est parti, quand vous voulez, on y va et quand vous le sentez, vous pourrez revenir par ici, en vous retournant le plus lentement possible jusqu’à me faire face à nouveau. Je suis prêt·e.",
  },
  {
    type: "---BB---",
    name: "play",
    label: "Je suis de retour!",
  },
  {
    type: "---BB---",
    save: true,
    name: "card.lettre_turn",
    size: "s",
    label:
      "Fort·e de cette expérience, pouvez-vous me dire ce que vous aimeriez vraiment vraiment mettre derrière vous, pour de bon ?",
  },
  {
    type: "SB",
    text: "J'ai trois dernières petites questions",
  },
  {
    type: "---BB---",
    save: true,
    name: "card.lettre_boss",
    size: "s",
    label: "Dans le fond, qui est votre boss ? (ça peut être un pseudo)",
  },
  {
    type: "---BB---",
    save: true,
    name: "card.lettre_blase",
    size: "s",
    label: "Et qui êtes-vous, pour votre boss ?",
  },
  {
    type: "---BB---",
    save: true,
    name: "card.lettre_adresse",
    size: "s",
    label:
      "Où se situe votre boss (vous pouvez donner sa véritable adresse si vous voulez) :",
  },
  {
    type: "---BB---",
    name: "end",
    label: "Conclure",
  },
];
