import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { submitMember } from '../../api';
import { FormWrapper, SuccessScreen, FormSection, FormRow, INDIAN_STATES } from './FormWrapper';

export default function InstitutionalMemberForm() {
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await submitMember('institutional', data);
      setSuccess(res.data.membershipId);
      toast.success('Registration submitted successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div className="form-page page-enter">
      <div className="form-header form-header--navy">
        <div className="container"><h1 className="form-header-title">Institutional Member</h1></div>
      </div>
      <div className="container form-body">
        <div className="form-card">
          <SuccessScreen membershipId={success} memberType="Institutional" onReset={() => { reset(); setSuccess(null); }} />
        </div>
      </div>
    </div>
  );

  return (
    <FormWrapper
      title="Institutional Member Registration"
      subtitle="For schools, colleges, universities & sports academies"
      fee="₹2,000 / year"
      icon="🏫"
      color="navy"
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormSection title="Institution Details">
          <FormRow cols={2}>
            <div className="form-group">
              <label className="form-label">Institution Name <span>*</span></label>
              <input className={`form-input ${errors.institutionName ? 'error' : ''}`}
                placeholder="Full official name"
                {...register('institutionName', { required: 'Institution name is required' })} />
              {errors.institutionName && <span className="form-error">{errors.institutionName.message}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Institution Type <span>*</span></label>
              <select className={`form-select ${errors.institutionType ? 'error' : ''}`}
                {...register('institutionType', { required: 'Institution type is required' })}>
                <option value="">Select type</option>
                <option value="University">University</option>
                <option value="College">College</option>
                <option value="School">School</option>
                <option value="Academy">Academy</option>
                <option value="Club">Sports Club</option>
                <option value="Other">Other</option>
              </select>
              {errors.institutionType && <span className="form-error">{errors.institutionType.message}</span>}
            </div>
          </FormRow>
          <FormRow cols={2}>
            <div className="form-group">
              <label className="form-label">Affiliated To</label>
              <input className="form-input" placeholder="e.g. Barkatullah University, CBSE, ICSE"
                {...register('affiliatedTo')} />
            </div>
            <div className="form-group">
              <label className="form-label">Year of Establishment</label>
              <input className="form-input" placeholder="e.g. 1985"
                {...register('establishedYear')} />
            </div>
          </FormRow>
        </FormSection>

        <FormSection title="Head of Institution">
          <FormRow cols={2}>
            <div className="form-group">
              <label className="form-label">Name of Head <span>*</span></label>
              <input className={`form-input ${errors.headName ? 'error' : ''}`}
                placeholder="Principal / Director / Vice-Chancellor"
                {...register('headName', { required: 'Head name is required' })} />
              {errors.headName && <span className="form-error">{errors.headName.message}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Designation <span>*</span></label>
              <input className={`form-input ${errors.headDesignation ? 'error' : ''}`}
                placeholder="e.g. Principal, Director"
                {...register('headDesignation', { required: 'Designation is required' })} />
              {errors.headDesignation && <span className="form-error">{errors.headDesignation.message}</span>}
            </div>
          </FormRow>
        </FormSection>

        <FormSection title="Contact Information">
          <FormRow cols={2}>
            <div className="form-group">
              <label className="form-label">Official Email <span>*</span></label>
              <input type="email" className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="institution@email.com"
                {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } })} />
              {errors.email && <span className="form-error">{errors.email.message}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number <span>*</span></label>
              <input type="tel" className={`form-input ${errors.phone ? 'error' : ''}`}
                placeholder="10-digit number"
                {...register('phone', { required: 'Phone is required', pattern: { value: /^[0-9]{10}$/, message: 'Enter valid 10-digit number' } })} />
              {errors.phone && <span className="form-error">{errors.phone.message}</span>}
            </div>
          </FormRow>
          <FormRow cols={1}>
            <div className="form-group">
              <label className="form-label">Website</label>
              <input className="form-input" placeholder="https://www.yourinstitution.edu.in"
                {...register('website')} />
            </div>
          </FormRow>
          <FormRow cols={1}>
            <div className="form-group">
              <label className="form-label">Address <span>*</span></label>
              <textarea className={`form-textarea ${errors.address ? 'error' : ''}`}
                rows={2} placeholder="Full postal address" style={{ minHeight: 72 }}
                {...register('address', { required: 'Address is required' })} />
              {errors.address && <span className="form-error">{errors.address.message}</span>}
            </div>
          </FormRow>
          <FormRow cols={3}>
            <div className="form-group">
              <label className="form-label">City <span>*</span></label>
              <input className={`form-input ${errors.city ? 'error' : ''}`} placeholder="City"
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
                placeholder="6-digit" maxLength={6}
                {...register('pincode', { required: 'Pincode is required', pattern: { value: /^[0-9]{6}$/, message: '6-digit pincode required' } })} />
              {errors.pincode && <span className="form-error">{errors.pincode.message}</span>}
            </div>
          </FormRow>
        </FormSection>

        <FormSection title="Physical Education Details">
          <FormRow cols={2}>
            <div className="form-group">
              <label className="form-label">No. of Students</label>
              <select className="form-select" {...register('noOfStudents')}>
                <option value="">Select range</option>
                <option value="<500">Less than 500</option>
                <option value="500-1000">500 - 1000</option>
                <option value="1000-3000">1000 - 3000</option>
                <option value="3000+">3000+</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Sports / Games Offered</label>
              <input className="form-input" placeholder="e.g. Cricket, Football, Kabaddi, Athletics"
                {...register('sportsOffered')} />
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
            <strong>Fee: ₹2,000/year</strong> | DD/Cheque in favour of "AICPE" payable at Bhopal. Online: UPI cp@aicpe
          </div>
        </FormSection>

        <div className="form-submit-area">
          <p className="form-submit-note">By submitting, you agree to AICPE's terms and conditions.</p>
          <button type="submit" disabled={loading} className="btn btn-primary btn-submit">
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </FormWrapper>
  );
}
