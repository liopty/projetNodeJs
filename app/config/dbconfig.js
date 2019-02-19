/* Load modules */
let sqlite3 = require('sqlite3').verbose();
let csv = require('csv');
let parse = require('csv-parser');

/*
 * Database configuration
 */

/* Load database file (Creates file if not exists) */
let db = new sqlite3.Database('./sqlite.db');

/* Init car and driver tables if they don't exist */
let init = function () {
    db.run("CREATE TABLE if not exists car (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " maker TEXT," +
        " model TEXT," +
        " year INT," +
        " driver INT" +
        ")");

    db.run("CREATE TABLE if not exists driver (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " firstName TEXT," +
        " lastName TEXT," +
        " car INT" +
        ")");

    db.run("CREATE TABLE if not exists activites (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " codeDep TEXT," +
        " libDep TEXT," +
        " codeINSEE INT," +
        " nomCommune TEXT," +
        " numFiche INT," +
        " nbIdentique INT," +
        " activiteCode INT," +
        " activiteLib TEXT," +
        " activitePraticable INT," + // TODO : Changer les 0 et 1 en 'non' et 'oui'
        " activitePratiquee INT," +
        " salleSpec INT," +
        " nivActivite TEXT," +
        " latitude FLOAT," +
        " longitude FLOAT" +
        ")");

    db.run("CREATE TABLE if not exists installations (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " codeDep TEXT," +
        " libDep TEXT," +
        " codeINSEE INT," +
        " nomCommune TEXT," +
        " numInstall INT," +
        " nomUsuel TEXT," +
        " numVoie TEXT," +
        " nomVoie TEXT," +
        " nomLieuDit TEXT," +
        " codePostal INT," +
        " instParticuliere TEXT," +
        " multiCommune INT" + // bool
        " nbCouvert INT" +
        " nbLit INT" +
        " presenceInternat INT" + // bool
        " amenagementAcessibilite INT" + // bool
        " accesHandicapMobile INT" + //bool
        " accesHandicapSens INT " + //bool
        " placesParking INT" +
        " placesParkingHandicap INT" +
        " gardien TEXT" + // indique aussi le logement
        " emprisefonciere INT" + // m2
        " desserteMetro INT" + // bool
        " desserteBus INT" + // bool
        " desserteTram INT" + // bool
        " desserteTrain INT" + // bool
        " desserteBateau INT" + // bool
        " desserteAutre INT" + // bool
        " creationFiche TEXT" + // date
        " majFiche TEXT " + // date
        " nbFicheEquipement INT" +
        " nbEquipement INT" +
        " latitude1 FLOAT," +
        " longitude1 FLOAT" +
        " latitude2 FLOAT," +
        " longitude2 FLOAT" +
        " latitude FLOAT," +
        " longitude FLOAT" +
        ")");

    // Pas complet
    db.run("CREATE TABLE if not exists equipement (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " codeDep TEXT," +
        " libDep TEXT," +
        " codeINSEE INT," +
        " nomCommune TEXT," +
        " numInstall INT," +
        " nomUsuel TEXT," +
        " numFicheEquipement INT" +
        " equipement TEXT" +
        " batiment TEXT" +
        " nbEquipementIdentique INT" +
        " typeEquipementCode INT" + // un code est demandé
        " typeEquipement TEXT" +
        " proprietaire TEXT" +
        " gestionnaire TEXT" +
        " proprietaireSec TEXT" +
        " gestionnaireSec TEXT" +
        " douches INT" +//bool
        " eclairage INT" + //bool
        " chapiteau INT" + //bool
        " etablissementFlottant INT" + //bool
        " sallePoly INT" + // bool
        " restaurant INT" + // bool
        " hotelAltitude INT" + // bool
        " salleDanseJeux INT " + // bool
        " etablissementPleinAir INT" + // bool
        " colo INT"+ // bool
        " structGonflable INT" + // bool
        " etablissemntCouvert INT" + // bool
        " anneeMiseService INT" + // bool
        " placeTribune INT" +
        " natureSol TEXT" +
        " natureEquipement TEXT" +
        ")")
};

module.exports = {
    init: init,
    db: db
};
