/**
  * Prototype chargé de controller les différents composants du programme.
  * Il est rendu accessible dans l'ensemble des composants.
  * Il a accès aux parametres.
  */

var Controlleur = {

    init: function(parametre) {
        this.setParametre(parametre);
        this.setFabrique();
        this.setPlateau();
        this.setJoueurs();
        this.setMaitreDuJeu();
        this.setPage();
    },

    setParametre: function(parametre) {
        // Ajoute des constantes non parametrables.
        parametre.NB_JOUEUR = 2;
        parametre.NB_CELLULE = 100;
        parametre.LARGEUR_PLATEAU = 10;
        // Calcule et ajoute quelques constantes en fonction des paramètres.
        parametre.NB_VIDE = parametre.NB_CELLULE - parametre.NB_ARME_FAIBLE -
                                 parametre.NB_ARME_MOYEN - parametre.NB_ARME_FORT -
                                 parametre.NB_OBSTACLE;
        this.parametre = parametre;
        console.log("Fin controlleur.setParametre");
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
        console.log("Fin controlleur.setFabrique");
    },

    getFabrique: function() {
        return this.fabrique;
    },

    setPlateau: function() {
        // On utilise le générateur de plateau pour fabriquer le plateau.
        var plateauGenerateur = this.getFabrique().creerPlateauGenerateur();
        this.plateau = plateauGenerateur.creerPlateau();
        console.log("Fin controlleur.setPlateauGenerateur");
        console.log(this.getPlateau());
    },

    getPlateau: function() {
        return this.plateau;
    },

    setJoueurs: function() {
        // Créé les deux joueurs.
        this.joueurs = [];
        // Défini le premier joueur comme actif.
        var j1 = this.getFabrique().creerJoueur(this.getParametre().NOM_J1);
        j1.setActif(true);
        this.joueurs.push(j1);
        var j2 = this.getFabrique().creerJoueur(this.getParametre().NOM_J2);
        this.joueurs.push(j2);

        console.log("Fin controlleur.setJoueurs");
        console.log(this.getParametre());
    },

    getJoueurs: function() {
        return this.joueurs;
    },

    setMaitreDuJeu: function() {
        this.maitreDuJeu = this.getFabrique().creerMaitreDuJeu(plateau=this.getPlateau(),
                                                            joueurs=this.getJoueurs(),
                                                            );
        console.log("Fin controlleur.setMaitreDuJeu");
    },

    getMaitreDuJeu: function() {
        return this.maitreDuJeu;
    },

    setPage: function() {
        this.page = this.getFabrique().creerPage();
        console.log("Fin controlleur.setPage");
    },

    getPage: function() {
        return this.page;
    },

    /**
      * Lance la partie en demandant au générateur de page de dessinger le plateau.
      *
      * @returns	{Void}
      */
    lancerPartie: function() {
        this.getPage().dessinerPlateau(this.getPlateau());
    },

    /**
      * La Page va demander au controlleur de jouer un tour lors d'un évènement.
      * Le controlleur se contente de relayer la demande au maitre du jeu.
      *
      * @param   {Number} position Correspond à la position de la cellule clikée.
      * @returns {Void}   Demande au maitre du jeu de faire le travail.
      */
    jouerTour: function(position) {
        this.getMaitreDuJeu().jouerTour(position);
    }
};
