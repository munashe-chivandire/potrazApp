// ==========================================
// POTRAZ LANDING PAGE ANIMATIONS
// ==========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // LOADER ANIMATION
    // ==========================================
    const loader = document.querySelector('.loaderWrapper');
    const circleLoader = document.querySelector('.circleLoader');
    const bentoCards = document.querySelectorAll('.bentoCard');
    const header = document.querySelector('.landingHeader');

    // Set initial hidden state for content (prevents double animation)
    gsap.set(header, { opacity: 0, y: -50 });
    gsap.set(bentoCards, { opacity: 0, y: 60 });

    // Spinning loader animation
    gsap.to(circleLoader, {
        rotation: 360,
        duration: 1,
        repeat: -1,
        ease: "linear"
    });

    // Hide loader and animate content after a delay
    gsap.to(loader, {
        opacity: 0,
        duration: 0.5,
        delay: 1.5,
        onComplete: function() {
            loader.style.display = 'none';

            // Animate header entrance
            gsap.to(header, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out"
            });

            // Animate bento cards with stagger
            gsap.to(bentoCards, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: {
                    amount: 0.6,
                    from: "start",
                    ease: "power2.out"
                },
                ease: "power3.out",
                delay: 0.2
            });
        }
    });

    // ==========================================
    // USER DROPDOWN TOGGLE
    // ==========================================
    const userAvatarBtn = document.querySelector('.userAvatarBtn');
    const userDropdown = document.querySelector('.userDropdown');

    if (userAvatarBtn && userDropdown) {
        userAvatarBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('open');
            userAvatarBtn.classList.toggle('open');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!userAvatarBtn.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('open');
                userAvatarBtn.classList.remove('open');
            }
        });
    }

});
