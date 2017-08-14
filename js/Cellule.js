/**
  * Prototype qui représente l'élément le plus petit du plateau. C'est une case
  * du plateau (nommé cellule car "case" est un mot clé de JavaScript).
  */

var Cellule = Object.create(Composant);

Cellule.initCellule = function(controlleur) {
    this.initComposant(controlleur);
    this.setAccessible();
}

Cellule.init = function(controlleur) {
    this.initCellule(controlleur);
}

Cellule.getAccessible = function() {
    return this.accessible;
}

/**
  * Affecte un attribut accessible qui permettra de gérer les déplacements
  * des joueurs (à false par défault).
  *
  * @param      {Boolean}   accessible
  * @returns	{Void}
  */
Cellule.setAccessible = function(accessible=false) {
    if (typeof accessible === "boolean") {
        this.accessible = accessible;
    }
    else {
        console.log("Operation impossible : argument accessible invalide.");
    }
}

/**
  * Prototype de l'arme. Elle a un attribut dégât en plus.
  */

var Arme = Object.create(Cellule);
Arme.init = function(controlleur, degat="minimum") {
    this.initCellule(controlleur);
    this.setDegat(degat);
}

Arme.getDegat = function() {
    return this.degat;
}

Arme.setDegat = function(degat){
    switch (degat) {
        case "minimum":
            this.degat = this.getControlleur().getParametre().ARME_DEGAT_MINIMUM;
            break;
        case "faible":
            this.degat = this.getControlleur().getParametre().ARME_DEGAT_FAIBLE;
            break;
        case "moyen":
            this.degat = this.getControlleur().getParametre().ARME_DEGAT_MOYEN;
            break;
        case "fort":
            this.degat = this.getControlleur().getParametre().ARME_DEGAT_FORT;
            break;
        default:
            console.log("Operation impossible : argument degat invalide.");
            break;
    }
}

/**
  * Prototype de l'obstacle. Il va bloquer le joueur car l'attribut
  * accessible vaudra toujours false.
  */
var Obstacle = Object.create(Cellule);

Obstacle.init = function(controlleur) {
    this.initCellule(controlleur);
}

Obstacle.setAccessible = function(accessible) {
    this.accessible = false;
}
