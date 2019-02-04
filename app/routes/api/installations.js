/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const InstallationsController = require('../../controller/InstallationsController');
const installationsController = new InstallationsController();

/**
 * Exemple route
 */
//router.get('/count', function (req, res) {
//    InstallationsController.countAll(res);
//});

module.exports = router;
