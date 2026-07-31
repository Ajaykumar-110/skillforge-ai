const Department = require('../models/Department');

// @desc Get all departments
// @route GET /api/departments
const getDepartments = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } },
      ];
    }
    const departments = await Department.find(query);
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get department by ID
// @route GET /api/departments/:id
const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).json({ message: 'Department not found' });
    res.json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Admin Endpoints ---

// @desc Create department
// @route POST /api/departments
// @access Private/Admin
const createDepartment = async (req, res) => {
  try {
    const { code, name, category, description, hod, established, intake, courses, image, iconName } = req.body;

    if (!code || !name || !category) {
      return res.status(400).json({ success: false, message: 'Please provide code, name, and category' });
    }

    const deptExists = await Department.findOne({ code });
    if (deptExists) {
      return res.status(400).json({ success: false, message: 'Department code already exists' });
    }

    const department = await Department.create({
      code,
      name,
      category,
      description,
      hod,
      established,
      intake,
      courses: courses || [],
      image,
      iconName,
    });

    res.status(201).json({ success: true, message: 'Department created successfully', department });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update department
// @route PUT /api/departments/:id
// @access Private/Admin
const updateDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ success: false, message: 'Department not found' });
    }

    const { code, name, category, description, hod, established, intake, courses, image, iconName } = req.body;

    if (code && code !== department.code) {
      const deptExists = await Department.findOne({ code });
      if (deptExists) return res.status(400).json({ success: false, message: 'Department code already exists' });
      department.code = code;
    }

    if (name) department.name = name;
    if (category) department.category = category;
    if (description) department.description = description;
    if (hod) department.hod = hod;
    if (established) department.established = established;
    if (intake) department.intake = intake;
    if (courses) department.courses = courses;
    if (image) department.image = image;
    if (iconName) department.iconName = iconName;

    await department.save();

    res.json({ success: true, message: 'Department updated successfully', department });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete department
// @route DELETE /api/departments/:id
// @access Private/Admin
const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) {
      return res.status(404).json({ success: false, message: 'Department not found' });
    }
    res.json({ success: true, message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
