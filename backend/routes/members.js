const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const {
  AssociateMember,
  InstitutionalMember,
  LifeMember,
  RegularMember,
} = require('../models/Member');

// Membership fee constants
const FEES = {
  associate: 500,
  regular: 1000,
  institutional: 2000,
  life: 5000,
};

// Generate membership ID
const generateMembershipId = (type) => {
  const prefix = { associate: 'AM', institutional: 'IM', life: 'LM', regular: 'RM' };
  return `AICPE-${prefix[type] || 'MX'}-${Date.now().toString().slice(-6)}`;
};

// Common validation rules
const baseValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').isMobilePhone('en-IN').withMessage('Valid Indian phone number required'),
];

// ─── POST /api/members/associate ─────────────────────────────────────────────
router.post('/associate', [
  ...baseValidation,
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('fatherName').notEmpty().withMessage('Father name is required'),
  body('dateOfBirth').isDate().withMessage('Valid date of birth required'),
  body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Gender is required'),
  body('qualification').notEmpty().withMessage('Qualification is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('state').notEmpty().withMessage('State is required'),
  body('pincode').isLength({ min: 6, max: 6 }).withMessage('Valid pincode required'),
  body('paymentMode').isIn(['Online', 'DD', 'Cheque']).withMessage('Payment mode required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  try {
    const membershipId = generateMembershipId('associate');
    const member = new AssociateMember({
      ...req.body,
      amount: FEES.associate,
      membershipId,
    });
    await member.save();
    res.status(201).json({
      success: true,
      message: 'Associate member registration submitted successfully!',
      membershipId,
    });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ success: false, message: 'Email already registered.' });
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// ─── POST /api/members/institutional ─────────────────────────────────────────
router.post('/institutional', [
  ...baseValidation,
  body('institutionName').notEmpty().withMessage('Institution name is required'),
  body('institutionType').notEmpty().withMessage('Institution type is required'),
  body('headName').notEmpty().withMessage('Head name is required'),
  body('headDesignation').notEmpty().withMessage('Head designation is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('state').notEmpty().withMessage('State is required'),
  body('pincode').isLength({ min: 6, max: 6 }).withMessage('Valid pincode required'),
  body('paymentMode').isIn(['Online', 'DD', 'Cheque']).withMessage('Payment mode required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  try {
    const membershipId = generateMembershipId('institutional');
    const member = new InstitutionalMember({
      ...req.body,
      amount: FEES.institutional,
      membershipId,
    });
    await member.save();
    res.status(201).json({
      success: true,
      message: 'Institutional member registration submitted successfully!',
      membershipId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// ─── POST /api/members/life ───────────────────────────────────────────────────
router.post('/life', [
  ...baseValidation,
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('fatherName').notEmpty().withMessage('Father name is required'),
  body('dateOfBirth').isDate().withMessage('Valid date of birth required'),
  body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Gender is required'),
  body('highestQualification').notEmpty().withMessage('Qualification is required'),
  body('designation').notEmpty().withMessage('Designation is required'),
  body('institution').notEmpty().withMessage('Institution is required'),
  body('totalExperience').notEmpty().withMessage('Experience is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('state').notEmpty().withMessage('State is required'),
  body('pincode').isLength({ min: 6, max: 6 }).withMessage('Valid pincode required'),
  body('paymentMode').isIn(['Online', 'DD', 'Cheque']).withMessage('Payment mode required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  try {
    const membershipId = generateMembershipId('life');
    const member = new LifeMember({
      ...req.body,
      amount: FEES.life,
      membershipId,
    });
    await member.save();
    res.status(201).json({
      success: true,
      message: 'Life member registration submitted successfully!',
      membershipId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// ─── POST /api/members/regular ────────────────────────────────────────────────
router.post('/regular', [
  ...baseValidation,
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('fatherName').notEmpty().withMessage('Father name is required'),
  body('dateOfBirth').isDate().withMessage('Valid date of birth required'),
  body('qualification').notEmpty().withMessage('Qualification is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('state').notEmpty().withMessage('State is required'),
  body('pincode').isLength({ min: 6, max: 6 }).withMessage('Valid pincode required'),
  body('paymentMode').isIn(['Online', 'DD', 'Cheque']).withMessage('Payment mode required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  try {
    const membershipId = generateMembershipId('regular');
    const member = new RegularMember({
      ...req.body,
      amount: FEES.regular,
      membershipId,
    });
    await member.save();
    res.status(201).json({
      success: true,
      message: 'Member registration submitted successfully!',
      membershipId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// ─── GET /api/members/fees ─────────────────────────────────────────────────
router.get('/fees', (req, res) => {
  res.json({ success: true, fees: FEES });
});

module.exports = router;
