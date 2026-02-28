/**
 * Sunny Singh — Personal Portfolio
 * Dark Theme Motion System
 * 
 * Features:
 * - Particle Background Animation
 * - Typewriter Effect
 * - GSAP ScrollTrigger Reveals
 * - Custom Cursor
 * - Scroll Progress Bar
 * - Counter Animations
 * - Timeline Progress
 * - 3D Card Tilt
 * - Smooth Scroll Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    initParticleBackground();
    initCustomCursor();
    initScrollProgress();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initTypewriter(prefersReducedMotion);
    initScrollAnimations(prefersReducedMotion);
    initCounterAnimation(prefersReducedMotion);
    initTimelineProgress(prefersReducedMotion);
    initCardTilt();
});

/* ========================================
   PARTICLE BACKGROUND
   Floating dots with connections
   ======================================== */
function initParticleBackground() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    const PARTICLE_COUNT = 60;
    const CONNECTION_DISTANCE = 120;

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONNECTION_DISTANCE) {
                    const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.15;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(232, 184, 75, ${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        // Draw particles
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(232, 184, 75, ${p.opacity})`;
            ctx.fill();
        });
    }

    function updateParticles() {
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        });
    }

    function animate() {
        updateParticles();
        drawParticles();
        animationId = requestAnimationFrame(animate);
    }

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });
}

/* ========================================
   CUSTOM CURSOR
   ======================================== */
function initCustomCursor() {
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = document.getElementById('cursor-dot');
    const outline = document.getElementById('cursor-outline');
    if (!dot || !outline) return;

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        outline.style.left = outlineX + 'px';
        outline.style.top = outlineY + 'px';

        requestAnimationFrame(animateOutline);
    }
    animateOutline();

    // Enlarge cursor on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .pill, .highlight-card, .teach-card, .research-card, .pub-item, .contact-card, .stat-chip, .timeline-card, .profile-photo');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            dot.style.transform = 'translate(-50%, -50%) scale(2)';
            outline.style.width = '60px';
            outline.style.height = '60px';
            outline.style.borderColor = 'rgba(232, 184, 75, 0.7)';
        });
        el.addEventListener('mouseleave', () => {
            dot.style.transform = 'translate(-50%, -50%) scale(1)';
            outline.style.width = '40px';
            outline.style.height = '40px';
            outline.style.borderColor = 'rgba(232, 184, 75, 0.4)';
        });
    });
}

/* ========================================
   SCROLL PROGRESS BAR
   ======================================== */
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

/* ========================================
   NAVBAR SCROLL EFFECT
   ======================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ========================================
   MOBILE MENU
   ======================================== */
function initMobileMenu() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        toggle.classList.toggle('active');
    });

    menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            toggle.classList.remove('active');
        });
    });
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ========================================
   TYPEWRITER EFFECT
   ======================================== */
function initTypewriter(prefersReducedMotion) {
    const el = document.getElementById('typewriter');
    if (!el) return;

    const words = [
        'Data Science',
        'Physics & Math',
        'Web Development',
        'Game Design',
        'Machine Learning'
    ];

    if (prefersReducedMotion) {
        el.textContent = words[0];
        return;
    }

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let pauseTimer = null;

    function type() {
        const currentWord = words[wordIndex];

        if (!isDeleting) {
            el.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentWord.length) {
                pauseTimer = setTimeout(() => {
                    isDeleting = true;
                    type();
                }, 2000);
                return;
            }
        } else {
            el.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }

        const speed = isDeleting ? 40 : 80;
        setTimeout(type, speed);
    }

    // Start after hero loads
    setTimeout(type, 1200);
}

/* ========================================
   GSAP SCROLL ANIMATIONS
   ======================================== */
function initScrollAnimations(prefersReducedMotion) {
    if (prefersReducedMotion) {
        document.querySelectorAll('.anim-item').forEach(item => {
            item.style.opacity = '1';
            item.style.transform = 'none';
        });
        return;
    }

    // Hero — immediate stagger
    const heroItems = document.querySelectorAll('.hero .anim-item');
    gsap.to(heroItems, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.3
    });

    // All other sections — scroll-triggered stagger
    const sections = ['.about', '.education', '.teaching', '.research', '.publications', '.contact'];

    sections.forEach(sectionSelector => {
        const items = document.querySelectorAll(`${sectionSelector} .anim-item`);

        items.forEach((item, index) => {
            gsap.to(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                },
                opacity: 1,
                y: 0,
                duration: 0.7,
                delay: index * 0.08,
                ease: 'power3.out'
            });
        });
    });

    // Research/Project cards — special spring effect
    document.querySelectorAll('.research-card').forEach((card, i) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.12,
            ease: 'back.out(1.4)'
        });
    });

    // Experience items — slide from left
    document.querySelectorAll('.pub-item').forEach((item, i) => {
        gsap.fromTo(item,
            { opacity: 0, x: -30 },
            {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                },
                opacity: 1,
                x: 0,
                duration: 0.7,
                delay: i * 0.1,
                ease: 'power3.out'
            }
        );
    });

    // Highlight cards — slide from right
    document.querySelectorAll('.highlight-card').forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, x: 40 },
            {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                },
                opacity: 1,
                x: 0,
                duration: 0.6,
                delay: i * 0.1,
                ease: 'power3.out'
            }
        );
    });

    // Skill cards — scale in
    document.querySelectorAll('.teach-card').forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, scale: 0.9, y: 20 },
            {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                },
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.6,
                delay: i * 0.12,
                ease: 'back.out(1.2)'
            }
        );
    });

    // Contact cards — stagger pop
    document.querySelectorAll('.contact-card').forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, y: 40, scale: 0.9 },
            {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                },
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                delay: i * 0.12,
                ease: 'back.out(1.4)'
            }
        );
    });
}

/* ========================================
   COUNTER ANIMATION
   ======================================== */
function initCounterAnimation(prefersReducedMotion) {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count, 10);
        if (!target) return;

        if (prefersReducedMotion) {
            counter.textContent = target;
            return;
        }

        ScrollTrigger.create({
            trigger: counter,
            start: 'top 90%',
            once: true,
            onEnter: () => {
                gsap.to(counter, {
                    innerText: target,
                    duration: 1.8,
                    snap: { innerText: 1 },
                    ease: 'power2.out',
                    onUpdate: function () {
                        counter.textContent = Math.round(parseFloat(counter.textContent));
                    }
                });
            }
        });
    });
}

/* ========================================
   TIMELINE PROGRESS
   ======================================== */
function initTimelineProgress(prefersReducedMotion) {
    const timeline = document.querySelector('.education-timeline');
    const progressLine = document.getElementById('timeline-progress');

    if (!timeline || !progressLine) return;

    if (prefersReducedMotion) {
        progressLine.style.height = '100%';
        return;
    }

    const dots = document.querySelectorAll('.timeline-dot');

    ScrollTrigger.create({
        trigger: timeline,
        start: 'top 70%',
        end: 'bottom 50%',
        scrub: 0.5,
        onUpdate: (self) => {
            const progress = self.progress;
            progressLine.style.height = `${progress * 100}%`;

            dots.forEach((dot, index) => {
                const threshold = (index + 1) / dots.length;
                if (progress >= threshold - 0.15) {
                    dot.style.background = '#e8b84b';
                    dot.style.boxShadow = '0 0 20px rgba(232, 184, 75, 0.5)';
                    dot.style.transform = 'scale(1.3)';
                } else {
                    dot.style.background = '#060614';
                    dot.style.boxShadow = 'none';
                    dot.style.transform = 'scale(1)';
                }
            });
        }
    });
}

/* ========================================
   3D CARD TILT
   ======================================== */
function initCardTilt() {
    if (window.matchMedia('(hover: none)').matches) return;

    const cards = document.querySelectorAll('.research-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xPct = (x / rect.width) - 0.5;
            const yPct = (y / rect.height) - 0.5;

            const rotateX = yPct * -10;
            const rotateY = xPct * 10;

            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                transformPerspective: 1200,
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.7,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
}
