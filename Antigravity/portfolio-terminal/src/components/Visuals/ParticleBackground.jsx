import React, { useEffect, useRef } from 'react';

const ParticleBackground = ({ spaceMode }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const particles = [];
        const particleCount = spaceMode ? 300 : 100; // More stars in space mode

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = spaceMode ? (Math.random() - 0.5) * 2 : (Math.random() - 0.5) * 0.5; // Faster in space mode
                this.vy = spaceMode ? (Math.random() - 0.5) * 2 : (Math.random() - 0.5) * 0.5;
                this.size = spaceMode ? Math.random() * 1.5 : Math.random() * 2;
                this.color = spaceMode ? '#FFFFFF' : '#FFD700'; // White stars or Gold dust
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = 0.5;
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw particles
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Draw connections
            particles.forEach((a, index) => {
                for (let j = index + 1; j < particles.length; j++) {
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = '#FFD700';
                        ctx.globalAlpha = 0.1 * (1 - distance / 100);
                        ctx.lineWidth = 1;
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                background: 'linear-gradient(to bottom, #000000, #1a1a1a)'
            }}
        />
    );
};

export default ParticleBackground;
