/**
  * L'objet Page Generateur va modifier la page html via le DOM. Il réalise
  * 3 actions différentes :
  * - dessine le plateau,
  * - dessine le combat,
  * - dessine la fin de la partie (message de félicitation).
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

    // Ajoute l'image correspondant à la cellule.
    celluleElt.style.backgroundImage = cellule.getImg();

    // Ajoute information pour l'aide au joueur dans 'p #help' sauf pour les
    // joueurs et les vides car inutile.
    var helpElt = document.getElementById('help');
    if (!Joueur.isPrototypeOf(cellule) && !Vide.isPrototypeOf(cellule)) {
        celluleElt.addEventListener('mouseenter', function(e){

            helpElt.textContent = cellule.getHelp();// Ajoute l'help de la cellule à l'élément.
            helpElt.style.display = "block";        // Affiche le div help.

            // Cacule la position par rapport à la cible (celluleElt).
            var left = e.target.offsetLeft + e.target.offsetParent.offsetLeft - 30;
            var top = e.target.offsetTop + e.target.offsetParent.offsetTop - 30;
            helpElt.style.left = String(left) + "px";
            helpElt.style.top = String(top) + "px";
        });
        // Fait disparaitre l'help.
        celluleElt.addEventListener('mouseleave', function(e){
            helpElt.style.display = "none";
        });
    }

    // S'il ne s'agit pas d'un joueur.
    if (!Joueur.isPrototypeOf(cellule)) {
        // Rend le controlleur accessible depuis l'élément.
        celluleElt.controlleur = this.getControlleur();
        // Ajoute un EventListener si la cellule est accessible.
        if (cellule.getAccessible()) {
            celluleElt.addEventListener("click", function(e) {
                var position = e.target.id;
                e.target.controlleur.realiserAction(
                    "jouerMouvement",
                    position=Number(position),
                    attaque=null);
            });
        }
    }

    return celluleElt;
}

/**
  * Créer un élément div du DOM auquel on ajoute
  * une classe et/ou un id si précisé(s).
  *
  * @param	 {String}    classe   La  class de l'élément.
  * @param	 {String}    id       La  class de l'élément.
  * @returns {Elt}                Un élément.
  */
Page.creerDiv = function(classe=false, id=false) {
    var divElt = document.createElement("div");
    if (classe) {
        divElt.classList.add(classe);
    }
    if (id) {
        divElt.id = id;
    }
    return divElt;
}

/**
  * Créer un élément p auquel on ajoute un message.
  *
  * @param	 {String}    message   Le textContent.
  * @returns {Elt}                 Un élément.
  */
Page.creerMessageElt = function(message) {
    if (typeof message ==! 'string') {
        return false;
    }

    var messageElt = document.createElement("p");
    messageElt.classList.add("message");
    messageElt.textContent = message;

    return messageElt;
}

/**
  * Créer un élément bouton pour le choix de l'attaque.
  *
  * @param	 {String}    attaque      Type de l'attaque (normale, kamikaze)
  * @returns {Elt}                    Un élément.
  */
Page.creerBoutonElt = function(attaque="normale") {
    var boutonElt = document.createElement("button");
    boutonElt.classList.add("bouton");
    switch (attaque) {
        case "normale":
            boutonElt.textContent = "Attaque normale";
            boutonElt.id = "attaqueNormale";
            break;
        case "kamikaze":
            boutonElt.textContent = "Attaque kamikaze";
            boutonElt.id = "attaqueKamikaze";
            break;
        default:
            console.log("Operation impossible : argument attaque invalide.");
            return false
    }
    boutonElt.controlleur = this.getControlleur();
    boutonElt.addEventListener("click", function(e) {
        // Envoi le choix (stoqué dans id)
        e.target.controlleur.realiserAction(
            "jouerAttaque",
            position=null,
            attaque=e.target.id);
    });
    return boutonElt;
}

/**
  * Créer l'élément barre de vie (avec a gauche la vie du joueur 1, et à droite
  * la vie du joueur 2).
  *
  * @returns {Elt}                 Un élément.
  */
Page.creerBarreDeVieElt = function() {
    // Le total de point de vie correspond à la moitier de la largeur du div combat.
    var totalPDV = 272;
    // Pdv du joueur 1.
    var vieJ1Elt = this.creerDiv(classe="vieJ1");
    var width = Math.floor((this.getControlleur().getJoueurs()[0].getVie() / 100) * totalPDV);
    vieJ1Elt.style.width = String(width) + "px";
    // Pdv du joueur 2.
    var vieJ2Elt = this.creerDiv(classe="vieJ2");
    width =  Math.floor((this.getControlleur().getJoueurs()[1].getVie() / 100) * totalPDV);
    vieJ2Elt.style.width = String(width) + "px";
    // La barre de point de vie.
    var barreElt = this.creerDiv(classe="barre");
    barreElt.appendChild(vieJ1Elt);
    barreElt.appendChild(vieJ2Elt);
    return barreElt;
}

/**
  * Vide un élément identifié par son id.
  *
  * @param	   {String}	  id
  */
Page.viderElt = function(id) {
    var elt = document.getElementById(id);
    while (elt.lastChild) {
        elt.removeChild(elt.lastChild);
    }
}
/**
  * Supprime un élément, identifié par son id, du conteneur.
  *
  * @param	   {String}	  id
  */
Page.supprimerElt = function(id) {
    document.getElementById("conteneur").removeChild(document.getElementById(id));
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
            var ligneElt = this.creerDiv();
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

/**
  * Si fin de partie lance dessinerFinPartie et return False. Sinon, supprime
  * l'ensemble de la page. Ajoute :
  *   - l'image du joueur actif,
  *   - la barre de vie des deux joueurs.
  *   - le message.
  *   - 2 boutons (attaque normal, attaque kamikaze),
  * @param	   {Number}	  codeMessage	    Permet de définir le message.
  * @returns   {Boolean}
  */
Page.dessinerCombat = function(codeMessage=1) {

    // Supprime le plateau s'il est encore là (correspond au début du combat).
    if (document.getElementById("plateau")) {
        this.supprimerElt("plateau");
    }

    // Vide le div combat (si le combat est déjà entamé).
    if (document.getElementById("combat")) {
        this.viderElt("combat");
        var combatElt = document.getElementById("combat");
    }
    // Créé le div combat qui n'existe pas encore.
    else {
        var combatElt = this.creerDiv(classe=false, id="combat");
    }

    // Ajoute l'image de combat pour le joueur actif.
    var imgElt = document.createElement("img");
    imgElt.src = this.getControlleur().getMaitreDuJeu().getJoueurActif().getImgCombat();
    combatElt.appendChild(imgElt);

    // Ajoute la barre de vie des deux joueurs.
    combatElt.appendChild(this.creerBarreDeVieElt());

    // Génère le message en fonction du code et du nom des joueurs.
    var joueurInactif = this.getControlleur().getMaitreDuJeu().getJoueurActif(false).getNom();
    var joueurActif = this.getControlleur().getMaitreDuJeu().getJoueurActif(true).getNom();

    switch (codeMessage) {
        case 1:
            var message  = "Bienvenu dans l'arène les moches !";
            break;
        case 2:
            var message  = "Bien joué " + joueurInactif + ", ton attaque a réussi !";
            break;
        case 3:
            var message  = "Bouuuuh " + joueurInactif + "! Tu t'es foiré...";
            break;
        default:
            console.log("Operation impossible : argument codeMessage invalide.");
    }

    // Demande l'action au joueur actif.
    message += " Qu'est ce que tu fais " + joueurActif + " ?";

    // Créé l'élément message à partir du message personnalisé.
    var messageElt = this.creerMessageElt(message);

    // Ajoute le message au div Combat.
    combatElt.appendChild(messageElt);

    // Ajoute le bouton attaque normale.
    var attaqueElt = this.creerBoutonElt("normale");
    combatElt.appendChild(attaqueElt);

    // Ajoute le bouton attaque kamimaze.
    var kamikazeElt = this.creerBoutonElt("kamikaze");
    combatElt.appendChild(kamikazeElt);

    document.getElementById("conteneur").appendChild(combatElt);
    return true;
}

/**
  * Supprime l'ensemble de la page. Ajoute l'image du vainqueur et un message
  * de félicitation. Relance une partie au bout de 3 secs.
  *
  * @returns
  */
Page.dessinerFinPartie = function() {

    // Vide l'élément combat.
    this.viderElt("combat");

    // Ajoute l'image du vainqueur.
    var vainqueur = this.getControlleur().getMaitreDuJeu().trouverVainqueur();
    var imgElt = document.createElement("img");
    imgElt.src = vainqueur.getImgVainqueur();
    document.getElementById("combat").appendChild(imgElt);

    // Ajoute message de félicitation (augmente la taille de la police)
    var message = "Félicitations " + vainqueur.getNom() + " t'as gagné cette partie !";
    felicitationElt = this.creerMessageElt(message);
    felicitationElt.style.fontSize = "200%";
    document.getElementById("combat").appendChild(felicitationElt);

    // Lance une nouvelle partie au bout de 3 sec.
    setTimeout(function () {
        window.location.reload(true);
    }, 3000);
}
