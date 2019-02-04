/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();

/* API routes */
router.use('/activitesFichesEquipement', require('.api/activitesFichesEquipements'));
router.use('/equipements', require('./api/equipements'));
router.use('/installations', require('./api/installations'));

module.exports = router;
