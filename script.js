// Create Particles/Stars Background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 150;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 2 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Typing Animation for About Section
function typeWriter() {
    const typedTextElement = document.querySelector('.typed-text');
    if (!typedTextElement) return;
    
    const texts = [
        "Hello, I'm a Creative Developer...",
        "I build amazing web experiences...",
        "Passionate about clean code...",
        "Chess enthusiast & problem solver..."
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    type();
}

// Animated Counter for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Floating Code Animation
function createFloatingCode() {
    const floatingCodeElements = document.querySelectorAll('.floating-code');
    const codeSnippets = [
        "const developer = { skills: ['React', 'Node.js'] };",
        "function create() { return 'amazing'; }",
        "while(learning) { grow(); }",
        "<div className='awesome'>Code</div>",
        "export default Passion;"
    ];
    
    floatingCodeElements.forEach((element, index) => {
        element.textContent = codeSnippets[index];
    });
}

// 3D MacBook with Three.js
class MacBook3D {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.macbookModel = null;
        this.isOpen = false;
        this.targetRotation = { x: -75, y: 0 }; // Start at -75 degrees
        this.currentRotation = { x: -75, y: 0 };
        this.init();
    }

    init() {
        console.log("Initializing 3D MacBook...");
        this.setupScene();
        this.loadModel();
        this.animate();
    }

    setupScene() {
        const container = document.getElementById('macbook-canvas');
        if (!container) return;

        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a0a);

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            45,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 5, 15);
        this.camera.lookAt(0, 0, 0);

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(this.renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.near = 0.1;
        directionalLight.shadow.camera.far = 50;
        directionalLight.shadow.camera.left = -10;
        directionalLight.shadow.camera.right = 10;
        directionalLight.shadow.camera.top = 10;
        directionalLight.shadow.camera.bottom = -10;
        this.scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0x8b5cf6, 0.5, 100);
        pointLight.position.set(0, 5, 5);
        this.scene.add(pointLight);

        // Handle resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    loadModel() {
        console.log("Starting to load 3D model...");
        
        // Check if GLTFLoader is available
        if (typeof THREE.GLTFLoader === 'undefined') {
            console.error("GLTFLoader not found!");
            const loadingIndicator = document.querySelector('.loading-indicator');
            if (loadingIndicator) {
                loadingIndicator.innerHTML = '<p>Error: GLTFLoader not loaded</p>';
            }
            return;
        }
        
        const loader = new THREE.GLTFLoader();
        
        loader.load(
            'macbook_pro_m3_16_inch_2024.glb',
            (gltf) => {
                console.log("MacBook model loaded successfully", gltf);
                this.macbookModel = gltf.scene;
                
                // Find the main MacBook mesh and adjust positioning
                let macbookMesh = null;
                this.macbookModel.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        if (!macbookMesh) {
                            macbookMesh = child;
                        }
                    }
                });
                
                // Position and scale the model properly
                this.macbookModel.position.set(0, -2, 0); // Lower the position
                this.macbookModel.scale.set(0.5, 0.5, 0.5); // Smaller scale
                
                // Apply initial rotation (closed state - more dramatic)
                this.macbookModel.rotation.x = THREE.MathUtils.degToRad(-75);
                this.macbookModel.rotation.z = THREE.MathUtils.degToRad(0);
                
                // Center the model
                const box = new THREE.Box3().setFromObject(this.macbookModel);
                const center = box.getCenter(new THREE.Vector3());
                this.macbookModel.position.sub(center);
                
                this.scene.add(this.macbookModel);
                
                // Adjust camera to get better view
                this.camera.position.set(0, 2, 8);
                this.camera.lookAt(0, 0, 0);
                
                // Hide loading indicator
                const loadingIndicator = document.querySelector('.loading-indicator');
                if (loadingIndicator) {
                    loadingIndicator.style.display = 'none';
                }
                
                console.log("3D MacBook setup complete!");
                console.log("Model position:", this.macbookModel.position);
                console.log("Model rotation:", this.macbookModel.rotation);
            },
            (progress) => {
                const percent = (progress.loaded / progress.total * 100).toFixed(1);
                console.log("Loading progress:", percent + '%');
                const loadingIndicator = document.querySelector('.loading-indicator p');
                if (loadingIndicator) {
                    loadingIndicator.textContent = `Loading MacBook... ${percent}%`;
                }
            },
            (error) => {
                console.error("Error loading MacBook model:", error);
                const loadingIndicator = document.querySelector('.loading-indicator');
                if (loadingIndicator) {
                    loadingIndicator.innerHTML = '<p>Error loading 3D model</p><p>Check console for details</p>';
                }
            }
        );
    }

    open() {
        if (!this.macbookModel || this.isOpen) return;
        
        console.log("Opening MacBook 3D model");
        this.isOpen = true;
        this.targetRotation.x = 0; // Fully open (flat)
        
        // Show content overlay
        const overlay = document.querySelector('.screen-content-overlay');
        if (overlay) {
            setTimeout(() => {
                overlay.classList.add('visible');
            }, 800);
        }
    }

    close() {
        if (!this.macbookModel || !this.isOpen) return;
        
        console.log("Closing MacBook 3D model");
        this.isOpen = false;
        this.targetRotation.x = -75; // Closed angle
        
        // Hide content overlay
        const overlay = document.querySelector('.screen-content-overlay');
        if (overlay) {
            overlay.classList.remove('visible');
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (this.macbookModel) {
            // Smooth rotation animation
            this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.1;
            this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.1;
            
            this.macbookModel.rotation.x = THREE.MathUtils.degToRad(this.currentRotation.x);
            this.macbookModel.rotation.y = THREE.MathUtils.degToRad(this.currentRotation.y);
            
            // Add subtle rotation when open
            if (this.isOpen) {
                this.targetRotation.y = Math.sin(Date.now() * 0.0005) * 2;
            } else {
                this.targetRotation.y = 0;
            }
        }
        
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    onWindowResize() {
        const container = document.getElementById('macbook-canvas');
        if (!container || !this.camera || !this.renderer) return;
        
        this.camera.aspect = container.clientWidth / container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(container.clientWidth, container.clientHeight);
    }
}

// GSAP MacBook 3D Animations
function setupMacbookAnimations() {
    console.log("Setting up 3D MacBook animations...");
    
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.error("Three.js not loaded!");
        setupFallbackMacBook();
        return;
    }
    
    const macbook3D = new MacBook3D();
    
    // Add timeout fallback for model loading
    setTimeout(() => {
        if (!macbook3D.macbookModel) {
            console.warn("3D model not loaded after 10 seconds, showing fallback");
            setupFallbackMacBook();
        }
    }, 10000);
    
    // Create ScrollTrigger for MacBook animations
    ScrollTrigger.create({
        trigger: "#about",
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => {
            console.log("Entering about section - opening 3D MacBook");
            if (macbook3D.macbookModel) {
                macbook3D.open();
            } else {
                openFallbackMacBook();
            }
            animateContent();
        },
        onLeave: () => {
            console.log("Leaving about section - closing 3D MacBook");
            if (macbook3D.macbookModel) {
                macbook3D.close();
            } else {
                closeFallbackMacBook();
            }
        },
        onEnterBack: () => {
            console.log("Re-entering about section - re-opening 3D MacBook");
            if (macbook3D.macbookModel) {
                macbook3D.open();
            } else {
                openFallbackMacBook();
            }
            animateContent();
        },
        onLeaveBack: () => {
            console.log("Re-leaving about section - re-closing 3D MacBook");
            if (macbook3D.macbookModel) {
                macbook3D.close();
            } else {
                closeFallbackMacBook();
            }
        }
    });

    console.log("3D MacBook ScrollTrigger created successfully");
}

// Fallback 2D MacBook
function setupFallbackMacBook() {
    console.log("Setting up fallback 2D MacBook");
    
    const container = document.getElementById('macbook-canvas');
    if (!container) {
        console.error("macbook-canvas container not found!");
        return;
    }
    
    console.log("Container found:", container);
    
    // Hide loading indicator
    const loadingIndicator = document.querySelector('.loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
    
    // Create fallback MacBook HTML
    container.innerHTML = `
        <div class="macbook-fallback">
            <div class="macbook-screen-fallback">
                <div class="screen-bezel"></div>
                <div class="webcam-indicator"></div>
            </div>
            <div class="macbook-base-fallback">
                <div class="keyboard-area"></div>
                <div class="trackpad-area"></div>
            </div>
        </div>
    `;
    
    console.log("Fallback HTML added to container");
    
    // Add CSS for fallback
    const style = document.createElement('style');
    style.textContent = `
        .macbook-fallback {
            position: relative;
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
            transform: rotateX(-85deg) scale(0.8);
            transition: transform 1.5s cubic-bezier(0.4, 0, 0.2, 1);
            background: linear-gradient(45deg, #2a2a2a, #1a1a1a);
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        
        .macbook-fallback.open {
            transform: rotateX(0deg) scale(1);
        }
        
        .macbook-screen-fallback {
            width: 90%;
            height: 75%;
            background: #000;
            border: 4px solid #2a2a2a;
            border-radius: 15px 15px 0 0;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            box-shadow: 0 0 50px rgba(139, 92, 246, 0.3);
            overflow: hidden;
        }
        
        .screen-bezel {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 40px;
            background: linear-gradient(to bottom, #3a3a3a, #1a1a1a);
            border-radius: 15px 15px 0 0;
        }
        
        .webcam-indicator {
            position: absolute;
            top: 15px;
            right: 15px;
            width: 6px;
            height: 6px;
            background: #8b5cf6;
            border-radius: 50%;
            box-shadow: 0 0 10px #8b5cf6;
        }
        
        .macbook-base-fallback {
            width: 95%;
            height: 25px;
            background: linear-gradient(to bottom, #2a2a2a, #1a1a1a);
            border: 4px solid #2a2a2a;
            border-top: none;
            border-radius: 0 0 25px 25px;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
        }
        
        .keyboard-area {
            position: absolute;
            top: 5px;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            height: 8px;
            background: repeating-linear-gradient(
                to right,
                #333,
                #333 8px,
                #444 8px,
                #444 10px
            );
            border-radius: 2px;
            opacity: 0.7;
        }
        
        .trackpad-area {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 120px;
            height: 80px;
            background: linear-gradient(135deg, #4a4a4a, #3a3a3a);
            border: 2px solid #555;
            border-radius: 10px;
        }
    `;
    document.head.appendChild(style);
    
    // Store reference for animations
    window.fallbackMacBook = container.querySelector('.macbook-fallback');
    
    console.log("Fallback MacBook created:", window.fallbackMacBook);
    
    // Test immediate open
    setTimeout(() => {
        console.log("Testing open animation");
        if (window.fallbackMacBook) {
            window.fallbackMacBook.classList.add('open');
        }
    }, 2000);
}

function openFallbackMacBook() {
    if (window.fallbackMacBook) {
        window.fallbackMacBook.classList.add('open');
    }
}

function closeFallbackMacBook() {
    if (window.fallbackMacBook) {
        window.fallbackMacBook.classList.remove('open');
    }
}

// Animate content inside MacBook
function animateContent() {
    console.log("Animating content inside MacBook...");
    
    const cards = document.querySelectorAll('.about-card');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const statCircles = document.querySelectorAll('.stat-circle');

    console.log("Found elements:", { cards: cards.length, timelineItems: timelineItems.length, statCircles: statCircles.length });

    // Animate typing intro
    const typingIntro = document.querySelector('.typing-intro');
    if (typingIntro) {
        gsap.fromTo(typingIntro,
            {
                y: -30,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                delay: 0.3
            }
        );
    }

    // Animate cards
    if (cards.length > 0) {
        gsap.fromTo(cards, 
            {
                y: 50,
                opacity: 0,
                scale: 0.8
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.7)",
                delay: 0.5
            }
        );
    }

    // Animate timeline items
    if (timelineItems.length > 0) {
        gsap.fromTo(timelineItems,
            {
                x: -50,
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.15,
                ease: "power2.out",
                delay: 0.8
            }
        );
    }

    // Animate stat circles
    if (statCircles.length > 0) {
        gsap.fromTo(statCircles,
            {
                scale: 0,
                rotation: -180
            },
            {
                scale: 1,
                rotation: 0,
                duration: 1,
                stagger: 0.1,
                ease: "elastic.out(1, 0.5)",
                delay: 1.2
            }
        );
    }

    console.log("Content animation setup complete");
}

// Intersection Observer for Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('about-stats-unique')) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);
    
    const statsSection = document.querySelector('.about-stats-unique');
    
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// Avatar Integration Functions
function loadImageAvatar(imagePath) {
    const avatarImage = document.getElementById('avatar-image');
    const placeholder = document.getElementById('avatar-placeholder');
    
    if (avatarImage && placeholder) {
        avatarImage.src = imagePath;
        avatarImage.onload = () => {
            avatarImage.style.display = 'block';
            placeholder.style.display = 'none';
        };
        avatarImage.onerror = () => {
            console.error('Failed to load avatar image');
        };
    }
}

function loadLottieAvatar(lottieUrl, containerId = 'lottie-avatar') {
    // Load Lottie library if not already loaded
    if (typeof lottie === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js';
        script.onload = () => {
            initializeLottie(lottieUrl, containerId);
        };
        document.head.appendChild(script);
    } else {
        initializeLottie(lottieUrl, containerId);
    }
}

function initializeLottie(lottieUrl, containerId) {
    const container = document.getElementById(containerId);
    const placeholder = document.getElementById('avatar-placeholder');
    
    if (container && placeholder) {
        container.style.display = 'block';
        placeholder.style.display = 'none';
        
        lottie.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: lottieUrl
        });
    }
}

function load3DAvatar(modelUrl) {
    // Load model-viewer library if not already loaded
    if (typeof modelViewer === 'undefined') {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js';
        script.onload = () => {
            initialize3DAvatar(modelUrl);
        };
        document.head.appendChild(script);
    } else {
        initialize3DAvatar(modelUrl);
    }
}

function initialize3DAvatar(modelUrl) {
    const avatar3d = document.getElementById('avatar-3d');
    const placeholder = document.getElementById('avatar-placeholder');
    
    if (avatar3d && placeholder) {
        avatar3d.src = modelUrl;
        avatar3d.style.display = 'block';
        placeholder.style.display = 'none';
    }
}

function loadSVGAvatar(svgContent) {
    const avatarSvg = document.getElementById('avatar-svg');
    const placeholder = document.getElementById('avatar-placeholder');
    
    if (avatarSvg && placeholder) {
        avatarSvg.innerHTML = svgContent;
        avatarSvg.style.display = 'block';
        placeholder.style.display = 'none';
    }
}

// Initialize particles on page load
window.addEventListener('load', () => {
    console.log("Page loaded, initializing animations...");
    
    createParticles();
    typeWriter();
    createFloatingCode();
    setupScrollAnimations();
    
    // Immediate test - add fallback right away
    console.log("Immediately setting up fallback MacBook for testing");
    setupFallbackMacBook();
    
    // Wait a bit for DOM to be ready, then setup GSAP
    setTimeout(() => {
        console.log("Setting up GSAP animations...");
        setupMacbookAnimations();
    }, 100);
});

// Also setup on DOM content loaded as backup
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM content loaded");
    // Test fallback immediately
    setTimeout(() => {
        if (!window.fallbackMacBook) {
            console.log("No fallback found, creating it now");
            setupFallbackMacBook();
        }
    }, 1000);
});

// Example: Uncomment and configure one of these based on your avatar type
// window.addEventListener('load', () => {
//     // Option 1: Image/GIF Avatar
//     loadImageAvatar('path/to/your/avatar.gif');
//     
//     // Option 2: Lottie Animation
//     // loadLottieAvatar('path/to/your/animation.json');
//     
//     // Option 3: 3D Model (GLB/GLTF)
//     // load3DAvatar('path/to/your/model.glb');
//     
//     // Option 4: Animated SVG
//     // loadSVGAvatar('<svg>...</svg>');
// });

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect for floating navbar
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Back to top button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animate statistics on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                animateCounter(stat);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const aboutSection = document.querySelector('.about-stats');
if (aboutSection) {
    observer.observe(aboutSection);
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Animate skill bars on scroll
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// Contact form handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Here you would typically send the data to a server
    // For now, we'll just show a success message
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    
    // Reset form
    contactForm.reset();
});

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for particles
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const particles = document.getElementById('particles');
    if (particles && scrolled < window.innerHeight) {
        particles.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize animations on page load
window.addEventListener('load', () => {
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Trigger initial active nav link
    activateNavLink();
});

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effect to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Console message
console.log('%c👋 Hello! Thanks for checking out my portfolio!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'color: #8b5cf6; font-size: 12px;');
