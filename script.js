// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        document.body.style.overflow = 'visible';
    }, 1500);
});

// Chatbot message rendering
document.addEventListener("DOMContentLoaded", function () {
    // Wait for the chatbot to load
    setTimeout(() => {
        const chatContainer = document.querySelector(".elfsight-app");

        if (!chatContainer) {
            console.error("Chatbot container not found!");
            return;
        }

        console.log("Chatbot found, adding MathJax support...");

        // Function to update math formatting
        function updateMath() {
            if (window.MathJax) {
                MathJax.typesetPromise();
                console.log("MathJax re-rendered equations.");
            } else {
                console.error("MathJax not loaded!");
            }
        }

        // MutationObserver to detect when chatbot messages change
        const observer = new MutationObserver(() => {
            updateMath(); // Re-render math when a new message appears
        });

        observer.observe(chatContainer, { childList: true, subtree: true });

        // Initial render in case messages already exist
        updateMath();

        // Chatbot button toggle functionality (trigger MathJax re-render)
        const chatbotButton = document.querySelector("FloatingButton__FloatingButtonContainer-sc-885d446c-0"); // Ensure this matches your button's ID or class
        if (chatbotButton) {
            chatbotButton.addEventListener("click", function () {
                // Wait for chatbot reactivation or deactivation
                setTimeout(() => {
                    updateMath(); // Re-render MathJax after chatbot toggle
                }, 1000); // Delay to ensure any DOM changes have settled
            });
        }

    }, 5000); // Delay to ensure the chatbot fully loads
});

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
});

// Typing Effect
const typingText = document.querySelector('.typing-text');
const texts = ['Padėti', 'Pasimokyti', 'Nesukčiauti'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 50 : 100);
    }
}

type();

// Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

function updateCount(counter) {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(() => updateCount(counter), 1);
    } else {
        counter.innerText = target;
    }
}

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            updateCount(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter projects
        const filter = button.getAttribute('data-filter');
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Notification System
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Mobile Menu Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
let isDarkMode = true;

themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('light-mode');
    themeToggle.innerHTML = isDarkMode ? 
        '<i class="fas fa-sun"></i>' : 
        '<i class="fas fa-moon"></i>';
    showNotification(`Switched to ${isDarkMode ? 'dark' : 'light'} mode`);
});

// Tilt Effect for Profile Card
const profileCard = document.querySelector('.profile-card');
profileCard.addEventListener('mousemove', (e) => {
    const rect = profileCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

profileCard.addEventListener('mouseleave', () => {
    profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
});
