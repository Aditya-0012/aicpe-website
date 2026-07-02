import { Link } from 'react-router-dom';
import { ArrowRight, User, Building2, Star, UserCheck } from 'lucide-react';
import './Registration.css';

const memberships = [
  {
    type: 'associate',
    icon: User,
    label: 'Associate Member',
    fee: '₹500',
    period: 'per year',
    path: '/registration/associate',
    color: 'green',
    desc: 'For individuals beginning their journey in physical education and sports.',
    features: [
      'AICPE membership certificate',
      'Access to newsletters & updates',
      'Eligibility for workshops & events',
      'Professional network access',
    ],
  },
  {
    type: 'regular',
    icon: UserCheck,
    label: 'Regular Member',
    fee: '₹1,000',
    period: 'per year',
    path: '/registration/regular',
    color: 'saffron',
    desc: 'For qualified professionals actively working in physical education.',
    features: [
      'All Associate benefits',
      'Voting rights in council',
      'Priority for certifications',
      'Journal & research access',
    ],
  },
  {
    type: 'institutional',
    icon: Building2,
    label: 'Institutional Member',
    fee: '₹2,000',
    period: 'per year',
    path: '/registration/institutional',
    color: 'navy',
    desc: 'For schools, colleges, universities and sports academies.',
    features: [
      'Institutional recognition',
      'Affiliation certificate',
      'Faculty development programs',
      'Accreditation support',
    ],
  },
  {
    type: 'life',
    icon: Star,
    label: 'Life Member',
    fee: '₹5,000',
    period: 'one-time',
    path: '/registration/life',
    color: 'gold',
    desc: 'Lifetime membership for dedicated professionals committed to the field.',
    features: [
      'All Regular benefits lifetime',
      'Life membership certificate',
      'Recognition in publications',
      'Honorary advisory roles',
    ],
    featured: true,
  },
];

export default function RegistrationPage() {
  return (
    <div className="registration-page page-enter">
      {/* Header */}
      <div className="reg-header">
        <div className="container">
          <h1 className="section-title" style={{ color: 'white' }}>Membership Registration</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', maxWidth: 520, margin: '0 auto' }}>
            Join thousands of physical education professionals and institutions dedicated to
            promoting sports science across India
          </p>
        </div>
      </div>

      {/* Cards */}
      <section className="section">
        <div className="container">
          <div className="reg-grid">
            {memberships.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.type} className={`reg-card ${m.featured ? 'reg-card--featured' : ''} reg-card--${m.color}`}>
                  {m.featured && <div className="reg-featured-badge">Most Popular</div>}
                  <div className="reg-card-header">
                    <div className="reg-card-icon">
                      <Icon size={24} />
                    </div>
                    <h3 className="reg-card-label">{m.label}</h3>
                    <div className="reg-card-fee">
                      <span className="fee-amount">{m.fee}</span>
                      <span className="fee-period">{m.period}</span>
                    </div>
                    <p className="reg-card-desc">{m.desc}</p>
                  </div>
                  <ul className="reg-features">
                    {m.features.map(f => (
                      <li key={f}>
                        <span className="reg-check">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Link to={m.path} className={`btn ${m.featured ? 'btn-saffron' : 'btn-primary'} reg-cta`}>
                    Apply Now <ArrowRight size={15} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Info */}
      <section className="reg-info">
        <div className="container reg-info-grid">
          {[
            { title: 'Payment Modes', body: 'Online transfer, Demand Draft or Cheque drawn in favour of "AICPE" payable at Bhopal.' },
            { title: 'Processing Time', body: 'Applications are reviewed within 7-10 working days. Membership ID issued upon approval.' },
            { title: 'Need Help?', body: 'Contact us at cp@aicpe.ac.in or call +91-9425006602 for any registration queries.' },
          ].map(i => (
            <div key={i.title} className="reg-info-card">
              <h4>{i.title}</h4>
              <p>{i.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
