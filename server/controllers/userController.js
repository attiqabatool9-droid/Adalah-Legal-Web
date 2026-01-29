const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// ==============================
// Register User (SAME AS YOU PROVIDED)
// ==============================
const registerUser = async (req, res) => {
    try {
        console.log("=== LAWYER REGISTRATION REQUEST ===");
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        const { 
            name, 
            email, 
            password, 
            phone,
            // User Fields
            caseDesc,
            caseType,
            city,
            urgent,
            role,
            // Lawyer New Fields
            cnic,
            experience,
            specialization
        } = req.body;

        // Basic validation
        if (!name || !email || !password || !phone) {
            console.log("Missing basic fields");
            return res.status(400).json({ message: 'Please add all required fields' });
        }

        // Validate role is provided
        if (!role) {
            console.log("Role not provided");
            return res.status(400).json({ message: 'Role is required' });
        }

        // Lawyer specific validation
        if (role === 'lawyer') {
            if (!cnic || !experience || !specialization) {
                console.log("Missing lawyer specific fields:", { cnic, experience, specialization });
                return res.status(400).json({ message: 'Please provide CNIC, experience, and specialization for lawyer registration' });
            }
        }

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log("User already exists:", email);
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // --- FILE HANDLING (License Upload) ---
        let licensePath = null;
        if (req.file) {
            licensePath = req.file.path.replace(/\\/g, "/");
            console.log("License file uploaded:", licensePath);
        }

        // Create user in MongoDB
        const userData = {
            name,
            email,
            phone,
            password: hashedPassword,
            role,
            caseDesc: caseDesc || "",
            caseType: caseType || "",
            city: city || "",
            urgent: urgent || false,
            cnic: cnic || "",
            experience: experience ? String(experience) : "",
            specialization: specialization || "",
            license: licensePath 
        };

        console.log("Creating user with data:", userData);
        const user = await User.create(userData);

        console.log("User created successfully:", user._id);

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                token: generateToken(user._id),
                message: "User/Lawyer Registered Successfully"
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }

    } catch (error) {
        console.error("=== ERROR IN REGISTRATION ===");
        console.error("Error message:", error.message);
        res.status(500).json({ message: error.message || 'Server error during registration' });
    }
};

// ==============================
// Login User (SAME AS BEFORE)
// ==============================
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
                message: "Login Successful"
            });
        } else {
            res.status(400).json({ message: 'Invalid credentials (Email or Password wrong)' });
        }
    } catch (error) {
        console.log("ERROR:", error);
        res.status(500).json({ message: error.message });
    }
};

// ==============================
// Get Logged-in User (UPDATED FOR DEBUGGING)
// ==============================
const getMe = async (req, res) => {
    try {
        console.log("=== GET ME REQUEST RECEIVED ===");
        // Check karo k user ID token se aa rahi hai ya nahi
        if (!req.user || !req.user.id) {
            console.log("No User ID in request (Middleware Issue)");
            return res.status(401).json({ message: "Not authorized" });
        }

        console.log("Fetching Data for User ID:", req.user.id);
        
        // Database se fresh data uthao
        const user = await User.findById(req.user.id);

        if (user) {
            console.log("User Found sending to Frontend:", user.email);
            res.status(200).json(user);
        } else {
            console.log("User not found in DB");
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log("ERROR in getMe:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
};

// ==============================
// Update User Profile
// ==============================
const updateProfile = async (req, res) => {
    try {
        console.log("=== UPDATE PROFILE REQUEST ===");
        
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const { name, email, phone, specialization, experience, cnic, city, caseDesc, caseType, urgent } = req.body;

        // Find user and update
        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                ...(name && { name }),
                ...(email && { email }),
                ...(phone && { phone }),
                ...(specialization && { specialization }),
                ...(experience && { experience: String(experience) }),
                ...(cnic && { cnic }),
                ...(city && { city }),
                ...(caseDesc && { caseDesc }),
                ...(caseType && { caseType }),
                ...(urgent !== undefined && { urgent }),
            },
            { new: true }
        );

        if (user) {
            console.log("Profile updated successfully");
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("ERROR in updateProfile:", error.message);
        res.status(500).json({ message: "Server Error updating profile" });
    }
};

// ==============================
// Generate JWT Token (SAME AS BEFORE)
// ==============================
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// ==============================
// Get All Users/Lawyers (Public)
// ==============================
const getAllUsers = async (req, res) => {
    try {
        console.log("\n=== GET ALL USERS REQUEST ===");
        console.log("URL:", req.originalUrl);
        console.log("Method:", req.method);
        
        // Get all users from database
        const users = await User.find().select('-password');
        
        console.log(`✅ Found ${users.length} users in database`);
        
        res.status(200).json(users);
    } catch (error) {
        console.error("❌ ERROR in getAllUsers:", error.message);
        res.status(500).json({ message: "Server Error fetching users: " + error.message });
    }
};

// ==============================
// Get User by ID (Public)
// ==============================
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-password');
        
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("ERROR in getUserById:", error.message);
        res.status(500).json({ message: "Server Error fetching user" });
    }
};

// ==============================
// Export
// ==============================
module.exports = {
    registerUser,
    loginUser,
    getMe,
    updateProfile,
    getAllUsers,
    getUserById,
};