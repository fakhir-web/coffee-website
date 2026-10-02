document.addEventListener("DOMContentLoaded", () => {
    /* ==========================================================================
       Navigation State & Mobile Menu Toggle
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect for Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const toggleMenu = () => {
        const isActive = navMenu.classList.contains('active');
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        navbar.classList.toggle('mobile-active');
        hamburger.setAttribute('aria-expanded', !isActive);
        
        // Prevent body scrolling when menu is open
        document.body.style.overflow = isActive ? 'auto' : 'hidden';
    };

    hamburger.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && !navbar.contains(e.target)) {
            toggleMenu();
        }
    });


    /* ==========================================================================
       Scroll Reveal Animations with IntersectionObserver
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });


    /* ==========================================================================
       Contact Form Validation
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            const inputs = contactForm.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                const parentGroup = input.parentElement;
                
                // Check if field is empty
                if (!input.value.trim()) {
                    parentGroup.classList.add('invalid');
                    isValid = false;
                } 
                // Check email format if it's an email field
                else if (input.type === 'email' && !validateEmail(input.value)) {
                    parentGroup.classList.add('invalid');
                    isValid = false;
                } 
                // If valid, remove error state
                else {
                    parentGroup.classList.remove('invalid');
                }
                
                // Clear error visually when user starts typing again
                input.addEventListener('input', () => {
                    parentGroup.classList.remove('invalid');
                }, { once: true });
            });

            if (isValid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                // Simulate network request delay
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    contactForm.reset();
                    
                    formSuccess.classList.remove('hidden');
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formSuccess.classList.add('hidden');
                    }, 5000);
                }, 1500);
            }
        });
    }

    // Email validation helper
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});