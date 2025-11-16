document.getElementById('overview-next').onclick = function() {
    let list = document.querySelectorAll('.item');
    document.getElementById('slide').appendChild(list[0]);
}

document.getElementById('overview-prev').onclick = function() {
    let list = document.querySelectorAll('.item');
    document.getElementById('slide').prepend(list[list.length - 1]);
}

// Hero scroll effect - Phiên bản debug
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.Hero');
    
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    
    // Log để debug
    console.log('ScrollY:', scrollY, 'ViewportHeight:', viewportHeight);
    
    // Tính progress
    const progress = Math.min(scrollY / viewportHeight, 1);
    console.log('Progress:', progress);
    
    // Scale và opacity
    const scale = 1 - (progress * 0.6);
    const opacity = 1 - progress;
    
    console.log('Scale:', scale, 'Opacity:', opacity);
    
    // Apply
    hero.style.transform = `scale(${scale})`;
    hero.style.opacity = opacity;
});

