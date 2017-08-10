/*
    Prototype du maitre du jeu. C'est lui qui coordonne
    l'ensemble du jeu.
    Il place les cellules sur le plateau,
    fait se déplacer les joueurs, fait les combats.
*/

var MaitreDuJeu = {

    plateau: [],

    LARGEUR_PLATEAU : 10,
    NB_CASE: 100,
    NB_JOUEUR: 2,
    NB_ARME: 3,
    NB_OBSTACLE: 12,
    NB_CASE_VIDE: 85,

    setPageGenerateur: function(pageGenerateur) {
        this.pageGenerateur = pageGenerateur;
    },

    getPageGenerateur: function() {
        return this.pageGenerateur;
    },

    demanderActionPG: function() {
        this.getPageGenerateur().dessinerPlateau(this.getPlateau());
    },

    init: function(plateau, joueurs) {
        this.tour = 0;
        this.setPlateau(plateau);
        this.setJoueurs(joueurs);
        this.placerJoueurs();
    },

    getTour: function() {
        return this.tour;
    },

    setTour: function(tour) {
        if (typeof tour === 'number') {
            this.tour = tour;
        }
        else {
            console.log("Operation impossible : argument tour invalide.");
        }
    },

    getJoueurs: function() {
        return this.joueurs;
    },

    setJoueurs: function(joueurs) {
        if (joueurs instanceof Array) {
            joueurs.forEach(function(joueur) {
                if (!Joueur.isPrototypeOf(joueur)) {
                    console.log("Operation impossible : argument joueur invalide.");
                    return false
                }
            });
            this.joueurs = joueurs;
        }
        else {
            console.log("Operation impossible : argument joueurs invalide.");
        }
    },

    getPlateau: function() {
        return this.plateau;
    },

    setPlateau: function(plateau) {
        if (plateau instanceof Array) {
            plateau.forEach(function(conteneur) {
                if (conteneur instanceof Array) {
                    if (!Cellule.isPrototypeOf(conteneur[0])) {
                        console.log("Operation impossible : argument cellule invalide.");
                        return false;
                    }
                }
                else {
                    console.log("Operation impossible : argument conteneur invalide.");
                    return false;
                }
            });
            this.plateau = plateau;
        }
        else {
            console.log("Operation impossible : argument plateau invalide.");
            return false;
        }
    },

    /*
        Place les deux joueurs au hasard sur une plateau.
    */
    placerJoueurs: function(){
        this.joueurs.forEach(function(joueur) {
            // Obtenir une position aléatoire sur 100 (normalement sur NB_CASE)
            var position = Math.floor(Math.random() * 100);

            // S'il n'y a qu'une cellule sur à cette position (et pas l'autre joueur)
            if (this.plateau[position].length === 1) {
                this.plateau[position].push(joueur);
                // Met à jour la position du joueur.
                joueur.setPosition(position);
            }
        });
    },

    /*
        Retourne le joueur actif.
    */
    getJoueurActif: function() {
        for (var i = 0; i < this.joueurs.length; i++) {
            if (this.joueurs[i].getActif()) {
                return this.joueurs[i];
            }
        }
    },

    /*
        Deplace un joueur à une position.
        La position correspond à l'indice du plateau.
    */
    deplacer: function(joueur, position) {
        // Vérifie qu'on passe un prototype de Joueur en argument.
        if (!Joueur.isPrototypeOf(joueur)) {
            console.log("Operation impossible : argument joueur invalide.");
            return false;
        }
        // Vérifie qu'on passe un prototype de Plateau en argument.
        if (typeof position !== 'number') {
            console.log("Operation impossible : argument position invalide.");
            return false;
        }
        // Vérifie que la position est dans les limites du plateau.
        if (position < 0 || position > this.NB_CASE) {
            console.log("Operation impossible : position hors de la plateau.");
        }
        else {
            // Enlève le joueur de son ancienne position et le met sur sa nouvelle.
            var anciennePosition = joueur.getPosition();
            this.getPlateau()[position].push(this.getPlateau()[anciennePosition].pop());
            // Met à jour la position du joueur.
            joueur.setPosition(position);
        }
    },

    explorer: function(direction, positionJoueur) {
        for (var i = 1; i < 4; i++) {
            // Limites des positions.
            var min = 0
            var max = 99
            // Redéfinie min/max si besoin et calcule position cible pour chaque direction.
            switch (direction) {
                case "n":
                    var indice = positionJoueur - (i * 10);
                    console.log(indice);
                    break;
                case "s":
                    var indice = positionJoueur + (i * 10);
                    console.log(indice);
                    break;
                case "e":
                    // Arrondi à la dizaine inférieure.
                    max = Number(String(positionJoueur)[0] + "9");
                    var indice = positionJoueur + i;
                    console.log(indice);
                    break;
                case "o":
                    // Arrondie à la dizaine inférieure.
                    min = Number(String(positionJoueur)[0] + "0");
                    var indice = positionJoueur - i;
                    console.log(indice);
                    break;
                default:
                    console.log("Operation impossible : argument direction invalide.");
            }


            // Stop l'exploration si l'indice pointe en dehors des limites du plateau
            if (indice > max || indice < min) {
                break;
            }

            // Stop l'exploration si l'indice pointe en dehors des limites du plateau
            var cellule = this.getPlateau()[indice][0];
            if (Obstacle.isPrototypeOf(cellule)) {
                break;
            }

            // Rend la cellule accessible.
            cellule.setAccessible(true);
        }
    },
    /*
        Met à innaccessible toutes les cellules vides puis recalcule les cellules
        vides accessibles pour le joueur actif.
    */
    genererCelluleAccessible: function() {
        // Rend innaccessible toutes les cellules.
        this.getPlateau().forEach(function(conteneur) {
            var cellule = conteneur[0]
            if (cellule.getAccessible()) {
                cellule.setAccessible(false);
            }
        });

        // Trouver la position du joueur actif
        var joueurActif = this.getJoueurActif();
        var positionJoueur = joueurActif.getPosition();

        // Parcours les quatres direction: nord, sud, est et ouest.
        var directions = ["n", "s", "e", "o"];
        for (var i = 0; i < directions.length; i++) {
            this.explorer(directions[i], positionJoueur);
        }
    },

    /*
        Ne fonctionne que pour 2 joueurs.
    */
    changerJoueurActif: function() {
        this.getJoueurs().forEach(function(joueur) {
            if (joueur.getActif()) {
                joueur.setActif(false);
            }
            else {
                joueur.setActif(true);
            }
        });
    },

    /*
        Jouer un tour consiste à mettre en oeuvre un déplacement du joueur actif.
    */
    jouerTour: function(position) {
        if (typeof position !== 'number') {
            console.log("Operation impossible : argument position invalide.");
            return false;
        }
        // Déplacer le joueur actif.
        this.deplacer(this.getJoueurActif(), position);
        // Incrémente l'attribut tour.
        var newTour = this.getTour() + 1
        this.setTour(newTour);
        // Change le joueur actif.
        this.changerJoueurActif();
        // Calculer les nouvelles cellules accessibles.
        this.genererCelluleAccessible();
    },

    
};
