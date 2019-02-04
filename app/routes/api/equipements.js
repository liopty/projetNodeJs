/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const EquipementsController = require('../../controller/EquipementsController');
const equipementsController = new EquipementsController();

/**
 * Exemple route
 */
//router.get('/count', function (req, res) {
//    equipementsController.countAll(res);
//});

module.exports = router;
