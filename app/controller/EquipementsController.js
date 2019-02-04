/* Load Car Data Access Object */
const EquipementsDao = require('../dao/EquipementsDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/ControllerCommon');

/* Load Car entity */
const Equipements = require('../model/Equipements');

/**
 * Car Controller
 */
class EquipementsController {

    constructor() {
        this.equipementsDao = new EquipementsDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        this.equipementsDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

}

module.exports = EquipementsController;
