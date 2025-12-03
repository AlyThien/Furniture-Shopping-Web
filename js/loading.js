// Khởi tạo animation và hiệu ứng tương tác
document.addEventListener("DOMContentLoaded", function () {
  const progressFill = document.querySelector(".progress-fill");
  const loadingContainer = document.querySelector(".loading-container");
  // Kiểm tra tốc độ mạng
  checkNetworkSpeed();

  // Tạo hiệu ứng entrance cho container
  setTimeout(() => {
    loadingContainer.style.opacity = "1";
    loadingContainer.style.transform = "scale(1)";
  }, 100);

  // Thêm hiệu ứng hover cho lá
  const leaves = document.querySelectorAll(".leaf");
  leaves.forEach((leaf) => {
    leaf.addEventListener("mouseenter", function () {
      this.style.animationPlayState = "paused";
    });

    leaf.addEventListener("mouseleave", function () {
      this.style.animationPlayState = "running";
    });
  });

  // Tạo hiệu ứng particles khi click
  document.addEventListener("click", function (e) {
    createParticle(e.clientX, e.clientY);
  });

  function createParticle(x, y) {
    const particle = document.createElement("div");
    particle.innerHTML = "🍃";
    particle.style.position = "fixed";
    particle.style.left = x + "px";
    particle.style.top = y + "px";
    particle.style.fontSize = "24px";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "9999";
    particle.style.animation = "particleFade 1s ease-out forwards";

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 1000);
  }

  // Thêm keyframe cho particle animation
  const style = document.createElement("style");
  style.textContent = `
        @keyframes particleFade {
            0% {
                opacity: 1;
                transform: translateY(0) rotate(0deg);
            }
            100% {
                opacity: 0;
                transform: translateY(-50px) rotate(360deg);
            }
        }
        
        .loading-container {
            opacity: 0;
            transform: scale(0.8);
            transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
    `;
  document.head.appendChild(style);

  // Cập nhật progress bar với tốc độ thực tế
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += Math.random() * 10;
    if (progress >= 100) {
      progress = 100;
      clearInterval(progressInterval);

      // Hiệu ứng hoàn thành
      setTimeout(() => {
        loadingContainer.style.transform = "scale(1.1)";
        setTimeout(() => {
          loadingContainer.style.opacity = "0";
        }, 300);
      }, 500);
    }
    progressFill.style.width = progress + "%";
  }, 200);
  // Hàm kiểm tra tốc độ mạng
  function checkNetworkSpeed() {
    // Kiểm tra Network Information API
    if ("connection" in navigator) {
      const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;
      const effectiveType = connection.effectiveType;

      // Nếu mạng yếu (2g hoặc slow-2g), hiển thị loading
      if (effectiveType === "slow-2g" || effectiveType === "2g") {
        showLoadingScreen();
        return;
      }
    }
    // Kiểm tra thời gian load tài nguyên
    window.addEventListener("load", function () {
      const perfData = window.performance.timing;
      const loadTime = perfData.loadEventEnd - perfData.navigationStart;

      // Nếu load > 3 giây, coi như mạng yếu
      if (loadTime > 3000) {
        console.log("Mạng chậm phát hiện: " + loadTime + "ms");
      }
    });

    // Test download speed với một file nhỏ
    const imageAddr =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    const downloadSize = 5000; // bytes

    const startTime = new Date().getTime();
    const download = new Image();

    download.onload = function () {
      const endTime = new Date().getTime();
      const duration = (endTime - startTime) / 1000;
      const bitsLoaded = downloadSize * 8;
      const speedBps = (bitsLoaded / duration).toFixed(2);
      const speedKbps = (speedBps / 1024).toFixed(2);

      // Nếu tốc độ < 500 Kbps, hiển thị loading
      if (speedKbps < 500) {
        showLoadingScreen();
      }
    };

    download.onerror = function () {
      // Nếu không load được, coi như mạng yếu
      showLoadingScreen();
    };

    download.src = imageAddr;
  }

  // Hàm hiển thị loading screen
  function showLoadingScreen() {
    const loader = document.querySelector(".loading-container");
    if (loader) {
      loader.style.display = "block";
      loader.style.position = "fixed";
      loader.style.top = "0";
      loader.style.left = "0";
      loader.style.width = "100vw";
      loader.style.height = "100vh";
      loader.style.zIndex = "9999";
    }
  }
});
