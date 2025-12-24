import React, { useEffect, useState } from 'react';
import './CinematicIntro.css';

const CinematicIntro = ({ onComplete }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Simplified sequence: Fade in Name + Image, then Fade out
        setTimeout(() => setShow(true), 500);
        setTimeout(() => setShow(false), 4500); // Start fade out
        setTimeout(() => onComplete(), 5500);   // End
    }, [onComplete]);

    return (
        <div className={`intro-container ${!show ? 'fade-out' : ''}`}>
            <div className="content">
                <div className={`intro-visual ${show ? 'visible' : ''}`}>
                    {/* Using a high-quality placeholder that matches the MJ silhouette aesthetic until exact URL is found/provided */}
                    {/* If user provides URL, we swap this src */}
                    <img
                        src="https://saathvikkellampalli.vercel.app/static/media/my-pic.9b8400037a342416805b.jpg"
                        onError={(e) => { e.target.style.display = 'none' }}
                        alt=""
                        className="profile-silhouette"
                    />
                </div>
                <h2 className={`subtitle ${show ? 'visible' : ''}`} style={{ fontFamily: 'sans-serif', fontWeight: '300', color: '#ccc', letterSpacing: '1px', fontSize: '1.2rem', marginBottom: '15px' }}>
                    Hello, I'm
                </h2>
                <h1 className={`main-title ${show ? 'visible' : ''}`} style={{ fontFamily: 'var(--font-terminal)', fontSize: '3rem', letterSpacing: '2px', color: '#fff', textTransform: 'none' }}>
                    Saathvik Kellampalli
                </h1>
            </div>
        </div>
    );
};

export default CinematicIntro;
