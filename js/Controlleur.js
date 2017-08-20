/**
  * Prototype chargé de controller les différents composants du programme.
  * Il est rendu accessible dans l'ensemble des composants.
  * Il a accès aux parametres. Il controle les différents composant et fait
  * travailler ensemble le maitre du jeu et la Page.
  */

var Controlleur = {

    init: function(parametre) {
        this.setParametre(parametre);
        this.setFabrique();
        this.setPlateau();
        this.setJoueurs();
        this.setMaitreDuJeu();
        this.setPage();
        console.log("Fin de l'initialisation du controleur :");
        console.log(this);
    },

    setParametre: function(parametre) {
        // Ajoute des constantes non parametrables.
        parametre.NB_JOUEUR = 2;
        parametre.NB_CELLULE = 100;
        parametre.LARGEUR_PLATEAU = 10;
        // Calcule et ajoute quelques constantes en fonction des paramètres.
        parametre.NB_VIDE = parametre.NB_CELLULE - parametre.NB_ARME_FAIBLE -
                                 parametre.NB_ARME_MOYEN - parametre.NB_ARME_FORT -
                                 parametre.NB_OBSTACLE - parametre.NB_VORTEX;
        this.parametre = parametre;
    },

    getParametre: function() {
        return this.parametre;
    },

    setFabrique: function() {
        // Le controlleur de la fabrique vaut "this". C'est la
        // fabrique qui est chargée de transmettre la référence
        // vers le controlleur à chaque composant.
        var fabrique = Object.create(Fabrique);
        fabrique.init(this);
        this.fabrique = fabrique;
    },

    getFabrique: function() {
        return this.fabrique;
    },

    setPlateau: function() {
        // On utilise le générateur de plateau pour fabriquer le plateau.
        var plateauGenerateur = this.getFabrique().creerPlateauGenerateur();
        this.plateau = plateauGenerateur.creerPlateau();
    },

    getPlateau: function() {
        return this.plateau;
    },

    setJoueurs: function() {
        // Créé les deux joueurs.
        this.joueurs = [];
        // Défini le premier joueur comme actif.
        var j1 = this.getFabrique().creerJoueur(param=this.getParametre().J1);
        j1.setActif(true);
        this.joueurs.push(j1);
        var j2 = this.getFabrique().creerJoueur(param=this.getParametre().J2);
        this.joueurs.push(j2);
    },

    getJoueurs: function() {
        return this.joueurs;
    },

    setMaitreDuJeu: function() {
        this.maitreDuJeu = this.getFabrique().creerMaitreDuJeu(plateau=this.getPlateau(),
                                                            joueurs=this.getJoueurs(),
                                                            );
    },

    getMaitreDuJeu: function() {
        return this.maitreDuJeu;
    },

    setPage: function() {
        this.page = this.getFabrique().creerPage();
    },

    getPage: function() {
        return this.page;
    },

    /**
      * Lance la partie consiste simplement à demander à la page de
      * de dessinger le plateau.
      *
      * @returns	{Void}
      */
    lancerPartie: function() {
        this.getPage().dessinerPlateau(this.getPlateau());
    },

    /**
      * Fait le lien entre les actions des joueurs (EventListener écrit par
      * la Page) et le maitre du jeu.
      *
      * @param   {String} type     Le type correspond a une méthode du Maitre du Jeu.
      * @param   {Number} position Correspond à la position de la cellule clikée.
      * @param   {String} attaque  Correspond au type d'attaque demandée.
      * @returns {Void}   Demande au maitre du jeu de faire le travail.
      */
    realiserAction: function(type, position=null, attaque=null) {
        switch (type) {
            case "jouerMouvement":
                // Si mouvement amène les deux joueurs cote a cote, le combat commence.
                var debutCombat = this.getMaitreDuJeu().jouerMouvement(position=position);
                if (debutCombat) {
                    this.getPage().dessinerCombat();
                }
                else {
                    this.getPage().dessinerPlateau(this.getPlateau());
                }
                break;
            case "jouerAttaque":
            // Si un joueur est mort, la partie est fini.
                var finDePartie = this.getMaitreDuJeu().gererCombat(attaque=attaque)
                if (finDePartie[0]) {
                    this.getPage().dessinerFinPartie();
                }
                else {
                    this.getPage().dessinerCombat(finDePartie[1]);
                }
                break;
            default:
                console.log("Operation impossible : argument type invalide.");
        }
    }
};
