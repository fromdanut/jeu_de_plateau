/*
    Cellule est un élément du plateau. Elle hérite de compossant.
*/

var Cellule = Object.create(Composant);

Cellule.initCellule = function(controlleur) {
    this.initComposant(controlleur);
    this.setCouleur(this.getControlleur().getParametre().CELLULE_COULEUR);
    this.setAccessible();
    this.setPosition();
}

Cellule.init = function(controlleur) {
    this.initCellule(controlleur);
}

Cellule.getCouleur = function() {
    return this.couleur;
}

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

Cellule.setAccessible = function(accessible = false) {
    if (typeof accessible === "boolean") {
        this.accessible = accessible;
    }
    else {
        console.log("Operation impossible : argument accessible invalide.");
    }
}

Cellule.getPosition = function() {
    return this.position;
}

/*
    Par défault la position vaut 0, c'est le maitre du jeu qui positionne
    les cellules.
*/
Cellule.setPosition = function(position=0) {
    if (typeof position === 'number'){
        this.position = position;
    }
    else {
        console.log("Operation impossible : argument position invalide.");
    }
}

/*
    Prototype de l'arme.
    A seulement un attribut dégat.
*/

var Arme = Object.create(Cellule);
Arme.init = function(controlleur, degat) {
    this.initCellule(controlleur);
    this.setCouleur(this.getControlleur().getParametre().ARME_COULEUR);
    this.setDegat(degat);
}

Arme.getDegat = function() {
    return this.degat;
}

Arme.setDegat = function(degat=10){
    if (typeof degat === 'number') {
        this.degat = degat;
    }
    else {
        console.log("Operation impossible car l'argument n'est pas un Number");
    }
}

/*
    Prototype d'un Obstacle.
*/

var Obstacle = Object.create(Cellule);
Obstacle.init = function(controlleur) {
    this.initCellule(controlleur);
    this.setCouleur(this.getControlleur().getParametre().OBSTACLE_COULEUR);
}

Obstacle.setAccessible = function(accessible) {
    if (accessible) {
        console.log("Un obstacle est toujours innaccessible");
    }
    this.accessible = false;
}
