/* Load Car Data Access Object */
const InstallationDao = require('../dao/installationDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load Installation entity */
//const Installation = require('../model/installation');

/**
 * Installation Controller
 */
class InstallationController {

    constructor() {
        this.installationDao = new InstallationDao();
        this.common = new ControllerCommon();
    }



    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
            this.installationDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    findByCodePostal(req,res){
        const codePostal = req.params.code_postal;
        this.installationDao.findByCodePostal(codePostal)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }

    /**
     * Retrouve les noms usuels par rapport aux activités
     * @param activiteLibelle
     */
    findNomUsuel_by_ActiviteLibelle(req,res) {
        const activiteLibelle = req.query.activite_libelle;
        const nomCommune = req.query.nom_commune;
        this.installationDao.findNomUsuel_by_ActiviteLibelle(activiteLibelle, nomCommune)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }
}

module.exports = InstallationController;