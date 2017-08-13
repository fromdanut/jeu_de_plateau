/**
  * Prototype qui représente le joueur.
  * Il possède une arme.
  * Il peut attaquer un joueur, subir des dégâts.
  */

var Joueur = Object.create(Composant);

Joueur.init = function(controlleur, arme, actif=false) {
    this.initComposant(controlleur)
    this.setCouleur(this.getControlleur().getParametre().JOUEUR_COULEUR);
    this.setArme(arme);
    this.vie = 100;
    this.setActif(actif);
    this.setPosition();
}

Joueur.getCouleur = function() {
    return this.couleur;
}

Joueur.setCouleur = function(couleur){
    // Ajouter ici un vérificateur d'couleur.
    if (typeof couleur === 'string') {
        this.couleur = couleur;
    }
    else {
        console.log("Operation impossible car l'argument couleur n'est pas une String");
    }
},

Joueur.getVie = function() {
    return this.vie;
}

Joueur.setVie = function(vie) {
    if (typeof vie === 'number') {
        this.vie = vie;
    }
    else {
        console.log("Operation impossible car l'argument n'est pas un Number");
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
        console.log("Operation impossible car l'argument n'est pas un Number");
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
