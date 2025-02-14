const mongoose = require('mongoose');
const Model = mongoose.model('Setting');

const listAll = async (req, res) => {
  const sort = parseInt(req.query.sort) || 'desc';

  //  Query the database for a list of all results
  const result = await Model.find({
    removed: false,
    isPrivate: false,
  }).sort({ createdAt: sort });

  if (result.length > 0) {
    return res.status(200).json({
      success: true,
      result,
      message: 'Successfully found all documents',
    });
  } else {
    return res.status(203).json({
      success: false,
      result: [],
      message: 'Collection is Empty',
    });
  }
};

module.exports = listAll;
