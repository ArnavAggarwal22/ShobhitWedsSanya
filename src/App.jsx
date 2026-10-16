import React, { useEffect, useRef } from 'react';
import Cover from './components/Cover/Cover';
import Hero from './components/Hero/Hero';
import Invitation from './components/Invitation/Invitation';
import CountdownScratch from './components/CountdownScratch/CountdownScratch';
import Events from './components/Events/Events';
import Gallery from './components/Gallery/Gallery';
import RSVP from './components/RSVP/RSVP';
import Venue from './components/Venue/Venue.jsx';
import AudioToggle from './components/AudioToggle/AudioToggle';
import Footer from './components/Footer/Footer';
import PetalShower from './components/PetalShower/PetalShower';
import Navbar from './components/Navbar/Navbar';
import { motion } from 'motion/react';
import './index.css';

function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 38, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const audioRef = useRef(null);
  const [inviteOpened, setInviteOpened] = React.useState(false);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  function handleOpenInvite() {
    setInviteOpened(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
    document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <audio ref={audioRef} loop src="/assets/wedding_music.mp3" />
      <PetalShower />
      <AudioToggle audioRef={audioRef} />
      <Cover onOpen={handleOpenInvite} />
      {inviteOpened ? <Navbar /> : null}
      <div id="main-content">
        <Hero />
        <Reveal><Invitation /></Reveal>
        <Reveal delay={0.06}><CountdownScratch /></Reveal>
        <Reveal><Events /></Reveal>
        <Reveal delay={0.04}><Gallery /></Reveal>
        <Reveal><RSVP /></Reveal>
        <Reveal><Venue /></Reveal>
        <Reveal><Footer /></Reveal>
      </div>
    </>
  );
}

export default App;
