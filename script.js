document.addEventListener("DOMContentLoaded", () => {
    // Set current year in footer dynamically
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
