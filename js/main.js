/* ==========================================
   Main JavaScript — Portfolio v2.0
   Muhammad Reynal Fawwaz Abyasa
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTypingEffect();
    initScrollAnimations();
    initActiveNavigation();
    initCertifications();
    initCounterAnimation();
    initParticles();
});

/* ==========================================
   Particles (Hero Background)
   ========================================== */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const count = 40;

    for (let i = 0; i < count; i++) {
        const dot = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 6;
        const duration = Math.random() * 8 + 6;
        const opacity = Math.random() * 0.4 + 0.1;

        dot.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}%;
            top: ${y}%;
            border-radius: 50%;
            background: ${Math.random() > 0.5 ? 'rgba(16, 185, 129,' : 'rgba(99, 102, 241,'} ${opacity});
            animation: particleFloat ${duration}s ease-in-out ${delay}s infinite;
        `;
        container.appendChild(dot);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
            33% { transform: translateY(-20px) scale(1.2); opacity: 0.7; }
            66% { transform: translateY(10px) scale(0.8); opacity: 0.2; }
        }
    `;
    document.head.appendChild(style);
}

/* ==========================================
   Counter Animation (Stats Bar)
   ========================================== */
function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    let animated = false;

    function animateCounters() {
        if (animated) return;

        const statsBar = document.querySelector('.stats-bar');
        if (!statsBar) return;

        const rect = statsBar.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            animated = true;

            statNumbers.forEach(el => {
                const target = parseInt(el.getAttribute('data-count'));
                const suffix = el.getAttribute('data-suffix') || '';
                const duration = 1800;
                const steps = 60;
                const increment = target / steps;
                let current = 0;
                let step = 0;

                // Easing function (ease-out cubic)
                const easeOut = (t) => 1 - Math.pow(1 - t, 3);

                const timer = setInterval(() => {
                    step++;
                    const progress = easeOut(step / steps);
                    current = Math.round(target * progress);

                    if (step >= steps) {
                        clearInterval(timer);
                        current = target;
                    }

                    el.textContent = current + suffix;
                }, duration / steps);
            });
        }
    }

    window.addEventListener('scroll', animateCounters, { passive: true });
    // Also try on load in case already in view
    setTimeout(animateCounters, 500);
}

/* ==========================================
   Certifications
   ========================================== */
function initCertifications() {
    const filters = document.querySelectorAll('.cert-filter');
    const cards = document.querySelectorAll('.cert-card');

    // Filter functionality
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            filters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');

            const category = filter.getAttribute('data-filter');

            cards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    requestAnimationFrame(() => {
                        card.style.opacity = '1';
                        card.style.transform = '';
                    });
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.85)';
                    setTimeout(() => {
                        if (card.getAttribute('data-category') !== category && filter.getAttribute('data-filter') !== 'all') {
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    });

    // Modal Logic
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('certModalImg');
    const modalCaption = document.getElementById('certModalCaption');
    const closeBtn = document.getElementById('certModalClose');

    if (!modal) return;

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('img');
            if (!img) return;

            const title = card.querySelector('.cert-title')?.textContent || '';
            const issuer = card.querySelector('.cert-issuer')?.textContent || '';

            modal.style.display = 'flex';
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            modalCaption.textContent = `${title} — ${issuer}`;
            document.body.style.overflow = 'hidden';

            // Add keyboard trap
            modal.focus?.();
        });
    });

    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
    });
}

/* ==========================================
   Navigation
   ========================================== */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    const handleScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.querySelector('i').className = 'fas fa-bars';
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.querySelector('i').className = 'fas fa-bars';
        }
    });
}

/* ==========================================
   Typing Effect
   ========================================== */
function initTypingEffect() {
    const el = document.getElementById('typed-text');
    if (!el) return;

    const titles = [
        'IT Engineer',
        'SQL Server Specialist',
        'Fullstack Developer',
        'DevOps Engineer',
        'Quality Assurance',
        'Laravel Developer',
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let speed = 100;

    function type() {
        const current = titles[titleIndex];

        if (isDeleting) {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            speed = 45;
        } else {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            speed = 100;
        }

        if (!isDeleting && charIndex === current.length) {
            speed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            speed = 500;
        }

        setTimeout(type, speed);
    }

    type();
}

/* ==========================================
   Scroll Animations (Intersection Observer)
   ========================================== */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Unobserve after animation to save performance
                // Keep observing stat-items for potential re-trigger
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    });

    const targets = document.querySelectorAll(
        '.info-card, .timeline-item, .project-card, .skills-category, .education-card, .contact-card, .stat-item'
    );

    targets.forEach(el => {
        el.classList.add('animate-element');
        observer.observe(el);
    });
}

/* ==========================================
   Active Navigation on Scroll
   ========================================== */
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const setActive = () => {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', setActive, { passive: true });
    setActive();
}

/* ==========================================
   Smooth Scroll for Anchor Links
   ========================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ==========================================
   Toggle Project Documentation
   ========================================== */
function toggleDocs(docsId) {
    const panel = document.getElementById(docsId);
    if (!panel) return;

    // Close other panels
    document.querySelectorAll('.project-docs').forEach(p => {
        if (p.id !== docsId) p.classList.remove('active');
    });

    panel.classList.toggle('active');

    if (panel.classList.contains('active')) {
        setTimeout(() => {
            panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
}
