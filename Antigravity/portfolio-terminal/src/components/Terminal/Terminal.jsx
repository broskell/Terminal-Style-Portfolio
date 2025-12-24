import React, { useState, useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';
import { playTypingSound, playSuccessSound } from '../../utils/AudioUtils';
import './Terminal.css';

const Terminal = ({ onCommand }) => {
    const [history, setHistory] = useState([]);
    const [input, setInput] = useState('');
    const [gameActive, setGameActive] = useState(false);
    const [targetNumber, setTargetNumber] = useState(0);
    const inputRef = useRef(null);
    const bottomRef = useRef(null);
    const initialized = useRef(false);

    // Auto-run sequence
    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        const runSequence = async () => {
            const addToHistory = (text, delay) => new Promise(resolve => {
                setTimeout(() => {
                    setHistory(prev => [...prev, { type: 'output', content: text }]);
                    playTypingSound();
                    resolve();
                }, delay);
            });

            await addToHistory('Initializing Saathvik OS v2.0...', 800);
            await addToHistory('Loading modules...', 600);
            await addToHistory('Access Granted.', 600);
            await addToHistory('Welcome, Guest.', 600);
            await addToHistory('Type "help" to view commands.', 600);

            // Auto-run help
            setTimeout(() => {
                handleCommand('help');
            }, 500);
        };

        runSequence();
    }, []);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [history]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = (cmd) => {
        const args = cmd.trim().split(' ');
        const command = args[0].toLowerCase();

        const newHistory = [...history, { type: 'input', content: cmd }];

        // GAME MODE HANDLER
        if (gameActive) {
            if (command === 'exit') {
                setGameActive(false);
                setHistory([...newHistory, { type: 'output', content: 'Game exited.' }]);
                return;
            }

            const guess = parseInt(command);
            if (isNaN(guess)) {
                setHistory([...newHistory, { type: 'output', content: 'Please enter a valid number or type "exit".' }]);
                return;
            }

            if (guess === targetNumber) {
                setHistory([...newHistory, { type: 'output', content: `🎉 Correct! The number was ${targetNumber}. You win!` }]);
                setGameActive(false);
                playSuccessSound();
            } else if (guess < targetNumber) {
                setHistory([...newHistory, { type: 'output', content: 'Too low! Try again.' }]);
            } else {
                setHistory([...newHistory, { type: 'output', content: 'Too high! Try again.' }]);
            }
            return;
        }

        let output = '';
        let component = null;

        switch (command) {
            case 'help':
                output = `
  COMMAND       DESCRIPTION
  -------       -----------
  about         View professional summary
  skills        Explore 3D skills universe
  projects      View featured projects
  education     Show academic details
  contact       Display contact channels
  socials       List social media profiles
  resume        Open resume PDF
  
  theme [col]   Switch theme (gold/red/silver)
  game          Play "Guess the Number"
  date          Show current date/time
  whoami        Display user privilege
  clear         Clear terminal screen
  credits       Show development credits`;
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'date':
                output = new Date().toString();
                break;
            case 'sudo':
                output = 'User not in the sudoers file. This incident will be reported. 😈';
                break;
            case 'game':
                setGameActive(true);
                setTargetNumber(Math.floor(Math.random() * 100) + 1);
                output = 'Starting "Guess the Number" (1-100)...\nType "exit" to quit.\nEnter your guess:';
                break;
            case 'theme':
                const color = args[1]?.toLowerCase();
                if (color === 'gold') {
                    document.documentElement.style.setProperty('--color-gold', '#FFD700');
                    document.documentElement.style.setProperty('--color-terminal-green', '#FFD700');
                    output = 'Theme set to Gold (Default).';
                } else if (color === 'red') {
                    document.documentElement.style.setProperty('--color-gold', '#FF4D4D');
                    document.documentElement.style.setProperty('--color-terminal-green', '#FF4D4D');
                    output = 'Theme set to Red Alert.';
                } else if (color === 'silver') {
                    document.documentElement.style.setProperty('--color-gold', '#C0C0C0');
                    document.documentElement.style.setProperty('--color-terminal-green', '#C0C0C0');
                    output = 'Theme set to Metallic Silver.';
                } else {
                    output = 'Usage: theme [gold|red|silver]';
                }
                break;
            case 'whoami':
                output = 'guest@saathvik-portfolio:~$ User level: Visitor';
                break;
            case 'socials':
                output = 'LinkedIn: www.linkedin.com/in/kellampalli-saathvik\nInstagram: instagram.com/saathvikkellampalli';
                break;
            case 'resume':
                output = 'Opening Resume...';
                window.open('https://saathvikkellampalli.vercel.app/Assets/MyResume.pdf', '_blank');
                break;
            case 'about':
                output = `
  KELLAMPALLI SAATHVIK
  --------------------
  A Undergraduate at IITJ x LST
  Building strong foundations in technology to shape a smarter future.
  
  Exploring the world of algorithms, open-source systems, and web technologies, I'm building the skills to shape intelligent solutions for tomorrow's digital landscape.
  
  [Type "education" for details]`;
                break;
            case 'skills':
                output = 'Initializing 3D Globe...';
                onCommand('skills');
                break;
            case 'contact':
                output = 'Email: saathvik.kp@gmail.com\nGitHub: github.com/broskell\nLocation: IIT Jodhpur / Hyderabad';
                break;
            case 'education':
                output = 'EDUCATION:\n--------------------------------------------------\n2025 - 2029 | IIT Jodhpur (BS in Applied AI & DS)\n2025 - 2029 | LeapStart School of Technology (Experiential Learning)\n--------------------------------------------------';
                break;
            case 'projects':
                output = 'Loading project modules...';
                component = (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <ProjectCard
                            title="1. Honey - Voice AI Study Buddy"
                            description="An interactive voice-powered AI assistant built for students. Features speech-to-text, text-to-speech capabilities, and intelligent responses powered by Groq's LLaMA model."
                            tech="React, Groq LLaMA, Speech API"
                            liveLink="https://honey-voice-buddy.onrender.com/"
                            repoLink="https://github.com/broskell/honey-voice-agent"
                        />
                        <ProjectCard
                            title="2. PlayHub - Sport Booking Web App"
                            description="A comprehensive sports facility booking platform designed for LST students. Features real-time availability and user authentication."
                            tech="Web App, Real-time DB"
                            liveLink="https://playhub-lst.netlify.app/"
                            repoLink="https://github.com/broskell/LeapStart-PlayHub"
                        />
                        <ProjectCard
                            title="3. Lexis - AI Study Assistant"
                            description="Lexis is a live lecture companion that turns speech into structured study material. Captures lecture through microphone and generates structured notes."
                            tech="AI, Speech-to-Text, React"
                            liveLink="https://lexis-phi.vercel.app/"
                            repoLink="https://github.com/broskell/Lexis"
                        />
                    </div>
                );
                onCommand('projects'); // Keep external hook if needed
                break;
            case 'credits':
                output = 'Built by Saathvik Kellampalli using Antigravity. 😊';
                break;
            case '':
                break;
            default:
                if (command.startsWith('echo ')) {
                    output = command.substring(5);
                } else if (command.startsWith('open')) {
                    // Legacy support or handle specific opens if necessary
                    const num = command.split(' ')[1];
                    // ... (simplified for brevity as rich cards replace manual "open")
                    output = `Command not found: ${command}`;
                } else if (command.startsWith('theme')) {
                    output = 'Usage: theme [gold|red|silver]';
                } else {
                    output = `Command not found: ${command}`;
                }
        }

        if (output || component) {
            newHistory.push({ type: 'output', content: output, component });
        }
        setHistory(newHistory);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            playSuccessSound();
            handleCommand(input);
            setInput('');
        } else {
            playTypingSound();
        }
    };

    return (
        <div className="terminal-window" onClick={() => inputRef.current.focus()}>
            <div className="terminal-header">
                <div className="button red"></div>
                <div className="button yellow"></div>
                <div className="button green"></div>
                <div className="title">guest@saathvik-universe: ~</div>
            </div>
            <div className="terminal-body">
                {history.map((line, i) => (
                    <div key={i} className={`line ${line.type}`}>
                        {line.type === 'input' && <span className="prompt">$ </span>}
                        {line.content}
                        {line.component && <div className="output-component">{line.component}</div>}
                    </div>
                ))}
                <div className="input-line">
                    <span className="prompt">$ </span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        spellCheck="false"
                        autoComplete="off"
                    />
                </div>
                <div ref={bottomRef} />
            </div>
        </div>
    );
};

export default Terminal;
