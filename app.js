// Koala (Akshith) messages array
const koalaMessages = [
    "You're my favorite human! 🐨💕",
    "9 months of cuddles and counting!",
    "Someone's looking extra cute today...",
    "Want some eucalyptus? Just kidding, want some kisses?",
    "I'm not fat, I'm just fluffy... like my love for you!",
    "Boop! You've been koala-blessed! 🐾",
    "9 months and you still make my heart skip a beat!",
    "Warning: This koala is head over heels for you!",
    "Hey! It's me, Akshith! Missing you already! 🐨",
    "I may sleep 20 hours a day, but I dream about you 24/7! 😴💖"
];

// Heart messages array
const heartMessages = [
    "You found my heart! 💖",
    "Love you to the moon and back!",
    "You make my heart flutter! 🦋",
    "Secret love note discovered! 💕",
    "You're my everything! ❤️",
    "Hidden love unlocked! 🔓💖"
];

let letterOpened = false;
let currentKoalaMessageIndex = 0;

// Timer start date: November 26, 2024
const startDate = new Date('2024-11-26T00:00:00');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Add some sparkle effects
    createSparkles();

    // Set up scroll animations
    setupScrollAnimations();

    // Add click sound effect simulation
    setupSoundEffects();

    // Start the cute timer
    startLoveTimer();
});

// Letter opening animation
function openLetter() {
    if (letterOpened) return;

    const envelope = document.getElementById('envelope');
    const letter = document.getElementById('letter');

    // Add opening class to envelope
    envelope.classList.add('open');
    letterOpened = true;

    // Show letter after envelope animation
    setTimeout(() => {
        letter.classList.add('show');
        // Add a gentle shake effect to the letter
        letter.style.animation = 'letterShake 0.5s ease-in-out';
    }, 800);

    // Create floating hearts effect
    createFloatingHearts();
}

// Koala (Akshith) message function - now stays for 10 seconds
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
    koalaElement.style.animation = 'koalaBounce 0.5s ease-in-out';

    // Hide message after 10 seconds (increased from 3 seconds)
    setTimeout(() => {
        messageElement.classList.remove('show');
    }, 10000);

    // Create sparkles around koala
    createSparklesAroundElement(koalaElement);
}

// Star rating function
function rateSong(rating) {
    const stars = document.querySelectorAll('.star');
    const ratingMessage = document.getElementById('ratingMessage');
    const ratingText = document.getElementById('ratingText');

    // Remove active class from all stars
    stars.forEach(star => star.classList.remove('active'));

    // Add active class to selected stars
    for (let i = 0; i < rating; i++) {
        stars[i].classList.add('active');
    }

    // Create sparkle effect around stars
    stars.forEach((star, index) => {
        if (index < rating) {
            createSparklesAroundElement(star);
        }
    });

    // Different messages based on rating
    let message = '';
    switch(rating) {
        case 5:
            message = "Wowwwww! I knew you would loveeee yeeeee! Who sung that? Your boy Akshith, hehe! 🐨💕✨";
            break;
        case 4:
            message = "Aww, that's really sweet! You're being kind to your tone-deaf boyfriend 😅💖";
            break;
        case 3:
            message = "Okay okay, I know I'm not the next singing sensation, but I tried! 🎤😊";
            break;
        case 2:
            message = "Ouch! But hey, at least I tried singing for you, right? 🥺💕";
            break;
        case 1:
            message = "Harsh! But I still love you even if my singing made your ears hurt 😂❤️";
            break;
        default:
            message = "Rate my singing please! 🎵";
    }

    ratingText.textContent = message;
    ratingMessage.classList.add('show');
    ratingMessage.style.display = 'block';

    // Create celebration effect for 4-5 stars
    if (rating >= 4) {
        createCelebrationHearts();
    }
}

// Start the love timer
function startLoveTimer() {
    updateTimer(); // Update immediately
    setInterval(updateTimer, 1000); // Update every second
}

// Update timer display
function updateTimer() {
    const now = new Date();
    const difference = now.getTime() - startDate.getTime();

    // Calculate time units
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Update display
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

    // Add cute animation every 10 seconds
    if (seconds % 10 === 0) {
        const timeUnits = document.querySelectorAll('.time-unit');
        timeUnits.forEach((unit, index) => {
            setTimeout(() => {
                unit.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    unit.style.transform = 'scale(1)';
                }, 200);
            }, index * 100);
        });
    }
}

// Reveal teasing messages
function revealTease(element) {
    element.classList.add('revealed');

    // Create sparkle effect
    createSparklesAroundElement(element);

    // Add a fun message after reveal
    setTimeout(() => {
        const originalText = element.querySelector('span').textContent;
        element.querySelector('span').textContent = '' + originalText;
    }, 500);
}

// Reveal hidden hearts
function revealHeart(element) {
    const randomMessage = heartMessages[Math.floor(Math.random() * heartMessages.length)];

    // Create temporary message bubble
    const bubble = document.createElement('div');
    bubble.className = 'heart-bubble';
    bubble.textContent = randomMessage;
    bubble.style.cssText = `
        position: absolute;
        background: white;
        padding: 10px 15px;
        border-radius: 20px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        font-size: 0.9rem;
        white-space: nowrap;
        z-index: 1000;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease;
        pointer-events: none;
        border: 2px solid #ffb6c1;
        color: #ff69b4;
        font-weight: bold;
    `;

    // Position the bubble
    const rect = element.getBoundingClientRect();
    bubble.style.left = rect.left + 'px';
    bubble.style.top = (rect.top - 50) + 'px';

    document.body.appendChild(bubble);

    // Animate the bubble
    setTimeout(() => {
        bubble.style.opacity = '1';
        bubble.style.transform = 'translateY(0)';
    }, 10);

    // Remove the bubble after 3 seconds
    setTimeout(() => {
        bubble.style.opacity = '0';
        bubble.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            if (document.body.contains(bubble)) {
                document.body.removeChild(bubble);
            }
        }, 500);
    }, 3000);

    // Animate the heart
    element.style.transform = 'scale(1.5) rotate(360deg)';
    element.style.opacity = '1';

    // Reset heart animation
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 500);

    createSparklesAroundElement(element);
}

// Create floating hearts effect
function createFloatingHearts() {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.cssText = `
                position: fixed;
                font-size: 2rem;
                pointer-events: none;
                z-index: 1000;
                left: ${Math.random() * window.innerWidth}px;
                top: ${window.innerHeight}px;
                opacity: 0.8;
                animation: floatUp 4s ease-out forwards;
            `;

            document.body.appendChild(heart);

            // Remove after animation
            setTimeout(() => {
                if (document.body.contains(heart)) {
                    document.body.removeChild(heart);
                }
            }, 4000);
        }, i * 200);
    }
}

// Create celebration hearts effect (for good ratings)
function createCelebrationHearts() {
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = ['💖', '💕', '💗', '💘', '🌟', '✨', '🎵'][Math.floor(Math.random() * 7)];
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

// Create sparkles around an element
function createSparklesAroundElement(element) {
    const rect = element.getBoundingClientRect();
    const sparkleCount = 8;

    for (let i = 0; i < sparkleCount; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.className = 'sparkle';
            sparkle.style.cssText = `
                position: fixed;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                pointer-events: none;
                z-index: 1000;
                font-size: ${0.8 + Math.random() * 0.4}rem;
            `;

            document.body.appendChild(sparkle);

            // Remove after animation
            setTimeout(() => {
                if (document.body.contains(sparkle)) {
                    document.body.removeChild(sparkle);
                }
            }, 2000);
        }, i * 100);
    }
}

// Create general sparkles
function createSparkles() {
    setInterval(() => {
        if (Math.random() > 0.8) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = Math.random() > 0.5 ? '✨' : '💫';
            sparkle.className = 'sparkle';
            sparkle.style.cssText = `
                position: fixed;
                left: ${Math.random() * window.innerWidth}px;
                top: ${Math.random() * window.innerHeight}px;
                pointer-events: none;
                z-index: 1;
                font-size: ${0.8 + Math.random() * 0.4}rem;
            `;

            document.body.appendChild(sparkle);

            setTimeout(() => {
                if (document.body.contains(sparkle)) {
                    document.body.removeChild(sparkle);
                }
            }, 2000);
        }
    }, 2000);
}

// Setup scroll animations
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    });

    // Observe elements that need scroll animations
    const elementsToObserve = document.querySelectorAll('.polaroid, .teasing-element, .hidden-heart');
    elementsToObserve.forEach(el => observer.observe(el));
}

// Setup sound effect simulation (visual feedback)
function setupSoundEffects() {
    // Add visual feedback for clicks
    document.addEventListener('click', function(e) {
        if (e.target.closest('.koala, .teasing-element, .hidden-heart, .envelope, .star')) {
            // Create a ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: fixed;
                border-radius: 50%;
                background: rgba(255, 182, 193, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 1000;
                left: ${e.clientX - 25}px;
                top: ${e.clientY - 25}px;
                width: 50px;
                height: 50px;
            `;

            document.body.appendChild(ripple);

            setTimeout(() => {
                if (document.body.contains(ripple)) {
                    document.body.removeChild(ripple);
                }
            }, 600);
        }
    });
}

// Add CSS for additional animations
const additionalStyles = `
@keyframes floatUp {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 0.8;
    }
    100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
    }
}

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

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.heart-bubble {
    animation: bubbleBounce 0.5s ease-out;
}

@keyframes bubbleBounce {
    0% { transform: translateY(20px) scale(0.8); }
    50% { transform: translateY(-5px) scale(1.1); }
    100% { transform: translateY(0) scale(1); }
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Add some fun Easter eggs
document.addEventListener('keydown', function(e) {
    // Secret key combination: L + O + V + E
    const keys = ['KeyL', 'KeyO', 'KeyV', 'KeyE'];
    let currentSequence = [];

    if (keys.includes(e.code)) {
        currentSequence.push(e.code);

        if (currentSequence.join('') === keys.join('')) {
            // Easter egg activated!
            createMassiveHeartExplosion();
            currentSequence = [];
        }
    }
});

function createMassiveHeartExplosion() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = ['💖', '💕', '💗', '💘', '🐨', '🎵'][Math.floor(Math.random() * 6)];
            heart.style.cssText = `
                position: fixed;
                font-size: ${1 + Math.random() * 2}rem;
                pointer-events: none;
                z-index: 1000;
                left: ${window.innerWidth / 2}px;
                top: ${window.innerHeight / 2}px;
                opacity: 1;
                animation: explode 3s ease-out forwards;
            `;

            const angle = (Math.PI * 2 * i) / 50;
            const velocity = 100 + Math.random() * 200;

            heart.style.setProperty('--dx', Math.cos(angle) * velocity + 'px');
            heart.style.setProperty('--dy', Math.sin(angle) * velocity + 'px');

            document.body.appendChild(heart);

            setTimeout(() => {
                if (document.body.contains(heart)) {
                    document.body.removeChild(heart);
                }
            }, 3000);
        }, i * 50);
    }
}

// Add explosion animation
const explosionStyles = `
@keyframes explode {
    0% {
        transform: translate(0, 0) scale(1);
        opacity: 1;
    }
    100% {
        transform: translate(var(--dx), var(--dy)) scale(0);
        opacity: 0;
    }
}
`;

// Add explosion styles to the page
setTimeout(() => {
    const explosionStyleSheet = document.createElement('style');
    explosionStyleSheet.textContent = explosionStyles;
    document.head.appendChild(explosionStyleSheet);
}, 1000);