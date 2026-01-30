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

// --- 6. Editorial Z-Axis & Parallax Animation ---
// Note: Ensure GSAP ScrollTrigger is registered

const editorialSection = document.querySelector('.editorial-section');
const collageWrapper = document.querySelector('.collage-wrapper3d');

if (editorialSection && collageWrapper) {
    // 1. The Main Z-Axis Zoom Entry
    gsap.fromTo(collageWrapper, 
        { 
            scale: 0.5,       // Start small (looks far away)
            opacity: 0,       // Start invisible
            z: -500,          // Start pushed back in Z-space
            rotationX: 20     // Slight tilt for 3D effect
        },
        {
            scale: 1,
            opacity: 1,
            z: 0,
            rotationX: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: editorialSection,
                start: "top 75%",    // Starts animation when section hits viewport
                end: "center center",
                scrub: 1,            // Smooth scrubbing (reverses on scroll up)
                toggleActions: "play reverse play reverse"
            }
        }
    );

    // 2. Parallax Effect (Elements moving at different speeds)
    // Moves the video cards slightly differently than the main subject
    gsap.to(".video-card", {
        y: -50, // Moves up slightly as you scroll down
        ease: "none",
        scrollTrigger: {
            trigger: editorialSection,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    gsap.to(".main-subject-3d", {
        y: 20, // Moves down slightly (opposing motion creates depth)
        ease: "none",
        scrollTrigger: {
            trigger: editorialSection,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
}

/* =====================
   EXPERIENCE COUNTER
===================== */

(function () {
    const startDate = new Date("2022-11-22"); // your career start
    const now = new Date();

    const months =
        (now.getFullYear() - startDate.getFullYear()) * 12 +
        (now.getMonth() - startDate.getMonth());

    const el = document.getElementById("exp-counter");
    if (el) el.innerText = months;
})();

/* =====================
   MAGNETIC BUTTON
===================== */

document.querySelectorAll(".magnetic-btn").forEach(btn => {

    btn.addEventListener("mousemove", e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width/2;
        const y = e.clientY - rect.top - rect.height/2;

        btn.style.transform = `translate(${x*0.25}px, ${y*0.25}px)`;
    });

    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0,0)";
    });

});
