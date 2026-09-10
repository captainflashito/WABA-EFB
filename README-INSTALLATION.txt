OPS CENTER — VERSION 22

INSTALLATION SUR GITHUB PAGES

1. Ouvrez le dépôt GitHub qui héberge l'application.
2. Déposez index.html, sw.js, manifest.webmanifest et ops-icon.svg à la racine du dépôt.
3. Déposez le dossier data complet à la même racine. Ne sortez pas ses fichiers du dossier data.
4. Remplacez les anciens fichiers lorsqu'ils portent le même nom.
5. Attendez la fin du déploiement GitHub Pages, puis ouvrez l'application avec ?v=22 ajouté à l'adresse.
6. Sur Safari, rechargez une fois la page. Si une ancienne version persiste, fermez l'onglet puis rouvrez l'adresse avec ?v=22.

IMPORTANT

- Ne placez jamais une clé Anthropic ou ElevenLabs dans index.html.
- Le Worker Cloudflare reste nécessaire pour les fonctions IA, météo, SimBrief et voix.
- Cette application est destinée à la simulation uniquement. Elle n'est pas certifiée pour préparer ou conduire un vol réel.

PRINCIPALES NOUVEAUTÉS V22

- briefing OFP complet en six séquences vocales courtes ;
- reprise automatique au bon endroit après une coupure ou avec la commande « continue » ;
- validation du briefing seulement après la dernière séquence ;
- messages ACARS courts, structurés et sans répétition d’en-tête ;
- priorités ACARS recalibrées : URGENT réservé aux urgences déclarées ;
- appels entrants conservant le motif et le contexte du vol ;
- rappels OPS réellement programmés lorsqu’un dispatcher promet de revenir vers l’équipage ;
- meilleure compréhension de PAX, Zulu, niveaux de vol et alphabet OACI ;
- registre téléphonique cohérent et ACARS adressé à l’équipage ou au numéro de vol.
