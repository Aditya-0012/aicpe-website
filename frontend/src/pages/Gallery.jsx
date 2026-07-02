import { useState } from 'react';
import { X } from 'lucide-react';
import './Gallery.css';

// Using placeholder images with sports/PE themes via unsplash
const categories = ['All', 'Conferences', 'Sports Events', 'Workshops', 'Yoga', 'Fitness'];

const galleryItems = [
  { id: 1, cat: 'Conferences', title: 'National PE Conference 2023', src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80' },
  { id: 2, cat: 'Sports Events', title: 'Inter-University Athletics Meet', src: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80' },
  { id: 3, cat: 'Yoga', title: 'AICPE Yoga Certification Program', src: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80' },
  { id: 4, cat: 'Fitness', title: 'Fitness Trainer Workshop', src: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=600&q=80' },
  { id: 5, cat: 'Sports Events', title: 'Volleyball Tournament', src: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=600&q=80' },
  { id: 6, cat: 'Workshops', title: 'Sports Science Workshop', src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80' },
  { id: 7, cat: 'Conferences', title: 'Annual General Meeting 2023', src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80' },
  { id: 8, cat: 'Sports Events', title: 'Track & Field Championships', src: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&q=80' },
  { id: 9, cat: 'Yoga', title: 'International Yoga Day Celebration', src: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600&q=80' },
  { id: 10, cat: 'Fitness', title: 'Physical Fitness Assessment Drive', src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80' },
  { id: 11, cat: 'Workshops', title: 'TOT Program – PMKVY', src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80' },
  { id: 12, cat: 'Sports Events', title: 'Kabaddi State Tournament', src: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&q=80' },
];

export default function GalleryPage() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = active === 'All' ? galleryItems : galleryItems.filter(i => i.cat === active);

  return (
    <div className="gallery-page page-enter">
      {/* Header */}
      <div className="gallery-header">
        <div className="container">
          <h1 className="section-title" style={{ color: 'white' }}>Photo Gallery</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', maxWidth: 480, margin: '0 auto' }}>
            Moments from AICPE conferences, sports events, workshops and programs
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Filter tabs */}
          <div className="gallery-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`gallery-filter-btn ${active === cat ? 'active' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="gallery-grid">
            {filtered.map((item) => (
              <div key={item.id} className="gallery-item" onClick={() => setLightbox(item)}>
                <img src={item.src} alt={item.title} loading="lazy" />
                <div className="gallery-overlay">
                  <span className="gallery-item-cat">{item.cat}</span>
                  <p className="gallery-item-title">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>
            <X size={22} />
          </button>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={lightbox.src.replace('w=600', 'w=1200')} alt={lightbox.title} />
            <div className="lightbox-caption">
              <span className="lightbox-cat">{lightbox.cat}</span>
              <p>{lightbox.title}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
