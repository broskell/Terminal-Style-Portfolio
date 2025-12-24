import React, { useEffect, useRef } from 'react';
import TagCloud from 'TagCloud';

const SkillsGlobe = () => {
    const containerRef = useRef(null);
    const alreadyRendered = useRef(false);

    useEffect(() => {
        if (alreadyRendered.current) return;

        const container = containerRef.current;
        if (!container) return;



        // Using DevIcon URLs for logos
        const iconStyle = "width: 50px; height: 50px; object-fit: contain; filter: drop-shadow(0 0 5px rgba(255,215,0,0.5));";

        const texts = [
            `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" style="${iconStyle}" alt="Python" />`,
            `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" style="${iconStyle}" alt="JS" />`,
            `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" style="${iconStyle}" alt="React" />`,
            `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg" style="${iconStyle}" alt="HTML" />`,
            `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" style="${iconStyle}" alt="CSS" />`,
            `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" style="${iconStyle}" alt="Node" />`,
            `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" style="${iconStyle}" alt="Linux" />`,
            `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" style="${iconStyle}" alt="Git" />`,
            `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" style="${iconStyle}" alt="Bash" />`,
            `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" style="${iconStyle}" alt="PS" />`,
            `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" style="${iconStyle}" alt="Mongo" />`,
            `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" style="${iconStyle}" alt="Java" />`,
            `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" style="${iconStyle}" alt="C++" />`,
        ];

        const options = {
            radius: 300,
            maxSpeed: 'fast',
            initSpeed: 'normal',
            direction: 135,
            keep: true,
            useContainerInlineStyles: false,
            useHTML: true // Enable HTML rendering for images
        };

        // Initialize TagCloud
        TagCloud(container, texts, options);
        alreadyRendered.current = true;

        // Apply styles to tags dynamically
        const style = document.createElement('style');
        style.innerHTML = `
      .tagcloud { display: inline-block; }
      .tagcloud--item { 
          transition: all 0.3s ease; 
          opacity: 0.8;
      }
      .tagcloud--item:hover { 
          transform: scale(1.5); 
          opacity: 1; 
          z-index: 100; 
          filter: drop-shadow(0 0 15px var(--color-gold));
      }
    `;
        document.head.appendChild(style);

        return () => {
            // Cleanup if necessary, though TagCloud doesn't have a distinct destroy method easily accessible without internal hacking
            // We rely on simple unmounting.
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                overflow: 'hidden'
            }}
        />
    );
};

export default SkillsGlobe;
