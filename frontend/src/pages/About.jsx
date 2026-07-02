import { Target, Eye, Award, Users } from 'lucide-react';
import './About.css';

const values = [
  { icon: Target, title: 'Mission', desc: 'To promote and develop physical education and sports sciences through academic excellence, professional development, and community engagement across India.' },
  { icon: Eye, title: 'Vision', desc: 'To be the premier national body that establishes standards for physical education, ensuring every Indian has access to quality sports education and fitness programs.' },
  { icon: Award, title: 'Excellence', desc: 'Maintaining the highest standards of accreditation and assessment for physical education institutions and professionals nationwide.' },
  { icon: Users, title: 'Community', desc: 'Building a vibrant community of physical education professionals, coaches, and institutions dedicated to promoting a healthy, active India.' },
];

const timeline = [
  { year: '1999', event: 'AICPE founded in Bhopal, Madhya Pradesh' },
  { year: '2005', event: 'First national conference on Physical Education held' },
  { year: '2010', event: 'Expanded to 15 states with 2,000+ members' },
  { year: '2015', event: 'Partnership with SPEFL-SC and PMKVY established' },
  { year: '2018', event: 'Recognized as verification and audit agency for sports' },
  { year: '2020', event: 'Governing council member of Sport, Physical Education Fitness & Life Skill Council' },
  { year: '2023', event: 'Reached 10,000+ members across 28 states' },
];

export default function AboutPage() {
  return (
    <div className="about-page page-enter">
      {/* Header */}
      <div className="about-header">
        <div className="container">
          <h1 className="section-title" style={{ color: 'white' }}>About AICPE</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', maxWidth: 540, margin: '0 auto' }}>
            Promoting excellence in physical education and sports sciences since 1999
          </p>
        </div>
      </div>

      {/* Overview */}
      <section className="section">
        <div className="container about-overview">
          <div className="about-overview-text">
            <div className="section-divider" style={{ margin: '0 0 16px' }} />
            <h2 className="section-title" style={{ textAlign: 'left' }}>Who We Are</h2>
            <p>All India Council of Physical Education (AICPE) has been constituted by academically and highly qualified professionals of physical education and sports sciences. It focuses on the promotion and encouragement of multidisciplinary approach of physical education and collaborates with other allied disciplines.</p>
            <p>The orientation of AICPE revolves around developing sound qualities of good health and quality citizens. Its pivotal role constitutes the development of best career prospects of duly qualified professionals of physical education in order to serve the country and countrymen.</p>
            <p>AICPE imparts scientific knowledge in numerous areas associated with physical education, fitness & wellness, while maintaining high standards of accreditation, assessment, and professional development.</p>
          </div>
          <div className="about-overview-stats">
            {[
              { num: '10,000+', label: 'Active Members' },
              { num: '500+', label: 'Institutions' },
              { num: '25+', label: 'Years of Service' },
              { num: '28', label: 'States Covered' },
            ].map(s => (
              <div key={s.label} className="overview-stat">
                <div className="overview-stat-num">{s.num}</div>
                <div className="overview-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section about-values-section">
        <div className="container">
          <div className="section-divider" />
          <h2 className="section-title">Our Core Values</h2>
          <p className="section-subtitle">The principles that guide everything we do</p>
          <div className="values-grid">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="value-card card">
                <div className="value-icon"><Icon size={26} /></div>
                <h3 className="value-title">{title}</h3>
                <p className="value-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="section">
        <div className="container">
          <div className="section-divider" />
          <h2 className="section-title">Key Activities</h2>
          <p className="section-subtitle">What AICPE does for physical education in India</p>
          <div className="activities-grid">
            {[
              { emoji: '📋', title: 'Assessment & Accreditation', desc: 'AICPE is globally involved in assessment, evaluation and accreditation of physical education programs and institutions.' },
              { emoji: '🤝', title: 'Knowledge Partnership', desc: 'Working as knowledge partner and TOT partner with SPEFL-SC and PMKVY for skill development in physical education.' },
              { emoji: '🏛️', title: 'Governing Council', desc: 'Member of governing council of sport, physical education fitness and life skill council, ensuring policy-level representation.' },
              { emoji: '🔍', title: 'Verification & Audit', desc: 'AICPE works as verification and audit agencies in the field of physical education and sports, ensuring quality standards.' },
              { emoji: '📚', title: 'Professional Development', desc: 'Organizing workshops, seminars, and conferences for continuous professional development of physical educators.' },
              { emoji: '🎓', title: 'Certification Programs', desc: 'Offering certification programs in yoga, fitness, sports coaching and physical education for professionals.' },
            ].map(a => (
              <div key={a.title} className="activity-card">
                <span className="activity-emoji">{a.emoji}</span>
                <h4 className="activity-title">{a.title}</h4>
                <p className="activity-desc">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section about-timeline-section">
        <div className="container">
          <div className="section-divider" />
          <h2 className="section-title">Our Journey</h2>
          <p className="section-subtitle">Milestones in AICPE's history of promoting physical education</p>
          <div className="timeline">
            {timeline.map((t, i) => (
              <div key={t.year} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-content">
                  <div className="timeline-year">{t.year}</div>
                  <p className="timeline-event">{t.event}</p>
                </div>
                <div className="timeline-dot" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
