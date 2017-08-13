/**
  * L'objet Page Generateur va modifier la page html via le DOM.
  */

var Page = Object.create(Composant);

/**
  * Floutter un élément cellule accessible.
  *
  * @param	    {Element}	celluleElt	L'élément cellule.
  * @returns	{Element}		    	L'élément cellule floutté.
  */
Page.floutter = function(celluleElt) {
    // Rend la couleur du fond transparente.
    var couleur = celluleElt.style.backgroundColor;
    var nouvelleCouleur = couleur.slice(0, -1) + ', 0.4)';
    celluleElt.style.backgroundColor = nouvelleCouleur;
    // Modifie les bordures.
    celluleElt.style.border = 'solid white 1px';
    return celluleElt;
}

/**
  * Créer un élément à partir d'une cellule d'un plateau.
  *
  * @param	 {Cellule}	cellule	    La cellule modèle pour l'élément.
  * @param	 {Number}	position    La couleur sous forme 'rga(xxx,xxx,xxx)'.
  * @returns {Element}              L'élément cellule.
  */
Page.creerCelluleElt = function(cellule, position) {
    // Créé le conteneur
    var celluleElt = document.createElement("td");
    celluleElt.classList.add("cellule");
    celluleElt.style.backgroundColor = cellule.getCouleur();
    // Ajoute l'id avec la position ("xy").
    celluleElt.id = position;

    // S'il ne s'agit pas d'un joueur.
    if (!Joueur.isPrototypeOf(cellule)) {
        // Vérifie si la cellule est accessible.
        if (cellule.getAccessible()) {
            // Floutte la cellule accessible pour la rendre visible au joueur.
            var celluleElt = this.floutter(celluleElt);
            // S'il s'agit d'une arme on affiche sa valeur.
            if (Arme.isPrototypeOf(cellule)) {
                celluleElt.textContent = cellule.getDegat();
            }
            // Rendre le controlleur accessible depuis l'élément.
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
