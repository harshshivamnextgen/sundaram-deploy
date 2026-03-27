const express = require('express');
const router = express.Router();
const { submitContactForm } = require('./contactController');

router.post('/submit', submitContactForm);

module.exports = router;
