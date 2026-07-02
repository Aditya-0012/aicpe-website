import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutPage from './pages/About';
import RegistrationPage from './pages/Registration';
import EventsPage from './pages/Events';
import GalleryPage from './pages/Gallery';
import ContactPage from './pages/Contact';
import AssociateMemberForm from './pages/forms/AssociateMemberForm';
import InstitutionalMemberForm from './pages/forms/InstitutionalMemberForm';
import LifeMemberForm from './pages/forms/LifeMemberForm';
import RegularMemberForm from './pages/forms/RegularMemberForm';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#2d8a45', secondary: '#fff' } },
        }}
      />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/registration/associate" element={<AssociateMemberForm />} />
          <Route path="/registration/institutional" element={<InstitutionalMemberForm />} />
          <Route path="/registration/life" element={<LifeMemberForm />} />
          <Route path="/registration/regular" element={<RegularMemberForm />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
