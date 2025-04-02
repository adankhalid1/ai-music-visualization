/**
 * AI Music Visualization
 * A simple time-based audio visualization that will evolve into 
 * a machine learning-powered music visualization system.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize audio visualization
    const audioContainer = document.getElementById('audio-visualizer');
    
    // Create main visualization container
    const container = document.createElement('div');
    container.style.width = '100%';
    container.style.height = '300px';
    container.style.backgroundColor = '#1a0029';
    container.style.borderRadius = '8px';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.overflow = 'hidden';
    container.style.position = 'relative';
    audioContainer.appendChild(container);
    
    // Create canvas for visualization
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 180;
    canvas.style.width = '100%';
    canvas.style.height = '180px';
    canvas.style.display = 'block';
    canvas.style.borderRadius = '6px';
    canvas.style.marginBottom = '15px';
    
    // Add placeholder gradient to canvas
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a0029');
    gradient.addColorStop(1, '#4b0082');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Create initial visualization pattern
    ctx.fillStyle = '#9370db';
    for(let i = 0; i < 12; i++) {
        const height = 20 + Math.random() * 100;
        ctx.fillRect(i * 25 + 5, canvas.height - height, 20, height);
    }
    
    // Create audio element
    const audio = document.createElement('audio');
    audio.controls = true;
    audio.style.width = '100%';
    audio.style.margin = '10px 0';
    audio.style.borderRadius = '4px';
    audio.style.height = '40px';
    audio.style.minHeight = '40px';
    audio.style.padding = '3px';
    audio.volume = 0.5; // Set volume to 50%
    
    // Add audio sources with fallback
    const source = document.createElement('source');
    source.src = 'media/weeknd_slowed_reverb.mp3'; // Audio file to be added to repository
    source.type = 'audio/mpeg';
    
    const fallbackSource = document.createElement('source');
    fallbackSource.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
    fallbackSource.type = 'audio/mpeg';
    
    audio.appendChild(source);
    audio.appendChild(fallbackSource);
    
    // Add play button overlay
    const playButton = document.createElement('button');
    playButton.textContent = 'Start Audio';
    playButton.style.position = 'absolute';
    playButton.style.top = '50%';
    playButton.style.left = '50%';
    playButton.style.transform = 'translate(-50%, -50%)';
    playButton.style.padding = '10px 20px';
    playButton.style.backgroundColor = '#FF4500';
    playButton.style.color = 'white';
    playButton.style.border = 'none';
    playButton.style.borderRadius = '4px';
    playButton.style.cursor = 'pointer';
    playButton.style.zIndex = '10';
    
    // Add elements to container
    container.appendChild(canvas);
    container.appendChild(audio);
    container.appendChild(playButton);
    
    // Add instructions
    const instructions = document.createElement('div');
    instructions.textContent = 'Use the controls below to play audio. Visualization will appear when audio plays.';
    instructions.style.textAlign = 'center';
    instructions.style.fontSize = '14px';
    instructions.style.color = 'white';
    instructions.style.padding = '10px';
    instructions.style.position = 'absolute';
    instructions.style.top = '10px';
    instructions.style.width = '100%';
    container.appendChild(instructions);
    
    // Event handlers
    playButton.addEventListener('click', function() {
        audio.play();
        this.style.display = 'none';
    });
    
    // Start visualization when audio plays
    audio.addEventListener('play', function() {
        playButton.style.display = 'none';
        instructions.style.display = 'none';
        simpleVisualize();
    });
    
    // Show play button when audio is paused
    audio.addEventListener('pause', function() {
        playButton.style.display = 'block';
        playButton.textContent = 'Resume Audio';
    });
    
    // Time-based visualization function
    function simpleVisualize() {
        if (audio.paused) return;
        
        requestAnimationFrame(simpleVisualize);
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Time-based animation parameters
        const time = audio.currentTime;
        const duration = audio.duration || 1;
        const progress = time / duration;
        
        // Draw animated bars using sine waves for natural movement
        for(let i = 0; i < 12; i++) {
            const height = 30 + 
                40 * Math.sin(time * 2 + i * 0.4) + 
                30 * Math.sin(time * 3 + i * 0.2) +
                20 * Math.sin(time * 1.5 + i * 0.5);
            
            // Color based on position and time
            const hue = (270 + i * 5 + time * 10) % 360;
            ctx.fillStyle = `hsl(${hue}, 80%, 60%)`;
            
            // Draw bar
            ctx.fillRect(i * 25 + 5, canvas.height - Math.abs(height), 20, Math.abs(height));
        }
        
        // Draw progress indicator
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(0, canvas.height - 5, canvas.width * progress, 5);
    }
    
    /**
     * Future Enhancement: Frequency Analysis
     * 
     * This is a placeholder for the future WebAudio API implementation.
     * In the complete version, this would analyze frequency data and
     * feed it into the neural network.
     */
    function initializeFrequencyAnalysis() {
        // This function would be implemented in Phase 2
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaElementSource(audio);
        
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        
        analyser.fftSize = 2048;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        // The frequency data would be used to drive visualization
        // and as input to the neural network
    }
});

/**
 * Phase 3: Emotion Recognition Model (Pseudocode)
 * 
 * This represents the structure of the neural network
 * that would be implemented in later phases.
 */
/*
class EmotionRecognitionModel {
    constructor() {
        this.model = null;
        this.emotions = ['energetic', 'melancholic', 'joyful', 'tense'];
    }
    
    async initialize() {
        // In the full implementation, this would load a pre-trained 
        // TensorFlow.js model or train a new one
        this.model = await tf.loadLayersModel('model/emotion_model.json');
    }
    
    predict(audioFeatures) {
        // Process audio features and return emotional characteristics
        const tensor = this.preprocessFeatures(audioFeatures);
        const prediction = this.model.predict(tensor);
        return {
            dominant: this.emotions[prediction.argMax().dataSync()[0]],
            values: prediction.dataSync()
        };
    }
}
*/ 