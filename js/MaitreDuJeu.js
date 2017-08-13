/**
  * Prototype du maitre du jeu. C'est lui qui coordonne l'ensemble du jeu.
  * Il place les cellules sur le plateau,
  * fait se déplacer les joueurs, fait les combats.
  */

var MaitreDuJeu = Object.create(Composant);
MaitreDuJeu. plateau = [];

MaitreDuJeu.LARGEUR_PLATEAU  = 10;
MaitreDuJeu.NB_CASE = 100;
MaitreDuJeu.NB_JOUEUR = 2;
MaitreDuJeu.NB_ARME = 3;
MaitreDuJeu.NB_OBSTACLE = 12;
MaitreDuJeu.NB_CASE_VIDE = 85;

MaitreDuJeu.init = function(controlleur, plateau, joueurs) {
    this.initComposant(controlleur);
    this.tour = 0;
    this.setPlateau(plateau);
    this.setJoueurs(joueurs);
    this.placerJoueurs();
    this.genererCelluleAccessible();
}

MaitreDuJeu.getTour = function() {
    return this.tour;
}

MaitreDuJeu.setTour = function(tour) {
    if (typeof tour === 'number') {
        this.tour = tour;
    }
    else {
        console.log("Operation impossible : argument tour invalide.");
    }
}

MaitreDuJeu.getJoueurs = function() {
    return this.joueurs;
}

MaitreDuJeu.setJoueurs = function(joueurs) {
    if (joueurs instanceof Array) {
        joueurs.forEach(function(joueur) {
            if (!Joueur.isPrototypeOf(joueur)) {
                console.log("Operation impossible  : argument joueur invalide.");
                return false
            }
        });
        this.joueurs = joueurs;
    }
    else {
        console.log("Operation impossible : argument joueurs invalide.");
    }
}

MaitreDuJeu.getPlateau = function() {
    return this.plateau;
}

MaitreDuJeu.setPlateau = function(plateau) {
    if (plateau instanceof Array) {
        plateau.forEach(function(conteneur) {
            if (conteneur instanceof Array) {
                if (!Cellule.isPrototypeOf(conteneur[0])) {
                    console.log("Operation impossible : argument cellule invalide.");
                    return false;
                }
            }
            else {
                console.log("Operation impossible : argument conteneur invalide.");
                return false;
            }
        });
        this.plateau = plateau;
    }
    else {
        console.log("Operation impossible : argument plateau invalide.");
        return false;
    }
}

/**
  * Place les joueurs au hasard sur le plateau.
  *
  * @returns    {Void}
  */
MaitreDuJeu.placerJoueurs = function(){
    this.joueurs.forEach(function(joueur) {
        // Obtenir une position aléatoire sur 100 (normalement sur NB_CASE)
        var position = Math.floor(Math.random() * 100);

        // S'il n'y a qu'une cellule sur à cette position (et pas l'autre joueur)
        if (this.plateau[position].length === 1) {
            this.plateau[position].push(joueur);
            // Met à jour la position du joueur.
            joueur.setPosition(position);
        }
    });
}

/**
  * Trouve le joueur actif.
  *
  * @returns	{Joueur}			Le joueur avec l'attribut actif à True.
  */
MaitreDuJeu.getJoueurActif = function() {
    for (var i = 0; i < this.joueurs.length; i++) {
        if (this.joueurs[i].getActif()) {
            return this.joueurs[i];
        }
    }
}

/**
  * Déplace un joueur sur une position du plateau.
  *
  * @param	    {Joueur}	joueur	    Le joueur à déplacer.
  * @param	    {Number}	position	La position (indice du tableau plateau).
  * @returns	{Void}
  */
MaitreDuJeu.deplacer = function(joueur, position) {
    // Vérifie qu'on passe un prototype de Joueur en argument.
    if (!Joueur.isPrototypeOf(joueur)) {
        console.log("Operation impossible : argument joueur invalide.");
        return false;
    }
    // Vérifie qu'on passe un prototype de Plateau en argument.
    if (typeof position !== 'number') {
        console.log("Operation impossible : argument position invalide.");
        return false;
    }
    // Vérifie que la position est dans les limites du plateau.
    if (position < 0 || position > this.NB_CASE) {
        console.log("Operation impossible : position hors de la plateau.");
    }
    else {
        // Enlève le joueur de son ancienne position et le met sur sa nouvelle.
        var anciennePosition = joueur.getPosition();
        this.getPlateau()[position].push(this.getPlateau()[anciennePosition].pop());
        // Met à jour la position du joueur.
        joueur.setPosition(position);
    }
}

/**
  * Rend les cellules accessible dans une direction par rapport à la
  * position d'un joueur.
  *
  * @param	    {String}	direction	La direction  (nord, sud, est, ouest).
  * @param	    {Number}	position	La position du joueur.
  * @returns	{Void}
  */
MaitreDuJeu.explorer = function(direction, position) {
    for (var i = 1; i < this.getControlleur().getParametre().DISTANCE_DEPLACEMENT + 1; i++) {
        // Limites des positions.
        var min = 0
        var max = 99
        var posSplit = String(position).split('');
        // Redéfini min/max si besoin et calcule position cible pour chaque direction.
        switch (direction) {
            case "n":
                var indice = position - (i * 10);
                break;
            case "s":
                var indice = position + (i * 10);
                break;
            case "e":
                // pos = 16 --> max = 19
                posSplit[posSplit.length - 1] = String(9);
                max = posSplit.join('');
                var indice = position + i;
                break;
            case "o":
                // pos = 16 --> min = 10
                posSplit[posSplit.length - 1] = String(0);
                min = posSplit.join('');
                var indice = position - i;
                break;
            default:
                console.log("Operation impossible : argument direction invalide.");
        }


        // Stop l'exploration si l'indice pointe en dehors des limites du plateau
        if (indice > max || indice < min) {
            break;
        }

        // Stop l'exploration si l'indice pointe en dehors des limites du plateau
        var cellule = this.getPlateau()[indice][0];
        if (Obstacle.isPrototypeOf(cellule)) {
            break;
        }

        // Rend la cellule accessible.
        cellule.setAccessible(true);
    }
}

/**
  * Met à innaccessible toutes les cellules vides puis recalcule les cellules
  * vides accessibles pour le joueur actif.
  *
  * @returns	{Void}
  */
MaitreDuJeu.genererCelluleAccessible = function() {
    // Rend innaccessible toutes les cellules.
    this.getPlateau().forEach(function(conteneur) {
        var cellule = conteneur[0]
        if (cellule.getAccessible()) {
            cellule.setAccessible(false);
        }
    });

    // Trouver la position du joueur actif
    var joueurActif = this.getJoueurActif();
    var positionJoueur = joueurActif.getPosition();

    // Parcours les quatres direction = nord, sud, est et ouest.
    var directions = ["n", "s", "e", "o"];
    for (var i = 0; i < directions.length; i++) {
        this.explorer(directions[i], positionJoueur);
    }
}

/**
  * Modifie le joueur actif. Attention, ne fonctionne que pour 2 joueurs !
  *
  * @returns	{Void}
  */
MaitreDuJeu.changerJoueurActif = function() {
    this.getJoueurs().forEach(function(joueur) {
        if (joueur.getActif()) {
            joueur.setActif(false);
        }
        else {
            joueur.setActif(true);
        }
    });
}

/**
  * Jouer un tour consiste à mettre en oeuvre la demande d'action du joueur
  * actif. Il comprend les étapes suivantes :
  *   - déplacer le joueur.
  *   - incrémenter l'attribut tour.
  *   - changer le joueur actif.
  *   - générer les nouvelles cellules accessibles.
  *   - enfin demander au page générateur de déssiner le nouveau plateau.
  *
  * @param	    {Number}	position	La position du joueur.
  * @returns	{Void}
  */
MaitreDuJeu.jouerTour = function(position) {
    if (typeof position ==! 'number') {
        console.log("Operation impossible : argument position invalide.");
        return false;
    }
    // Déplacer le joueur actif sur sa nouvelle position
    this.deplacer(this.getJoueurActif(), position);
    // Incrémente l'attribut tour.
    var newTour = this.getTour() + 1
    this.setTour(newTour);
    // Change le joueur actif.
    this.changerJoueurActif();
    // Calculer les nouvelles cellules accessibles.
    this.genererCelluleAccessible();
    // Redessiner le plateau.
    this.getControlleur().getPageGenerateur().dessinerPlateau(this.getPlateau());
}
