const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export const playTypingSound = () => {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    // Mechanical Click Sound
    // High frequency, extremely short envelope
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(2000, audioCtx.currentTime); 
    
    // Volume envelope: Sharp attack, immediate decay
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.05);
};

export const playSuccessSound = () => {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    // Soft "Glass" Ping
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(1200, audioCtx.currentTime); // High pitch start
    oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.2); // Slight pitch drop
    
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4); // Longer resonant decay

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.4);
};
