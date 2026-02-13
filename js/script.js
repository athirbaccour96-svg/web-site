document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. THEME TOGGLE
       ========================================= */
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check local storage for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');

        // Save preference
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });

    /* =========================================
       2. MOBILE NAVIGATION
       ========================================= */
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
        });
    });

    /* =========================================
       3. SCROLL ANIMATIONS (Intersection Observer)
       ========================================= */

    // Elements to animate
    const animateElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        observer.observe(el);
    });

    /* =========================================
       4. SMOOTH SCROLL OFFSET (Optional Polish)
       ========================================= */

    // If CSS scroll-behavior: smooth isn't enough (e.g. for fixed header offset), 
    // we can add manual handling here, but standard anchor offset using CSS 
    // scroll-margin-top is cleaner. 
    // Adding scroll-margin to sections via CSS is better practice.

    // Let's add scroll-margin-top to sections dynamically or just in CSS.
    // I'll add a style rule here to ensure it works perfectly.
    // Style injection for scroll margin
    const style = document.createElement('style');
    style.innerHTML = `
        section { scroll-margin-top: 80px; }
    `;
    document.head.appendChild(style);

    /* =========================================
       5. CONTACT FORM SUBMISSION (NEON DB)
       ========================================= */
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;

            // Show loading state
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);
            // Convert FormData to JSON object
            const data = {};
            formData.forEach((value, key) => data[key] = value);

            try {
                // Initialize Supabase (REPLACE THESE WITH YOUR ACTUAL KEYS FROM SUPABASE DASHBOARD)
                const SUPABASE_URL = 'https://YOUR_PROJECT_URL.supabase.co';
                const SUPABASE_KEY = 'YOUR_ANON_KEY';
                const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

                // Insert data into 'messages' table
                const { error } = await client
                    .from('messages')
                    .insert([
                        {
                            name: data.name,
                            email: data.email,
                            message: data.message,
                            created_at: new Date().toISOString()
                        }
                    ]);

                if (error) throw error;

                alert('Message sent and saved to database successfully!');
                contactForm.reset();

            } catch (error) {
                console.error('Supabase error:', error);
                alert('Error sending message: ' + (error.message || 'Unknown error'));
            } finally {
                // Restore button state
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

});
