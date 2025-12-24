import { useState, useEffect } from 'react'
import CinematicIntro from './components/Intro/CinematicIntro'
import Terminal from './components/Terminal/Terminal'
import SkillsGlobe from './components/Visuals/SkillsGlobe'
import ParticleBackground from './components/Visuals/ParticleBackground'
import './index.css'

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showGlobe, setShowGlobe] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setShowGlobe(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleCommand = (cmd) => {
    if (cmd === 'skills') {
      setShowGlobe(true);
      // We no longer auto-hide, we expect ESC to close it
    }
  };

  return (
    <div className={`app-container ${showGlobe ? 'space-mode' : ''}`}>
      <ParticleBackground spaceMode={showGlobe} />
      {showIntro && <CinematicIntro onComplete={() => setShowIntro(false)} />}

      {!showIntro && (
        <div className="main-interface" style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          opacity: showIntro ? 0 : 1,
          transition: 'opacity 1s ease-in'
        }}>
          <nav style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Name removed as requested */}
            <div style={{ flex: 1 }}></div>
            <div style={{ color: '#555' }}>v2.0.25</div>
          </nav>

          <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {!showGlobe && <Terminal onCommand={handleCommand} />}
            {/* Hide Terminal when Globe is open for full immersion, or keep it? User said "when we enter the globe". Let's hide Terminal to make it FULL screen space mode. */}

            {showGlobe && (
              <div style={{
                position: 'fixed', // Full screen
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 20,
                backgroundColor: 'rgba(0,0,0,0.8)', // Darker space overlay
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column' // Align text below
              }}>
                <SkillsGlobe />
                <div style={{
                  position: 'absolute',
                  bottom: '40px',
                  textAlign: 'center',
                  color: 'var(--color-gold)',
                  fontFamily: 'var(--font-terminal)',
                  fontSize: '1.2rem',
                  textShadow: '0 0 10px var(--color-gold)'
                }}>
                  PRESS [ESC] TO EXIT SPACE MAPPING
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
