// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initContactForm();
    initScrollAnimations();
    initTypeWriter();
    initParallaxEffect();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Active navigation highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Smooth scrolling for hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');
    const modalMessage = document.getElementById('modalMessage');

    // Initialize EmailJS with error handling
    try {
        emailjs.init("V5F07DjM2XIug70Hk"); // Your EmailJS public key
    } catch (error) {
        console.error('EmailJS initialization failed:', error);
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Check if EmailJS is available
            if (typeof emailjs === 'undefined') {
                showModal('error', 'Email service is not available. Please contact me directly at jainnirdesh1@gmail.com');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('.btn-primary');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Prepare template parameters
            const templateParams = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                to_name: 'Nirdesh Jain'
            };

            // Send email using EmailJS
            emailjs.send('service_60cjdut', 'template_s3u0bor', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showModal('success', 'Message sent successfully! Thank you for reaching out. I\'ll get back to you soon.');
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.log('FAILED...', error);
                    let errorMessage = 'Failed to send message. ';
                    
                    if (error.status === 400) {
                        errorMessage += 'Please check your email address format.';
                    } else if (error.status === 403) {
                        errorMessage += 'Service temporarily unavailable.';
                    } else if (error.status === 404) {
                        errorMessage += 'Service configuration error.';
                    } else {
                        errorMessage += 'Please try again or contact me directly at jainnirdesh1@gmail.com';
                    }
                    
                    showModal('error', errorMessage + '<br><br><button onclick="window.open(\'' + createMailtoLink() + '\')" class="btn-primary" style="margin-top: 10px;">Open Email Client</button>');
                })
                .finally(function() {
                    // Reset button state
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        }
    });

    // Add fallback method for direct email
    function createMailtoLink() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        const mailtoLink = `mailto:jainnirdesh1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} <${email}>\n\n${message}`)}`;
        
        return mailtoLink;
    }

    // Close modal functionality
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        let isValid = true;

        // Clear previous error messages
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });

        // Name validation
        if (name === '') {
            showError('nameError', 'Name is required');
            isValid = false;
        } else if (name.length < 2) {
            showError('nameError', 'Name must be at least 2 characters long');
            isValid = false;
        }

        // Email validation
        if (email === '') {
            showError('emailError', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }

        // Subject validation
        if (subject === '') {
            showError('subjectError', 'Subject is required');
            isValid = false;
        } else if (subject.length < 5) {
            showError('subjectError', 'Subject must be at least 5 characters long');
            isValid = false;
        }

        // Message validation
        if (message === '') {
            showError('messageError', 'Message is required');
            isValid = false;
        } else if (message.length < 10) {
            showError('messageError', 'Message must be at least 10 characters long');
            isValid = false;
        }

        return isValid;
    }

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showModal(type, message) {
        modal.style.display = 'block';
        modalMessage.innerHTML = `
            <div class="modal-${type}">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
                <h3>${type === 'success' ? 'Success!' : 'Error!'}</h3>
                <p>${message}</p>
            </div>
        `;
    }
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.project-card, .stat-item, .skill-item, .education-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll', 'visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

// Typewriter effect for hero section
function initTypeWriter() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    
    let index = 0;
    const speed = 50;
    
    function typeWriter() {
        if (index < text.length) {
            heroSubtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, speed);
        } else {
            // Add blinking cursor effect
            heroSubtitle.innerHTML += '<span class="cursor">|</span>';
        }
    }
    
    // Start typewriter effect after a delay
    setTimeout(typeWriter, 1000);
}

// Parallax effect for hero section
function initParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-image, .image-overlay');
        
        parallaxElements.forEach(element => {
            const speed = 0.3;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Project card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Skills animation on scroll
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Stats counter animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-item h3');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let count = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                stat.textContent = target + '+';
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(count) + '+';
            }
        }, 50);
    });
}

// Intersection Observer for stats animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add smooth reveal animation for sections
function revealOnScroll() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionVisible = 150;
        
        if (sectionTop < window.innerHeight - sectionVisible) {
            section.classList.add('reveal');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Initialize reveal on page load
revealOnScroll();

// Add custom cursor effect
document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

// Theme toggle functionality (optional)
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });
    }
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Initialize theme toggle
initThemeToggle();

// Add scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #2563eb, #8b5cf6);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
initScrollProgress();

// Add back to top button
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.transform = 'translateY(0)';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.transform = 'translateY(100px)';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top
initBackToTop();

// Add CSS for additional animations
const additionalCSS = `
    .reveal {
        opacity: 1;
        transform: translateY(0);
    }
    
    .modal-success {
        text-align: center;
        color: #059669;
    }
    
    .modal-success i {
        font-size: 3rem;
        margin-bottom: 1rem;
    }
    
    .modal-error {
        text-align: center;
        color: #dc2626;
    }
    
    .modal-error i {
        font-size: 3rem;
        margin-bottom: 1rem;
    }
    
    .cursor {
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .back-to-top:hover {
        background: #1d4ed8;
        transform: translateY(-2px);
    }
    
    .loaded {
        opacity: 1;
    }
`;

// Add the additional CSS to the page
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);
