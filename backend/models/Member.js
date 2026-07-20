const mongoose = require('mongoose');

// ─── Associate Member ────────────────────────────────────────────────────────
const associateMemberSchema = new mongoose.Schema({
  memberType: { type: String, default: 'associate' },
  // Personal Info
  fullName:    { type: String, required: true, trim: true },
  fatherName:  { type: String, required: true, trim: true },
  dateOfBirth: { type: Date, required: true },
  gender:      { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  nationality: { type: String, default: 'Indian' },
  // Contact
  email:       { type: String, required: true, lowercase: true },
  phone:       { type: String, required: true },
  address:     { type: String, required: true },
  city:        { type: String, required: true },
  state:       { type: String, required: true },
  pincode:     { type: String, required: true },
  // Professional
  qualification:   { type: String, required: true },
  designation:     { type: String },
  institution:     { type: String },
  experience:      { type: String },
  // Payment
  paymentMode:     { type: String, enum: ['Online', 'DD', 'Cheque'], required: true },
  transactionId:   { type: String },
  amount:          { type: Number, default: 500 },
  // Meta
  status:          { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  membershipId:    { type: String },
  submittedAt:     { type: Date, default: Date.now },
});

// ─── Institutional Member ────────────────────────────────────────────────────
const institutionalMemberSchema = new mongoose.Schema({
  memberType:        { type: String, default: 'institutional' },
  institutionName:   { type: String, required: true, trim: true },
  institutionType:   { type: String, enum: ['University', 'College', 'School', 'Academy', 'Club', 'Other'], required: true },
  affiliatedTo:      { type: String },
  establishedYear:   { type: String },
  // Head of Institution
  headName:          { type: String, required: true },
  headDesignation:   { type: String, required: true },
  // Contact
  email:             { type: String, required: true, lowercase: true },
  phone:             { type: String, required: true },
  website:           { type: String },
  address:           { type: String, required: true },
  city:              { type: String, required: true },
  state:             { type: String, required: true },
  pincode:           { type: String, required: true },
  // Physical Ed Details
  physicalEdDept:    { type: Boolean, default: false },
  noOfStudents:      { type: String },
  sportsOffered:     { type: String },
  // Payment
  paymentMode:       { type: String, enum: ['Online', 'DD', 'Cheque'], required: true },
  transactionId:     { type: String },
  amount:            { type: Number, default: 2000 },
  // Meta
  status:            { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  membershipId:      { type: String },
  submittedAt:       { type: Date, default: Date.now },
});

// ─── Life Member ─────────────────────────────────────────────────────────────
const lifeMemberSchema = new mongoose.Schema({
  memberType:      { type: String, default: 'life' },
  fullName:        { type: String, required: true, trim: true },
  fatherName:      { type: String, required: true, trim: true },
  dateOfBirth:     { type: Date, required: true },
  gender:          { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  bloodGroup:      { type: String },
  nationality:     { type: String, default: 'Indian' },
  // Contact
  email:           { type: String, required: true, lowercase: true },
  phone:           { type: String, required: true },
  alternatePhone:  { type: String },
  address:         { type: String, required: true },
  city:            { type: String, required: true },
  state:           { type: String, required: true },
  pincode:         { type: String, required: true },
  // Academic & Professional
  highestQualification: { type: String, required: true },
  specialization:       { type: String },
  designation:          { type: String, required: true },
  institution:          { type: String, required: true },
  totalExperience:      { type: String, required: true },
  researchPapers:       { type: String },
  // Payment
  paymentMode:     { type: String, enum: ['Online', 'DD', 'Cheque'], required: true },
  transactionId:   { type: String },
  amount:          { type: Number, default: 5000 },
  // Meta
  status:          { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  membershipId:    { type: String },
  submittedAt:     { type: Date, default: Date.now },
});

// ─── Regular Member ──────────────────────────────────────────────────────────
const regularMemberSchema = new mongoose.Schema({
  memberType:     { type: String, default: 'regular' },
  fullName:       { type: String, required: true, trim: true },
  fatherName:     { type: String, required: true, trim: true },
  dateOfBirth:    { type: Date, required: true },
  gender:         { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  nationality:    { type: String, default: 'Indian' },
  email:          { type: String, required: true, lowercase: true },
  phone:          { type: String, required: true },
  address:        { type: String, required: true },
  city:           { type: String, required: true },
  state:          { type: String, required: true },
  pincode:        { type: String, required: true },
  qualification:  { type: String, required: true },
  designation:    { type: String },
  institution:    { type: String },
  paymentMode:    { type: String, enum: ['Online', 'DD', 'Cheque'], required: true },
  transactionId:  { type: String },
  amount:         { type: Number, default: 1000 },
  status:         { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  membershipId:   { type: String },
  submittedAt:    { type: Date, default: Date.now },
});

module.exports = {
  AssociateMember:
    mongoose.models.AssociateMember ||
    mongoose.model("AssociateMember", associateMemberSchema),

  InstitutionalMember:
    mongoose.models.InstitutionalMember ||
    mongoose.model("InstitutionalMember", institutionalMemberSchema),

  LifeMember:
    mongoose.models.LifeMember ||
    mongoose.model("LifeMember", lifeMemberSchema),

  RegularMember:
    mongoose.models.RegularMember ||
    mongoose.model("RegularMember", regularMemberSchema),
};