import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { submitContact } from '../api';
import './Contact.css';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await submitContact(data);
      setSubmitted(true);
      toast.success('Message sent successfully!');
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page page-enter">
      {/* Header */}
      <div className="contact-header">
        <div className="container">
          <h1 className="section-title" style={{ color: 'white' }}>Contact Us</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', maxWidth: 480, margin: '0 auto' }}>
            Get in touch with AICPE for membership queries, events, or any other information
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container contact-grid">
          {/* Info cards */}
          <div className="contact-info">
            <h2 className="contact-info-title">Get In Touch</h2>
            <p className="contact-info-desc">
              We'd love to hear from you. Reach out for membership queries, event information,
              partnership opportunities or any other matter.
            </p>

            <div className="contact-cards">
              {[
                { icon: Phone, label: 'Phone', value: '+91-9425006602', link: 'tel:+919425006602', color: 'green' },
                { icon: Mail, label: 'Email', value: 'cp@aicpe.ac.in', link: 'mailto:cp@aicpe.ac.in', color: 'saffron' },
                { icon: Clock, label: 'Office Hours', value: 'Mon–Sat: 10:00 AM – 5:00 PM', link: null, color: 'navy' },
              ].map(({ icon: Icon, label, value, link, color }) => (
                <div key={label} className={`contact-card contact-card--${color}`}>
                  <div className="contact-card-icon"><Icon size={20} /></div>
                  <div>
                    <div className="contact-card-label">{label}</div>
                    {link
                      ? <a href={link} className="contact-card-value">{value}</a>
                      : <div className="contact-card-value">{value}</div>
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* Address */}
            <div className="contact-address">
              <div className="contact-address-icon"><MapPin size={18} /></div>
              <div>
                <div className="contact-card-label">Office Address</div>
                <p className="contact-address-text">
                  DK 3/1/49, Sharda Retreat,<br />
                  Danish Kunj, Kolar Road,<br />
                  Bhopal (M.P.) – 462042
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap">
            {submitted ? (
              <div className="contact-success">
                <CheckCircle size={52} color="var(--green-mid)" />
                <h3>Message Received!</h3>
                <p>Thank you for reaching out. We'll get back to you within 1-2 business days.</p>
                <button className="btn btn-primary" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="contact-form">
                <h3 className="contact-form-title">Send Us a Message</h3>

                <div className="form-row form-row--2">
                  <div className="form-group">
                    <label className="form-label">Your Name <span>*</span></label>
                    <input className={`form-input ${errors.name ? 'error' : ''}`}
                      placeholder="Full name"
                      {...register('name', { required: 'Name is required' })} />
                    {errors.name && <span className="form-error">{errors.name.message}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address <span>*</span></label>
                    <input type="email" className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="yourname@email.com"
                      {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } })} />
                    {errors.email && <span className="form-error">{errors.email.message}</span>}
                  </div>
                </div>

                <div className="form-row form-row--2">
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input type="tel" className="form-input" placeholder="10-digit number"
                      {...register('phone')} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject <span>*</span></label>
                    <select className={`form-select ${errors.subject ? 'error' : ''}`}
                      {...register('subject', { required: 'Subject is required' })}>
                      <option value="">Select subject</option>
                      <option value="Membership Query">Membership Query</option>
                      <option value="Event Information">Event Information</option>
                      <option value="Accreditation">Accreditation</option>
                      <option value="Partnership">Partnership / Collaboration</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.subject && <span className="form-error">{errors.subject.message}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Message <span>*</span></label>
                  <textarea className={`form-textarea ${errors.message ? 'error' : ''}`}
                    placeholder="Write your message here..."
                    {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Message too short' } })} />
                  {errors.message && <span className="form-error">{errors.message.message}</span>}
                </div>

                <button type="submit" disabled={loading} className="btn btn-primary btn-submit" style={{ width: '100%', justifyContent: 'center' }}>
                  {loading ? 'Sending...' : <><Send size={15} /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
