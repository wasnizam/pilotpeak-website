// Premium Navigation Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scrolled');
        navbar.style.boxShadow = 'none';
    } else {
        navbar.classList.add('scrolled');
        navbar.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
    }
    
    lastScroll = currentScroll;
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });
        
        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
});

function showEnterpriseForm() {
    const wrapper = document.getElementById('enterprise-form-wrapper');
    const success = document.getElementById('enterprise-form-success');
    const teaser = document.getElementById('enterprise-form-teaser');
    if (wrapper) wrapper.classList.remove('is-hidden');
    if (success) success.classList.add('is-hidden');
    if (teaser) teaser.classList.add('is-hidden');
}

function showEnterpriseSuccess() {
    const wrapper = document.getElementById('enterprise-form-wrapper');
    const success = document.getElementById('enterprise-form-success');
    const teaser = document.getElementById('enterprise-form-teaser');
    if (wrapper) wrapper.classList.add('is-hidden');
    if (success) success.classList.remove('is-hidden');
    if (teaser) teaser.classList.add('is-hidden');
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            if (this.classList.contains('js-open-enterprise-form')) {
                setTimeout(() => showEnterpriseForm(), 400);
            }
        }
    });
});

document.querySelectorAll('.js-show-enterprise-form').forEach(btn => {
    btn.addEventListener('click', () => showEnterpriseForm());
});

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash === '#enterprise-demo-request') {
        showEnterpriseForm();
    }
});

// Show full disclaimer modal
function showFullDisclaimer() {
    const modal = document.getElementById('disclaimerModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        // Add fade-in animation
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }
}

// Close disclaimer modal
function closeDisclaimer() {
    const modal = document.getElementById('disclaimerModal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('disclaimerModal');
    if (event.target == modal) {
        closeDisclaimer();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeDisclaimer();
    }
});

// Premium Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100); // Stagger animation
        }
    });
}, observerOptions);

// Observe all cards and sections for premium animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.stat-card-premium, .solution-card, .enterprise-feature, .compliance-card-premium, ' +
        '.tech-card-premium, .testimonial-card, .hero-metric'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
    
    // Animate hero elements
    const heroElements = document.querySelectorAll(
        '.hero-eyebrow, .hero-badge, .hero-title, .hero-subtitle, .hero-trust-strip, .hero-metrics-pro, .hero-buttons, .hero-cta-note, .hero-visual'
    );
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
            el.style.transition = 'opacity 1s ease, transform 1s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Counter animation for stats (preserves suffixes like % on the final value)
function animateCounter(element, target, duration = 2000, suffix = '') {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const tick = (n) => (suffix ? String(Math.floor(n)) + suffix : formatNumber(Math.floor(n)));

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = suffix ? String(Math.floor(target)) + suffix : formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = tick(current);
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return Math.floor(num).toString();
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const value = entry.target.textContent.trim();
            // Slash text (e.g. "24/7") must not become one number when digits merge
            if (value.includes('/')) {
                return;
            }
            // Pure labels like "AI" — no counter
            if (!/\d/.test(value)) {
                return;
            }
            const suffix = value.includes('%') ? '%' : '';
            const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
            if (!isNaN(numericValue)) {
                animateCounter(entry.target, numericValue, 2000, suffix);
            }
        }
    });
}, { threshold: 0.5 });

// Observe stat values for counter animation
document.addEventListener('DOMContentLoaded', () => {
    const statValues = document.querySelectorAll('.stat-value-premium');
    statValues.forEach(stat => {
        counterObserver.observe(stat);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-background');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Premium loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.6s ease';
});

// Initial body opacity
document.body.style.opacity = '0';

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.solution-card, .enterprise-feature, .compliance-card-premium, .tech-card-premium');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
});

// Smooth reveal for sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });
});

// Enterprise demo request form (mailto fallback without backend)
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('enterprise-demo-form');
    const status = document.getElementById('enterprise-form-status');
    if (!form) return;
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = new FormData(form);
        const name = (data.get('name') || '').toString().trim();
        const email = (data.get('email') || '').toString().trim();
        const company = (data.get('company') || '').toString().trim();
        const fleet = (data.get('fleet') || '').toString().trim();
        const message = (data.get('message') || '').toString().trim();

        if (submitBtn) submitBtn.disabled = true;
        if (status) {
            status.textContent = 'Submitting request...';
        }

        try {
            const response = await fetch('/api/request-demo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    company,
                    fleet,
                    message
                })
            });

            const result = await response.json();
            if (!response.ok || !result.ok) {
                throw new Error(result.message || 'Failed to submit request');
            }

            form.reset();
            if (status) {
                status.textContent = '';
            }
            showEnterpriseSuccess();
        } catch (error) {
            if (status) {
                status.textContent = 'Unable to submit right now. Please try again in a moment.';
            }
        } finally {
            if (submitBtn) submitBtn.disabled = false;
        }
    });
});

// Modal animation
const modal = document.getElementById('disclaimerModal');
if (modal) {
    modal.style.transition = 'opacity 0.3s ease';
    modal.style.opacity = '0';
}

// Premium button ripple effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Trusted logos animation
document.addEventListener('DOMContentLoaded', () => {
    const logos = document.querySelectorAll('.trusted-logo');
    logos.forEach((logo, index) => {
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(20px)';
        setTimeout(() => {
            logo.style.transition = 'all 0.6s ease';
            logo.style.opacity = '0.6';
            logo.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handlers
const debouncedScroll = debounce(() => {
    // Scroll-based animations here
}, 10);

window.addEventListener('scroll', debouncedScroll);
