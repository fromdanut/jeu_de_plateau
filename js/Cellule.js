/**
  * Prototype qui représente l'élément le plus petit du plateau. C'est une case
  * du plateau (nommé cellule car "case" est un mot clé de JavaScript).
  */

var Cellule = Object.create(Composant);

Cellule.initCellule = function(controlleur, param) {
    this.initComposant(controlleur);
    this.setAccessible();
    this.setImg(param);
    this.setImgAccessible(param);
}

Cellule.init = function(controlleur, param) {
    this.initCellule(controlleur, param);
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

Cellule.setImg = function(param) {
    if (typeof param.img === 'string') {
        this.img = param.img;
    }
    else {
        console.log("Operation impossible : argument param.img invalide.");
    }
}

Cellule.setImgAccessible = function(param) {
    if (typeof param.imgAccessible === 'string') {
        this.imgAccessible = param.imgAccessible;
    }
    else {
        console.log("Operation impossible : argument param.img invalide.");
    }
}

Cellule.getImg = function() {
    if (this.getAccessible()) {
        var img = "url(" + this.imgAccessible + ")";
    }
    else {
        var img = "url(" + this.img + ")";
    }
    return img;
}

/**
  * Prototype de l'arme. Elle a un attribut dégât en plus.
  */

var Arme = Object.create(Cellule);
Arme.init = function(controlleur, param) {
    this.initCellule(controlleur, param);
    this.setDegat(param);
}
Arme.getDegat = function() {
    return this.degat;
}

Arme.setDegat = function(param){
    if (typeof param.degat === 'number') {
        this.degat = param.degat;
    }
    else {
        console.log("Operation impossible : argument param.degat invalide.");
    }
}

/**
  * Prototype de l'obstacle.
  */
var Obstacle = Object.create(Cellule);

Obstacle.init = function(controlleur, param) {
    this.initCellule(controlleur, param);
}

/**
  * L'obstacle bloque le joueur car l'attribut accessible vaudra toujours false.
  */
Obstacle.setAccessible = function(accessible) {
    this.accessible = false;
}

/**
  * Cellule vide.
  */
var Vide = Object.create(Cellule);

Vide.init = function(controlleur, param) {
    this.initCellule(controlleur, param);
}

/**
  * Prototype de la porte. Elle repositionne le joueur au hasard sur la carte.
  */
var Porte = Object.create(Cellule);

Porte.init = function(controlleur, param) {
    this.initCellule(controlleur, param);
}
