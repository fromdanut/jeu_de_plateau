/**
  * Prototype qui représente le joueur.
  * Il possède une arme.
  * Il peut attaquer un joueur, subir des dégâts.
  */

var Joueur = Object.create(Composant);

Joueur.init = function(controlleur, arme, nom='Roger', actif=false) {
    this.initComposant(controlleur)
    this.setArme(arme);
    this.vie = 100;
    this.setNom(nom);
    this.setActif(actif);
    this.setPosition();
}

Joueur.getVie = function() {
    return this.vie;
}

Joueur.setVie = function(vie) {
    if (typeof vie === 'number') {
        this.vie = vie;
    }
    else {
        console.log("Operation impossible : argument vie invalide.");
    }
}

Joueur.getNom = function() {
    return this.nom;
}

Joueur.setNom = function(nom) {
    if (typeof nom === 'string') {
        this.nom = nom;
    }
    else {
        console.log("Operation impossible : argument nom invalide.");
    }
}

Joueur.getActif = function() {
    return this.actif;
}

Joueur.setActif = function(actif) {
    if (typeof actif === 'boolean') {
        this.actif = actif;
    }
    else {
        console.log("Operation impossible : argument actif invalide.");
    }
}

Joueur.getArme = function() {
    return this.arme;
}

Joueur.setArme = function(arme){
    if (Arme.isPrototypeOf(arme)) {
        this.arme = arme;
    }
    else {
        console.log("Operation impossible car l'argument n'est pas une Arme");
    }
}

Joueur.getPosition = function() {
    return this.position;
}

/**
  * Affecte une position (par défault à 0).
  *
  * @param      {Boolean}   accessible
  * @returns	{Void}
  */
Joueur.setPosition = function(position=0) {
    if (typeof position === 'number'){
        this.position = position;
    }
    else {
        console.log("Operation impossible : argument position invalide.");
    }
}

/**
  * Quant un joueur attaque sa cible subit des dégâts.
  *
  * @param      {Joueur}   cible    Le joueur ciblé.
  * @returns	{Void}
  */
Joueur.attaque = function(cible) {
    cible.subir(this.arme.getDegat());
}

/**
  * Quant un joueur subit des dégât il perd des point de vie.
  *
  * @param      {Number}   degat    Le nombre de dégât infligés.
  * @returns	{Void}
  */
Joueur.subir = function(degat) {
    vie = this.vie - degat;
    this.setVie(vie);
}
