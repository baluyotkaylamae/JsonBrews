const Addon = require('../models/addons');

exports.newAddon = async (req, res, next) => {
  const { name, description,category, price } = req.body;

  const addon = await Addon.create({
    name,
    description,
    category,
    price,
  });

  res.status(200).json({
    success: true,
    addon,
  });
};

exports.getSingleAddon = async (req, res, next) => {
  const addon = await Addon.findById(req.params.id);

  if (!addon) {
    return res.status(404).json({ message: `No Addon found with this ID` });
  }

  res.status(200).json({
    success: true,
    addon,
  });
};

exports.getAllAddons = async (req, res, next) => {
  const addons = await Addon.find();

  res.status(200).json({
    success: true,
    addons,
  });
};

exports.updateAddon = async (req, res, next) => {
  const addon = await Addon.findById(req.params.id);

  if (!addon) {
    return res.status(404).json({ message: `No Addon found with this ID` });
  }

  const { name, description,category, price } = req.body;

  addon.name = name;
  addon.description = description;
  addon.category = category;
  addon.price = price;

  await addon.save();

  res.status(200).json({
    success: true,
  });
};

exports.deleteAddon = async (req, res, next) => {
    try {
      const addon = await Addon.findById(req.params.id);

      if (!addon) {
        return res.status(404).json({ message: `No Addon found with this ID` });
      }

      // Use the deleteOne method to delete the addon by its ID
      await Addon.deleteOne({ _id: addon._id });

      res.status(200).json({
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };