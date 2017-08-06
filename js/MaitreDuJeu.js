/*
    Prototype du maitre du jeu. C'est lui qui coordonne
    l'ensemble du jeu.
    Il place les cases sur la carte,
    fait se déplacer les joueurs, fait les combats.
*/

var MaitreDuJeu = {
    initMaitreDuJeu: function(armes, joueurs, obstacles, carte) {
        this.tour = 0;
        this.setarmes(armes);
        this.setJoueurs(joueurs);
        this.setObstacles(obstacles);
        this.setCarte(this.creerCarte());
        this.setJoueurActif(this.joueurs[0]);
        this.positionnerCase(this.joueurs[0]);
    }

    getTour = function() {
        return this.tour;
    }

    setTour = function(tour) {
        if (tour.isPrototypeOf(Number)) {
            this.tour = tour;
        }
        else {
            console.log("Operation impossible : argument tour invalide.");
        }
    }

    getArmes: function() {
        return this.armes;
    }

    setArmes: function(armes) {
        if (armes.isPrototypeOf(Array)) {
            this.armes = armes;
        }
        else {
            console.log("Operation impossible : argument armes invalide.");
        }
    }

    getJoueurs: function() {
        return this.joueurs;
    }

    setJoueurs: function(joueurs) {
        if (joueurs.isPrototypeOf(Array)) {
            this.joueurs = joueurs;
        }
        else {
            console.log("Operation impossible : argument joueurs invalide.");
        }
    }

    getObstacles: function() {
        return this.obstacles;
    }

    setObstacles: function(obstacles) {
        if (obstacles.isPrototypeOf(Array)) {
            this.obstacles = obstacles;
        }
        else {
            console.log("Operation impossible : argument obstacles invalide.");
        }
    }

    getCarte: function() {
        return this.carte;
    }

    setCarte: function(carte) {
        if (carte.isPrototypeOf(Carte)) {
            this.carte = carte;
        }
        else {
            console.log("Operation impossible : argument carte invalide.");
        }
    }

    creerCarte: function() {
        pions = this.joueurs + this.armes + this.obstacles;
        carte = Object.create(Carte);
        carte.initCarte(DIMENSSION_CARTE, pions);
        return carte;
    }

    getJoueurActif: function() {
        return this.joueurActif;
    }

    setJoueurActif: function(joueur) {
        if (joueur.isPrototypeOf(Joueur)) {
            this.joueur = joueur;
        }
        else {
            console.log("Operation impossible : argument joueur invalide.");
        }
    }

    /*
        Parcours une direction a partir de la position du joueur actif (japos).
        Met l'attribut case accessible à true.
    */
    trouverCaseAccessible: function(direction, position) {
        for (var i = 0; i < 3; i++) {
            var positionCherchee = Object.create(Position);
            switch (direction) {
                case "n": // nord
                    positionCherchee.initPosition(position.getX(),
                                                  position.getY() + i);
                    break;
                case "s": // sud
                    positionCherchee.initPosition(position.getX(),
                                                  position.getY() - i);
                    break;
                case "e": // est
                    positionCherchee.initPosition(position.getX() + i,
                                                  position.getY());
                    bpositionChercheereak;
                case "o": // ouest
                    positionCherchee.initPosition(position.getX() - i,
                                                  position.getY());
                    break;
                default:
                    break;
            }
            // Stop la boucle si la case n'est pas vide (le joueur est bloqué).
            var case = this.carte.trouver(positionCherchee);
            if (!case.isPrototypeOf(Vide)) {
                break;
            }
            // Si c'est une case vide, elle devient accessible au joueurActif.
            else {
                case.setAccessible(true);
            }
        }

    }

    /*
        Remet toutes les cases vide à inaccessible, puis rend accessible les
        case vide sur lesquels le joueur actif peut se déplacer.
    */
    identifierCasesAccessibles: function() {
        // Supprimer les cases accessibles du joueur devenu inactif.
        this.carte.parcourir(function(case)) {
            if (case.isPrototypeOf(Vide)) {
                case.setAccessible(false);
            }
        });

        // Ajouter les cases accessibles du joueur actif.
        directions = ["n", "s", "e", "o"];
        directions.forEach(function(direction) {
            this.trouverCaseAccessible(direction, this.joueur.Actif.getPosition());
        }

    }

    /*
        Affecte une case à une position sur la carte.
    */
    affecterCase: function(case, position) {
        // Vérifie qu'on passe un prototype de Case en argument.
        if (!case.isPrototypeOf(Case)) {
            console.log("Operation impossible : argument case invalide.");
            return false;
        }
        // Vérifie qu'on passe un prototype de Carte en argument.
        if (!position.isPrototypeOf(Position)) {
            console.log("Operation impossible : argument position invalide.");
            return false;
        }

        this.carte.trouver(position) = case;
    }

    /*
        Se base sur modulo de 2 sur le nombre de tour, cela
        fonctionne donc uniquement avec 2 joueurs.
    */
    changerJoueurActif: function() {
        var i = this.getTour() % 2;
        setJoueurActif(this.getJoueurs()[i]);
    }

    /*
        Jouer un tour consiste à mettre en oeuvre l'action du joueur actif.
    */
    jouerTour: function(position) {
        // Remplace l'ancienne position joueur par une case vide.
        var vide = Object.create(Vide);
        this.affecterCase(vide, joueurActif.getPosition());
        // Place le joueur sur sa nouvelle position.
        this.affecterCase(this.joueurActif, position);
        // Calculer les nouvelles cases accessibles.
        this.identifierCasesAccessibles();
        // Incrémente l'attribut tour.
        var newTour = this.getTour() + 1
        this.setTour(newTour);
        // Change le joueur actif.
        this.changerJoueurActif();
    }
}
