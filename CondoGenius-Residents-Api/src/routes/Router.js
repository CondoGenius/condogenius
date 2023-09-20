const express = require('express');
const router = express.Router();

const residentRoutes = require('./routes/ResidentsRouter');

router.use('/residents', residentRoutes);


// adicionar outros routers aqui

module.exports = router;
