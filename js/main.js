// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });

    // Contact Form Handling (using Formspree)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Formspree will handle the submission
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Re-enable after form submission
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    }

    // Smooth scroll for anchor links
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

    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // Scroll-reveal animations
    const revealEls = document.querySelectorAll('.reveal');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (revealEls.length) {
        if (prefersReducedMotion) {
            revealEls.forEach((el) => el.classList.add('is-visible'));
        } else {
            const groups = new Map();
            revealEls.forEach((el) => {
                const parent = el.parentElement;
                const index = groups.has(parent) ? groups.get(parent) : 0;
                el.style.setProperty('--i', index);
                groups.set(parent, index + 1);
            });

            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

            revealEls.forEach((el) => revealObserver.observe(el));
        }
    }

    // 3D tilt on hover for cards
    const tiltEls = document.querySelectorAll('.tilt');
    if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
        tiltEls.forEach((el) => {
            const maxTilt = 8;
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const px = (e.clientX - rect.left) / rect.width - 0.5;
                const py = (e.clientY - rect.top) / rect.height - 0.5;
                el.style.transform = `perspective(800px) rotateX(${(-py * maxTilt).toFixed(2)}deg) rotateY(${(px * maxTilt).toFixed(2)}deg) translateY(-4px)`;
            });
            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
            });
        });
    }

    // Magnetic pull on primary CTA buttons
    const magneticEls = document.querySelectorAll('.btn-primary, .btn-white');
    if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
        magneticEls.forEach((el) => {
            const strength = 0.25;
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const mx = (e.clientX - rect.left - rect.width / 2) * strength;
                const my = (e.clientY - rect.top - rect.height / 2) * strength;
                el.style.transform = `translate(${mx.toFixed(1)}px, ${my.toFixed(1)}px)`;
            });
            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
            });
        });
    }
});
