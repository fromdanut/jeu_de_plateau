/*
    Prototype du joueur.
    Il possède une arme, peut attaquer un joueur, subir des dégats,
    changer d'arme.
*/
var Joueur = {

    JOUEUR_URL: "../img/joueur.png",
    JOUEUR_COULEUR: 'blue',

    init: function(arme, actif=false) {
        this.urlImage = this.JOUEUR_URL;
        this.setCouleur(this.JOUEUR_COULEUR);
        this.setArme(arme);
        this.vie = 100;
        this.setActif(actif);
        this.setPosition();
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

    getVie: function() {
        return this.vie;
    },

    setVie: function(vie) {
        if (typeof vie === 'number') {
            this.vie = vie;
        }
        else {
            console.log("Operation impossible car l'argument n'est pas un Number");
        }
    },

    getActif: function() {
        return this.actif;
    },

    setActif: function(actif) {
        if (typeof actif === 'boolean') {
            this.actif = actif;
        }
        else {
            console.log("Operation impossible car l'argument n'est pas un Number");
        }
    },

    getArme: function() {
        return this.arme;
    },

    setArme: function(arme){
        if (Arme.isPrototypeOf(arme)) {
            this.arme = arme;
        }
        else {
            console.log("Operation impossible car l'argument n'est pas une Arme");
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
        if (typeof position === 'number'){
            this.position = position
        }
        else if(position === null) {
            this.position = null;
        }
        else {
            console.log("Operation impossible : argument position invalide.");
        }
    },

    // Quand un joueur attaque une cible subit des dégâts.
    attaque: function(cible) {
        cible.subir(this.arme.getDegat());
    },

    // Quand un joueur subit des dégâts il perd des points de vie.
    subir: function(degat) {
        vie = this.vie - degat;
        this.setVie(vie);
    },

    // Un joueur peut changer d'arme.
    armer: function(arme) {
        this.setArme = arme;
    },
}
