import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Invitation from './components/Invitation/Invitation';
import Events from './components/Events/Events';
import Gallery from './components/Gallery/Gallery';
import RSVP from './components/RSVP/RSVP';
import Footer from './components/Footer/Footer';
import './index.css';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Invitation />
        <Events />
        <Gallery />
        <RSVP />
      </main>
      <Footer />
    </>
  );
}
