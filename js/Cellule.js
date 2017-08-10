/*
    Cellule est un élément d'une carte. Elle peut-être accessible.
*/

var Cellule = {
    CASE_URL: "../img/cellule.png",
    ARME_URL: "../img/arme.png",
    OBSTACLE_URL: "../img/obstacle.png",

    CELLULE_COULEUR: 'grey',
    ARME_COULEUR: 'green',
    OBSTACLE_COULEUR: 'black',

    initCellule: function() {
        this.setUrlImage(this.CASE_URL);
        this.setCouleur(this.CELLULE_COULEUR);
        this.setAccessible();
        this.setPosition();
    },

    init: function() {
        this.initCellule();
    },

    getUrlImage: function() {
        return this.urlImage;
    },

    setUrlImage: function(urlImage){
        // Ajouter ici un vérificateur d'url.
        if (typeof urlImage === 'string') {
            this.urlImage = urlImage;
        }
        else {
            console.log("Operation impossible car l'argument urlImage n'est pas une String");
        }
    },

    getCouleur: function() {
        return this.couleur;
    },

    setCouleur: function(couleur){
        // Ajouter ici un vérificateur d'couleur.
        if (typeof couleur === 'string') {
            this.couleur = couleur;
        }
        else {
            console.log("Operation impossible car l'argument couleur n'est pas une String");
        }
    },

    getAccessible: function() {
        return this.accessible;
    },

    setAccessible: function(accessible = false) {
        if (typeof accessible === "boolean") {
            this.accessible = accessible;
        }
        else {
            console.log("Operation impossible : argument accessible invalide.");
        }
    },

    getPosition: function() {
        return this.position;
    },

    /*
        Par défault la position vaut null, c'est le maitre du jeu qui positionne
        les cellules.
    */
    setPosition: function(position=null) {
        if (typeof position === Number){
            this.position = position
        }
        else if(position === null) {
            this.position = null;
        }
        else {
            console.log("Operation impossible : argument position invalide.");
        }
    },
}

/*
    Prototype de l'arme.
    A seulement un attribut dégat.
*/

var Arme = Object.create(Cellule);
Arme.init = function(degat) {
    this.initCellule();
    this.setUrlImage(this.ARME_URL);
    this.setCouleur(this.ARME_COULEUR);
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
Obstacle.init = function() {
    this.initCellule();
    this.setUrlImage(this.OBSTACLE_URL);
    this.setCouleur(this.OBSTACLE_COULEUR);

}

Obstacle.setAccessible = function(accessible) {
    if (accessible) {
        console.log("Un obstacle est toujours innaccessible");
    }
    this.accessible = false;
}
