const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true }, // Professor, Associate Professor, HOD, Assistant Professor
    department: { type: String, required: true },
    email: { type: String, required: true },
    qualification: { type: String, required: true },
    experience: { type: String, required: true },
    specialization: { type: String, required: true },
    bio: { type: String, required: true },
    avatar: { type: String, required: true },
    publicationsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Faculty', facultySchema);
