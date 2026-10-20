import React, { useEffect, useRef } from 'react';
import Cover from './components/Cover/Cover';
import Hero from './components/Hero/RoyalArrival';
import Invitation from './components/Invitation/Invitation';
import CountdownScratch from './components/CountdownScratch/CountdownScratch';
import Events from './components/Events/Events';
import Gallery from './components/Gallery/Gallery';
import RSVP from './components/RSVP/RSVP';
import Venue from './components/Venue/Venue.jsx';
import AudioToggle from './components/AudioToggle/AudioToggle';
import Footer from './components/Footer/Footer';
import PetalShower from './components/PetalShower/PetalShower';
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
  const [palaceEntered, setPalaceEntered] = React.useState(false);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.38;
    }
  }, []);

  function handleOpenInvite() {
    setPalaceEntered(true);
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error('Unable to start wedding music:', error);
      });
    }
  }

  return (
    <>
      <audio ref={audioRef} loop preload="none" src="/assets/wedding-song.mp3" />
      <PetalShower />
      <AudioToggle audioRef={audioRef} />
      <Cover onOpen={handleOpenInvite} />
      <div id="main-content">
        <Hero entered={palaceEntered} />
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
