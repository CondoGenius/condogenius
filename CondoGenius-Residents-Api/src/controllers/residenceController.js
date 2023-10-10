// const Residence = require('../models/residence');
const db = require('../models');
const Residence = db.residences;


exports.listResidences = async (req, res) => {
  try {
    const residences = await Residence.findAll();
    res.status(200).json(residences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getResidenceById = async (req, res) => {
  try {
    const residence = await Residence.findById(req.params.id);
    if (!residence) {
      return res.status(404).json({ message: 'Residence not found' });
    }
    res.status(200).json(residence);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createResidence = async (req, res) => {
  const residence = new Residence({
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    residents: req.body.residents
  });

  try {
    const newResidence = await residence.save();
    res.status(201).json(newResidence);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateResidence = async (req, res) => {
  try {
    const residence = await Residence.findById(req.params.id);
    if (!residence) {
      return res.status(404).json({ message: 'Residence not found' });
    }

    residence.address = req.body.address || residence.address;
    residence.city = req.body.city || residence.city;
    residence.state = req.body.state || residence.state;
    residence.zipCode = req.body.zipCode || residence.zipCode;
    residence.residents = req.body.residents || residence.residents;

    const updatedResidence = await residence.save();
    res.status(200).json(updatedResidence);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteResidence = async (req, res) => {
  try {
    const residence = await Residence.findById(req.params.id);
    if (!residence) {
      return res.status(404).json({ message: 'Residence not found' });
    }

    await residence.remove();
    res.status(200).json({ message: 'Residence deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
