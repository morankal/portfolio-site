// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });
    
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    });
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        if (menuToggle.classList.contains('active')) {
            menuToggle.querySelector('.bar:nth-child(1)').style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            menuToggle.querySelector('.bar:nth-child(2)').style.opacity = '0';
            menuToggle.querySelector('.bar:nth-child(3)').style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            menuToggle.querySelector('.bar:nth-child(1)').style.transform = 'none';
            menuToggle.querySelector('.bar:nth-child(2)').style.opacity = '1';
            menuToggle.querySelector('.bar:nth-child(3)').style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.querySelector('.bar:nth-child(1)').style.transform = 'none';
            menuToggle.querySelector('.bar:nth-child(2)').style.opacity = '1';
            menuToggle.querySelector('.bar:nth-child(3)').style.transform = 'none';
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Gallery Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    let currentImageIndex = 0;
    
    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const imgSrc = this.getAttribute('data-img');
            currentImageIndex = index;
            openLightbox(imgSrc);
        });
    });
    
    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Navigate through images
    lightboxPrev.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        const imgSrc = galleryItems[currentImageIndex].getAttribute('data-img');
        updateLightboxImage(imgSrc);
    });
    
    lightboxNext.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        const imgSrc = galleryItems[currentImageIndex].getAttribute('data-img');
        updateLightboxImage(imgSrc);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.style.display || lightbox.style.display === 'none') return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
            const imgSrc = galleryItems[currentImageIndex].getAttribute('data-img');
            updateLightboxImage(imgSrc);
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
            const imgSrc = galleryItems[currentImageIndex].getAttribute('data-img');
            updateLightboxImage(imgSrc);
        }
    });
    
    function openLightbox(imgSrc) {
        lightbox.style.display = 'flex';
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
        
        lightboxImage.src = imgSrc;
        setTimeout(() => {
            lightboxImage.style.opacity = '1';
        }, 100);
        
        // Disable body scroll
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.style.opacity = '0';
        lightboxImage.style.opacity = '0';
        
        setTimeout(() => {
            lightbox.style.display = 'none';
            // Re-enable body scroll
            document.body.style.overflow = '';
        }, 300);
    }
    
    function updateLightboxImage(imgSrc) {
        lightboxImage.style.opacity = '0';
        
        setTimeout(() => {
            lightboxImage.src = imgSrc;
            lightboxImage.style.opacity = '1';
        }, 300);
    }
    
    // Video fallback check
    const videoIframe = document.querySelector('.video-container iframe');
    if (videoIframe) {
        videoIframe.addEventListener('error', function() {
            document.querySelector('.video-fallback').style.display = 'block';
        });
    }
});
