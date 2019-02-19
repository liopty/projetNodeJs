/* Load Car Data Access Object */
const ActivitesDao = require('../dao/ActivitesDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/ControllerCommon');

/* Load Car entity */
const Activites = require('../model/Activites');

/**
 * Car Controller
 */
class ActivitesController {

    constructor() {
        this.activitesDao = new ActivitesDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        this.activitesDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

}

module.exports = ActivitesController;
