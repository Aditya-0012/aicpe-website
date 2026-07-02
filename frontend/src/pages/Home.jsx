import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Building2, Award, Activity } from 'lucide-react';
import './Home.css';

const stats = [
  { value: '10,000+', label: 'Members', icon: Users },
  { value: '500+', label: 'Institutions', icon: Building2 },
  { value: '25+', label: 'Years of Excellence', icon: Award },
  { value: '28', label: 'States Covered', icon: Activity },
];

const news = [
  { title: 'AICPE globally involved in assessment, evaluation & accreditation', date: 'December 2024' },
  { title: 'AICPE working as knowledge partner, TOT partner with SPEFL-SC and PMKVY', date: 'November 2024' },
  { title: 'Member of governing council of sport, physical education fitness & life skill council', date: 'October 2024' },
  { title: 'AICPE working as verification and audit agencies in physical education and sports', date: 'September 2024' },
];

const programs = [
  {
    title: 'Yoga',
    desc: 'Promoting holistic wellness through traditional and modern yoga practices across educational institutions.',
    icon: '🧘',
    color: '#e8f5ec',
    accent: '#2d8a45',
  },
  {
    title: 'Fitness',
    desc: 'Scientific fitness programs designed to enhance physical conditioning and athletic performance.',
    icon: '💪',
    color: '#fff8e8',
    accent: '#e8871a',
  },
  {
    title: 'Phy-Edu-Health & Recreation',
    desc: 'Comprehensive physical education programs integrating health science with sport and recreation.',
    icon: '🏃',
    color: '#eef2ff',
    accent: '#4f46e5',
  },
  {
    title: 'Sports Science',
    desc: 'Evidence-based sports science programs for developing elite athletes and coaches nationwide.',
    icon: '🏆',
    color: '#fef3e2',
    accent: '#d97706',
  },
];

const testimonials = [
  {
    name: 'Dr. Rajesh Tripathi',
    role: 'Chairman, AICPE',
    org: 'VNS College of Physical Education & Management Studies',
    quote: 'AICPE is committed to quality education and professional excellence. We are building a future where physical education is recognized as fundamental to nation building.',
  },
  {
    name: 'Dr. S. M. Prakash',
    role: 'Vice-Chairman, AICPE',
    org: 'Kuvempu University, Shimoga, Karnataka',
    quote: 'High quality physical education encourages young people to develop knowledge, understanding and skills across a range of physical education, sports and health-enhancing experiences.',
  },
  {
    name: 'Dr. Brij Bhushan Singh',
    role: 'Treasurer, AICPE',
    org: 'Aligarh Muslim University',
    quote: 'AICPE promotes schools and colleges to manage the balance between academics and physical fitness, realizing the importance and benefits of physical education across India.',
  },
];

export default function Home() {
  return (
    <div className="home page-enter">
      {/* ─── Hero ──────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-overlay" />
          <div className="hero-pattern" />
        </div>
        <div className="container hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            Established 1999 · Bhopal, India
          </div>
          <h1 className="hero-title">
            All India Council of<br />
            <span className="hero-title-accent">Physical Education</span>
          </h1>
          <p className="hero-desc">
            Promoting excellence in physical education, sports science and fitness across India.
            Building quality professionals for a healthier nation.
          </p>
          <div className="hero-ctas">
            <Link to="/registration" className="btn btn-saffron">
              Become a Member <ArrowRight size={16} />
            </Link>
            <Link to="/about" className="btn btn-outline-white">
              Learn More
            </Link>
          </div>
          <div className="hero-checks">
            {['Accredited Body', 'PMKVY Partner', 'SAI Affiliated'].map(t => (
              <span key={t} className="hero-check">
                <CheckCircle size={14} /> {t}
              </span>
            ))}
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <div className="scroll-dot" />
        </div>
      </section>

      {/* ─── Stats ─────────────────────────────────────────────────────── */}
      <section className="stats-bar">
        <div className="container stats-grid">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="stat-item">
              <div className="stat-icon"><Icon size={22} /></div>
              <div>
                <div className="stat-value">{value}</div>
                <div className="stat-label">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── About + News ──────────────────────────────────────────────── */}
      <section className="section about-news">
        <div className="container about-news-grid">
          <div className="about-block">
            <div className="section-divider" style={{ margin: '0 0 16px' }} />
            <h2 className="section-title" style={{ textAlign: 'left' }}>Welcome to AICPE</h2>
            <p>
              All India Council of Physical Education has been constituted by academically and highly
              qualified professionals of physical education and sports sciences. It focuses on the
              promotion and encouragement of multidisciplinary approach of physical education and
              collaborates with other allied disciplines.
            </p>
            <p>
              The orientation of AICPE revolves around developing sound qualities of good health and
              quality citizens. Its pivotal role constitutes the development of best career prospects
              of duly qualified professionals in order to serve the country and countrymen and
              imparting scientific knowledge in numerous areas associated with physical education,
              fitness & wellness.
            </p>
            <div className="about-points">
              {[
                'Assessment, evaluation & accreditation',
                'Knowledge partner with SPEFL-SC & PMKVY',
                'Verification and audit agency in sports',
              ].map(p => (
                <div key={p} className="about-point">
                  <CheckCircle size={16} className="point-icon" /> {p}
                </div>
              ))}
            </div>
            <Link to="/about" className="btn btn-primary" style={{ marginTop: '24px' }}>
              Read More <ArrowRight size={15} />
            </Link>
          </div>

          <div className="news-block">
            <h3 className="news-heading">News &amp; Events</h3>
            <div className="news-list">
              {news.map((n, i) => (
                <div key={i} className="news-item">
                  <span className="news-dot" />
                  <div>
                    <p className="news-title">{n.title}</p>
                    <span className="news-date">{n.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/events" className="btn btn-outline" style={{ marginTop: '20px' }}>
              All Events <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Programs ──────────────────────────────────────────────────── */}
      <section className="section programs-section">
        <div className="container">
          <div className="section-divider" />
          <h2 className="section-title">Our Programs</h2>
          <p className="section-subtitle">
            Comprehensive physical education programs designed for students, educators and institutions
          </p>
          <div className="programs-grid">
            {programs.map((p) => (
              <div key={p.title} className="program-card card" style={{ '--card-accent': p.accent, '--card-bg': p.color }}>
                <div className="program-icon">{p.icon}</div>
                <h3 className="program-title">{p.title}</h3>
                <p className="program-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Membership CTA ────────────────────────────────────────────── */}
      <section className="membership-cta">
        <div className="container membership-cta-inner">
          <div className="cta-text">
            <h2>Join the AICPE Family</h2>
            <p>Choose a membership category that suits your profile and contribute to the growth of physical education in India</p>
          </div>
          <div className="membership-cards">
            {[
              { label: 'Associate Member', fee: '₹500', path: '/registration/associate', color: 'green' },
              { label: 'Regular Member', fee: '₹1,000', path: '/registration/regular', color: 'saffron' },
              { label: 'Institutional Member', fee: '₹2,000', path: '/registration/institutional', color: 'green' },
              { label: 'Life Member', fee: '₹5,000', path: '/registration/life', color: 'navy' },
            ].map(m => (
              <Link key={m.label} to={m.path} className={`membership-card membership-card--${m.color}`}>
                <span className="mc-fee">{m.fee}</span>
                <span className="mc-label">{m.label}</span>
                <ArrowRight size={14} className="mc-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ──────────────────────────────────────────────── */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-divider" />
          <h2 className="section-title">Message from AICPE</h2>
          <p className="section-subtitle">Words from our leadership</p>
          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <div key={t.name} className="testimonial-card card">
                <div className="testimonial-quote">"</div>
                <p className="testimonial-text">{t.quote}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    {t.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                    <div className="testimonial-org">{t.org}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
