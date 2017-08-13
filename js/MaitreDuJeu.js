/**
  * Prototype du maitre du jeu. C'est lui qui coordonne l'ensemble du jeu.
  * Il place les cellules sur le plateau,
  * fait se déplacer les joueurs, fait les combats.
  */

var MaitreDuJeu = Object.create(Composant);
MaitreDuJeu.plateau = [];

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
  * Place les joueurs au hasard sur le plateau, utilisé dans la méthode init.
  *
  * @returns    {Void}
  */
MaitreDuJeu.placerJoueurs = function(){
    // Stock le nombre de cellule dans une variable 'nbCellule'.
    var nbCellule = this.getControlleur().getParametre().NB_CELLULE;
    this.joueurs.forEach(function(joueur) {
        // Obtenir une position aléatoire sur le plateau.
        var position = Math.floor(Math.random() * nbCellule);
        // S'il n'y a que la cellule sur à cette position (et pas l'autre joueur)
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
    if (position < 0 || position > this.getControlleur().getParametre().NB_CELLULE) {
        console.log("Operation impossible : position hors de la plateau.");
    }
    else {
        // Enlève le joueur de son ancienne position et le met sur sa nouvelle.
        var anciennePosition = joueur.getPosition();
        this.getPlateau()[position].push(this.getPlateau()[anciennePosition].pop());

        // Echange l'arme du joueur avec la cellule s'il s'agit d'une cellule Arme.
        if (Arme.isPrototypeOf(this.getPlateau()[position][0])) {
            var armeTemp = this.getPlateau()[position][0];
            this.getPlateau()[position][0] = joueur.getArme();
            joueur.setArme(armeTemp);
        }
        // Met à jour la position du joueur.
        joueur.setPosition(position);
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

    // Trouve les positions adjacentes au joueur actif.
    var posAdjJActif = this.trouverPositionAdjacente(
        this.getJoueurActif().getPosition(),
        this.getControlleur().getParametre().DISTANCE_DEPLACEMENT
    );

    // Vérifie le type de la cellule ...
    // ...pour chaque direction...
    var cellule;
    for (var i = 0; i < 4; i++) {
        // ...pour chaque position.
        for (var j = 0; j < posAdjJActif[i].length; j++) {
            // Stock la cellule correspondant à la position en cours.
            cellule = this.getPlateau()[posAdjJActif[i][j]][0];
            // Si la cellule correspondante sur le plateau n'est pas un obstacle.
            if (!Obstacle.isPrototypeOf(cellule)) {
                // Rend la cellule accessible.
                cellule.setAccessible(true);
            }
            else {
                // Arrete la boucle pour cette direction : l'obstacle empêche
                // le joueur d'aller plus loin dans cette direction !
                break;
            }
        }
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
* Vérifie si le joueur actif est collé à son advservaire.
*
* @returns	{Boolean}
*/
MaitreDuJeu.verifierCombat = function() {
    var jActif = this.getJoueurActif();
    // Positions adjacentes au joueur actif.
    var posAdjJActif = this.trouverPositionAdjacente(jActif.getPosition());
    // Pour chacune des 4 directions.
    for (var i = 0; i < posAdjJActif.length; i++) {
        // Pour chacune des posision adjacentes au joueur actif.
        for (var j = 0; j < posAdjJActif[i].length; j++) {
            // S'il y un joueur sur cette position adjacente.
            if (this.getPlateau()[posAdjJActif[i][j]].length === 2) {
                return true;
            }
        }
    }
    return false;
}

/**
 * Trouve les positions adjacentes d'une position pour une portée (1, 3, etc.).
 * Retourne une liste de 4 liste de position (nord, sud, ouest, est).
 *
 * @param   {Number} position  La position à partir de laquelle on cherche.
 * @param   {Number} portee    La portée à la quelle on cherche.
 * @returns {Array}            La liste des positions adjacentes [ [nord],
                               [sud], [ouest], [est]].
 */
MaitreDuJeu.trouverPositionAdjacente = function(position, portee=1) {
    var posAdj = [[], [], [], []], posTemp;
    var largeurPlateau = this.getControlleur().getParametre().LARGEUR_PLATEAU;
    // Stocke les limites du plateau en fonction de la position.
    var limiteNord = 0;
    var limiteSud = this.getControlleur().getParametre().NB_CELLULE - 1;
    // Les limites ouest et est sont calculées par rapport à la position.
    var posSplit = String(position).split('');
    posSplit[posSplit.length - 1] = String(0);
    var limiteOuest = posSplit.join('');
    posSplit[posSplit.length - 1] = String(9);
    var limiteEst = posSplit.join('');
    // On cherche dans les 4 directions.
    ['nord', 'sud', 'est', 'ouest'].forEach(function(direction) {
        // Sur une longueur égale à la portée.
        for (var i = 0; i < portee; i++) {
            switch (direction) {
                case 'nord': // Vers le nord.
                    posTemp = position - ((i + 1) * largeurPlateau);
                    if (posTemp >= limiteNord) {
                        posAdj[0].push(posTemp);
                    }
                    break;
                case 'sud': // Vers le sud.
                    posTemp = position + ((i + 1) * largeurPlateau);
                    if (posTemp <= limiteSud) {
                        posAdj[1].push(posTemp);
                    }
                    break;
                case 'ouest': // Vers le ouest.
                    posTemp = position - (i + 1);
                    if (posTemp >= limiteOuest) {
                        posAdj[2].push(posTemp);
                    }
                    break;
                case 'est': // Vers l'est.
                    posTemp = position + (i + 1);
                    if (posTemp <= limiteEst) {
                        posAdj[3].push(posTemp);
                    }
                    break;
                default:
                    break;
            }
        }
    });

    return posAdj;
}

MaitreDuJeu.lancerCombat = function() {
    console.log('lancerCombat');
}

/**
  * Jouer un tour consiste à mettre en oeuvre la demande d'action du joueur
  * actif. Il comprend les étapes suivantes :
  *   - déplacer le joueur.
  *   - vérifie si le joueur actif s'est collé à un advservaire.
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
    // Vérifie si les deux joueurs sont cote à cote, si oui lance le combat.
    var combat = this.verifierCombat();
    if (combat) {
        this.lancerCombat();
    }
    // Incrémente l'attribut tour.
    var newTour = this.getTour() + 1
    this.setTour(newTour);
    // Change le joueur actif.
    this.changerJoueurActif();
    // Calculer les nouvelles cellules accessibles.
    this.genererCelluleAccessible();
    // Redessiner le plateau.
    this.getControlleur().getPage().dessinerPlateau(this.getPlateau());
}
