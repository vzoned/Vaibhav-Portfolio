// 1. Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// 2. Cinematic Intro Animation
window.addEventListener('load', () => {
    const isMobile = window.innerWidth <= 991;

    // Image: Pan Left (Desktop) or Pan Up (Mobile)
    gsap.to(".hero-img-full", { 
        filter: "blur(0px) grayscale(0%)", 
        x: 0, 
        y: 0, 
        duration: 1.2, 
        ease: "power2.out" 
    });

    // Text: Slide In
    gsap.from(".tall-heading", { 
        opacity: 0, 
        y: isMobile ? -30 : 0, 
        x: isMobile ? 0 : -100, 
        duration: 1.5, 
        ease: "expo.out" 
    });
});

// 3. Navbar Scroll Logic (Hide/Show)
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Hide if scrolling down & passed 100px
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.classList.add('navbar-hidden');
    } else {
        navbar.classList.remove('navbar-hidden');
    }
    lastScrollY = currentScrollY;
}, { passive: true });

// 4. Premium Mouse Glow Effect
const glowText = document.querySelector('.dynamic-glow');
window.addEventListener('mousemove', (e) => {
    // Calculate distance from center
    const x = (e.clientX - window.innerWidth / 2) / 30;
    const y = (e.clientY - window.innerHeight / 2) / 30;
    
    // Apply subtle shadow movement
    glowText.style.textShadow = `${x}px ${y}px 45px rgba(255, 255, 255, 0.45)`;
});

// 5. Section Fade-Ins (ScrollTrigger)
gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
        opacity: 0, 
        y: 60, 
        duration: 1.5, 
        ease: "power3.out",
        scrollTrigger: { 
            trigger: section, 
            start: "top 85%", 
            toggleActions: "play none none reverse" 
        }
    });
});
