const Case = require('../models/caseModel');

// @desc    Create new case
// @route   POST /api/cases
// @access  Private (Only Users/Clients)
const createCase = async (req, res) => {
  const { title, description, caseType, city } = req.body;

  if (!title || !description || !caseType) {
    return res.status(400).json({ message: 'Please add all required fields' });
  }

  const newCase = await Case.create({
    client: req.user.id,
    title,
    description,
    caseType,
    city,
  });

  res.status(201).json(newCase);
};

// @desc    Get all cases
// @route   GET /api/cases
// @access  Private
const getCases = async (req, res) => {
  // Update: Yahan se { status: 'pending' } hata diya hai taaki
  // Dashboard par Active aur Completed cases bhi count ho sakein.
  // Frontend khud filter kar lega.
  const cases = await Case.find().populate('client', 'name email');
  res.status(200).json(cases);
};

// --- NEW UPDATE: Status Change karne ke liye (Accept/Reject) ---
// @desc    Update case status & Assign Lawyer
// @route   PUT /api/cases/:id
// @access  Private (Lawyer)
const updateCaseStatus = async (req, res) => {
  try {
    console.log("\n=== UPDATE CASE STATUS REQUEST ===");
    console.log("Method:", req.method);
    console.log("Path:", req.path);
    console.log("Case ID:", req.params.id);
    console.log("User:", req.user?._id || "NO USER");
    console.log("Body:", req.body);
    
    if (!req.user) {
      console.log("ERROR: User not authenticated!");
      return res.status(401).json({ message: 'Not authorized - user not found' });
    }

    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    // 1. Case dhoondein
    const caseItem = await Case.findById(req.params.id);
    console.log("Case found:", caseItem ? 'Yes' : 'No');

    if (!caseItem) {
      return res.status(404).json({ message: 'Case not found' });
    }

    // 2. Update Data tayar karein
    let updateData = { status };

    // Agar Lawyer ACCEPT kar raha hai, to Lawyer ki ID set karein
    if (status === 'active') {
      updateData.lawyer = req.user._id; 
      console.log("Assigning lawyer:", req.user._id);
    }

    const updatedCase = await Case.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).populate('client', 'name email').populate('lawyer', 'name email');

    console.log("Case updated successfully");
    res.status(200).json(updatedCase);
  } catch (error) {
    console.error("ERROR in updateCaseStatus:", error.message);
    console.error("Stack:", error.stack);
    res.status(500).json({ message: 'Server Error updating case: ' + error.message });
  }
};

// Export mein naya function add kar diya hai
module.exports = { createCase, getCases, updateCaseStatus };