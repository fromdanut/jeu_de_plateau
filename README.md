# NIBOR VS RIBNO

Application réalisée dans le cadre de l'Activité "Créez un jeu au tour par tour en javascript" sur [openclassrooms](https://openclassrooms.com/courses/creez-un-jeu-de-plateau-tour-par-tour-en-javascript). Visitez le site [web](https://jeu-de-plateau.herokuapp.com/index.html).


## Structure du code.

Il y a 3 éléments principaux :

- Le Controlleur qui coordonne l'action du MaitreDuJeu et de la Page.
- La Page est chargée de modifier le html via le DOM.
- Le MaitreDuJeu gère la logique du jeu (déplacement, combat, etc.).

Chaque composant du jeu hérite du prototype Composant qui permet d'accéder au Controlleur depuis n'importe quel Prototype.

Le Plateau est composé de Cellule qui peuvent être des Armes ou des Obstacles.


## Modification par rapport aux consignes.
Respecte l'ensemble des consignes avec quelques variantes :

- Une cellule qui intervertie les armes des deux joueurs (Echangeur).
- Une cellule qui place le joueurs au hasard sur la carte (Vortex).
- Lors d'un combat, plutôt que de pouvoir défendre, le joueur peut lancer une attaque kamikaze.


## Auteur

* **fromdanut**

Voir aussi la liste des [contributeurs](https://github.com/fromdanut/jeu_de_plateau/graphs/contributors) qui ont participés au projet.

## License

Ce projet est sous licence MIT, voir le fichier [LICENSE.md](https://github.com/fromdanut/jeu_de_plateau/blob/master/LICENCE.md) pour les détails.
