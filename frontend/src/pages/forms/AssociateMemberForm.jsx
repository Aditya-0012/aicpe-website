import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { submitMember } from '../../api';
import { FormWrapper, SuccessScreen, FormSection, FormRow, INDIAN_STATES } from './FormWrapper';
import './FormWrapper.css';

export default function AssociateMemberForm() {
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await submitMember('associate', data);
      setSuccess(res.data.membershipId);
      toast.success('Registration submitted successfully!');
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div className="form-page page-enter">
      <div className="form-header form-header--green">
        <div className="container"><h1 className="form-header-title">Associate Member</h1></div>
      </div>
      <div className="container form-body">
        <div className="form-card">
          <SuccessScreen membershipId={success} memberType="Associate" onReset={() => { reset(); setSuccess(null); }} />
        </div>
      </div>
    </div>
  );

  return (
    <FormWrapper
      title="Associate Member Registration"
      subtitle="For individuals beginning their journey in physical education"
      fee="₹500 / year"
      icon="🎓"
      color="green"
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormSection title="Personal Information">
          <FormRow cols={2}>
            <div className="form-group">
              <label className="form-label">Full Name <span>*</span></label>
              <input className={`form-input ${errors.fullName ? 'error' : ''}`}
                placeholder="As per official documents"
                {...register('fullName', { required: 'Full name is required' })} />
              {errors.fullName && <span className="form-error">{errors.fullName.message}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Father's Name <span>*</span></label>
              <input className={`form-input ${errors.fatherName ? 'error' : ''}`}
                placeholder="Father's full name"
                {...register('fatherName', { required: "Father's name is required" })} />
              {errors.fatherName && <span className="form-error">{errors.fatherName.message}</span>}
            </div>
          </FormRow>
          <FormRow cols={3}>
            <div className="form-group">
              <label className="form-label">Date of Birth <span>*</span></label>
              <input type="date" className={`form-input ${errors.dateOfBirth ? 'error' : ''}`}
                {...register('dateOfBirth', { required: 'Date of birth is required' })} />
              {errors.dateOfBirth && <span className="form-error">{errors.dateOfBirth.message}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Gender <span>*</span></label>
              <select className={`form-select ${errors.gender ? 'error' : ''}`}
                {...register('gender', { required: 'Gender is required' })}>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <span className="form-error">{errors.gender.message}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Nationality</label>
              <input className="form-input" defaultValue="Indian"
                {...register('nationality')} />
            </div>
          </FormRow>
        </FormSection>

        <FormSection title="Contact Information">
          <FormRow cols={2}>
            <div className="form-group">
              <label className="form-label">Email Address <span>*</span></label>
              <input type="email" className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="yourname@email.com"
                {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } })} />
              {errors.email && <span className="form-error">{errors.email.message}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Mobile Number <span>*</span></label>
              <input type="tel" className={`form-input ${errors.phone ? 'error' : ''}`}
                placeholder="+91 XXXXX XXXXX"
                {...register('phone', { required: 'Phone is required', pattern: { value: /^[0-9]{10}$/, message: 'Enter valid 10-digit number' } })} />
              {errors.phone && <span className="form-error">{errors.phone.message}</span>}
            </div>
          </FormRow>
          <FormRow cols={1}>
            <div className="form-group">
              <label className="form-label">Address <span>*</span></label>
              <textarea className={`form-textarea ${errors.address ? 'error' : ''}`}
                rows={2} placeholder="House/Flat No, Street, Area"
                style={{ minHeight: 72 }}
                {...register('address', { required: 'Address is required' })} />
              {errors.address && <span className="form-error">{errors.address.message}</span>}
            </div>
          </FormRow>
          <FormRow cols={3}>
            <div className="form-group">
              <label className="form-label">City <span>*</span></label>
              <input className={`form-input ${errors.city ? 'error' : ''}`}
                placeholder="City"
                {...register('city', { required: 'City is required' })} />
              {errors.city && <span className="form-error">{errors.city.message}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">State <span>*</span></label>
              <select className={`form-select ${errors.state ? 'error' : ''}`}
                {...register('state', { required: 'State is required' })}>
                <option value="">Select state</option>
                {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.state && <span className="form-error">{errors.state.message}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Pincode <span>*</span></label>
              <input className={`form-input ${errors.pincode ? 'error' : ''}`}
                placeholder="6-digit pincode"
                maxLength={6}
                {...register('pincode', { required: 'Pincode is required', pattern: { value: /^[0-9]{6}$/, message: '6-digit pincode required' } })} />
              {errors.pincode && <span className="form-error">{errors.pincode.message}</span>}
            </div>
          </FormRow>
        </FormSection>

        <FormSection title="Professional Information">
          <FormRow cols={2}>
            <div className="form-group">
              <label className="form-label">Highest Qualification <span>*</span></label>
              <select className={`form-select ${errors.qualification ? 'error' : ''}`}
                {...register('qualification', { required: 'Qualification is required' })}>
                <option value="">Select qualification</option>
                <option value="B.P.Ed">B.P.Ed</option>
                <option value="M.P.Ed">M.P.Ed</option>
                <option value="M.Phil">M.Phil (Physical Education)</option>
                <option value="PhD">Ph.D (Physical Education)</option>
                <option value="NIS Diploma">NIS Diploma</option>
                <option value="B.Sc Sports">B.Sc Sports Science</option>
                <option value="M.Sc Sports">M.Sc Sports Science</option>
                <option value="Other">Other</option>
              </select>
              {errors.qualification && <span className="form-error">{errors.qualification.message}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Designation</label>
              <input className="form-input" placeholder="e.g. Physical Education Teacher"
                {...register('designation')} />
            </div>
          </FormRow>
          <FormRow cols={2}>
            <div className="form-group">
              <label className="form-label">Institution / Organization</label>
              <input className="form-input" placeholder="School / College / University name"
                {...register('institution')} />
            </div>
            <div className="form-group">
              <label className="form-label">Years of Experience</label>
              <select className="form-select" {...register('experience')}>
                <option value="">Select</option>
                <option value="0-2">0-2 years</option>
                <option value="2-5">2-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10-15">10-15 years</option>
                <option value="15+">15+ years</option>
              </select>
            </div>
          </FormRow>
        </FormSection>

        <FormSection title="Payment Information">
          <FormRow cols={2}>
            <div className="form-group">
              <label className="form-label">Payment Mode <span>*</span></label>
              <select className={`form-select ${errors.paymentMode ? 'error' : ''}`}
                {...register('paymentMode', { required: 'Payment mode is required' })}>
                <option value="">Select payment mode</option>
                <option value="Online">Online Transfer / UPI</option>
                <option value="DD">Demand Draft</option>
                <option value="Cheque">Cheque</option>
              </select>
              {errors.paymentMode && <span className="form-error">{errors.paymentMode.message}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Transaction / DD / Cheque No.</label>
              <input className="form-input" placeholder="Reference number"
                {...register('transactionId')} />
            </div>
          </FormRow>
          <div style={{ background: 'var(--saffron-light)', border: '1px solid #f5c279', borderRadius: 8, padding: '12px 16px', fontSize: '0.85rem', color: '#92400e', marginBottom: 20 }}>
            <strong>Payment Details:</strong> ₹500 via NEFT/UPI to AICPE | Account: <strong>AICPE Bhopal</strong> | UPI: cp@aicpe | Or DD/Cheque in favour of "AICPE" payable at Bhopal.
          </div>
        </FormSection>

        <div className="form-submit-area">
          <p className="form-submit-note">
            By submitting, you agree to the terms and conditions of AICPE membership.
          </p>
          <button type="submit" disabled={loading} className="btn btn-primary btn-submit">
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </FormWrapper>
  );
}
