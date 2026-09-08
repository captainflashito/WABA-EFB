OPS CENTER — VERSION 21

INSTALLATION SUR GITHUB PAGES

1. Ouvrez le dépôt GitHub qui héberge l'application.
2. Déposez index.html, sw.js, manifest.webmanifest et ops-icon.svg à la racine du dépôt.
3. Déposez le dossier data complet à la même racine. Ne sortez pas ses fichiers du dossier data.
4. Remplacez les anciens fichiers lorsqu'ils portent le même nom.
5. Attendez la fin du déploiement GitHub Pages, puis ouvrez l'application avec ?v=21 ajouté à l'adresse.
6. Sur Safari, rechargez une fois la page. Si une ancienne version persiste, fermez l'onglet puis rouvrez l'adresse avec ?v=21.

IMPORTANT

- Ne placez jamais une clé Anthropic ou ElevenLabs dans index.html.
- Le Worker Cloudflare reste nécessaire pour les fonctions IA, météo, SimBrief et voix.
- Cette application est destinée à la simulation uniquement. Elle n'est pas certifiée pour préparer ou conduire un vol réel.

PRINCIPALES NOUVEAUTÉS

- mémoire OPS persistante entre les appels et les messages ACARS ;
- compréhension des codes OACI prononcés avec l'alphabet aéronautique ;
- OFP SimBrief verrouillé au départ et amendements séparés en vol ;
- ACARS structuré par catégorie, priorité, action, réponse et source ;
- appels entrants des OPS pendant les périodes au sol ;
- 12 scénarios réguliers, 12 cargo et 12 opérations à la demande ;
- majorité de secteurs nominaux et maximum d'un événement majeur en mode normal ;
- traitement des informations équipage, ATC, IVAO et VATSIM avec priorité sur le scénario ;
- prononciation vocale corrigée et traitement accéléré.
