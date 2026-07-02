// --- Configuration & Letter Content ---
const loveLetterText = `Happy Birthday to the most incredible person in my life! \n\nEvery day with you feels like a beautiful gift, and I am so incredibly grateful to celebrate another year of your wonderful existence. Thank you for your warmth, your laughter, and the endless love you share. \n\nToday belongs entirely to you. I hope it brings you as much happiness as you bring to me every day. \n\nForever and always Yours. \n\Amer Hosain M. Langcap ❤️`;

// --- DOM References ---
const heartBgContainer = document.getElementById('heartBg');
const playPauseBtn = document.getElementById('playPauseBtn');
const volumeControl = document.getElementById('volumeControl');
const bgMusic = document.getElementById('bgMusic');

const blowBtn = document.getElementById('blowBtn');
const cakeMessage = document.getElementById('cakeMessage');
const cakeElement = document.querySelector('.cake');

const giftBtn = document.getElementById('giftBtn');
const giftBox = document.getElementById('giftBox');
const giftMessage = document.getElementById('giftMessage');

const openLetterBtn = document.getElementById('openLetterBtn');
const closeLetterBtn = document.getElementById('closeLetterBtn');
const letterModal = document.getElementById('letterModal');
const typingTextContainer = document.getElementById('typingText');

// Interaction Audio Elements
const blowSound = new Audio('Mitski - My Love Mine All Mine.mp3');

// --- 1. Ambient Background Floating Hearts ---
function createFloatingHearts() {
    const heartCount = 15;
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDelay = Math.random() * 6 + 's';
        heart.style.animationDuration = Math.random() * 4 + 6 + 's'; // Between 6s and 10s
        heartBgContainer.appendChild(heart);
    }
}

// Initial page setup launch
window.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    // Soft initial landing splash of confetti
    confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#ffb3c6', '#ff85a1', '#ff477e']
    });
});

// --- 2. Music Player Audio Control ---
playPauseBtn.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play().catch(() => console.log("Audio loading context requested interaction first."));
        playPauseBtn.textContent = "Pause";
    } else {
        bgMusic.pause();
        playPauseBtn.textContent = "Play";
    }
});

volumeControl.addEventListener('input', (e) => {
    bgMusic.volume = e.target.value;
});

// --- 3. Carousel Photo Gallery Slider ---
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlideIndex = 0;

function updateSlideView(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Boundary check wrap-arounds
    if (index >= slides.length) currentSlideIndex = 0;
    else if (index < 0) currentSlideIndex = slides.length - 1;
    else currentSlideIndex = index;

    slides[currentSlideIndex].classList.add('active');
}

nextBtn.addEventListener('click', () => updateSlideView(currentSlideIndex + 1));
prevBtn.addEventListener('click', () => updateSlideView(currentSlideIndex - 1));

// --- 4. Interactive Cake Candle Extinguisher ---
let candlesLit = true;
blowBtn.addEventListener('click', () => {
    if (candlesLit) {
        // Autoplay background music if it's currently paused
        if (bgMusic.paused) {
            bgMusic.play().catch(() => console.log("Music playback started via user interaction."));
            playPauseBtn.textContent = "Pause";
        }
        
        // Hide individual candle flames
        document.querySelectorAll('.flame').forEach(flame => {
            flame.classList.add('extinguished');
        });
        
        cakeElement.classList.add('glowing');
        cakeMessage.textContent = "Make a Wish! ✨";
        blowBtn.textContent = "Relight Candles 🕯️";

        // Major Confetti Spray Explodes
        confetti({
            particleCount: 140,
            spread: 80,
            origin: { y: 0.65 },
            colors: ['#ffb3c6', '#ff85a1', '#ff477e', '#ffffff']
        });
        candlesLit = false;
    } else {
        // Relight process toggle
        document.querySelectorAll('.flame').forEach(flame => {
            flame.classList.remove('extinguished');
        });
        cakeElement.classList.remove('glowing');
        cakeMessage.textContent = "";
        blowBtn.textContent = "Blow Candles 🎂";
        candlesLit = true;
    }
});

// --- 5. Interactive Flower Gift Box Reveal ---
let giftOpened = false;
giftBtn.addEventListener('click', () => {
    if (!giftOpened) {
        giftBox.classList.add('open');
        giftMessage.textContent = "A Special Bouquet Just For You 💐💕";
        giftBtn.textContent = "Close Gift 🎁";

        // Raining continuous side stream confetti for floating magic ambiance
        let duration = 1.5 * 1000;
        let animationEnd = Date.now() + duration;
        (function frame() {
            confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0.2, y: 0.8 } });
            confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 0.8, y: 0.8 } });
            if (Date.now() < animationEnd) {
                requestAnimationFrame(frame);
            }
        }());

        giftOpened = true;
    } else {
        giftBox.classList.remove('open');
        giftMessage.textContent = "";
        giftBtn.textContent = "Open Gift 🎁";
        giftOpened = false;
    }
});

// --- 6. Modal Popup Love Letter Typing Machine Animation ---
let typingIntervalIndex = 0;
let isTypingActive = false;

function startTypingEffect() {
    typingTextContainer.textContent = "";
    typingIntervalIndex = 0;
    isTypingActive = true;
    
    function typeNextCharacter() {
        if (!isTypingActive) return;
        if (typingIntervalIndex < loveLetterText.length) {
            typingTextContainer.textContent += loveLetterText.charAt(typingIntervalIndex);
            typingIntervalIndex++;
            setTimeout(typeNextCharacter, 35); // Adjust typing speed here
        }
    }
    typeNextCharacter();
}

openLetterBtn.addEventListener('click', () => {
    letterModal.classList.add('open');
    startTypingEffect();
});

function hideLetterModal() {
    letterModal.classList.remove('open');
    isTypingActive = false;
    typingTextContainer.textContent = "";
}

closeLetterBtn.addEventListener('click', hideLetterModal);
// Close modal instantly if user clicks on the dark backdrop array mask area
window.addEventListener('click', (e) => {
    if (e.target === letterModal) hideLetterModal();
});