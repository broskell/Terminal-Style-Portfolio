import React from 'react';

const ProjectCard = ({ title, description, liveLink, repoLink, tech }) => {
    return (
        <div style={{
            border: '1px solid #333',
            borderRadius: '8px',
            padding: '15px',
            margin: '10px 0',
            backgroundColor: 'rgba(20, 20, 20, 0.8)',
            transition: 'all 0.3s ease',
            cursor: 'default',
            maxWidth: '500px'
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-gold)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(255, 215, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#333';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            <h3 style={{ color: 'var(--color-gold)', marginBottom: '5px', fontSize: '1.2rem' }}>{title}</h3>
            <p style={{ color: '#ccc', fontSize: '0.9rem', marginBottom: '10px' }}>{description}</p>
            {tech && <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '10px' }}>[{tech}]</div>}

            <div style={{ display: 'flex', gap: '15px' }}>
                <a href={liveLink} target="_blank" rel="noreferrer" style={{ color: 'var(--color-terminal-green)', textDecoration: 'none', borderBottom: '1px dashed', fontSize: '0.9rem' }}>
                    Live Demo
                </a>
                <a href={repoLink} target="_blank" rel="noreferrer" style={{ color: '#888', textDecoration: 'none', borderBottom: '1px dashed', fontSize: '0.9rem' }}>
                    Source Code
                </a>
            </div>
        </div>
    );
};

export default ProjectCard;
