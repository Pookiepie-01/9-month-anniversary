// Global variables
let currentSection = 'intro';
let isLoading = false;
let loadingProgress = 0;
let loadingInterval;
let decreaseInterval;
let isHolding = false;
let mediaRecorder;
let audioChunks = [];
let recordedAudio = null;

// Akshith the Koala messages
const koalaMessages = [
    "Hey! It's me your koala, Akshith! 🐨 I'm so excited you're here!",
    "Did you know koalas sleep 20 hours a day like Akshith andhuke Koala? But I stay awake just to think about you! 💕",
    "I may be a koala, but you make my heart go WOOOOOSH! 🌪️",
    "Fun fact: I chose to be a koala because they're as cuddly as I want to be with you! 🤗",
    "Psst... I helped make this whole website just for you! Pretty cool, right? 😎",
    "I'm not just cute, I'm also romantic! Want to see? Keep going! 💖",
    "Between you and me... I think you're absolutely amazing! 🌟",
    "Koala-ty time ahead! (Get it? Quality? I'm hilarious!) 😂",
    "I may eat eucalyptus, but you're sweeter than any leaf! 🍃💕",
    "Ready for the surprise? I promise it's koala-fied amazing! 🎉"
];

// Loading messages that change as user taps
const loadingMessages = [
    "Adding extra love...",
    "Sprinkling Akshith's magic dust ✨", 
    "Preparing the surprise...",
    "Almost there, keep tapping! 💕",
    "Loading all the cute stuff...",
    "Don't stop now! 🥰",
    "You're doing great! 💖",
    "Finalizing the romance...",
    "Just a little more! ✨",
    "Perfect! Taking you to your surprise! 🎉"
];

let currentKoalaMessageIndex = 0;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Add startup animation
    setTimeout(() => {
        document.querySelector('.intro-title').style.animation = 'titleGlow 3s ease-in-out infinite alternate';
    }, 500);
});

// Show the question section
function showQuestion() {
    const introSection = document.getElementById('introSection');
    const questionSection = document.getElementById('questionSection');

    // Fade out intro
    introSection.classList.add('fade-out');

    setTimeout(() => {
        introSection.style.display = 'none';
        questionSection.style.display = 'block';
        questionSection.classList.add('fade-in');
        currentSection = 'question';

        // Setup the tricky button behavior
        setupTrickyButtons();
    }, 600);
}

// Setup the tricky Yes/No button behavior - swaps EVERY time cursor goes on No
function setupTrickyButtons() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const hintText = document.getElementById('hintText');

    // Add hover effect that ALWAYS switches when hovering over "No" button
    noBtn.addEventListener('mouseenter', function() {
        const noBtnText = document.getElementById('noBtnText');
        // Only switch if this button currently says "No"
        if (noBtnText.textContent === 'No') {
            switchButtonTexts();
        
        }
        showHint();
    });

    yesBtn.addEventListener('mouseenter', function() {
        const yesBtnText = document.getElementById('yesBtnText');
        // Only switch if this button currently says "No"
        if (yesBtnText.textContent === 'No') {
            switchButtonTexts();
           
        }
         showHint();
    });

    // Mobile touch events
    noBtn.addEventListener('touchstart', function() {
        const noBtnText = document.getElementById('noBtnText');
        if (noBtnText.textContent === 'No') {
            switchButtonTexts();
            showHint();
        }
    });

    yesBtn.addEventListener('touchstart', function() {
        const yesBtnText = document.getElementById('yesBtnText');
        if (yesBtnText.textContent === 'No') {
            switchButtonTexts();
        
        }
        showHint();
    });
}

// Switch the button texts
function switchButtonTexts() {
    const yesBtnText = document.getElementById('yesBtnText');
    const noBtnText = document.getElementById('noBtnText');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');

    // Add switch animation
    yesBtn.classList.add('button-switch');
    noBtn.classList.add('button-switch');

    setTimeout(() => {
        // Switch the texts
        const tempText = yesBtnText.textContent;
        yesBtnText.textContent = noBtnText.textContent;
        noBtnText.textContent = tempText;

        // Switch the classes too
        yesBtn.className = yesBtnText.textContent === 'Yes' ? 'answer-btn yes-btn' : 'answer-btn no-btn';
        noBtn.className = noBtnText.textContent === 'Yes' ? 'answer-btn yes-btn' : 'answer-btn no-btn';

        // Remove animation classes
        yesBtn.classList.remove('button-switch');
        noBtn.classList.remove('button-switch');
    }, 200);
}

// Show hint text
function showHint() {
    const hintText = document.getElementById('hintText');
    hintText.style.display = 'block';

    setTimeout(() => {
        hintText.style.display = 'none';
    }, 2500);
}

// Handle Yes button click
function handleYes() {
    const yesBtnText = document.getElementById('yesBtnText');

    if (yesBtnText.textContent === 'Yes') {
        // Create celebration effect
        createCelebrationHearts();

        // Transition to dress color question
        setTimeout(() => {
            showDressQuestion();
        }, 1000);
    } else {
        // If they clicked "Yes" but it says "No", switch again
        switchButtonTexts();
        showHint();
    }
}

// Handle No button click  
function handleNo() {
    const noBtnText = document.getElementById('noBtnText');

    if (noBtnText.textContent === 'Yes') {
        // Create celebration effect
        createCelebrationHearts();

        // Transition to dress color question
        setTimeout(() => {
            showDressQuestion();
        }, 1000);
    } else {
        // If they clicked "No", switch the buttons
        switchButtonTexts();
        showHint();
    }
}

// Show dress color question
function showDressQuestion() {
    const questionSection = document.getElementById('questionSection');
    const dressSection = document.getElementById('dressSection');

    questionSection.classList.add('fade-out');

    setTimeout(() => {
        questionSection.style.display = 'none';
        dressSection.style.display = 'block';
        dressSection.classList.add('fade-in');
        currentSection = 'dress';
    }, 600);
}

// Check dress color answer
function checkDressColor(color) {
    const dressResult = document.getElementById('dressResult');
    const allBtns = document.querySelectorAll('.color-btn');

    // Disable all buttons
    allBtns.forEach(btn => {
        btn.style.pointerEvents = 'none';
        btn.style.opacity = '0.6';
    });

    // Highlight selected button
    event.target.closest('.color-btn').style.opacity = '1';
    event.target.closest('.color-btn').style.transform = 'scale(1.05)';
    event.target.closest('.color-btn').style.borderColor = 'var(--pink)';

    dressResult.style.display = 'block';

    if (color === 'black') {
        // Correct answer!
        dressResult.textContent = "Perfect! You remember everything! 😍 Black was indeed the color!";
        dressResult.classList.add('correct');

        setTimeout(() => {
            showLoadingSection();
        }, 2000);
    } else {
        // Wrong answer
        dressResult.textContent = "Oops! That's not right! 😅 But don't worry, I still love you!";
        dressResult.classList.add('incorrect');

        setTimeout(() => {
            showVoiceSection();
        }, 2000);
    }
}

// Show voice recording section
function showVoiceSection() {
    const dressSection = document.getElementById('dressSection');
    const voiceSection = document.getElementById('voiceSection');

    dressSection.classList.add('fade-out');

    setTimeout(() => {
        dressSection.style.display = 'none';
        voiceSection.style.display = 'block';
        voiceSection.classList.add('fade-in');
        currentSection = 'voice';
    }, 600);
}

// Toggle recording
async function toggleRecording() {
    const recordBtn = document.getElementById('recordBtn');
    const recordText = document.getElementById('recordText');
    const recordingStatus = document.getElementById('recordingStatus');
    const playbackContainer = document.getElementById('playbackContainer');

    if (!mediaRecorder || mediaRecorder.state === 'inactive') {
        // Start recording
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];

            mediaRecorder.ondataavailable = function(event) {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = function() {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                recordedAudio = URL.createObjectURL(audioBlob);

                // Show playback controls
                recordingStatus.style.display = 'none';
                playbackContainer.style.display = 'block';
                recordText.textContent = 'Start Recording';
                recordBtn.classList.remove('recording');
            };

            mediaRecorder.start();
            recordText.textContent = 'Stop Recording';
            recordBtn.classList.add('recording');
            recordingStatus.style.display = 'flex';

            // Auto-stop after 10 seconds
            setTimeout(() => {
                if (mediaRecorder && mediaRecorder.state === 'recording') {
                    mediaRecorder.stop();
                    stream.getTracks().forEach(track => track.stop());
                }
            }, 10000);

        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Unable to access microphone. Please allow microphone access and try again.');
        }
    } else {
        // Stop recording
        mediaRecorder.stop();
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
}

// Play recorded audio
function playRecording() {
    if (recordedAudio) {
        const audio = new Audio(recordedAudio);
        audio.play();
    }
}

// Proceed after voice recording
function proceedAfterVoice() {
    createCelebrationHearts();
    setTimeout(() => {
        showLoadingSection();
    }, 1000);
}

// Show loading section
function showLoadingSection() {
    const currentSectionElement = document.getElementById(currentSection + 'Section');
    const loadingSection = document.getElementById('loadingSection');

    currentSectionElement.classList.add('fade-out');

    setTimeout(() => {
        currentSectionElement.style.display = 'none';
        loadingSection.style.display = 'block';
        loadingSection.classList.add('fade-in');
        currentSection = 'loading';
        isLoading = true;

        // Setup the tap-to-fill loading behavior
        setupTapLoading();
    }, 600);
}

// Setup tap/click to fill loading behavior
function setupTapLoading() {
    const loadingProgress = document.getElementById('loadingProgress');
    const loadingText = document.getElementById('loadingText');

    loadingProgress.style.width = '0%';
    loadingText.textContent = "Tap anywhere to fill the love meter! 💕";

    // Add event listeners for clicking/tapping
    document.addEventListener('mousedown', startFilling);
    document.addEventListener('mouseup', stopFilling);
    document.addEventListener('mouseleave', stopFilling);

    // Touch events for mobile
    document.addEventListener('touchstart', startFilling);
    document.addEventListener('touchend', stopFilling);
    document.addEventListener('touchcancel', stopFilling);

    // Start decreasing interval
    startDecreasing();
}

// Start filling the progress bar
function startFilling() {
    if (!isLoading) return;

    isHolding = true;

    // Clear decrease interval
    if (decreaseInterval) {
        clearInterval(decreaseInterval);
    }

    // Start filling interval
    if (!loadingInterval) {
        loadingInterval = setInterval(() => {
            if (isHolding && loadingProgress < 100) {
                loadingProgress += 2; // Increase by 2% each tick
                updateLoadingDisplay();

                // Check if complete
                if (loadingProgress >= 100) {
                    completeLoading();
                }
            }
        }, 50); // Update every 50ms for smooth animation
    }
}

// Stop filling and start decreasing
function stopFilling() {
    if (!isLoading) return;

    isHolding = false;

    // Clear filling interval
    if (loadingInterval) {
        clearInterval(loadingInterval);
        loadingInterval = null;
    }

    // Start decreasing after a short delay
    setTimeout(() => {
        if (!isHolding && isLoading) {
            startDecreasing();
        }
    }, 300);
}

// Start decreasing the progress bar
function startDecreasing() {
    if (decreaseInterval) {
        clearInterval(decreaseInterval);
    }

    decreaseInterval = setInterval(() => {
        if (!isHolding && loadingProgress > 0 && isLoading) {
            loadingProgress -= 1; // Decrease by 1% each tick
            updateLoadingDisplay();
        } else if (loadingProgress <= 0) {
            clearInterval(decreaseInterval);
        }
    }, 100); // Slower decrease
}

// Update the loading display
function updateLoadingDisplay() {
    const progressBar = document.getElementById('loadingProgress');
    const loadingText = document.getElementById('loadingText');

    progressBar.style.width = loadingProgress + '%';

    // Update message based on progress
    const messageIndex = Math.floor((loadingProgress / 100) * (loadingMessages.length - 1));
    loadingText.textContent = loadingMessages[messageIndex] || loadingMessages[0];
}

// Complete the loading and redirect
function completeLoading() {
    isLoading = false;

    // Clear all intervals
    if (loadingInterval) clearInterval(loadingInterval);
    if (decreaseInterval) clearInterval(decreaseInterval);

    // Remove event listeners
    document.removeEventListener('mousedown', startFilling);
    document.removeEventListener('mouseup', stopFilling);
    document.removeEventListener('mouseleave', stopFilling);
    document.removeEventListener('touchstart', startFilling);
    document.removeEventListener('touchend', stopFilling);
    document.removeEventListener('touchcancel', stopFilling);

    // Show completion message
    const loadingText = document.getElementById('loadingText');
    loadingText.textContent = "Perfect! Taking you to your surprise! 🎉";

    // Create final celebration
    createFinalCelebration();

    // Redirect to main page after celebration
    setTimeout(() => {
        window.location.href = 'index1.html';
    }, 2500);
}

// Koala (Akshith) message function
function koalaMessage() {
    const koalaElement = document.getElementById('koala');
    const messageElement = document.getElementById('koalaMessage');
    const messageText = document.getElementById('messageText');

    // Get random message
    const randomIndex = Math.floor(Math.random() * koalaMessages.length);
    const message = koalaMessages[randomIndex];

    // Update message text
    messageText.textContent = message;

    // Show message with animation
    messageElement.classList.add('show');

    // Add bounce effect to koala
    koalaElement.style.animation = 'koalaBounce 0.8s ease-in-out';

    // Hide message after 4 seconds
    setTimeout(() => {
        messageElement.classList.remove('show');
    }, 4000);

    // Create sparkles around koala
    createSparklesAroundElement(koalaElement);
}

// Create celebration hearts effect
function createCelebrationHearts() {
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = ['💖', '💕', '💗', '💘', '🌟'][Math.floor(Math.random() * 5)];
            heart.style.cssText = `
                position: fixed;
                font-size: ${1.5 + Math.random()}rem;
                pointer-events: none;
                z-index: 1000;
                left: ${Math.random() * window.innerWidth}px;
                top: ${window.innerHeight + 50}px;
                animation: celebrateFloat 3s ease-out forwards;
            `;

            document.body.appendChild(heart);

            setTimeout(() => {
                if (document.body.contains(heart)) {
                    document.body.removeChild(heart);
                }
            }, 3000);
        }, i * 80);
    }
}

// Create final celebration effect
function createFinalCelebration() {
    // Create massive heart explosion
    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = ['💖', '💕', '💗', '💘', '🌟', '✨', '🐨'][Math.floor(Math.random() * 7)];
            heart.style.cssText = `
                position: fixed;
                font-size: ${1 + Math.random() * 2}rem;
                pointer-events: none;
                z-index: 1000;
                left: ${window.innerWidth / 2}px;
                top: ${window.innerHeight / 2}px;
                animation: finalExplode 2.5s ease-out forwards;
            `;

            // Random direction for explosion
            const angle = (Math.PI * 2 * i) / 60;
            const velocity = 100 + Math.random() * 300;
            heart.style.setProperty('--dx', Math.cos(angle) * velocity + 'px');
            heart.style.setProperty('--dy', Math.sin(angle) * velocity + 'px');

            document.body.appendChild(heart);

            setTimeout(() => {
                if (document.body.contains(heart)) {
                    document.body.removeChild(heart);
                }
            }, 2500);
        }, i * 40);
    }
}

// Create sparkles around an element
function createSparklesAroundElement(element) {
    const rect = element.getBoundingClientRect();
    const sparkleCount = 12;

    for (let i = 0; i < sparkleCount; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = ['✨', '💫', '⭐'][Math.floor(Math.random() * 3)];
            sparkle.style.cssText = `
                position: fixed;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                pointer-events: none;
                z-index: 1000;
                font-size: ${0.8 + Math.random() * 0.6}rem;
                animation: sparkleAnimation 2s ease-out forwards;
            `;

            document.body.appendChild(sparkle);

            setTimeout(() => {
                if (document.body.contains(sparkle)) {
                    document.body.removeChild(sparkle);
                }
            }, 2000);
        }, i * 100);
    }
}

// Add CSS animations dynamically
const dynamicStyles = `
@keyframes celebrateFloat {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
    }
}

@keyframes finalExplode {
    0% {
        transform: translate(0, 0) scale(1) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translate(var(--dx), var(--dy)) scale(0) rotate(720deg);
        opacity: 0;
    }
}

@keyframes sparkleAnimation {
    0% {
        opacity: 1;
        transform: scale(0) rotate(0deg);
    }
    50% {
        opacity: 1;
        transform: scale(1.2) rotate(180deg);
    }
    100% {
        opacity: 0;
        transform: scale(0) rotate(360deg);
    }
}
`;

// Inject dynamic styles
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

// Prevent context menu on mobile for better experience
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
        stopFilling();
    }
});