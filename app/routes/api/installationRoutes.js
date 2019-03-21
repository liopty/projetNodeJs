/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const InstallationController = require('../../controller/installationController');
const installationController = new InstallationController();

/**
 * Installation Entity routes
 */


router.get('/', function (req, res) {
    installationController.findAll(res);
});

router.get('/code_postal/:code_postal', function (req, res) {
    installationController.findByCodePostal(req,res);
});

router.get('/activite_libelle/:activite_libelle/:nom_commune', function (req, res) {
    installationController.findNomUsuel_by_ActiviteLibelle(req,res);
});




module.exports = router;