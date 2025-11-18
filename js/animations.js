/**
 * =====================================================
 * SCROLL ANIMATIONS - Universal for all pages
 * =====================================================
 */

const ScrollAnimations = {
  init(selector = "[data-scroll]") {
    this.setupObserver(selector);
    this.setupParallax();
  },

  setupObserver(selector) {
    const options = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 50);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    document.querySelectorAll(selector).forEach((el) => {
      observer.observe(el);
    });
  },

  setupParallax() {
    let ticking = false;

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    });
  },

  updateParallax() {
    const scrollY = window.pageYOffset;
    document.querySelectorAll("[data-parallax]").forEach((el) => {
      const speed = parseFloat(el.getAttribute("data-parallax")) || 0.5;
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });
  },
};

// Inject CSS
function injectScrollAnimationCSS() {
  const style = document.createElement("style");
  style.textContent = `
    [data-scroll] {
      opacity: 0;
      transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    [data-scroll].visible {
      opacity: 1;
    }

    [data-scroll="fade-up"] { transform: translateY(40px); }
    [data-scroll="fade-up"].visible { transform: translateY(0); }

    [data-scroll="fade-left"] { transform: translateX(-40px); }
    [data-scroll="fade-left"].visible { transform: translateX(0); }

    [data-scroll="fade-right"] { transform: translateX(40px); }
    [data-scroll="fade-right"].visible { transform: translateX(0); }

    [data-scroll="scale-up"] { transform: scale(0.9); }
    [data-scroll="scale-up"].visible { transform: scale(1); }

    [data-scroll="slide-up"] { transform: translateY(60px); }
    [data-scroll="slide-up"].visible { transform: translateY(0); }

    [data-scroll="blur"] { filter: blur(10px); }
    [data-scroll="blur"].visible { filter: blur(0px); }

    [data-scroll]:nth-child(1) { transition-delay: 0ms; }
    [data-scroll]:nth-child(2) { transition-delay: 100ms; }
    [data-scroll]:nth-child(3) { transition-delay: 200ms; }
    [data-scroll]:nth-child(4) { transition-delay: 300ms; }
    [data-scroll]:nth-child(n+5) { transition-delay: 400ms; }
  `;
  document.head.appendChild(style);
}

injectScrollAnimationCSS();

// Initialize automatically
document.addEventListener("DOMContentLoaded", () => {
  ScrollAnimations.init();
  console.log("✅ Scroll Animations loaded");
});
