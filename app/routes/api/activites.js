/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const ActivitesController = require('../../controller/ActivitesController');
const activitesController = new ActivitesController();

/**
 * Exemple route
 */
//router.get('/count', function (req, res) {
//    activitesControllerController.countAll(res);
//});

module.exports = router;
