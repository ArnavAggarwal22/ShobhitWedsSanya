import React, { useEffect, useRef } from 'react';
import Cover from './components/Cover/Cover';
import Hero from './components/Hero/Hero';
import Shloka from './components/Shloka/Shloka';
import CountdownScratch from './components/CountdownScratch/CountdownScratch';
import Story from './components/Story/Story';
import Hosts from './components/Hosts/Hosts';
import Events from './components/Events/Events';
import Gallery from './components/Gallery/Gallery';
import RSVP from './components/RSVP/RSVP';
import Venue from './components/Venue/Venue';
import AudioToggle from './components/AudioToggle/AudioToggle';
import './index.css';

function App() {
  const audioRef = useRef(null);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);
  return (
    <>
      <audio ref={audioRef} loop src="/assets/wedding_music.mp3" />
      <AudioToggle audioRef={audioRef} />
      <Cover />
      <div id="main-content">
        <Hero />
        <Shloka />
        <CountdownScratch />
        <Story />
        <Hosts />
        <Events />
        <Gallery />
        <RSVP />
        <Venue />
      </div>
    </>
  );
}

export default App;
