/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const activitesController = require('../../controller/activitesController');
const activitesController = new activitesController();

/**
 * Exemple route
 */
//router.get('/count', function (req, res) {
//    activitesControllerController.countAll(res);
//});

module.exports = router;
