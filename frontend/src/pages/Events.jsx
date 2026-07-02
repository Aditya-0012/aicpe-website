import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Events.css';

const events = [
  {
    id: 1,
    title: 'National Conference on Physical Education & Sports Sciences',
    date: 'March 15–17, 2025',
    location: 'Bhopal, Madhya Pradesh',
    type: 'Conference',
    status: 'upcoming',
    desc: 'Annual flagship conference bringing together physical education professionals, researchers and institutions from across India.',
    color: 'green',
  },
  {
    id: 2,
    title: 'TOT Workshop – Physical Education & Fitness',
    date: 'February 10–12, 2025',
    location: 'New Delhi',
    type: 'Workshop',
    status: 'upcoming',
    desc: 'Training of Trainers workshop in collaboration with SPEFL-SC and PMKVY for certified physical education trainers.',
    color: 'saffron',
  },
  {
    id: 3,
    title: 'Yoga Certification Program – Batch 12',
    date: 'January 20 – February 20, 2025',
    location: 'Online + Bhopal Centre',
    type: 'Certification',
    status: 'ongoing',
    desc: 'Comprehensive yoga certification program covering traditional asanas, pranayama, and modern applications in sports.',
    color: 'navy',
  },
  {
    id: 4,
    title: 'Sports Science Seminar – Biomechanics & Performance',
    date: 'December 5, 2024',
    location: 'Aligarh Muslim University',
    type: 'Seminar',
    status: 'past',
    desc: 'Expert-led seminar on biomechanics applications in sports performance enhancement and injury prevention.',
    color: 'green',
  },
  {
    id: 5,
    title: 'State-Level Physical Fitness Assessment Drive',
    date: 'November 18–22, 2024',
    location: 'Multiple Cities, M.P.',
    type: 'Assessment',
    status: 'past',
    desc: 'State-level fitness assessment initiative in collaboration with district sports authorities in Madhya Pradesh.',
    color: 'saffron',
  },
  {
    id: 6,
    title: 'Annual General Meeting – AICPE 2024',
    date: 'October 10, 2024',
    location: 'Bhopal, Madhya Pradesh',
    type: 'Meeting',
    status: 'past',
    desc: 'Annual general body meeting reviewing AICPE activities, finances, and planning for the upcoming year.',
    color: 'navy',
  },
];

const typeColors = {
  Conference:  '#e8f5ec',
  Workshop:    '#fff8e8',
  Certification: '#e8edf7',
  Seminar:     '#fef3e2',
  Assessment:  '#f0faf3',
  Meeting:     '#f3f4f6',
};

export default function EventsPage() {
  const upcoming = events.filter(e => e.status === 'upcoming');
  const ongoing  = events.filter(e => e.status === 'ongoing');
  const past     = events.filter(e => e.status === 'past');

  return (
    <div className="events-page page-enter">
      {/* Header */}
      <div className="events-header">
        <div className="container">
          <h1 className="section-title" style={{ color: 'white' }}>Events & Activities</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', maxWidth: 500, margin: '0 auto' }}>
            Conferences, workshops, seminars and certification programs by AICPE
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Upcoming */}
          {upcoming.length > 0 && (
            <>
              <div className="events-group-title">
                <span className="events-group-dot upcoming" />
                Upcoming Events
              </div>
              <div className="events-grid">
                {upcoming.map(e => <EventCard key={e.id} event={e} />)}
              </div>
            </>
          )}

          {/* Ongoing */}
          {ongoing.length > 0 && (
            <>
              <div className="events-group-title" style={{ marginTop: 48 }}>
                <span className="events-group-dot ongoing" />
                Ongoing Programs
              </div>
              <div className="events-grid">
                {ongoing.map(e => <EventCard key={e.id} event={e} />)}
              </div>
            </>
          )}

          {/* Past */}
          {past.length > 0 && (
            <>
              <div className="events-group-title" style={{ marginTop: 48 }}>
                <span className="events-group-dot past" />
                Past Events
              </div>
              <div className="events-grid">
                {past.map(e => <EventCard key={e.id} event={e} />)}
              </div>
            </>
          )}

          {/* CTA */}
          <div className="events-cta">
            <h3>Want to participate or host an event with AICPE?</h3>
            <p>Get in touch with us to collaborate on workshops, seminars, or certification programs.</p>
            <Link to="/contact" className="btn btn-primary">
              Contact Us <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function EventCard({ event }) {
  const statusLabel = { upcoming: 'Upcoming', ongoing: 'Ongoing', past: 'Completed' };
  return (
    <div className={`event-card card event-card--${event.color}`}>
      <div className="event-card-top">
        <span className="event-type" style={{ background: `${event.color === 'green' ? 'var(--green-light)' : event.color === 'saffron' ? 'var(--saffron-light)' : '#e8edf7'}` }}>
          {event.type}
        </span>
        <span className={`event-status event-status--${event.status}`}>
          {statusLabel[event.status]}
        </span>
      </div>
      <h3 className="event-title">{event.title}</h3>
      <p className="event-desc">{event.desc}</p>
      <div className="event-meta">
        <span className="event-meta-item">
          <Calendar size={13} /> {event.date}
        </span>
        <span className="event-meta-item">
          <MapPin size={13} /> {event.location}
        </span>
      </div>
    </div>
  );
}
