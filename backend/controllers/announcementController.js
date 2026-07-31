const Announcement = require('../models/Announcement');

// @desc Get Announcements
// @route GET /api/announcements
const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAnnouncements };
