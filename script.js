// ===================================
// CUSTOM CURSOR
// ===================================
const cursor = document.querySelector('.cursor');
const cursorTrail = document.querySelector('.cursor-trail');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    setTimeout(() => {
        cursorTrail.style.left = e.clientX + 'px';
        cursorTrail.style.top = e.clientY + 'px';
    }, 100);
});

// Cursor effects on hover
const interactiveElements = document.querySelectorAll('a, button, .gallery-item');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorTrail.style.transform = 'scale(1.5)';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorTrail.style.transform = 'scale(1)';
    });
});

// ===================================
// MOBILE MENU
// ===================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ===================================
// SMOOTH SCROLLING
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('[data-scroll]').forEach(el => {
    observer.observe(el);
});

// ===================================
// PARALLAX EFFECT
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const sprayOverlay = document.querySelector('.spray-overlay');

    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - scrolled / 600;
    }

    if (sprayOverlay) {
        sprayOverlay.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===================================
// NAVBAR BACKGROUND ON SCROLL
// ===================================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// ===================================
// GALLERY LIGHTBOX
// ===================================
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentImageIndex = 0;
let galleryImages = [];

// Collect all gallery images
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    const img = item.querySelector('img');
    const overlay = item.querySelector('.gallery-overlay');
    const title = overlay.querySelector('h3').textContent;
    const location = overlay.querySelector('p').textContent;

    galleryImages.push({
        src: img.src,
        alt: img.alt,
        title: title,
        location: location
    });

    item.addEventListener('click', () => {
        openLightbox(index);
    });
});

function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function updateLightboxImage() {
    const image = galleryImages[currentImageIndex];
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.innerHTML = `<h3>${image.title}</h3><p>${image.location}</p>`;
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightboxImage();
}

// Event listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrevImage);
lightboxNext.addEventListener('click', showNextImage);

// Close on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrevImage();
    if (e.key === 'ArrowRight') showNextImage();
});

// ===================================
// SPRAY PAINT TRAIL EFFECT
// ===================================
let sprayTrails = [];
const maxTrails = 20;

document.addEventListener('mousemove', (e) => {
    // Create spray trail occasionally
    if (Math.random() > 0.95) {
        createSprayTrail(e.clientX, e.clientY);
    }
});

function createSprayTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'spray-trail-particle';
    trail.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${Math.random() * 10 + 5}px;
        height: ${Math.random() * 10 + 5}px;
        background: ${getRandomNeonColor()};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        opacity: 0.6;
        filter: blur(${Math.random() * 3}px);
        animation: fadeOut 1s forwards;
    `;

    document.body.appendChild(trail);
    sprayTrails.push(trail);

    // Remove old trails
    if (sprayTrails.length > maxTrails) {
        const oldTrail = sprayTrails.shift();
        oldTrail.remove();
    }

    // Remove after animation
    setTimeout(() => {
        trail.remove();
        sprayTrails = sprayTrails.filter(t => t !== trail);
    }, 1000);
}

function getRandomNeonColor() {
    const colors = [
        'rgba(255, 0, 110, 0.6)',
        'rgba(0, 217, 255, 0.6)',
        'rgba(57, 255, 20, 0.6)',
        'rgba(176, 38, 255, 0.6)',
        'rgba(255, 107, 0, 0.6)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Add fadeOut animation to document
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        0% {
            opacity: 0.6;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) scale(0.5);
        }
    }
`;
document.head.appendChild(style);

// ===================================
// STATS COUNTER ANIMATION
// ===================================
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) {
    statsObserver.observe(statsGrid);
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 30);
}

// ===================================
// LOADING ANIMATION
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// CONSOLE EASTER EGG
// ===================================
console.log('%c NEXUS ', 'background: linear-gradient(135deg, #FF006E, #B026FF); color: white; font-size: 30px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
console.log('%c Arte Contemporânea • Pintura • Telas ', 'color: #00D9FF; font-size: 14px; font-weight: bold;');
console.log('%c Transformando emoções em cores desde 2015 ', 'color: #39FF14; font-size: 12px;');
