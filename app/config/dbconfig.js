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

    // TODO : A finir
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
        " multiCommune INT" + // Conversion a faire
        ")")
};

module.exports = {
    init: init,
    db: db
};
