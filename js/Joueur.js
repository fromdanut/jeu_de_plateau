/**
  * Prototype qui représente le joueur.
  * Il possède une arme.
  * Il peut attaquer un joueur, subir des dégâts.
  */

var Joueur = Object.create(Composant);

Joueur.init = function(controlleur, arme, param, actif=false) {
    this.initComposant(controlleur)
    this.setArme(arme);
    this.vie = 100;
    this.setParam(param);
    this.setActif(actif);
    this.setPosition();
}

Joueur.setParam = function(param) {
    /* Il faudra ajouter des get et set ici */
    this.nom = param.nom;
    this.img = param.img;
    this.imgActif = param.imgActif;
    this.imgCombat = param.imgCombat;
    this.imgVainqueur = param.imgVainqueur;
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
  * Retourne la référence vers l'image à utiliser pour représenter le joueur,
  * sous la forme "url(xxx)", pour l'attribut css background-image.
  */
Joueur.getImg = function(param) {
    if (this.getActif()) {
        var img = "url(" + this.imgActif + ")";
    }
    else {
        var img = "url(" + this.img + ")";
    }
    return img;
}

Joueur.getImgCombat = function() {
    return this.imgCombat;
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
  * Quant un joueur attaque sa cible subit des dégâts. Il peut tenter une
  * attaque kamikaze qui inflige 2 fois plus de dégat mais si l'attaque est
  * manqué il se frappe lui-même.
  *
  * @param      {Joueur}    cible    Le joueur ciblé.
  * @param      {Boolean}   kamikaze option d'attaque.
  * @returns	{True}               true si attaque réussi, false sinon.
  */
Joueur.attaquer = function(cible, kamikaze=false) {
    if (kamikaze) {
        var degat = this.getArme().getDegat() * 2;
        // une chance sur 2.
        if (Math.random() > 0.5) {
            cible.subir(degat);
            return true;
        }
        else {
            this.subir(degat);
            return false;
        }
    }
    else {
        cible.subir(this.getArme().getDegat());
        return true;
    }
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
