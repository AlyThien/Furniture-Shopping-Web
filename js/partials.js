
document.addEventListener('DOMContentLoaded', function() {
    loadPartials();
});

async function loadPartials() {
    const includes = document.querySelectorAll('[data-include]');
    
    // Load all partials in parallel for better performance
    const loadPromises = Array.from(includes).map(async (element) => {
        const file = element.getAttribute('data-include');
        
        try {
            const response = await fetch(file);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const html = await response.text();
            element.innerHTML = html;
            element.removeAttribute('data-include');
            
            // Trigger custom event after partial is loaded
            element.dispatchEvent(new CustomEvent('partialLoaded', {
                detail: { file: file }
            }));
            
        } catch (error) {
            console.error(`Error loading ${file}:`, error);
            element.innerHTML = `<!-- Failed to load ${file} -->`;
        }
    });
    
    // Wait for all partials to load
    await Promise.all(loadPromises);
    
    // Trigger event when all partials are loaded
    document.dispatchEvent(new CustomEvent('allPartialsLoaded'));
}

// Optional: Reload partials dynamically
window.reloadPartials = loadPartials;