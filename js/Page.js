/**
  * L'objet Page Generateur va modifier la page html via le DOM.
  */

var Page = Object.create(Composant);


/**
  * Créer un élément à partir d'une cellule d'un plateau.
  *
  * @param	 {Cellule}	cellule	    La cellule modèle pour l'élément.
  * @param	 {Number}	position    La position.
  * @returns {Element}              L'élément cellule.
  */
Page.creerCelluleElt = function(cellule, position) {
    // Créé l'élément.
    var celluleElt = document.createElement("td");
    celluleElt.classList.add("cellule");
    // Ajoute l'id avec la position ("xy").
    celluleElt.id = position;

    // Ajoute la classe correspondant à la cellule.
    if (Arme.isPrototypeOf(cellule)) {
        // Attribut une classe particulière en fonction des dégâts de l'arme.
        switch (cellule.getDegat()) {
            case this.getControlleur().getParametre().ARME_DEGAT_MINIMUM:
                celluleElt.classList.add("armeMinimum");
                break;
            case this.getControlleur().getParametre().ARME_DEGAT_FAIBLE:
                celluleElt.classList.add("armeFaible");
                break;
            case this.getControlleur().getParametre().ARME_DEGAT_MOYEN:
                celluleElt.classList.add("armeMoyen");
                break;
            case this.getControlleur().getParametre().ARME_DEGAT_FORT:
                celluleElt.classList.add("armeFort");
                break;
            default:
                console.log("Operation impossible : argument cellule invalide.");
        }
        celluleElt.classList.add("arme");
    }
    else if (Obstacle.isPrototypeOf(cellule)) {
        celluleElt.classList.add("obstacle");
    }
    else if (Joueur.isPrototypeOf(cellule)) {
        // J1
        if (cellule.getNom() === this.getControlleur().getParametre().NOM_J1) {
            if (cellule.getActif()) {
                celluleElt.classList.add("j1Actif");
            }
            else {
                celluleElt.classList.add("j1");
            }
        }
        // J2
        else {
            if (cellule.getActif()) {
                celluleElt.classList.add("j2Actif");
            }
            else {
                celluleElt.classList.add("j2");
            }
        }
    }
    else {
        celluleElt.classList.add("vide");
    }

    // S'il ne s'agit pas d'un joueur.
    if (!Joueur.isPrototypeOf(cellule)) {
        // Vérifie si la cellule est accessible.
        if (cellule.getAccessible()) {
            celluleElt.classList.add("accessible");
            // Rend le controlleur accessible depuis l'élément.
            celluleElt.controlleur = this.getControlleur();
            celluleElt.addEventListener("click", function(e) {
                var position = e.target.id;
                e.target.controlleur.jouerTour(Number(position));
            });
        }
    }

    return celluleElt;
}

/**
  * Après les avoir supprimé, créer l'ensemble des cellules d'un plateau en
  * utilisant la méthode creerCellule. Les cellules sont groupées par
  * ligne (d'une longueur égale à la largeur du plateau).
  *
  * @param	 {Array}	plateau	    Le plateau du jeu.
  * @returns {void}
  */
Page.dessinerPlateau = function(plateau) {
    if (plateau instanceof Array) {
        // Enlève l'ensemble des cellules.
        var plateauElt = document.getElementById("plateau");
        while(plateauElt.lastChild) {
            plateauElt.removeChild(plateauElt.lastChild);
        }

        var largeur = this.getControlleur().getParametre().LARGEUR_PLATEAU;
        // Ajoute l'ensemble des cellules dans le tableau "plateau".
        for (var i = 0; i < largeur; i++) {
            // Une ligne.
            var ligneElt = document.createElement("tr");
            for (var j = 0; j < largeur; j++) {
                // Calcule la position à partir de i et j.
                var position = i*10 + j;
                // S'il y a un joueur sur la cellule.
                if (plateau[position].length > 1) {
                    var cellule = plateau[position][1]; // le joueur.
                }
                else {
                    var cellule = plateau[position][0]; // la cellule.
                }
                // Créé l'élément à partir de la cellule.
                var celluleElt = this.creerCelluleElt(cellule, position);
                ligneElt.appendChild(celluleElt);
            }
            plateauElt.appendChild(ligneElt);
        }
    }
    else {
        console.log("Operation impossible : argument plateau invalide.");
    }
}
