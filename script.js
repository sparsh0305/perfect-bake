document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Hero section fade out on scroll
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const heroHeight = hero.offsetHeight;
            
            if (scrollPosition < heroHeight) {
                const opacity = 1 - (scrollPosition / (heroHeight / 1.5));
                heroContent.style.opacity = opacity > 0 ? opacity : 0;
                heroContent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
            }
        });
    }
    
    // Testimonials Slider
    const reviewsTrack = document.querySelector('.reviews-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const reviewCards = document.querySelectorAll('.review-card');
    
    if (reviewsTrack && prevBtn && nextBtn) {
        let currentIndex = 0;
        const cardWidth = reviewCards[0].offsetWidth + parseInt(getComputedStyle(reviewCards[0]).marginLeft) * 2;
        
        // Set initial position
        reviewsTrack.style.transform = `translateX(0)`;
        
        // Clone first card and append to end for infinite loop
        const firstCardClone = reviewCards[0].cloneNode(true);
        reviewsTrack.appendChild(firstCardClone);
        
        // Update slider position
        function updateSlider() {
            reviewsTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }
        
        // Next button click
        nextBtn.addEventListener('click', () => {
            currentIndex++;
            
            if (currentIndex >= reviewCards.length) {
                // Quick reset to first slide without animation
                setTimeout(() => {
                    reviewsTrack.style.transition = 'none';
                    currentIndex = 0;
                    updateSlider();
                    
                    // Re-enable transition after reset
                    setTimeout(() => {
                        reviewsTrack.style.transition = 'transform 0.5s ease';
                    }, 50);
                }, 500);
            }
            
            updateSlider();
        });
        
        // Previous button click
        prevBtn.addEventListener('click', () => {
            if (currentIndex <= 0) {
                // Quick jump to last slide without animation
                reviewsTrack.style.transition = 'none';
                currentIndex = reviewCards.length - 1;
                updateSlider();
                
                // Re-enable transition and go to second-to-last slide
                setTimeout(() => {
                    reviewsTrack.style.transition = 'transform 0.5s ease';
                    currentIndex--;
                    updateSlider();
                }, 50);
            } else {
                currentIndex--;
                updateSlider();
            }
        });
    }
    
    // Gallery Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        
                        // Add animation
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        
                        // Hide after animation completes
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Form submission
    const orderForm = document.getElementById('orderForm');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const orderDetails = document.getElementById('orderDetails').value;
            const date = document.getElementById('date').value;
            
            // Simple validation
            if (!name || !email || !phone || !orderDetails || !date) {
                alert('Please fill in all fields');
                return;
            }
            
            // Show success message
            alert('Thank you for your order! We will contact you shortly to confirm the details.');
            
            // Reset form
            orderForm.reset();
        });
    }
    
    // Scroll animation for sections
    const sections = document.querySelectorAll('section');
    
    // Add fade-in class to all sections
    sections.forEach(section => {
        if (!section.classList.contains('hero')) {
            section.classList.add('fade-in');
        }
    });
    
    // Intersection Observer for scroll animations
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);
    
    // Observe all sections with fade-in class
    document.querySelectorAll('.fade-in').forEach(section => {
        appearOnScroll.observe(section);
    });
});