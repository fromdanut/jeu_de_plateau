/**
  * Prototype qui représente l'élément le plus petit du plateau. C'est une case
  * du plateau (nommé cellule car "case" est un mot clé de JavaScript).
  */

var Cellule = Object.create(Composant);

Cellule.initCellule = function(controlleur) {
    this.initComposant(controlleur);
    this.setCouleur(this.getControlleur().getParametre().CELLULE_COULEUR);
    this.setAccessible();
}

Cellule.init = function(controlleur) {
    this.initCellule(controlleur);
}

Cellule.getCouleur = function() {
    return this.couleur;
}

/**
  * Affecte une couleur à la cellule.
  *
  * @param      {String}   couleur    La couleur de la cellule.
  * @returns	{Void}
  */
Cellule.setCouleur = function(couleur){
    // Ajouter ici un vérificateur d'couleur.
    if (typeof couleur === 'string') {
        this.couleur = couleur;
    }
    else {
        console.log("Operation impossible car l'argument couleur n'est pas une String");
    }
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
Arme.init = function(controlleur) {
    this.initCellule(controlleur);
    this.setCouleur(this.getControlleur().getParametre().ARME_COULEUR);
    this.setDegat();
}

Arme.getDegat = function() {
    return this.degat;
}

Arme.setDegat = function(){
    var max = this.getControlleur().getParametre().ARME_MAX;
    var min = this.getControlleur().getParametre().ARME_MIN;
    this.degat = Math.ceil(Math.random() * (max - min) + min);
}

/**
  * Prototype de l'obstacle. Il va bloquer le joueur car l'attribut
  * accessible vaudra toujours false.
  */
var Obstacle = Object.create(Cellule);

Obstacle.init = function(controlleur) {
    this.initCellule(controlleur);
    this.setCouleur(this.getControlleur().getParametre().OBSTACLE_COULEUR);
}

Obstacle.setAccessible = function(accessible) {
    this.accessible = false;
}
