/*
    Prototype du joueur.
    Il possède une arme, peut attaquer un joueur, subir des dégats,
    changer d'arme.
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

/*
    Par défault la position vaut null, c'est le maitre du jeu qui positionne
    les cellules.
*/
Joueur.setPosition = function(position=null) {
    if (typeof position === 'number'){
        this.position = position
    }
    else if(position === null) {
        this.position = null;
    }
    else {
        console.log("Operation impossible : argument position invalide.");
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
