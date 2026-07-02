import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ChevronLeft } from 'lucide-react';
import './FormWrapper.css';

export function FormWrapper({ title, subtitle, fee, icon, color, children, onSubmit, loading }) {
  return (
    <div className="form-page page-enter">
      <div className={`form-header form-header--${color}`}>
        <div className="container">
          <Link to="/registration" className="form-back">
            <ChevronLeft size={16} /> Back to Membership
          </Link>
          <div className="form-header-content">
            <span className="form-header-icon">{icon}</span>
            <div>
              <h1 className="form-header-title">{title}</h1>
              <p className="form-header-sub">{subtitle}</p>
            </div>
            <div className="form-header-fee">
              <span className="fee-label">Registration Fee</span>
              <span className="fee-value">{fee}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container form-body">
        <div className="form-card">
          {children}
        </div>
      </div>
    </div>
  );
}

export function SuccessScreen({ membershipId, memberType, onReset }) {
  return (
    <div className="success-screen">
      <div className="success-icon">
        <CheckCircle size={56} />
      </div>
      <h2>Application Submitted!</h2>
      <p>Your {memberType} membership application has been received successfully.</p>
      <div className="success-id">
        <span className="success-id-label">Your Membership ID</span>
        <span className="success-id-value">{membershipId}</span>
        <span className="success-id-note">Please save this ID for future reference</span>
      </div>
      <p className="success-note">
        Our team will review your application within 7-10 working days and reach out to you at your registered email.
      </p>
      <div className="success-actions">
        <button onClick={onReset} className="btn btn-outline">Submit Another</button>
        <Link to="/" className="btn btn-primary">Go Home</Link>
      </div>
    </div>
  );
}

export function FormSection({ title, children }) {
  return (
    <div className="form-section">
      <h3 className="form-section-title">{title}</h3>
      <div className="form-grid">{children}</div>
    </div>
  );
}

export function FormRow({ children, cols = 2 }) {
  return (
    <div className={`form-row form-row--${cols}`}>
      {children}
    </div>
  );
}

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli',
  'Daman and Diu', 'Delhi', 'Lakshadweep', 'Puducherry', 'Jammu and Kashmir', 'Ladakh',
];
