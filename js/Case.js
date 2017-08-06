/*
    Case est un prototype abstrait, qui permet de créer des
    Joueurs, Armes, Obstacle, Vide.
    Il possède seulement une position et une url pointant vers une image.
*/

var Case = {
    initCase: function() {
        this.urlImage = CASE_URL; // pas défini noramlement.
        this.setUrlImage(urlImage);
    }

    getPosition: function() {
        return this.position;
    }

    setPosition: function(position){
        if (position instanceof Position) {
            this.position = position;
        }
        else {
            console.log("Operation impossible car l'argument n'est pas une Position");
        }
    }

    getUrlImage: function() {
        return this.urlImage;
    }

    setUrlImage: function(urlImage){
        // Ajouter ici un vérificateur d'url.
        if (urlImage instanceof String) {
            this.urlImage = urlImage;
        }
        else {
            console.log("Operation impossible car l'argument n'est pas une String");
        }
    }
}

/*
    Prototype du joueur.
    Il possède une arme, peut attaquer un joueur, subir des dégats,
    changer d'arme.
*/
var Joueur = Object.create(Case);
Joueur.initJoueur = function(position, arme) {
    this.urlImage = JOUEUR_URL;
    this.initCase(position);
    this.setArme(arme);
    this.vie = 100;
}

Joueur.getVie = function() {
    return this.vie;
}

Joueur.setVie = function(vie) {
    if (vie instanceof Number) {
        this.vie = vie;
    }
    else {
        console.log("Operation impossible car l'argument n'est pas un Number");
    }
}

Joueur.getArme = function() {
    return this.arme;
}

Joueur.setArme = function(arme){
    if (arme instanceof Arme) {
        this.arme = arme;
    }
    else {
        console.log("Operation impossible car l'argument n'est pas une Arme");
    }
}

// Quand un joueur attaque une cible subit des dégâts.
Joueur.attaque = function(cible) {
    cible.subir(this.arme.getDegat());
}

// Quand un joueur subit des dégâts il perd des points de vie.
Joueur.subir = function(degat) {
    vie = this.vie - degat;
    this.setVie(vie);
}

// Un joueur peut changer d'arme.
Joueur.armer = function(arme) {
    this.setArme = arme;
}

/*
    Prototype de l'arme.
    A seulement un attribut dégat.
*/

var Arme = Object.create(Case);
Arme.initArme = function(position, degat) {
    this.urlImage = ARME_URL;
    this.initCase(position);
    this.setDegat(degat);
}

Arme.getDegat = function() {
    return this.degat;
}

Arme.setDegat = function(degat){
    if (degat instanceof Number) {
        this.degat = degat;
    }
    else {
        console.log("Operation impossible car l'argument n'est pas un Number");
    }
}

/*
    Prototype d'une case vide, elle a un unique attribut "accessible" qui permet
    de savoir si le joueur actif peut s'y déplacer.
*/

var Vide = Object.create(Case);
Vide.initVide = function(position, accessible=false) {
    this.url = VIDE_URL;
    this.initCase(position);
    this.accessible = setAccessible(accessible);
}

Vide.getAccessible = function() {
    return this.accessible;
}

Vide.setAccessible = function(accessible) {
    if (accessible instanceof Boolean) {
        {this.accessible = accessible;
    }
    else {
        console.log("Operation impossible car l'argument n'est pas un booléen");
    }
}

/*
    Prototype d'un Obstacle. Pour l'instant c'est une case vide, mais l'url changera!
*/

var Obstacle = 0bject.create(Case);
