/* Load Car entity */
const Activites = require('../model/Activites');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Car Data Access Object
 */
class ActivitesDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
/*    findById(id) {
        let sqlRequest = "SELECT id, maker, model, year, driver FROM car WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Car(row.id, row.maker, row.model, row.year, row.driver));
    };
*/
}

module.exports = ActivitesDao;
