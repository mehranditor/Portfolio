document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        const soundFile = link.getAttribute('data-sound');
        if (soundFile) {
            const audio = new Audio(`sounds/${soundFile}`);
            audio.volume = 0.3;
            audio.play().catch(error => {
                console.error("Audio playback failed:", error);
            });
        }
    });
});

document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        const soundFile = link.getAttribute('data-sound');
        if (soundFile) {
            const audio = new Audio(`sounds/${soundFile}`);
            audio.volume = 0.3;
            audio.play();
        }
    });
});
document.querySelectorAll('.cta-button').forEach(link => {
    link.addEventListener('mouseenter', () => {
        const soundFile = link.getAttribute('data-sound');
        if (soundFile) {
            const audio = new Audio(`sounds/${soundFile}`);
            audio.volume = 0.3;
            audio.play();
        }
    });
});

window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Hero text now uses CSS fade animation instead of typewriter

// Initialize carousels

function initializeCarousels() {
    document.querySelectorAll('.project-carousel').forEach(carousel => {
        const container = carousel.querySelector('.carousel-container');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const indicators = carousel.querySelectorAll('.carousel-indicator');

        let currentSlide = 0;
        const totalSlides = slides.length;

        function updateCarousel() {
            const translateX = -currentSlide * 100;
            container.style.transform = `translateX(${translateX}%)`;

            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }

        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                updateCarousel();
            });
        });

        // Auto-play carousel
        let autoPlay = setInterval(nextSlide, 4000);

        // Pause auto-play on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoPlay);
        });

        carousel.addEventListener('mouseleave', () => {
            autoPlay = setInterval(nextSlide, 4000);
        });
    });
}

// Initialize carousels when page loads
window.addEventListener('load', () => {
    initializeCarousels();
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-bg');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Typewriter effect removed - using CSS fade animation instead

document.querySelectorAll('.projects-arrow').forEach(btn => {
    btn.addEventListener('click', function () {
        const grid = document.querySelector('.projects-grid');
        const cards = grid.querySelectorAll('.project-card');
        if (cards.length < 2) return;

        // Calculate the actual scroll amount (card width + gap)
        const cardWidth = cards[0].getBoundingClientRect().width;
        // Get the gap from CSS (in px)
        const gridStyles = window.getComputedStyle(grid);
        const gap = parseInt(gridStyles.gap) || 0;
        const scrollAmount = cardWidth + gap;

        if (this.classList.contains('left')) {
            grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    });
});

window.addEventListener('DOMContentLoaded', () => {
    const bgMusic = document.getElementById('bg-music');
    const toggleBtn = document.getElementById('music-toggle');
    const icon = document.getElementById('music-icon');
    let started = false;

    function startMusic() {
        if (!started && bgMusic) {
            bgMusic.volume = 0.2;
            bgMusic.play().catch(() => { });
            started = true;
        }
    }

    // Start music on first user interaction
    document.body.addEventListener('click', startMusic, { once: true });
    document.body.addEventListener('keydown', startMusic, { once: true });

    // Toggle mute/unmute
    if (toggleBtn && bgMusic) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering startMusic
            if (bgMusic.paused) {
                bgMusic.volume = 0.2; // Ensure volume is set every time you play
                bgMusic.play();
                icon.textContent = '🔊';
            } else {
                bgMusic.pause();
                icon.textContent = '⏸️';
            }
        });
    }
});

document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('side-panel').classList.add('open');
});
document.getElementById('close-panel').addEventListener('click', () => {
    document.getElementById('side-panel').classList.remove('open');
});

// Close panel when clicking on navigation links
document.querySelectorAll('.side-panel a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('side-panel').classList.remove('open');
    });
});

// Optional: close panel when clicking outside
document.addEventListener('click', (e) => {
    const panel = document.getElementById('side-panel');
    if (panel.classList.contains('open') &&
        !panel.contains(e.target) &&
        e.target.id !== 'menu-toggle') {
        panel.classList.remove('open');
    }
});

