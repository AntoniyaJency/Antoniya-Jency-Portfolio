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

// About Section Animations
function setupAboutAnimations() {
    console.log("Setting up about section animations...");
    
    // Create ScrollTrigger for about section
    ScrollTrigger.create({
        trigger: "#about",
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => {
            console.log("Entering about section");
            animateAboutContent();
        },
        onEnterBack: () => {
            console.log("Re-entering about section");
            animateAboutContent();
        }
    });
    
    console.log("About section animations setup complete");
}

// Animate about section content
function animateAboutContent() {
    console.log("Animating about section content...");
    
    const cards = document.querySelectorAll('.about-card');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const statCircles = document.querySelectorAll('.stat-circle');

    console.log("Found elements:", { cards: cards.length, timelineItems: timelineItems.length, statCircles: statCircles.length });

    // Animate cards with stagger
    gsap.fromTo(cards, 
        {
            opacity: 0,
            y: 50,
            scale: 0.8
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        }
    );

    // Animate timeline items
    gsap.fromTo(timelineItems,
        {
            opacity: 0,
            x: -50
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.15,
            delay: 0.3,
            ease: "power2.out"
        }
    );

    // Animate stat circles
    gsap.fromTo(statCircles,
        {
            opacity: 0,
            scale: 0.5
        },
        {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            delay: 0.6,
            ease: "back.out(1.7)"
        }
    );

    // Animate stat numbers
    statCircles.forEach(circle => {
        const number = circle.querySelector('.stat-number');
        if (number) {
            const target = parseInt(number.getAttribute('data-target'));
            animateCounter(number, 0, target, 2000);
        }
    });
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
    
    // Check if typing elements exist before initializing
    const typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement) {
        typeWriter();
    } else {
        console.log("Typed text element not found, skipping typeWriter");
    }
    
    createFloatingCode();
    setupScrollAnimations();
    
    // Initialize about section animations
    setTimeout(() => {
        console.log("Setting up about section animations...");
        setupAboutAnimations();
    }, 100);
    
    // Initialize EmailJS
    initializeEmailJS();
});

// Also setup on DOM content loaded as backup
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM content loaded");
});

// EmailJS Configuration
function initializeEmailJS() {
    // Check if EmailJS is loaded
    if (typeof window.emailjs === 'undefined') {
        console.error('EmailJS not loaded!');
        return;
    }
    
    // Initialize EmailJS with your public key
    window.emailjs.init("pr-AUyHSCD6hZ-LvA"); // You'll need to replace this
}

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

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form elements
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Prevent double submission
    if (submitButton.disabled) {
        return;
    }
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Remove any existing messages
    const existingMessages = contactForm.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Get form data
    const formData = {
        from_name: contactForm.name.value,
        from_email: contactForm.email.value,
        subject: contactForm.subject.value,
        message: contactForm.message.value,
        to_email: 'antoniyajency.27csa@licet.ac.in'
    };
    
    try {
        // Send email using EmailJS
        const response = await window.emailjs.send(
            'service_gdvhuxk',  // Your service ID
            'template_f0v46bg', // Your template ID
            formData
        );
        
        console.log('Email sent successfully!', response);
        showSuccessMessage();
        contactForm.reset();
        
    } catch (error) {
        console.error('Failed to send email:', error);
        showErrorMessage();
    } finally {
        // Reset button state after a delay
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    }
});

// Show success message
function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'form-message success';
    message.textContent = '✅ Message sent successfully! I\'ll get back to you soon.';
    
    insertMessage(message);
    setTimeout(() => removeMessage(message), 5000);
}

// Show error message
function showErrorMessage() {
    const message = document.createElement('div');
    message.className = 'form-message error';
    message.textContent = '❌ Failed to send message. Please try again or contact directly.';
    
    insertMessage(message);
    setTimeout(() => removeMessage(message), 5000);
}

// Insert message into form
function insertMessage(message) {
    const form = document.getElementById('contact-form');
    const submitButton = form.querySelector('button[type="submit"]');
    
    submitButton.parentNode.insertBefore(message, submitButton.nextSibling);
}

// Remove message
function removeMessage(message) {
    message.style.animation = 'slideOutDown 0.3s ease';
    setTimeout(() => message.remove(), 300);
}

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
function typeWriterHero(element, text, speed = 100) {
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

// GitHub Projects Integration
// Use the configuration from config.js
console.log('GitHub script loaded, window.GITHUB_CONFIG:', window.GITHUB_CONFIG);

// Fetch GitHub repositories
async function fetchGitHubRepos() {
    try {
        const { username, excludeRepos, maxRepos, sortBy, order, includeForks, minSizeKB, showArchived } = window.GITHUB_CONFIG;
        
        console.log('Fetching repos for username:', username);
        console.log('Config:', { username, excludeRepos, maxRepos, sortBy, order });
        
        // Show loading state
        showProjectsLoading();
        
        const apiUrl = `https://api.github.com/users/${username}/repos?per_page=${maxRepos * 2}&sort=${sortBy}&direction=${order}`;
        console.log('Fetching from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const repos = await response.json();
        console.log('Fetched repos:', repos.length, repos.map(r => r.name));
        
        // Filter out excluded repositories and apply additional filters
        const filteredRepos = repos
            .filter(repo => !excludeRepos.includes(repo.name))
            .filter(repo => includeForks || !repo.fork) // Include forks only if configured
            .filter(repo => showArchived || !repo.archived) // Include archived only if configured
            .filter(repo => repo.size >= minSizeKB) // Filter by minimum size
            .slice(0, maxRepos);
        
        console.log('Filtered repos:', filteredRepos.length, filteredRepos.map(r => r.name));
        
        renderGitHubProjects(filteredRepos);
        
    } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        showProjectsError();
    }
}

// Render GitHub projects
function renderGitHubProjects(repos) {
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (!projectsGrid) {
        console.error('Projects grid not found');
        return;
    }
    
    // Clear existing content
    projectsGrid.innerHTML = '';
    
    if (repos.length === 0) {
        projectsGrid.innerHTML = `
            <div class="no-projects">
                <i class="fas fa-code-branch"></i>
                <p>No repositories found. Update your GitHub username in the configuration.</p>
            </div>
        `;
        return;
    }
    
    repos.forEach(repo => {
        const projectCard = createProjectCard(repo);
        projectsGrid.appendChild(projectCard);
    });
    
    // Add animations to new cards
    animateProjectCards();
}

// Create project card from repository data
function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card github-project';
    
    // Get language colors
    const language = repo.language || 'Unknown';
    const languageColor = getLanguageColor(language);
    
    // Format description
    const description = repo.description || 
        `A ${language} project with ${repo.stargazers_count} stars and ${repo.forks_count} forks.`;
    
    // Get topics/tags
    const topics = repo.topics.slice(0, 3); // Limit to 3 topics
    
    card.innerHTML = `
        <div class="project-image">
            <div class="project-overlay">
                <a href="${repo.html_url}" target="_blank" class="project-link" aria-label="View Repository">
                    <i class="fab fa-github"></i>
                </a>
                ${repo.homepage ? `
                    <a href="${repo.homepage}" target="_blank" class="project-link" aria-label="View Live Demo">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                ` : ''}
            </div>
            <div class="repo-language-indicator" style="background-color: ${languageColor}"></div>
            <div class="image-placeholder">
                <i class="fab fa-github"></i>
            </div>
        </div>
        <div class="project-content">
            <h3 class="project-title">${repo.name}</h3>
            <p class="project-description">${description}</p>
            <div class="project-meta">
                <span class="repo-language">
                    <span class="language-dot" style="background-color: ${languageColor}"></span>
                    ${language}
                </span>
                <span class="repo-stars">
                    <i class="fas fa-star"></i> ${repo.stargazers_count}
                </span>
                <span class="repo-forks">
                    <i class="fas fa-code-branch"></i> ${repo.forks_count}
                </span>
            </div>
            ${topics.length > 0 ? `
                <div class="project-tags">
                    ${topics.map(topic => `<span class="tag">${topic}</span>`).join('')}
                </div>
            ` : ''}
        </div>
    `;
    
    return card;
}

// Get language color for GitHub language
function getLanguageColor(language) {
    const colors = {
        'JavaScript': '#f1e05a',
        'TypeScript': '#2b7489',
        'Python': '#3572A5',
        'Java': '#b07219',
        'C++': '#f34b7d',
        'C#': '#239120',
        'PHP': '#4F5D95',
        'Ruby': '#701516',
        'Go': '#00ADD8',
        'Rust': '#dea584',
        'Swift': '#ffac45',
        'Kotlin': '#F18E33',
        'HTML': '#e34c26',
        'CSS': '#1572b6',
        'SCSS': '#c6538c',
        'Vue': '#41b883',
        'React': '#61dafb',
        'Angular': '#dd0031',
        'Node.js': '#339933',
        'Docker': '#2496ed',
        'Shell': '#89e051',
        'Unknown': '#858585'
    };
    
    return colors[language] || colors['Unknown'];
}

// Show loading state for projects
function showProjectsLoading() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
        projectsGrid.innerHTML = `
            <div class="projects-loading">
                <div class="spinner"></div>
                <p>Loading projects from GitHub...</p>
            </div>
        `;
    }
}

// Show error state for projects
function showProjectsError() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
        projectsGrid.innerHTML = `
            <div class="projects-error">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Failed to load projects from GitHub.</p>
                <button onclick="fetchGitHubRepos()" class="btn btn-primary">Try Again</button>
            </div>
        `;
    }
}

// Animate project cards when they're added
function animateProjectCards() {
    const cards = document.querySelectorAll('.github-project');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialize GitHub projects when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the projects page or if projects section exists
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
        // Small delay to ensure page is fully loaded
        setTimeout(() => {
            fetchGitHubRepos();
        }, 500);
    }
});

// Add CSS for GitHub projects
const githubProjectsCSS = `
    .projects-loading, .projects-error, .no-projects {
        grid-column: 1 / -1;
        text-align: center;
        padding: 3rem;
        color: #64748b;
    }
    
    .projects-loading .spinner {
        width: 40px;
        height: 40px;
        border: 3px solid #e2e8f0;
        border-top: 3px solid #6366f1;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    }
    
    .projects-error i, .no-projects i {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: #64748b;
    }
    
    .repo-language-indicator {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        z-index: 1;
    }
    
    .project-meta {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin: 1rem 0;
        font-size: 0.875rem;
        color: #64748b;
    }
    
    .repo-language {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .language-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;
    }
    
    .repo-stars, .repo-forks {
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .github-project {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Add the CSS to the document
const githubStyle = document.createElement('style');
githubStyle.textContent = githubProjectsCSS;
document.head.appendChild(githubStyle);
