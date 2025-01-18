const passwordBox = document.getElementById("password");
const passwordLengthSlider = document.getElementById("password-length");
const lengthDisplay = document.getElementById("length-display");

// Checkbox elements
const includeUppercase = document.getElementById("uppercase");
const includeLowercase = document.getElementById("Lowercase");
const includeNumbers = document.getElementById("Numbers");
const includeSymbols = document.getElementById("Symbols");

// Character sets
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_-+={[}]|\\:;<,>.?/";

// Function to play a sound, ensuring it's preloaded and starts immediately
function playSound(audioElement) {
    audioElement.pause();
    audioElement.currentTime = 0;
    audioElement.play().catch((error) => {
        console.error("Audio playback failed:", error);
    });
}

// Preload audio files to ensure they are ready to play
window.addEventListener("DOMContentLoaded", () => {
    const shakeSound = document.getElementById("shakeSound");
    const generateSound = document.getElementById("generateSound");

    // Preload audio by playing silently and pausing immediately
    [shakeSound, generateSound].forEach((audio) => {
        audio.play().catch(() => {
            // Ignore the error if play fails without interaction
        });
        audio.pause();
        audio.currentTime = 0;
    });
});

// Update the length display when the slider changes
passwordLengthSlider.addEventListener("input", () => {
    lengthDisplay.textContent = passwordLengthSlider.value;
});

// Generate password when the button is clicked
function createPassword() {
    const shakeSound = document.getElementById("shakeSound");
    const generateSound = document.getElementById("generateSound");

    const length = parseInt(passwordLengthSlider.value, 10);
    let allChars = "";
    let password = "";

    // Add selected character sets
    if (includeUppercase.checked) allChars += upperCase;
    if (includeLowercase.checked) allChars += lowerCase;
    if (includeNumbers.checked) allChars += numbers;
    if (includeSymbols.checked) allChars += symbols;

    // Validation: Ensure at least one checkbox is selected
    if (allChars === "") {
        const optionsDiv = document.querySelector(".options");

        // Play the shake sound
        playSound(shakeSound);

        // Add the shake class
        optionsDiv.classList.add("shake");

        // Remove the shake class after the animation completes
        setTimeout(() => {
            optionsDiv.classList.remove("shake");
        }, 500);

        return; // Exit the function if no checkboxes are checked
    }

    // Play the generate sound when a password is created
    playSound(generateSound);

    // Ensure at least one character from each selected set
    if (includeUppercase.checked) password += upperCase[Math.floor(Math.random() * upperCase.length)];
    if (includeLowercase.checked) password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    if (includeNumbers.checked) password += numbers[Math.floor(Math.random() * numbers.length)];
    if (includeSymbols.checked) password += symbols[Math.floor(Math.random() * symbols.length)];

    // Fill the rest of the password with random characters from allChars
    while (password.length < length) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the password to randomize the order of characters
    password = shuffle(password);

    // Update the password field
    passwordBox.value = password;

    // Scroll to the top with custom duration (e.g., 1000ms)
    smoothScrollToTop(1000);
}

function smoothScrollToTop(duration) {
    const startPosition = window.pageYOffset;
    const distance = -startPosition; // Negative since we are scrolling to the top
    let startTime = null;

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1); // Ensure progress doesn't exceed 1
        const easeInOutQuad = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2; // Easing function

        window.scrollTo(0, startPosition + distance * easeInOutQuad);

        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// Function to shuffle the password characters
function shuffle(string) {
    return string.split('').sort(() => Math.random() - 0.5).join('');
}

// Copy password to clipboard
function copyPassword() {
    passwordBox.select();
    document.execCommand("copy");

    // Play the copy sound
    const copySound = document.getElementById("copySound");
    playSound(copySound);
}

// faq
function toggleAnswer(answerId) {
    const answer = document.getElementById(`answer-${answerId}`);
    answer.classList.toggle('open'); // Toggle the open class to expand or collapse
    if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        answer.style.opacity = 0;
    } else {
        answer.style.maxHeight = answer.scrollHeight  + "px";  // Dynamically adjust height based on content
        answer.style.opacity = 1;
    }
}