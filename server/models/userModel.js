const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number']
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },

    // --- NORMAL USER FIELDS ---
    caseDesc: {
        type: String,
        default: ""
    },
    caseType: {
        type: String,
        default: ""
    },
    city: {
        type: String, // User aur Lawyer dono ke liye use hoga
        default: ""
    },
    urgent: {
        type: Boolean,
        default: false
    },

    // --- LAWYER SPECIFIC FIELDS (New Additions) ---
    cnic: {
        type: String,
        default: "" 
    },
    experience: {
        type: String, // String rakha hai taaki agar koi "5 years" likh de to error na aaye
        default: ""
    },
    specialization: {
        type: String,
        default: ""
    },
    license: {
        type: String, // Yahan image ka path save hoga (e.g., uploads/image.jpg)
        default: ""
    },

    // --- ROLE ---
    role: {
        type: String,
        enum: ['user', 'lawyer', 'lawfirm', 'admin'], 
        default: 'user'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);