/**
 * Contenu des pages « missions ».
 *
 * STATUT RÉDACTIONNEL : textes relus et validés par le dirigeant le
 * 11 septembre 2026.
 *
 * Ils décrivent les missions telles qu'elles s'exercent dans le cabinet. Ils ne
 * contiennent volontairement :
 *   — aucun chiffre, délai, tarif ou engagement propre à OFIXIS ;
 *   — aucune référence client ;
 *   — aucun superlatif ni comparaison avec des confrères (art. 152 et 161
 *     du Code de déontologie).
 *
 * Deux missions figurant sur l'ancien site sont volontairement absentes :
 *   — gestion de patrimoine : subordonnée à la vérification des habilitations
 *     (CIF, ORIAS, courtage, carte T) ;
 *   — projets internationaux : subordonnée à la confirmation d'une offre réelle.
 */

export type StatutRedaction = "brouillon" | "valide";

export type Mission = {
  slug: string;
  titre: string;
  titreCourt: string;
  /** Résumé d'une à deux phrases, affiché en tête de page et dans les listes. */
  chapo: string;
  metaTitre: string;
  metaDescription: string;
  /** Intention de recherche principale visée par la page. */
  intention: string;
  pourQui: string[];
  /** Le problème concret que la mission résout, du point de vue du client. */
  probleme: string[];
  contenu: { titre: string; texte: string }[];
  deroulement: { titre: string; texte: string }[];
  livrables: string[];
  questions: { question: string; reponse: string }[];
  missionsLiees: string[];
  statutRedaction: StatutRedaction;
};

export const MISSIONS: Mission[] = [
  {
    slug: "expertise-comptable",
    titre: "Expertise comptable",
    titreCourt: "Expertise comptable",
    chapo:
      "Tenue, révision et établissement des comptes annuels, avec un interlocuteur qui connaît votre dossier et vous explique ce que disent vos chiffres.",
    metaTitre: "Expertise comptable à Levallois-Perret",
    metaDescription:
      "Tenue comptable, révision, bilan et liasse fiscale pour TPE, PME et professions libérales. Cabinet d'expertise comptable à Levallois-Perret.",
    intention:
      "Trouver un expert-comptable pour tenir la comptabilité de son entreprise.",
    pourQui: [
      "TPE et PME de tous secteurs",
      "Professions libérales et indépendants",
      "Sociétés civiles immobilières",
      "Associations soumises à des obligations comptables",
    ],
    probleme: [
      "La comptabilité est souvent vécue comme une obligation administrative : on la subit, on la découvre tard, et le bilan arrive plusieurs mois après la clôture, quand il est trop tard pour agir.",
      "Une comptabilité tenue régulièrement change la nature de l'exercice. Elle devient un outil de décision : savoir où en est la marge, ce que coûte réellement une activité, si la trésorerie tiendra le trimestre.",
    ],
    contenu: [
      {
        titre: "Tenue comptable",
        texte:
          "Enregistrement des opérations, rapprochements bancaires, suivi des comptes clients et fournisseurs. Selon votre organisation, la saisie est assurée par le cabinet ou reste chez vous, avec une supervision régulière.",
      },
      {
        titre: "Révision des comptes",
        texte:
          "Contrôle de cohérence, justification des soldes, traitement des écritures d'inventaire : amortissements, provisions, stocks, charges à payer et produits à recevoir.",
      },
      {
        titre: "Comptes annuels et liasse fiscale",
        texte:
          "Établissement du bilan, du compte de résultat et de l'annexe, puis de la liasse fiscale et de sa télétransmission à l'administration.",
      },
      {
        titre: "Restitution et commentaire",
        texte:
          "Les comptes vous sont présentés et commentés. L'objectif est que vous compreniez vos chiffres, pas seulement que vous les signiez.",
      },
    ],
    deroulement: [
      {
        titre: "Premier échange",
        texte:
          "Nous faisons le point sur votre activité, votre organisation actuelle et vos obligations. Cet échange sert d'abord à vérifier que nous sommes le bon interlocuteur pour vous.",
      },
      {
        titre: "Lettre de mission",
        texte:
          "Le périmètre, les obligations réciproques et les honoraires sont écrits noir sur blanc avant de commencer. Aucune mission ne démarre sans ce document.",
      },
      {
        titre: "Mise en place",
        texte:
          "Récupération du dossier, reprise des à-nouveaux, ouverture des accès et mise en place des échanges de pièces.",
      },
      {
        titre: "Suivi tout au long de l'exercice",
        texte:
          "Traitement régulier des pièces, points d'étape et alertes en cours d'année, plutôt qu'une découverte des difficultés à la clôture.",
      },
      {
        titre: "Clôture",
        texte:
          "Révision, établissement des comptes annuels, liasse fiscale, et rendez-vous de présentation.",
      },
    ],
    livrables: [
      "Comptes annuels : bilan, compte de résultat, annexe",
      "Liasse fiscale et télétransmission",
      "Documents juridiques de l'assemblée d'approbation des comptes",
      "Situations intermédiaires selon la périodicité convenue",
    ],
    questions: [
      {
        question: "Puis-je changer de cabinet en cours d'exercice ?",
        reponse:
          "Oui. Le changement suppose le respect des règles déontologiques entre confrères : le nouveau cabinet contacte le précédent, s'assure qu'aucun honoraire n'est en litige, et récupère le dossier. En pratique, un changement se prépare mais ne pose pas de difficulté particulière.",
      },
      {
        question: "Dois-je saisir moi-même ma comptabilité ?",
        reponse:
          "Cela dépend de votre organisation et de vos moyens. Les deux approches se défendent : la saisie déléguée vous libère du temps, la saisie interne supervisée coûte moins cher en honoraires. Le choix se discute en fonction de votre volume d'opérations.",
      },
      {
        question: "À quel moment de l'année faut-il s'y prendre ?",
        reponse:
          "Il n'y a pas de mauvais moment pour un premier échange. Le passage de relais est simplement plus simple en début d'exercice ou juste après une clôture.",
      },
    ],
    missionsLiees: ["fiscalite", "pilotage-conseil", "paie-rh"],
    statutRedaction: "valide",
  },

  {
    slug: "fiscalite",
    titre: "Fiscalité",
    titreCourt: "Fiscalité",
    chapo:
      "Déclarations fiscales, arbitrages du dirigeant et sécurisation des positions prises, dans le cadre fixé par la loi.",
    metaTitre: "Conseil fiscal pour entreprises et dirigeants",
    metaDescription:
      "Déclarations fiscales, TVA, impôt sur les sociétés, arbitrage rémunération et dividendes. Accompagnement fiscal des entreprises et de leurs dirigeants.",
    intention:
      "Sécuriser ses obligations fiscales et arbitrer entre plusieurs options légales.",
    pourQui: [
      "Dirigeants de société",
      "Entrepreneurs individuels et professions libérales",
      "Sociétés en cours de restructuration",
    ],
    probleme: [
      "La fiscalité française laisse des choix : régime d'imposition, mode de rémunération, traitement d'une plus-value, option pour la TVA. Ces choix se prennent souvent dans l'urgence, sans en mesurer les conséquences à trois ans.",
      "Notre rôle est d'exposer les options, leurs conséquences chiffrées et leurs risques, puis de sécuriser la position retenue par une documentation solide.",
    ],
    contenu: [
      {
        titre: "Obligations déclaratives",
        texte:
          "TVA, impôt sur les sociétés, CFE, CVAE, déclarations de résultats, et le suivi du calendrier qui va avec.",
      },
      {
        titre: "Arbitrages du dirigeant",
        texte:
          "Rémunération ou dividendes, régime social du dirigeant, statut fiscal du conjoint : comparaisons chiffrées sur votre situation réelle.",
      },
      {
        titre: "Opérations particulières",
        texte:
          "Cession d'actifs, changement de régime, apport de titres, restructuration : analyse préalable des conséquences fiscales.",
      },
      {
        titre: "Relations avec l'administration",
        texte:
          "Réponses aux demandes d'information, accompagnement en cas de contrôle, préparation des justificatifs.",
      },
    ],
    deroulement: [
      {
        titre: "Analyse de la situation",
        texte:
          "Examen des données réelles : structure, résultats, situation personnelle du dirigeant, historique fiscal.",
      },
      {
        titre: "Présentation des options",
        texte:
          "Chaque option est présentée avec son chiffrage, son horizon et son niveau de risque. Nous ne recommandons pas de montage dont la sécurité juridique ne serait pas établie.",
      },
      {
        titre: "Mise en œuvre et documentation",
        texte:
          "Une fois la décision prise, les formalités sont accomplies et les justifications documentées, pour être en mesure de les produire ultérieurement.",
      },
    ],
    livrables: [
      "Déclarations fiscales établies et télétransmises",
      "Notes d'analyse chiffrées sur les arbitrages étudiés",
      "Documentation des positions retenues",
    ],
    questions: [
      {
        question: "Optimisation fiscale : jusqu'où peut-on aller ?",
        reponse:
          "L'expert-comptable met en œuvre les dispositions prévues par la loi et documente les choix opérés. Un montage dont l'objet principal serait d'éluder l'impôt expose à l'abus de droit et à des pénalités lourdes. Nous ne nous engageons pas sur ce terrain.",
      },
      {
        question: "Que faire en cas de contrôle fiscal ?",
        reponse:
          "Prévenez votre cabinet dès réception de l'avis. La qualité de la préparation, le respect des délais de réponse et la production ordonnée des justificatifs pèsent lourdement sur l'issue du contrôle.",
      },
    ],
    missionsLiees: [
      "expertise-comptable",
      "transmission-evaluation",
      "juridique",
    ],
    statutRedaction: "valide",
  },

  {
    slug: "paie-rh",
    titre: "Paie et conseil social",
    titreCourt: "Paie et social",
    chapo:
      "Bulletins de paie, déclarations sociales et sécurisation des décisions relatives au personnel.",
    metaTitre: "Gestion de la paie et conseil social",
    metaDescription:
      "Établissement des bulletins de paie, DSN, contrats de travail et conseil social pour les employeurs. Externalisation de la paie.",
    intention: "Externaliser la paie et sécuriser ses obligations d'employeur.",
    pourQui: [
      "Entreprises employant des salariés",
      "Employeurs qui recrutent pour la première fois",
      "Structures dont la convention collective est complexe à appliquer",
    ],
    probleme: [
      "La paie est un domaine où l'erreur coûte cher : redressement URSSAF, contentieux prud'homal, ou simplement perte de confiance du salarié.",
      "Les règles changent souvent, et une convention collective peut prévoir des dispositions plus favorables que le Code du travail. L'enjeu est moins de produire un bulletin que d'appliquer les bonnes règles au bon moment.",
    ],
    contenu: [
      {
        titre: "Bulletins de paie",
        texte:
          "Établissement mensuel des bulletins, calcul des cotisations, gestion des absences, congés, arrêts de travail et éléments variables.",
      },
      {
        titre: "Déclarations sociales",
        texte:
          "Déclaration sociale nominative, événements liés aux arrêts et aux fins de contrat, suivi des échéances.",
      },
      {
        titre: "Entrées et sorties",
        texte:
          "Déclaration préalable à l'embauche, rédaction du contrat, documents de fin de contrat, solde de tout compte.",
      },
      {
        titre: "Conseil social courant",
        texte:
          "Application de la convention collective, durée du travail, rémunération, procédures disciplinaires. Les situations à fort enjeu contentieux relèvent d'un avocat, vers lequel nous vous orientons.",
      },
    ],
    deroulement: [
      {
        titre: "Reprise du dossier social",
        texte:
          "Identification de la convention collective applicable, reprise des cumuls de paie, vérification des contrats en cours.",
      },
      {
        titre: "Cycle mensuel",
        texte:
          "Transmission des variables selon un calendrier fixé, établissement des bulletins, contrôle, mise à disposition et déclarations.",
      },
      {
        titre: "Points annuels",
        texte:
          "Revue des obligations récurrentes et des évolutions réglementaires ayant un effet sur vos paies.",
      },
    ],
    livrables: [
      "Bulletins de paie mensuels",
      "Déclarations sociales nominatives",
      "Contrats de travail et documents de fin de contrat",
      "Journal de paie et états de charges",
    ],
    questions: [
      {
        question: "Comment se répartissent les responsabilités ?",
        reponse:
          "L'employeur reste responsable des décisions qu'il prend et des informations qu'il transmet. Le cabinet répond de la correcte application des règles aux éléments qui lui sont communiqués. Cette répartition figure dans la lettre de mission.",
      },
      {
        question: "Puis-je externaliser seulement une partie de la paie ?",
        reponse:
          "Oui. Certaines entreprises saisissent les variables elles-mêmes dans un outil partagé, le cabinet assurant le contrôle et les déclarations. D'autres délèguent l'ensemble. Le choix dépend de vos effectifs et de vos ressources internes.",
      },
    ],
    missionsLiees: ["expertise-comptable", "juridique", "pilotage-conseil"],
    statutRedaction: "valide",
  },

  {
    slug: "audit-commissariat-aux-comptes",
    titre: "Audit et commissariat aux comptes",
    titreCourt: "Audit et CAC",
    chapo:
      "Certification des comptes annuels et missions d'audit contractuel, exercées dans le respect des règles d'indépendance.",
    metaTitre: "Commissariat aux comptes et audit contractuel",
    metaDescription:
      "Certification des comptes annuels, audit légal et audit contractuel. Commissaire aux comptes inscrit près la Cour d'appel.",
    intention:
      "Nommer un commissaire aux comptes ou faire réaliser un audit contractuel.",
    pourQui: [
      "Sociétés dépassant les seuils de nomination obligatoire",
      "Sociétés nommant volontairement un commissaire aux comptes",
      "Groupes ayant une obligation au niveau consolidé",
      "Investisseurs ou repreneurs souhaitant un audit contractuel",
    ],
    probleme: [
      "Le commissariat aux comptes est souvent perçu comme une contrainte imposée par un seuil. Sa fonction est pourtant précise : donner à des tiers — associés, banques, investisseurs, partenaires — une assurance indépendante sur la fiabilité des comptes.",
      "Cette mission obéit à des normes d'exercice professionnel strictes et à des règles d'indépendance qui interdisent au commissaire aux comptes d'exercer, pour la même entité, une mission d'expertise comptable.",
    ],
    contenu: [
      {
        titre: "Audit légal",
        texte:
          "Certification des comptes annuels : appréciation du contrôle interne, contrôle des postes significatifs, vérifications spécifiques prévues par la loi, puis rapport à l'assemblée.",
      },
      {
        titre: "Audit contractuel",
        texte:
          "Mission d'audit demandée en dehors de toute obligation légale : à l'occasion d'une acquisition, d'une entrée au capital ou d'une demande d'un partenaire financier.",
      },
      {
        titre: "Interventions définies par la loi",
        texte:
          "Attestations, rapports sur opérations particulières, interventions liées aux augmentations de capital ou aux transformations de société.",
      },
    ],
    deroulement: [
      {
        titre: "Acceptation de la mission",
        texte:
          "Vérification préalable de l'absence de situation portant atteinte à l'indépendance, puis acceptation formalisée.",
      },
      {
        titre: "Prise de connaissance et planification",
        texte:
          "Compréhension de l'activité et de son environnement, identification des risques d'anomalies significatives, définition du plan de mission.",
      },
      {
        titre: "Travaux intérimaires",
        texte:
          "Appréciation du contrôle interne et contrôles en cours d'exercice, qui allègent la phase finale.",
      },
      {
        titre: "Contrôle des comptes",
        texte:
          "Travaux sur les comptes annuels après clôture, sur la base du plan de mission.",
      },
      {
        titre: "Rapports",
        texte:
          "Émission des rapports destinés à l'assemblée générale et communication des observations à la direction.",
      },
    ],
    livrables: [
      "Rapport sur les comptes annuels",
      "Rapport spécial sur les conventions réglementées",
      "Communication des faiblesses relevées dans le contrôle interne",
    ],
    questions: [
      {
        question: "À partir de quand la nomination est-elle obligatoire ?",
        reponse:
          "Elle dépend du dépassement de seuils, appréciés différemment selon la forme de la société et selon l'appartenance à un groupe. Ces seuils sont révisés périodiquement : la question mérite d'être vérifiée sur votre situation à jour plutôt que sur une valeur mémorisée.",
      },
      {
        question:
          "Le même cabinet peut-il tenir ma comptabilité et certifier mes comptes ?",
        reponse:
          "Non. Les règles d'indépendance l'interdisent : on ne peut pas contrôler des comptes que l'on a soi-même établis. Lorsque nous intervenons comme commissaire aux comptes, la mission d'expertise comptable est nécessairement confiée à un autre professionnel.",
      },
      {
        question: "Pourquoi nommer volontairement un commissaire aux comptes ?",
        reponse:
          "Pour donner de la crédibilité aux comptes vis-à-vis d'un tiers : préparation d'une levée de fonds, entrée d'un nouvel associé, exigence d'un partenaire bancaire, ou volonté d'un actionnaire minoritaire d'obtenir une assurance indépendante.",
      },
    ],
    missionsLiees: ["expertise-comptable", "transmission-evaluation"],
    statutRedaction: "valide",
  },

  {
    slug: "creation-reprise",
    titre: "Création et reprise d'entreprise",
    titreCourt: "Création et reprise",
    chapo:
      "Choix de la forme juridique, prévisionnel financier et formalités de démarrage, jusqu'aux premiers mois d'activité.",
    metaTitre: "Création et reprise d'entreprise : accompagnement",
    metaDescription:
      "Choix du statut juridique, prévisionnel financier, formalités de constitution et accompagnement des premiers mois d'activité.",
    intention:
      "Créer ou reprendre une entreprise en choisissant la bonne structure.",
    pourQui: [
      "Porteurs de projet",
      "Professionnels s'installant à leur compte",
      "Repreneurs d'un fonds de commerce ou de titres de société",
    ],
    probleme: [
      "Les décisions prises au démarrage sont structurantes et coûteuses à corriger : forme juridique, régime fiscal, statut social du dirigeant, répartition du capital entre associés.",
      "Elles se prennent pourtant souvent vite, sur la foi d'un article générique, alors qu'elles dépendent de votre situation personnelle, de votre besoin de revenu immédiat et de vos projets à trois ans.",
    ],
    contenu: [
      {
        titre: "Choix de la structure",
        texte:
          "Comparaison chiffrée entre les formes envisageables, en tenant compte du régime fiscal, du statut social du dirigeant, de la protection du patrimoine et de l'entrée éventuelle d'associés.",
      },
      {
        titre: "Prévisionnel financier",
        texte:
          "Construction d'un compte de résultat prévisionnel, d'un plan de financement et d'un prévisionnel de trésorerie exploitables devant une banque.",
      },
      {
        titre: "Formalités de constitution",
        texte:
          "Rédaction des statuts, dépôt du capital, immatriculation et déclarations initiales.",
      },
      {
        titre: "Reprise",
        texte:
          "Analyse des comptes de la cible, identification des points de vigilance, aide à la construction du montage de reprise et à sa présentation aux financeurs.",
      },
      {
        titre: "Premiers mois",
        texte:
          "Mise en place des obligations courantes et points d'étape rapprochés, période où les écarts avec le prévisionnel se corrigent encore facilement.",
      },
    ],
    deroulement: [
      {
        titre: "Rendez-vous de cadrage",
        texte:
          "Présentation du projet, de votre situation personnelle et de votre horizon. C'est ce rendez-vous qui détermine les options à étudier.",
      },
      {
        titre: "Étude comparative",
        texte:
          "Chiffrage des scénarios envisageables, avec leurs conséquences fiscales et sociales sur plusieurs exercices.",
      },
      {
        titre: "Décision et formalités",
        texte:
          "Une fois la structure retenue, les formalités sont accomplies et le dossier bancaire préparé si nécessaire.",
      },
    ],
    livrables: [
      "Note comparative chiffrée des structures envisageables",
      "Prévisionnel financier sur trois exercices",
      "Statuts et dossier d'immatriculation",
    ],
    questions: [
      {
        question: "Micro-entreprise, EURL ou SASU : comment trancher ?",
        reponse:
          "Il n'existe pas de réponse valable pour tout le monde. L'arbitrage dépend du chiffre d'affaires attendu, du niveau de charges réelles, du besoin de revenu immédiat, de la couverture sociale souhaitée et de la perspective d'ouvrir le capital. Un chiffrage sur votre situation tranche généralement la question en un rendez-vous.",
      },
      {
        question: "À quel moment consulter un expert-comptable ?",
        reponse:
          "Avant l'immatriculation. Une fois la société créée, certains choix ne sont plus modifiables sans coût, notamment en matière d'option fiscale.",
      },
    ],
    missionsLiees: ["fiscalite", "juridique", "pilotage-conseil"],
    statutRedaction: "valide",
  },

  {
    slug: "pilotage-conseil",
    titre: "Pilotage et conseil de gestion",
    titreCourt: "Pilotage et conseil",
    chapo:
      "Tableaux de bord, suivi de trésorerie et prévisionnels, pour décider sur des chiffres à jour plutôt que sur une impression.",
    metaTitre: "Pilotage d'entreprise et conseil de gestion",
    metaDescription:
      "Tableaux de bord, prévisionnel de trésorerie, analyse de marge et situations intermédiaires pour piloter son entreprise.",
    intention:
      "Disposer d'indicateurs fiables pour piloter son activité en cours d'année.",
    pourQui: [
      "Dirigeants qui décident sans visibilité chiffrée en cours d'exercice",
      "Entreprises en croissance ou en tension de trésorerie",
      "Structures ayant plusieurs activités ou plusieurs sites",
    ],
    probleme: [
      "Le bilan arrive plusieurs mois après la clôture. À ce moment-là, il documente des décisions déjà prises et des difficultés déjà installées.",
      "Un suivi en cours d'année, même simple, change l'horizon de décision : on voit venir une tension de trésorerie, on identifie une activité qui ne couvre pas ses coûts, on ajuste avant que l'écart ne se creuse.",
    ],
    contenu: [
      {
        titre: "Tableaux de bord",
        texte:
          "Un petit nombre d'indicateurs réellement suivis, choisis avec vous en fonction de votre activité, plutôt qu'un rapport exhaustif que personne ne lit.",
      },
      {
        titre: "Suivi de trésorerie",
        texte:
          "Prévisionnel de trésorerie glissant, identification des points de tension et anticipation des besoins de financement.",
      },
      {
        titre: "Analyse de rentabilité",
        texte:
          "Analyse de la marge par activité, par site ou par type de client, pour identifier ce qui contribue réellement au résultat.",
      },
      {
        titre: "Situations intermédiaires",
        texte:
          "Comptes établis en cours d'exercice, à la périodicité convenue, pour disposer de chiffres fiables sans attendre la clôture.",
      },
    ],
    deroulement: [
      {
        titre: "Définition des indicateurs",
        texte:
          "Nous partons de vos décisions récurrentes pour déterminer quels chiffres vous seraient réellement utiles, et à quelle fréquence.",
      },
      {
        titre: "Mise en place",
        texte:
          "Organisation de la remontée d'informations et construction des états, à partir de la comptabilité existante.",
      },
      {
        titre: "Points périodiques",
        texte:
          "Revue des écarts et de leurs causes, puis décisions à prendre. La valeur est dans la discussion, pas dans l'envoi du document.",
      },
    ],
    livrables: [
      "Tableau de bord à la périodicité convenue",
      "Prévisionnel de trésorerie",
      "Situations comptables intermédiaires",
      "Analyse de marge",
    ],
    questions: [
      {
        question: "Est-ce utile pour une petite structure ?",
        reponse:
          "Souvent davantage que pour une grande. Une petite entreprise a moins de réserves pour absorber une erreur d'appréciation ; quelques indicateurs suivis mensuellement suffisent généralement.",
      },
      {
        question: "Faut-il changer d'outil comptable ?",
        reponse:
          "Pas nécessairement. Le suivi se construit d'abord à partir de la comptabilité existante. Un changement d'outil ne se justifie que s'il résout un problème identifié.",
      },
    ],
    missionsLiees: ["expertise-comptable", "fiscalite", "creation-reprise"],
    statutRedaction: "valide",
  },

  {
    slug: "transmission-evaluation",
    titre: "Transmission et évaluation",
    titreCourt: "Transmission et évaluation",
    chapo:
      "Évaluation d'entreprise, préparation d'une cession ou d'une transmission, et accompagnement jusqu'à la signature.",
    metaTitre: "Évaluation d'entreprise, cession et transmission",
    metaDescription:
      "Évaluation d'entreprise, préparation de la cession, audit d'acquisition et accompagnement de la transmission familiale.",
    intention: "Céder, transmettre ou évaluer une entreprise.",
    pourQui: [
      "Dirigeants préparant une cession à moyen terme",
      "Dirigeants organisant une transmission familiale",
      "Repreneurs souhaitant sécuriser une acquisition",
      "Associés ayant besoin d'une évaluation contradictoire",
    ],
    probleme: [
      "Une cession se prépare des années à l'avance. La valeur d'une entreprise dépend de sa rentabilité, mais aussi de sa capacité à fonctionner sans son dirigeant, de la qualité de sa documentation et de la propreté de sa situation juridique et fiscale.",
      "Les cessions qui se passent mal se jouent rarement sur le prix : elles achoppent sur des points découverts trop tard pendant l'audit d'acquisition.",
    ],
    contenu: [
      {
        titre: "Évaluation",
        texte:
          "Mise en œuvre de plusieurs méthodes d'évaluation, analyse de leurs écarts et des raisons de ces écarts, plutôt qu'un chiffre unique présenté sans discussion.",
      },
      {
        titre: "Préparation de la cession",
        texte:
          "Identification des points susceptibles d'être relevés en audit, mise en ordre des dossiers et arbitrages fiscaux à opérer en amont.",
      },
      {
        titre: "Accompagnement de l'opération",
        texte:
          "Assistance pendant les échanges avec l'acquéreur et ses conseils, analyse des conséquences des clauses financières, coordination avec l'avocat rédacteur des actes.",
      },
      {
        titre: "Audit d'acquisition",
        texte:
          "Du côté du repreneur : examen des comptes de la cible, identification des risques et des retraitements à opérer sur le prix.",
      },
      {
        titre: "Transmission familiale",
        texte:
          "Analyse des schémas de transmission, de leurs conséquences fiscales et de leur articulation avec la situation patrimoniale, en lien avec le notaire.",
      },
    ],
    deroulement: [
      {
        titre: "Diagnostic préalable",
        texte:
          "État des lieux de l'entreprise et de votre horizon : à quelle échéance, à qui, avec quel objectif après l'opération.",
      },
      {
        titre: "Évaluation et préparation",
        texte:
          "Travaux d'évaluation, puis identification et traitement des points de vigilance.",
      },
      {
        titre: "Phase de négociation",
        texte:
          "Assistance technique pendant les échanges, jusqu'à la signature.",
      },
    ],
    livrables: [
      "Rapport d'évaluation détaillant les méthodes retenues",
      "Note des points de vigilance identifiés",
      "Analyse chiffrée des conséquences fiscales de l'opération",
    ],
    questions: [
      {
        question: "Combien de temps faut-il pour préparer une cession ?",
        reponse:
          "Cela dépend de l'état de préparation de l'entreprise. Certains arbitrages fiscaux ne produisent leur effet qu'après un délai de détention, ce qui plaide pour anticiper plutôt que pour décider dans l'urgence.",
      },
      {
        question: "Qui intervient aux côtés de l'expert-comptable ?",
        reponse:
          "Selon l'opération : un avocat pour la rédaction des actes, un notaire en cas de transmission familiale ou d'immobilier, éventuellement un conseil en fusions-acquisitions pour la recherche de contreparties. Nous travaillons en coordination avec ces intervenants.",
      },
    ],
    missionsLiees: [
      "audit-commissariat-aux-comptes",
      "fiscalite",
      "juridique",
    ],
    statutRedaction: "valide",
  },

  {
    slug: "juridique",
    titre: "Juridique",
    titreCourt: "Juridique",
    chapo:
      "Secrétariat juridique annuel et actes courants de la vie des sociétés, dans le cadre accessoire à la mission comptable.",
    metaTitre: "Secrétariat juridique des sociétés",
    metaDescription:
      "Approbation des comptes, assemblées générales, modifications statutaires et formalités courantes de la vie des sociétés.",
    intention:
      "Faire assurer le suivi juridique courant de sa société.",
    pourQui: [
      "Sociétés devant tenir leur assemblée d'approbation des comptes",
      "Sociétés procédant à une modification statutaire",
      "Dirigeants souhaitant regrouper suivi comptable et suivi juridique",
    ],
    probleme: [
      "Le formalisme juridique des sociétés est régulièrement négligé : registres non tenus, assemblées non documentées, décisions non formalisées. Ces manques ne se voient pas au quotidien — ils se révèlent lors d'un audit d'acquisition ou d'un contrôle, au pire moment.",
    ],
    contenu: [
      {
        titre: "Approbation annuelle des comptes",
        texte:
          "Convocation, rapport de gestion lorsqu'il est requis, procès-verbal d'assemblée, affectation du résultat et dépôt des comptes.",
      },
      {
        titre: "Modifications statutaires courantes",
        texte:
          "Transfert de siège, changement de dirigeant, modification de l'objet ou du capital : rédaction des actes et accomplissement des formalités.",
      },
      {
        titre: "Suivi des registres",
        texte:
          "Tenue des registres obligatoires et conservation ordonnée des actes de la société.",
      },
    ],
    deroulement: [
      {
        titre: "Revue annuelle",
        texte:
          "Point sur les échéances juridiques de l'exercice et sur les décisions à formaliser.",
      },
      {
        titre: "Rédaction et formalités",
        texte:
          "Établissement des actes, recueil des signatures et dépôt auprès des organismes compétents.",
      },
    ],
    livrables: [
      "Procès-verbaux d'assemblée et actes associés",
      "Justificatifs de dépôt des comptes annuels",
      "Registres à jour",
    ],
    questions: [
      {
        question: "L'expert-comptable peut-il traiter toutes les questions juridiques ?",
        reponse:
          "Non. Les consultations juridiques et la rédaction d'actes par un expert-comptable ne sont admises que si elles se rattachent directement aux travaux comptables dont il est chargé. Un contentieux, un contrat commercial complexe ou une opération de haut de bilan relèvent d'un avocat, vers lequel nous vous orientons.",
      },
      {
        question: "Que se passe-t-il si les comptes ne sont pas déposés ?",
        reponse:
          "Le dépôt des comptes annuels est une obligation légale, dont le non-respect peut donner lieu à une injonction et à des sanctions. C'est aussi un signal négatif pour vos partenaires financiers, qui consultent ces informations.",
      },
    ],
    missionsLiees: ["expertise-comptable", "creation-reprise", "paie-rh"],
    statutRedaction: "valide",
  },
];

export function trouverMission(slug: string): Mission | undefined {
  return MISSIONS.find((mission) => mission.slug === slug);
}
