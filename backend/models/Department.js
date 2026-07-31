const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true }, // Engineering, Management, Sciences, Humanities
    description: { type: String, required: true },
    hod: { type: String, required: true },
    established: { type: Number, required: true },
    intake: { type: Number, required: true },
    courses: [{ type: String }],
    image: { type: String, required: true },
    iconName: { type: String, default: 'School' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Department', departmentSchema);
