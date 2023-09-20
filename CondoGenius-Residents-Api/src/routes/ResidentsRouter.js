const express = require('express');
const router = express.Router();
const residentController = require('../controllers/residentController');

// Rota para criar um novo residente
router.post('/create', residentController.createResident);

router.get('/list', residentController.listResidents);

router.get('/list/:id', residentController.listResidentById);

router.put('/update/:id', residentController.updateResident);

router.delete('/delete/:id', residentController.deleteResident);

module.exports = router;
