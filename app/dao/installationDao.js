/* Load Car entity */
const Installation = require('../model/installation');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Car Data Access Object
 */
class InstallationDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        const sqlRequest = "SELECT * FROM installation";

        return this.common.findAll(sqlRequest).then(rows => {

            let installations = [];

            for (const row of rows) {
                installations.push(new Installation(row.numero_de_l_installation, row.nom_usuel_de_l_installation, row.code_postal, row.nom_de_la_commune));
            }

            return installations;
        });
    };

    findByCodePostal(codePostal) {
        const sqlRequest = "SELECT * FROM installation WHERE code_postal LIKE $codePostal";
        const sqlParams = {
            $codePostal: "%" + codePostal + "%"
        };

        return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {
            let installations = [];
            for (const row of rows) {
                installations.push(new Installation(row.numero_de_l_installation, row.nom_usuel_de_l_installation, row.code_postal, row.nom_de_la_commune));
            }
            return installations;
        });
    }

    /**
     * Retrouve les noms usuels par rapport aux activités
     * @param activiteLibelle L'activité par laquelle on récupère le nom Usuel
     */
    findNomUsuel_by_ActiviteLibelle(activiteLibelle) {
        const sqlRequest = "select installation.nom_usuel_de_l_installation\n" +
            "                       from equipement\n" +
            "                       inner join installation on installation.numero_de_l_installation=equipement.numero_de_l_installation \n" +
            "                       inner join activite on activite.numero_de_la_fiche_equipement=equipement.numero_de_la_fiche_equipement\n" +
            "                       where activite.activite_libelle=$activiteLibelle";
        const sqlParams = {
            $activiteLibelle: activiteLibelle
        };
        return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {
            let nomsUsuels = [];
            for (const row of rows) {
                nomsUsuels.push(row.nom_usuel_de_l_installation);
            }
            return nomsUsuels;
        })
    }
}
module.exports = InstallationDao;
