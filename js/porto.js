// --- THEME TOGGLE SCRIPT ---

const body = document.body;

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const avatarImage = document.getElementById('avatar-image');

const themeState = {
  DARK: "dark",
  LIGHT: "light"
};
const THEME_KEY = "theme_key";

themeToggle.addEventListener('click', () => {
    let currTheme = localStorage.getItem(THEME_KEY);

    if(currTheme == themeState.DARK) {
        changeThemeToLight();
        localStorage.setItem(THEME_KEY, themeState.LIGHT);
    } else {
        changeThemeToDark();
        localStorage.setItem(THEME_KEY, themeState.DARK);
    }
});

function initTheme() {
    let currTheme = localStorage.getItem(THEME_KEY);

    if(currTheme == themeState.LIGHT) {
        changeThemeToLight();
        localStorage.setItem(THEME_KEY, themeState.LIGHT);
    } else {
        changeThemeToDark();
        localStorage.setItem(THEME_KEY, themeState.DARK);
    }
}

function changeThemeToLight() {
    body.classList.remove('dark');

    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    avatarImage.src="./assets/avatar-light.webp"
}

function changeThemeToDark() {
    body.classList.toggle('dark');

    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    avatarImage.src="./assets/avatar-dark.webp"
}

// --- SCROLL ANIMATION SCRIPT ---
document.addEventListener('DOMContentLoaded', () => {
    initTheme();

    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Use Intersection Observer to add 'is-visible' class when element is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Stop observing the element once it has been animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Observe each element with the .animate-on-scroll class
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// --- MODAL DIALOG SCRIPT ---
const contactForm = document.getElementById('contact-form');
const modalOverlay = document.getElementById('modal-overlay');
const modal = modalOverlay.querySelector('.neumorphism-outset-no-light');
const closeModalButton = document.getElementById('close-modal');

// Function to show the modal
const openModal = () => {
    modalOverlay.classList.remove('hidden');
    // A small delay to allow the display property to apply before starting the animation
    setTimeout(() => {
        modal.classList.add('is-visible');
    }, 10);
};

// Function to close the modal
const closeModal = () => {
    modal.classList.remove('is-visible');
        // Wait for the animation to finish before hiding the overlay
    setTimeout(() => {
        modalOverlay.classList.add('hidden');
    }, 600); // Should match the transition duration
};

contactForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting
    openModal();
});

closeModalButton.addEventListener('click', closeModal);

// Close modal if user clicks on the overlay
modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
        closeModal();
    }
});