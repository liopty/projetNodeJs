/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();

/* API routes */
router.use('/activites', require('.api/activites'));
router.use('/equipements', require('./api/equipements'));
router.use('/installations', require('./api/installations'));

module.exports = router;
