/* Load Car Data Access Object */
const ActiviteDao = require('../dao/activiteDao');
/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/**
 * Activite Controller
 */
class ActiviteController {
    constructor() {
        this.activiteDao = new ActiviteDao();
        this.common = new ControllerCommon();
    }

    findByCodePostal(req, res) {
        const codePostal = req.params.code_postal;
        this.activiteDao.findByCodePostal(codePostal)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }

    findAll(res) {
        this.activiteDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }

    /**
     * Permet de recuperer des activités avec le nom de la commune recuperee depuis l'url
     * @param req
     * @param res
     */
    findByNomCommune(req, res) {
        const nomCommune  = req.params.nom_de_la_commune;
        //console.log(nomCommune);
        this.activiteDao.findByNomCommune(nomCommune)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }

    findByActiviteLibelle(req, res) {
        const actiLib  = req.query.activite_libelle;
        this.activiteDao.findByActiLib(actiLib)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }
}

module.exports = ActiviteController;