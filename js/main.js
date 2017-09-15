/*
    Lance le jeu, tout simplement !
*/
window.addEventListener("load", function () {
    var controlleur = Object.create(Controlleur);
    controlleur.init(parametre);
    controlleur.lancerPartie();
});
