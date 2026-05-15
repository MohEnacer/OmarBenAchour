document.addEventListener("DOMContentLoaded", () => {
    // Set current year in footer dynamically
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Product Sliders Logic
    const sliders = document.querySelectorAll('.slider-container');
    
    sliders.forEach(slider => {
        const images = slider.querySelectorAll('.slider-images img');
        const dots = slider.querySelectorAll('.slider-dot');
        const prevBtn = slider.querySelector('.slider-btn.prev');
        const nextBtn = slider.querySelector('.slider-btn.next');
        
        let currentIndex = 0;
        const totalImages = images.length;
        
        if (totalImages === 0) return;

        function updateSlider(index) {
            images.forEach(img => img.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            images[index].classList.add('active');
            if (dots[index]) {
                dots[index].classList.add('active');
            }
        }
        
        function nextImage() {
            currentIndex = (currentIndex + 1) % totalImages;
            updateSlider(currentIndex);
        }
        
        function prevImage() {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateSlider(currentIndex);
        }
        
        nextBtn?.addEventListener('click', nextImage);
        prevBtn?.addEventListener('click', prevImage);
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider(currentIndex);
            });
        });
    });

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    // Open lightbox on image click
    const allSliderImages = document.querySelectorAll('.slider-images img');
    allSliderImages.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('show');
        document.body.style.overflow = ''; // Restore background scrolling
        setTimeout(() => {
            lightboxImg.src = '';
            lightboxImg.alt = '';
        }, 200); // Clear content after fade transition
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Close lightbox when clicking outside the image
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Close lightbox on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('show')) {
            closeLightbox();
        }
    });
});
