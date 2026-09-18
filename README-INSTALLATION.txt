OPS CENTER — VERSION 23

INSTALLATION SUR GITHUB PAGES

1. Ouvrez le dépôt GitHub qui héberge l'application.
2. Déposez index.html, sw.js, manifest.webmanifest et ops-icon.svg à la racine du dépôt.
3. Déposez le dossier data complet à la même racine. Ne sortez pas ses fichiers du dossier data.
4. Remplacez les anciens fichiers lorsqu'ils portent le même nom.
5. Attendez la fin du déploiement GitHub Pages, puis ouvrez l'application avec ?v=23 ajouté à l'adresse.
6. Sur Safari, rechargez une fois la page. Si une ancienne version persiste, fermez l'onglet puis rouvrez l'adresse avec ?v=23.

IMPORTANT

- Ne placez jamais une clé Anthropic ou ElevenLabs dans index.html.
- Le Worker Cloudflare reste nécessaire pour les fonctions IA, météo, SimBrief et voix.
- Cette application est destinée à la simulation uniquement. Elle n'est pas certifiée pour préparer ou conduire un vol réel.

PRINCIPALES NOUVEAUTÉS V23

- choix automatique, court-, moyen-, long-courrier ou mixte ;
- sélection de plusieurs aéroports souhaités par code OACI ;
- destinations préférées ou obligatoires, dans l’ordre saisi ou optimisé par les OPS ;
- politique de retour base : si possible, obligatoire ou non imposée ;
- cohérence renforcée entre le type d’avion et la longueur des secteurs ;
- un A380 en mode automatique reste désormais sur un programme long-courrier ;
- validation des pistes, du rayon d’action et du duty avant attribution ;
- profil de compte local et sauvegarde de plusieurs configurations compagnie ;
- conservation du type d’exploitation, de l’avion, de la base et des préférences par profil ;
- correction de la restauration des sessions sauvegardées au format actuel.

Les profils sont enregistrés uniquement sur l’appareil utilisé. La synchronisation Mac/iPad, l’authentification et les abonnements seront reliés ultérieurement à un service de compte sécurisé.
