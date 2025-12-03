// js/loadingComponent.js

/**
 * Tạo element loading component
 * @returns {HTMLElement} - loading container element
 */
export function createLoadingComponent() {
  const container = document.createElement("div");
  container.className = "loading-container";
  container.id = "app-loading"; // Thêm ID để dễ tìm

  container.innerHTML = `
    <div class="leaves-container">
      <div class="leaf leaf-1">🍃</div>
      <div class="leaf leaf-2">🍃</div>
      <div class="leaf leaf-3">🍃</div>
      <div class="leaf leaf-4">🍃</div>
      <div class="leaf leaf-5">🍃</div>
    </div>

    <div class="loading-text">
      <span class="letter">L</span>
      <span class="letter">o</span>
      <span class="letter">a</span>
      <span class="letter">d</span>
      <span class="letter">i</span>
      <span class="letter">n</span>
      <span class="letter">g</span>
      <span class="dots">
        <span class="dot">.</span>
        <span class="dot">.</span>
        <span class="dot">.</span>
      </span>
    </div>

    <div class="progress-bar">
      <div class="progress-fill"></div>
    </div>
  `;

  return container;
}

/**
 * Hiển thị loading trên trang
 * @param {string} targetSelector - CSS selector của element cha (mặc định: 'body')
 * @returns {HTMLElement} - element loading đã được thêm vào
 */
export function showLoading(targetSelector = "body") {
  const target = document.querySelector(targetSelector);

  if (!target) {
    console.error(`Element ${targetSelector} không tìm thấy`);
    return null;
  }

  // Kiểm tra xem loading đã tồn tại chưa (tránh tạo nhiều lần)
  const existingLoading = document.querySelector("#app-loading");
  if (existingLoading) {
    return existingLoading;
  }

  const loading = createLoadingComponent();
  target.appendChild(loading);

  console.log("✅ Loading hiển thị");
  return loading;
}

/**
 * Ẩn/xóa loading khỏi trang
 * @param {number} delay - Thời gian delay trước khi xóa (ms)
 */
export function hideLoading(delay = 0) {
  setTimeout(() => {
    const loading = document.querySelector("#app-loading");
    if (loading) {
      loading.remove();
      console.log("❌ Loading bị ẩn");
    }
  }, delay);
}

/**
 * Cập nhật progress bar
 * @param {number} percentage - Phần trăm tiến độ (0-100)
 */
export function updateProgress(percentage) {
  const progressFill = document.querySelector(".progress-fill");
  if (progressFill) {
    progressFill.style.width = percentage + "%";
  }
}

/**
 * Thay đổi text loading
 * @param {string} text - Text mới
 */
export function setLoadingText(text) {
  const letterSpans = document.querySelectorAll(".loading-text .letter");
  const dotsSpan = document.querySelector(".loading-text .dots");

  if (letterSpans.length > 0) {
    // Xóa letters cũ
    letterSpans.forEach((span) => span.remove());
  }

  const loadingText = document.querySelector(".loading-text");
  if (loadingText) {
    // Thêm letters mới
    text.forEach((char) => {
      const span = document.createElement("span");
      span.className = "letter";
      span.textContent = char;
      loadingText.insertBefore(span, dotsSpan);
    });
  }
}
