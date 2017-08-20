/**
  * Prototype du maitre du jeu. C'est lui qui coordonne l'ensemble du jeu.
  * Il place les cellules sur le plateau,
  * fait se déplacer les joueurs, gère les combats.
  */

var MaitreDuJeu = Object.create(Composant);
MaitreDuJeu.plateau = [];

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
  * Place un joueur au hasard.
  *
  * @param      {Joueur}    joueur  Un des deux joueurs.
  * @returns    {Void}
  */
MaitreDuJeu.placerAuHasard = function(joueur) {
    // Stock le nombre de cellule dans une variable 'nbCellule'.
    var nbCellule = this.getControlleur().getParametre().NB_CELLULE;
    while (true) {
        // Obtenir une position aléatoire sur le plateau.
        var position = Math.floor(Math.random() * nbCellule);
        // Si ca correspond à une cellule sans joueur dessus...
        if (this.plateau[position].length === 1) {
            // ... et vide (ni arme, ni obstacle).
            if (Vide.isPrototypeOf(this.plateau[position][0])) {
                    this.plateau[position].push(joueur);
                    // Met à jour la position du joueur.
                    joueur.setPosition(position);
                    break;
            }
        }
    }
}

/**
  * Place les deux joueurs au hasard sur le plateau, uen vérifiant qu'ils ne
  * soient pas cote à cote.
  *
  * @returns    {Void}
  */
MaitreDuJeu.placerJoueurs = function(){
    // Place les deux joueurs au hasard sur le plateau.
    this.placerAuHasard(this.getJoueurActif());
    this.placerAuHasard(this.getJoueurActif(false));
    // Vérifie qu'ils ne sont pas cote à cote.
    while (true) {
        if (this.verifierCombat()) {
            // Enlève le joueur actif de sa position.
            this.plateau[this.getJoueurActif().getPosition()].pop();
            // Le replace au hasard sur le plateau.
            this.placerAuHasard(this.getJoueurActif());
        }
        else {
            break;
        }
    }
}

/**
  * Trouve le joueur actif par défaut, si actif = false, retourne le joueur
  * inactif.
  *
  * @param      {Boolean}    actif
  * @returns	{Joueur}
  */
MaitreDuJeu.getJoueurActif = function(actif=true) {
    if (this.getJoueurs()[0].getActif()) {
        if (actif) {
            return this.getJoueurs()[0];
        }
    }
    else {
        if (!actif) {
            return this.getJoueurs()[0];
        }
    }

    return this.getJoueurs()[1];
}

/**
  * Avance un joueur sur une position temporaire, utilisé dans déplacer joueur.
  * Effectue le changement d'arme si le joueur se positionne sur une cellule de
  * type arme.
  *
  * @param	    {Joueur}	joueur	        Le joueur à déplacer.
  * @param	    {Number}	positionTemp	La position (indice du tableau plateau).
  * @returns	{Void}
  */
MaitreDuJeu.avancer = function(joueur, positionTemp) {
    // Enlève le joueur de son ancienne positionTemp et le met sur sa nouvelle.
    var anciennePosition = joueur.getPosition();
    this.getPlateau()[positionTemp].push(this.getPlateau()[anciennePosition].pop());

    // Echange l'arme du joueur avec la cellule s'il s'agit d'une cellule Arme.
    if (Arme.isPrototypeOf(this.getPlateau()[positionTemp][0])) {
        var armeTemp = this.getPlateau()[positionTemp][0];
        this.getPlateau()[positionTemp][0] = joueur.getArme();
        joueur.setArme(armeTemp);
    }

    // Met à jour la positionTemp du joueur.
    joueur.setPosition(positionTemp);
}

/**
  * Déplace un joueur sur une position du plateau en avancant le joueur
  * cellule par cellule sur des position temporaires.
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
        console.log("Operation impossible : position hors du plateau.");
    }

    var posJoueur = joueur.getPosition();
    var posTemp = posJoueur;
    // Inférieur donc vers l'ouest ou vers le nord.
    if (position < posJoueur) {
        // Sur la meme ligne donc déplacement vers l'ouest.
        if (String(position)[0] === String(posJoueur)[0]) {
            while (posTemp > position) {
                // Déplace la position du joueur d'une cellelule vers l'ouest.
                posTemp -= 1;
                this.avancer(joueur, posTemp);
            }
        }
        // Sinon vers le nord
        else {
            while (posTemp > position) {
                // Déplace la position d'une largeur de plateau vers le nord.
                posTemp -= 1 * this.getControlleur().getParametre().LARGEUR_PLATEAU;
                this.avancer(joueur, posTemp);
            }
        }
    }
    // Supérieur donc vers l'est ou le sud.
    else {
        // Sur la meme ligne donc vers l'est.
        if (String(position)[0] === String(posJoueur)[0]) {
            while (posTemp < position) {
                // Déplace la position du joueur d'une cellelule vers l'est.
                posTemp += 1;
                this.avancer(joueur, posTemp);
            }
        }
        // Else vers le sud.
        else {
            while (posTemp < position) {
                // Déplace la position d'une largeur de plateau vers le sud.
                posTemp += 1 * this.getControlleur().getParametre().LARGEUR_PLATEAU;
                this.avancer(joueur, posTemp);
            }
        }
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
            // Si la cellule correspondante sur le plateau est un obstacle.
            if (Obstacle.isPrototypeOf(cellule)) {
                // Arrete la boucle pour cette direction : l'obstacle empêche
                // le joueur d'aller plus loin dans cette direction !
                break;
            }
            // De meme s'il y a un joueur sur cette cellule.
            else if (this.getPlateau()[posAdjJActif[i][j]].length === 2) {
                break;
            }
            else {
                // Rend la cellule accessible.
                cellule.setAccessible(true);
            }
        }
    }
}

/**
  * Modifie le joueur actif, ne fonctionne que pour 2 joueurs !
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
  * Retourne le vainqueur (le premier joueur ayant encore des points de vie. Il
  * ne faut appeler cette fonction qu'une fois la partie terminée).
  *
  * @returns	{Joueur}    Le vainqueur.
  */
MaitreDuJeu.trouverVainqueur = function() {
    for (var i = 0; i < this.getJoueurs().length; i++) {
        if (this.getJoueurs()[i].getVie() > 0) {
            return this.getControlleur().getJoueurs()[i];
        }
    }
}

/**
* Vérifie si les deux joueurs sont cote à cote.
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
 * @param   {Number} portee   La portée à la quelle on cherche.
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

/**
  * Gère le combat en fonction de l'attaque du joueur actif (normal/kamikaze).
  * Recoit le choix du joueur depuis le controlleur, met en oeuvre ce choix.
  * Renvoie un tableau avec true si le combat est fini (un joueur et mort) et
  * s'il continue, [false, codeMessage]
  *
  * @param      {String}    attaque     type d'attaque.
  * @returns	{Array}
  */
MaitreDuJeu.gererCombat = function(attaque) {
    // attaque kamikaze.
    if (attaque === "attaqueKamikaze") {
        var attaque = this.getJoueurActif().attaquer(
            this.getJoueurActif(false), kamikaze=true);
    }
    // attaque normale.
    else if (attaque === "attaqueNormale") {
        var attaque = this.getJoueurActif().attaquer(
            this.getJoueurActif(false), kamikaze=false);
        }
    else {
        console.log("Operation impossible : argument attaque invalide.");
    }

    // Vérifie si un joueur est mort.
    for (var i = 0; i < this.getJoueurs().length; i++) {
        if (this.getJoueurs()[i].getVie() <= 0) {
            return [true];
        }
    }

    // Si les deux joueurs sont vivants, continue...
    this.changerJoueurActif();

    // Renvoie le message en fonction du succès/echec de l'attaque.
    if (attaque) {
        return [false, 2];
    }
    else {
        return [false, 3];
    }
}

/**
  * Jouer vortex consiste à repositioner le joueur actif sur une cellule au hasard.
  * @returns	{Void}
  */
MaitreDuJeu.jouerVortex = function() {
    var jActif = this.getJoueurActif();
    // Enlève le joueur actif de sa place actuelle.
    this.getPlateau()[jActif.getPosition()].pop();
    this.placerAuHasard(jActif);
}

/**
  * Consiste à échanger les armes des deux joueurs.
  * @returns	{Void}
  */
MaitreDuJeu.jouerEchangeur = function() {
    var armeJActif = this.getJoueurActif().getArme();
    var armeJInactif = this.getJoueurActif(false).getArme();
    this.getJoueurActif().setArme(armeJInactif);
    this.getJoueurActif(false).setArme(armeJActif);
}

/**
  * Jouer un déplacement consiste à un ensemble d'opération :
  *   - déplacer le joueur.
  *   - réalise une action en fonction de la cellule sur laquelle est le joueur.
  *   - vérifie si le joueur actif s'est collé à un advservaire.
  *   - incrémenter l'attribut tour.
  *   - changer le joueur actif.
  *   - générer les nouvelles cellules accessibles.
  *
  * @param	    {Number}	position	La position du joueur.
  * @returns	{Boolean}               Retourne false et true si le combat se lance.
  */
MaitreDuJeu.jouerMouvement = function(position) {
    if (typeof position ==! 'number') {
        console.log("Operation impossible : argument position invalide.");
        return false;
    }
    // Déplacer le joueur actif sur sa nouvelle position
    this.deplacer(this.getJoueurActif(), position);

    cellule = this.getPlateau()[position][0];

    // Si la cellule est un échangeur.
    if (Echangeur.isPrototypeOf(cellule)) {
        this.jouerEchangeur();
    }
    // Si la cellule est un vortex.
    if (Vortex.isPrototypeOf(cellule)) {
        this.jouerVortex();
    }
    // Vérifie si les deux joueurs sont cote à cote.
    if (this.verifierCombat()) {
        return true;
    }
    // Incrémente l'attribut tour.
    var newTour = this.getTour() + 1
    this.setTour(newTour);
    // Change le joueur actif.
    this.changerJoueurActif();
    // Calculer les nouvelles cellules accessibles.
    this.genererCelluleAccessible();
    // Retourne false
    return false;

}
