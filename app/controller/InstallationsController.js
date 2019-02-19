/* Load Car Data Access Object */
const InstallationsDao = require('../dao/InstallationsDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/ControllerCommon');

/* Load Car entity */
const Installations = require('../model/Installations');

/**
 * Car Controller
 */
class InstallationsController {

    constructor() {
        this.installationsDao = new InstallationsDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        this.installationsDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

}

module.exports = InstallationsController;
