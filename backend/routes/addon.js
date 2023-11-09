const express = require('express');
const router = express.Router();
const addonsController = require('../controllers/AddonsController');

// Create a new addon
router.post('/addons/new', addonsController.newAddon);

// Get all addons
router.get('/addons', addonsController.getAllAddons);

// Get an addon by ID
router.get('/addons/:id', addonsController.getSingleAddon);

// Update an addon by ID
router.put('/addons/:id', addonsController.updateAddon);

// Delete an addon by ID
router.delete('/addons/:id', addonsController.deleteAddon);

module.exports = router;