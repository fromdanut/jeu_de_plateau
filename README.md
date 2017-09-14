# NIBOR VS RIBNO

Application réalisée dans le cadre de l'Activité "Créez un jeu au tour par tour en javascript" sur [openclassrooms](https://openclassrooms.com/courses/creez-un-jeu-de-plateau-tour-par-tour-en-javascript)

## Structure du code.

Le code fonctionne avec 3 éléments principaux :

- Controlleur qui coordonne l'action du MaitreDuJeu et de la Page.
- La Page est chargé modifier le html via le DOM.
- Le MaitreDuJeu gère la logique du jeu (déplacement, combat, etc.).

Chaque composant du jeu hérite du prototype Composant qui permet d'accéder au Controlleur depuis n'importe quelle Prototype.

Le Plateau est composé de Cellule qui peuvent être des Armes, des Obstacles.


## Modification par rapport aux consignes.


Respecte l'ensemble des consignes avec quelques variantes :

- Une cellule qui intervertie les armes des deux joueurs (Echangeur).
- Une cellule qui place le joueurs au hasard sur la carte (Vortex).
- Lors d'un combat, plutôt que de pouvoir defendre, le joueur peut lancer une attaque kamikaze.
