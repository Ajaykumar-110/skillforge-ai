const FAQ = require('../models/FAQ');

// @desc Get FAQs
// @route GET /api/faqs
const getFAQs = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    if (search) {
      query.$or = [
        { question: { $regex: search, $options: 'i' } },
        { answer: { $regex: search, $options: 'i' } },
      ];
    }
    const faqs = await FAQ.find(query);
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getFAQs };
