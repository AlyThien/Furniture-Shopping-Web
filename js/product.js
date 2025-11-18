/**
 * =====================================================
 * MODERN PRODUCT PAGE - COMPLETE & OPTIMIZED
 * Version: 3.0 (MERGED & FIXED)
 * =====================================================
 */

(function () {
  "use strict";

  // =========================================================
  // CONFIGURATION
  // =========================================================

  const CONFIG = {
    PRODUCT_ID: "sofa-001",
    AUTO_PLAY_INTERVAL: 5000,
    IMAGE_FADE_DURATION: 200,
    NOTIFICATION_DURATION: 3000,
    GALLERY_DURATION: 5000,
  };

  // =========================================================
  // UTILITY FUNCTIONS
  // =========================================================

  const Utils = {
    showNotification(message, type = "info") {
      const existingNotif = document.querySelector(".custom-notification");
      if (existingNotif) existingNotif.remove();

      const notification = document.createElement("div");
      notification.className = `custom-notification ${type}`;
      notification.textContent = message;

      const colors = {
        success: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        warning: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
        info: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
      };

      notification.style.cssText = `
        position: fixed; top: 100px; right: 20px;
        padding: 16px 24px; border-radius: 12px;
        font-size: 14px; font-weight: 600; z-index: 10000;
        box-shadow: 0 8px 30px rgba(0,0,0,0.2);
        animation: slideInRight 0.3s ease;
        background: ${colors[type] || colors.info};
        color: white;
      `;

      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.animation = "slideOutRight 0.3s ease";
        setTimeout(() => notification.remove(), 300);
      }, CONFIG.NOTIFICATION_DURATION);
    },
  };

  // =========================================================
  // 1. IMAGE GALLERY WITH COLOR SYNC
  // =========================================================

  const ImageGallery = {
    currentIndex: 0,
    images: [],
    mainImage: null,
    thumbnails: null,

    init() {
      this.mainImage = document.getElementById("mainProductImage");
      this.thumbnails = document.querySelectorAll(".thumbnail-item");

      if (!this.mainImage || !this.thumbnails.length) return;

      this.images = Array.from(this.thumbnails).map((thumb) =>
        thumb.getAttribute("data-image")
      );

      this.bindEvents();
      console.log("✅ Image Gallery initialized");
    },

    bindEvents() {
      // Thumbnails
      this.thumbnails.forEach((thumb, index) => {
        thumb.addEventListener("click", () => this.goToImage(index));
      });

      // Navigation buttons
      const prevBtn = document.querySelector(".prev-img-btn");
      const nextBtn = document.querySelector(".next-img-btn");

      if (prevBtn) prevBtn.addEventListener("click", () => this.navigate(-1));
      if (nextBtn) nextBtn.addEventListener("click", () => this.navigate(1));

      // Zoom
      const zoomBtn = document.querySelector(".zoom-btn");
      if (zoomBtn) zoomBtn.addEventListener("click", () => this.zoom());

      // Keyboard
      document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") this.navigate(-1);
        if (e.key === "ArrowRight") this.navigate(1);
      });
    },

    navigate(direction) {
      this.currentIndex =
        (this.currentIndex + direction + this.images.length) %
        this.images.length;
      this.updateImage();
    },

    goToImage(index) {
      this.currentIndex = index;
      this.updateImage();
    },

    updateImage() {
      this.mainImage.style.opacity = "0";

      setTimeout(() => {
        this.mainImage.src = this.images[this.currentIndex];
        this.mainImage.style.opacity = "1";
      }, CONFIG.IMAGE_FADE_DURATION);

      this.thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle("active", index === this.currentIndex);
      });
    },

    zoom() {
      const overlay = document.createElement("div");
      overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.95); display: flex;
        align-items: center; justify-content: center;
        z-index: 10000; cursor: zoom-out; animation: fadeIn 0.3s ease;
      `;

      const img = document.createElement("img");
      img.src = this.mainImage.src;
      img.style.cssText = `
        max-width: 95%; max-height: 95%;
        border-radius: 12px; box-shadow: 0 8px 40px rgba(0,0,0,0.5);
      `;

      overlay.appendChild(img);
      document.body.appendChild(overlay);
      overlay.addEventListener("click", () =>
        document.body.removeChild(overlay)
      );
    },
  };

  // =========================================================
  // 2. COLOR SELECTION WITH IMAGE SYNC
  // =========================================================

  const ColorManager = {
    init() {
      const colorSwatches = document.querySelectorAll(".color-swatch");
      const selectedColor = document.getElementById("selectedColor");

      colorSwatches.forEach((swatch) => {
        swatch.addEventListener("click", function () {
          const thumbnailIndex = parseInt(
            this.getAttribute("data-thumbnail-index")
          );
          const color = this.getAttribute("data-color");

          // Update active state
          colorSwatches.forEach((s) => {
            s.classList.remove("active");
            s.setAttribute("aria-checked", "false");
          });
          this.classList.add("active");
          this.setAttribute("aria-checked", "true");

          // Update text
          if (selectedColor) {
            selectedColor.textContent = color;
          }

          // ✅ SYNC TO IMAGE
          if (!isNaN(thumbnailIndex) && thumbnailIndex >= 0) {
            ImageGallery.goToImage(thumbnailIndex);
          }

          // Animation
          this.style.transform = "scale(1.15)";
          setTimeout(() => {
            this.style.transform = "";
          }, 200);
        });
      });

      console.log("✅ Color Manager initialized");
    },
  };

  // =========================================================
  // 3. SIZE SELECTION
  // =========================================================

  const SizeManager = {
    init() {
      const sizeButtons = document.querySelectorAll(".size-btn");
      const selectedSize = document.getElementById("selectedSize");

      sizeButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
          sizeButtons.forEach((b) => {
            b.classList.remove("active");
            b.setAttribute("aria-checked", "false");
          });
          this.classList.add("active");
          this.setAttribute("aria-checked", "true");

          if (selectedSize) {
            selectedSize.textContent = this.getAttribute("data-size");
          }

          this.style.transform = "scale(1.05)";
          setTimeout(() => {
            this.style.transform = "";
          }, 200);
        });
      });

      console.log("✅ Size Manager initialized");
    },
  };

  // =========================================================
  // 4. MATERIAL SELECTION
  // =========================================================

  const MaterialManager = {
    init() {
      const materialCards = document.querySelectorAll(".material-card");
      const selectedMaterial = document.getElementById("selectedMaterial");

      materialCards.forEach((card) => {
        card.addEventListener("click", function () {
          const input = this.querySelector("input");
          if (input) {
            input.checked = true;

            materialCards.forEach((c) => c.classList.remove("active"));
            this.classList.add("active");

            if (selectedMaterial) {
              selectedMaterial.textContent = input.value;
            }

            this.style.transform = "scale(1.03)";
            setTimeout(() => {
              this.style.transform = "";
            }, 200);
          }
        });
      });

      console.log("✅ Material Manager initialized");
    },
  };

  // =========================================================
  // 5. QUANTITY CONTROL
  // =========================================================

  const QuantityManager = {
    init() {
      const quantityInput = document.getElementById("quantityInput");
      const minusBtn = document.querySelector(".qty-btn.minus");
      const plusBtn = document.querySelector(".qty-btn.plus");

      if (!quantityInput) return;

      if (minusBtn) {
        minusBtn.addEventListener("click", () => {
          const current = parseInt(quantityInput.value);
          const min = parseInt(quantityInput.getAttribute("min"));
          if (current > min) {
            quantityInput.value = current - 1;
            this.animate(quantityInput);
          }
        });
      }

      if (plusBtn) {
        plusBtn.addEventListener("click", () => {
          const current = parseInt(quantityInput.value);
          const max = parseInt(quantityInput.getAttribute("max"));
          if (current < max) {
            quantityInput.value = current + 1;
            this.animate(quantityInput);
          } else {
            Utils.showNotification(`Maximum quantity is ${max}`, "warning");
          }
        });
      }

      console.log("✅ Quantity Manager initialized");
    },

    animate(input) {
      input.style.transform = "scale(1.2)";
      input.style.color = "#3b6d54";
      setTimeout(() => {
        input.style.transform = "";
        input.style.color = "";
      }, 200);
    },
  };

  // =========================================================
  // 6. ADD TO CART
  // =========================================================

  const CartManager = {
    init() {
      const addToCartBtn = document.querySelector(".btn-add-cart");
      const buyNowBtn = document.querySelector(".btn-buy-now");

      if (addToCartBtn) {
        addToCartBtn.addEventListener("click", () => this.addToCart());
      }

      if (buyNowBtn) {
        buyNowBtn.addEventListener("click", () => {
          this.addToCart();
          setTimeout(() => {
            alert(
              "Redirecting to checkout...\nIn production, this would go to checkout page."
            );
          }, 1000);
        });
      }

      console.log("✅ Cart Manager initialized");
    },

    addToCart() {
      const productData = {
        id: CONFIG.PRODUCT_ID,
        name: "L-shaped Sofa",
        color: document.getElementById("selectedColor")?.textContent || "Grey",
        size: document.getElementById("selectedSize")?.textContent || "Medium",
        material:
          document.getElementById("selectedMaterial")?.textContent ||
          "Polyester",
        quantity:
          parseInt(document.getElementById("quantityInput")?.value) || 1,
        price: 4200000,
        image: document.getElementById("mainProductImage")?.src || "",
      };

      // Store in localStorage
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(productData);
      localStorage.setItem("cart", JSON.stringify(cart));

      // Success animation
      const btn = document.querySelector(".btn-add-cart");
      if (btn) {
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<span class="btn-icon">✓</span><span>Added!</span>';
        btn.style.background =
          "linear-gradient(135deg, #10b981 0%, #059669 100%)";

        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.style.background = "";
        }, 2500);
      }

      Utils.showNotification("Product added to cart successfully!", "success");
      console.log("Added to cart:", productData);
    },
  };

  // =========================================================
  // 7. WISHLIST MANAGER
  // =========================================================
  const WishlistManager = {
    init() {
      const wishlistBtn = document.getElementById("addToWishlistBtn");
      const wishlistPopup = document.getElementById("wishlistPopup");
      const closePopup = document.getElementById("closePopup");
      const keepBtn = document.querySelector(".keep-btn");
      const viewBtn = document.querySelector(".view-btn");

      if (!wishlistBtn || !wishlistPopup) return;

      this.loadState();

      wishlistBtn.addEventListener("click", () => {
        const heartIcon = wishlistBtn.querySelector(".btn-icon");
        const isAdded = wishlistBtn.classList.contains("added");

        if (isAdded) {
          heartIcon.textContent = "♡";
          wishlistBtn.classList.remove("added");
          this.removeFromWishlist();
        } else {
          const productData = this.getProductData();
          let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

          if (!wishlist.some((item) => item.id === CONFIG.PRODUCTID)) {
            wishlist.push(productData);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            heartIcon.textContent = "❤️";
            wishlistBtn.classList.add("added");
            this.updateCount(wishlist.length);

            // ✅ THÊM CLASS .show THAY VÌ style.display
            wishlistPopup.classList.add("show");
          }
        }
      });

      if (closePopup) {
        closePopup.addEventListener("click", () => {
          wishlistPopup.classList.remove("show");
        });
      }

      if (keepBtn) {
        keepBtn.addEventListener("click", () => {
          wishlistPopup.classList.remove("show");
        });
      }

      if (viewBtn) {
        viewBtn.addEventListener("click", () => {
          window.location.href = "wishlist.html";
        });
      }

      window.addEventListener("click", (e) => {
        if (e.target === wishlistPopup) {
          wishlistPopup.classList.remove("show");
        }
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && wishlistPopup.classList.contains("show")) {
          wishlistPopup.classList.remove("show");
        }
      });

      console.log("✅ Wishlist Manager initialized");
    },

    getProductData() {
      return {
        id: CONFIG.PRODUCTID,
        name: "L-shaped Sofa",
        image: document.getElementById("mainProductImage")?.src || "",
        price: 4200000,
        color: document.getElementById("selectedColor")?.textContent || "Grey",
        size: document.getElementById("selectedSize")?.textContent || "Medium",
        material:
          document.getElementById("selectedMaterial")?.textContent ||
          "Polyester",
        quantity:
          parseInt(document.getElementById("quantityInput")?.value) || 1,
      };
    },

    removeFromWishlist() {
      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      wishlist = wishlist.filter((item) => item.id !== CONFIG.PRODUCTID);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      this.updateCount(wishlist.length);
      Utils.showNotification("Removed from wishlist", "info");
    },

    updateCount(count) {
      const wishlistCount = document.querySelector(".wishlist-count");
      if (wishlistCount) {
        wishlistCount.textContent = count;
      }
    },

    loadState() {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      this.updateCount(wishlist.length);

      const wishlistBtn = document.getElementById("addToWishlistBtn");

      if (wishlist.some((item) => item.id === CONFIG.PRODUCTID)) {
        const heartIcon = wishlistBtn?.querySelector(".btn-icon");
        if (heartIcon) {
          heartIcon.textContent = "❤️";
          wishlistBtn.classList.add("added");
        }
      }
    },
  };

  // =========================================================
  // 8. SHARE BUTTONS
  // =========================================================

  const ShareManager = {
    init() {
      const shareButtons = document.querySelectorAll(".share-btn");

      shareButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
          const productUrl = window.location.href;
          const productTitle = "L-shaped Sofa - Haguchi Furniture";
          const btnText = this.title.toLowerCase();

          if (btnText.includes("facebook")) {
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                productUrl
              )}`,
              "_blank"
            );
          } else if (btnText.includes("twitter")) {
            window.open(
              `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                productUrl
              )}&text=${encodeURIComponent(productTitle)}`,
              "_blank"
            );
          } else if (btnText.includes("pinterest")) {
            window.open(
              `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                productUrl
              )}&description=${encodeURIComponent(productTitle)}`,
              "_blank"
            );
          } else if (btnText.includes("link")) {
            navigator.clipboard.writeText(productUrl).then(() => {
              Utils.showNotification("Link copied to clipboard!", "success");
            });
          }

          this.style.transform = "scale(1.2)";
          setTimeout(() => {
            this.style.transform = "";
          }, 200);
        });
      });

      console.log("✅ Share Manager initialized");
    },
  };

  // =========================================================
  // 9. COMPARE BUTTON
  // =========================================================

  const CompareManager = {
    init() {
      const compareBtn = document.querySelector(".compare-btn");

      if (compareBtn) {
        compareBtn.addEventListener("click", function () {
          const compareList =
            JSON.parse(localStorage.getItem("compareList")) || [];

          if (compareList.length >= 4) {
            Utils.showNotification(
              "Maximum 4 items can be compared. Please remove one first.",
              "warning"
            );
            return;
          }

          compareList.push({
            name: "L-shaped Sofa",
            image: document.getElementById("mainProductImage")?.src || "",
            price: 4200000,
          });

          localStorage.setItem("compareList", JSON.stringify(compareList));
          Utils.showNotification("Added to compare list!", "success");

          this.style.transform = "scale(1.05)";
          setTimeout(() => {
            this.style.transform = "";
          }, 200);
        });
      }

      console.log("✅ Compare Manager initialized");
    },
  };

  // =========================================================
  // 10. STICKY CART BAR
  // =========================================================

  const StickyCartBar = {
    bar: null,

    init() {
      this.bar = this.createBar();
      window.addEventListener("scroll", () => this.handleScroll());
      console.log("✅ Sticky Cart Bar initialized");
    },

    createBar() {
      const bar = document.createElement("div");
      bar.className = "sticky-cart-bar";
      bar.innerHTML = `
        <div class="sticky-cart-content">
          <img src="${
            document.getElementById("mainProductImage")?.src ||
            "Product/Ảnh/11.jpg"
          }" alt="Product" class="sticky-product-img">
          <div class="sticky-product-info">
            <strong>L-shaped Sofa</strong>
            <span class="sticky-price">4.200.000 đ</span>
          </div>
          <button class="sticky-add-cart-btn">
            <span>🛒</span> Add to Cart
          </button>
        </div>
      `;

      bar.style.cssText = `
        position: fixed; bottom: 0; left: 0; width: 100%;
        background: white; box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
        z-index: 1000; transform: translateY(100%);
        transition: transform 0.3s ease; padding: 15px 20px;
      `;

      this.addStyles();
      document.body.appendChild(bar);

      bar
        .querySelector(".sticky-add-cart-btn")
        .addEventListener("click", () => {
          document.querySelector(".btn-add-cart")?.click();
          window.scrollTo({ top: 0, behavior: "smooth" });
        });

      return bar;
    },

    handleScroll() {
      const productSection = document.querySelector(".product-display-modern");
      if (productSection) {
        const rect = productSection.getBoundingClientRect();
        if (rect.bottom < 0) {
          this.bar.classList.add("visible");
        } else {
          this.bar.classList.remove("visible");
        }
      }
    },

    addStyles() {
      const style = document.createElement("style");
      style.textContent = `
        .sticky-cart-bar.visible { transform: translateY(0) !important; }
        .sticky-cart-content {
          max-width: 1400px; margin: 0 auto; display: flex;
          align-items: center; gap: 20px;
        }
        .sticky-product-img {
          width: 60px; height: 60px; object-fit: cover; border-radius: 8px;
        }
        .sticky-product-info {
          flex: 1; display: flex; flex-direction: column; gap: 5px;
        }
        .sticky-product-info strong { font-size: 16px; color: #1d3227; }
        .sticky-price { font-size: 18px; font-weight: 700; color: #3b6d54; }
        .sticky-add-cart-btn {
          padding: 14px 32px;
          background: linear-gradient(135deg, #3b6d54 0%, #2a5240 100%);
          color: white; border: none; border-radius: 30px;
          font-size: 15px; font-weight: 700; cursor: pointer;
          transition: all 0.3s ease; display: flex;
          align-items: center; gap: 8px;
        }
        .sticky-add-cart-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(59, 109, 84, 0.3);
        }
        @media (max-width: 768px) {
          .sticky-product-info strong { font-size: 14px; }
          .sticky-price { font-size: 16px; }
          .sticky-add-cart-btn { padding: 12px 24px; font-size: 14px; }
        }
      `;
      document.head.appendChild(style);
    },
  };

  // =========================================================
  // 11. TABS MANAGER
  // =========================================================

  const TabsManager = {
    init() {
      const tabBtns = document.querySelectorAll(".tab-btn");
      const tabContents = document.querySelectorAll(".tab-content");

      if (!tabBtns.length) return;

      tabBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          const targetTab = this.getAttribute("data-tab");

          tabBtns.forEach((b) => b.classList.remove("active"));
          this.classList.add("active");

          tabContents.forEach((content) => {
            content.classList.remove("active");
            if (content.id === targetTab) {
              content.classList.add("active");
            }
          });
        });
      });

      console.log("✅ Tabs Manager initialized");
    },
  };

  // =========================================================
  // 12. GALLERY SLIDER
  // =========================================================

  const GallerySlider = {
    index: 0,
    autoplayInterval: null,

    init() {
      const slides = document.querySelectorAll(".gallery-slide");
      const thumbnails = document.querySelectorAll(
        ".gallery-thumbnails .thumbnail-item"
      );
      const progressBar = document.querySelector(".progress-bar");

      if (slides.length === 0) return;

      this.slides = slides;
      this.thumbnails = thumbnails;
      this.progressBar = progressBar;

      this.updateSlide();
      this.startAutoplay();

      // Pause on hover
      const sliderContainer = document.querySelector(".gallery-slider-modern");
      if (sliderContainer) {
        sliderContainer.addEventListener("mouseenter", () =>
          this.stopAutoplay()
        );
        sliderContainer.addEventListener("mouseleave", () =>
          this.resumeAutoplay()
        );
      }

      // Keyboard navigation
      document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") this.changeSlide(-1);
        if (e.key === "ArrowRight") this.changeSlide(1);
      });

      // Global functions
      window.galleryChangeSlide = (direction) => this.changeSlide(direction);
      window.galleryGoToSlide = (index) => this.goToSlide(index);

      console.log("✅ Gallery Slider initialized");
    },

    startAutoplay() {
      let progress = 0;
      const duration = CONFIG.GALLERY_DURATION;
      const interval = 50;
      const increment = (interval / duration) * 100;

      this.autoplayInterval = setInterval(() => {
        progress += increment;
        if (this.progressBar) {
          this.progressBar.style.width = progress + "%";
        }

        if (progress >= 100) {
          progress = 0;
          this.changeSlide(1);
        }
      }, interval);
    },

    stopAutoplay() {
      clearInterval(this.autoplayInterval);
      if (this.progressBar) {
        this.progressBar.style.width = "0%";
      }
    },

    resumeAutoplay() {
      this.stopAutoplay();
      this.startAutoplay();
    },

    changeSlide(direction) {
      this.stopAutoplay();
      this.index =
        (this.index + direction + this.slides.length) % this.slides.length;
      this.updateSlide();
      this.resumeAutoplay();
    },

    goToSlide(index) {
      this.stopAutoplay();
      this.index = index;
      this.updateSlide();
      this.resumeAutoplay();
    },

    updateSlide() {
      this.slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === this.index);
      });

      this.thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle("active", i === this.index);
      });
    },
  };

  // =========================================================
  // 13. REVIEWS MANAGER
  // =========================================================

  const ReviewsManager = {
    init() {
      this.initFilters();
      this.initSort();
      this.initHelpful();
      this.initReport();
      this.initLoadMore();
      this.initWriteReview();
      this.initImageLightbox();
      console.log("✅ Reviews Manager initialized");
    },

    initFilters() {
      const filterBtns = document.querySelectorAll(".filter-btn");
      const reviewCards = document.querySelectorAll(".review-card");

      filterBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          filterBtns.forEach((b) => b.classList.remove("active"));
          this.classList.add("active");

          const filter = this.getAttribute("data-filter");

          reviewCards.forEach((card) => {
            const rating = card.getAttribute("data-rating");
            const hasVerified = card.querySelector(".verified-badge");

            if (filter === "all") {
              card.style.display = "block";
              card.style.animation = "fadeIn 0.5s ease";
            } else if (filter === "verified") {
              card.style.display = hasVerified ? "block" : "none";
            } else {
              card.style.display = rating === filter ? "block" : "none";
            }
          });
        });
      });
    },

    initSort() {
      const sortSelect = document.querySelector(".sort-select");
      const reviewsGrid = document.querySelector(".reviews-grid");

      if (!sortSelect || !reviewsGrid) return;

      sortSelect.addEventListener("change", function () {
        const reviewCards = document.querySelectorAll(".review-card");
        const sortValue = this.value;
        const reviewsArray = Array.from(reviewCards);
        let sorted = reviewsArray;

        if (sortValue === "highest") {
          sorted = reviewsArray.sort(
            (a, b) =>
              parseInt(b.getAttribute("data-rating")) -
              parseInt(a.getAttribute("data-rating"))
          );
        } else if (sortValue === "lowest") {
          sorted = reviewsArray.sort(
            (a, b) =>
              parseInt(a.getAttribute("data-rating")) -
              parseInt(b.getAttribute("data-rating"))
          );
        } else if (sortValue === "helpful") {
          sorted = reviewsArray.sort((a, b) => {
            const helpfulA = parseInt(
              a.querySelector(".helpful-btn").textContent.match(/\d+/)?.[0] || 0
            );
            const helpfulB = parseInt(
              b.querySelector(".helpful-btn").textContent.match(/\d+/)?.[0] || 0
            );
            return helpfulB - helpfulA;
          });
        }

        sorted.forEach((review) => reviewsGrid.appendChild(review));
      });
    },

    initHelpful() {
      const helpfulBtns = document.querySelectorAll(".helpful-btn");

      helpfulBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          if (this.classList.contains("voted")) {
            this.classList.remove("voted");
            this.style.background = "";
            this.style.color = "";
            const currentCount = parseInt(this.textContent.match(/\d+/)[0]);
            this.innerHTML = `<span class="icon">👍</span> Helpful (${
              currentCount - 1
            })`;
          } else {
            this.classList.add("voted");
            this.style.background = "#3b6d54";
            this.style.color = "white";
            const currentCount = parseInt(this.textContent.match(/\d+/)[0]);
            this.innerHTML = `<span class="icon">👍</span> Helpful (${
              currentCount + 1
            })`;

            this.style.transform = "scale(1.1)";
            setTimeout(() => {
              this.style.transform = "scale(1)";
            }, 200);
          }
        });
      });
    },

    initReport() {
      const reportBtns = document.querySelectorAll(".report-btn");

      reportBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          if (confirm("Are you sure you want to report this review?")) {
            alert("Thank you for your report. We will review this feedback.");
            this.disabled = true;
            this.textContent = "Reported";
            this.style.opacity = "0.5";
          }
        });
      });
    },

    initLoadMore() {
      const loadMoreBtn = document.querySelector(".load-more-btn");

      if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", function () {
          this.innerHTML = "<span>Loading...</span>";
          this.disabled = true;

          setTimeout(() => {
            alert(
              "No more reviews to load. This would fetch from your database in production."
            );
            this.innerHTML = "No More Reviews";
            this.style.opacity = "0.5";
          }, 1000);
        });
      }
    },

    initWriteReview() {
      const writeReviewBtn = document.querySelector(".write-review-btn-modern");

      if (writeReviewBtn) {
        writeReviewBtn.addEventListener("click", () => this.openReviewModal());
      }
    },

    openReviewModal() {
      if (!document.getElementById("reviewModal")) {
        const modal = document.createElement("div");
        modal.id = "reviewModal";
        modal.className = "review-modal";
        modal.style.cssText = `
          display: none; position: fixed; z-index: 10000;
          left: 0; top: 0; width: 100%; height: 100%;
          overflow: auto; background-color: rgba(0,0,0,0.6);
          justify-content: center; align-items: center;
        `;

        modal.innerHTML = `
          <div class="review-modal-content" style="
            background: white; padding: 30px; border-radius: 16px;
            max-width: 600px; width: 90%; position: relative;
            box-shadow: 0 10px 50px rgba(0,0,0,0.3);
          ">
            <span class="review-modal-close" style="
              position: absolute; right: 20px; top: 20px;
              font-size: 28px; font-weight: bold; cursor: pointer;
              color: #999; transition: color 0.3s;
            ">&times;</span>
            <h2 style="margin-bottom: 20px; color: #1d3227;">Write a Review</h2>
            <form id="reviewForm" class="review-form">
              <div class="form-group" style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600;">Your Name</label>
                <input type="text" required placeholder="Enter your name" style="
                  width: 100%; padding: 12px; border: 1px solid #ddd;
                  border-radius: 8px; font-size: 14px;
                ">
              </div>
              <div class="form-group" style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600;">Your Rating</label>
                <div class="star-rating-input" style="display: flex; gap: 8px; font-size: 32px;">
                  <span class="star-input" data-rating="1" style="cursor: pointer; color: #d1d5db;">☆</span>
                  <span class="star-input" data-rating="2" style="cursor: pointer; color: #d1d5db;">☆</span>
                  <span class="star-input" data-rating="3" style="cursor: pointer; color: #d1d5db;">☆</span>
                  <span class="star-input" data-rating="4" style="cursor: pointer; color: #d1d5db;">☆</span>
                  <span class="star-input" data-rating="5" style="cursor: pointer; color: #d1d5db;">☆</span>
                </div>
              </div>
              <div class="form-group" style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600;">Review Title</label>
                <input type="text" required placeholder="Sum up your experience" style="
                  width: 100%; padding: 12px; border: 1px solid #ddd;
                  border-radius: 8px; font-size: 14px;
                ">
              </div>
              <div class="form-group" style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600;">Your Review</label>
                <textarea rows="5" required placeholder="Share your thoughts about this product..." style="
                  width: 100%; padding: 12px; border: 1px solid #ddd;
                  border-radius: 8px; font-size: 14px; resize: vertical;
                "></textarea>
              </div>
              <div class="form-group" style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600;">Add Photos (Optional)</label>
                <input type="file" multiple accept="image/*" style="
                  width: 100%; padding: 12px; border: 1px solid #ddd;
                  border-radius: 8px; font-size: 14px;
                ">
              </div>
              <button type="submit" class="submit-review-btn" style="
                width: 100%; padding: 14px; background: linear-gradient(135deg, #3b6d54 0%, #2a5240 100%);
                color: white; border: none; border-radius: 30px;
                font-size: 16px; font-weight: 700; cursor: pointer;
                transition: all 0.3s ease;
              ">Submit Review</button>
            </form>
          </div>
        `;

        document.body.appendChild(modal);

        // Close modal
        modal
          .querySelector(".review-modal-close")
          .addEventListener("click", () => {
            modal.style.display = "none";
          });

        // Click outside to close
        window.addEventListener("click", (e) => {
          if (e.target === modal) {
            modal.style.display = "none";
          }
        });

        // Star rating input
        const starInputs = modal.querySelectorAll(".star-input");
        let selectedRating = 0;

        starInputs.forEach((star) => {
          star.addEventListener("click", function () {
            selectedRating = this.getAttribute("data-rating");

            starInputs.forEach((s) => {
              const rating = s.getAttribute("data-rating");
              if (rating <= selectedRating) {
                s.textContent = "★";
                s.style.color = "#fbbf24";
              } else {
                s.textContent = "☆";
                s.style.color = "#d1d5db";
              }
            });
          });

          star.addEventListener("mouseenter", function () {
            const rating = this.getAttribute("data-rating");
            starInputs.forEach((s) => {
              if (s.getAttribute("data-rating") <= rating) {
                s.textContent = "★";
                s.style.color = "#fbbf24";
              }
            });
          });
        });

        const starContainer = modal.querySelector(".star-rating-input");
        starContainer.addEventListener("mouseleave", function () {
          starInputs.forEach((s) => {
            const rating = s.getAttribute("data-rating");
            if (rating <= selectedRating) {
              s.textContent = "★";
              s.style.color = "#fbbf24";
            } else {
              s.textContent = "☆";
              s.style.color = "#d1d5db";
            }
          });
        });

        // Form submission
        modal.querySelector("#reviewForm").addEventListener("submit", (e) => {
          e.preventDefault();
          alert(
            "Thank you for your review! It will be published after moderation."
          );
          modal.style.display = "none";
          e.target.reset();
          selectedRating = 0;
          starInputs.forEach((s) => {
            s.textContent = "☆";
            s.style.color = "#d1d5db";
          });
        });
      }

      document.getElementById("reviewModal").style.display = "flex";
    },

    initImageLightbox() {
      const reviewImages = document.querySelectorAll(".review-img");

      reviewImages.forEach((img) => {
        img.addEventListener("click", function () {
          const overlay = document.createElement("div");
          overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.9); display: flex;
            align-items: center; justify-content: center;
            z-index: 10000; cursor: pointer;
          `;

          const fullImg = document.createElement("img");
          fullImg.src = this.src;
          fullImg.style.cssText = `
            max-width: 90%; max-height: 90%; border-radius: 8px;
          `;

          overlay.appendChild(fullImg);
          document.body.appendChild(overlay);

          overlay.addEventListener("click", () => {
            document.body.removeChild(overlay);
          });
        });
      });
    },
  };

  // =========================================================
  // 14. PRODUCT SLIDER (OLD SECTION)
  // =========================================================

  const ProductSlider = {
    products: [
      {
        title: "L-shaped sofa",
        img: "Product/Ảnh/11.png",
        price: "9.500.000 đ",
      },
      {
        title: "L-shaped sofa - Grey",
        img: "Product/Ảnh/9.png",
        price: "9.500.000 đ",
      },
      {
        title: "Corner Sofa Deluxe",
        img: "Product/Ảnh/10.png",
        price: "11.000.000 đ",
      },
      {
        title: "Modern Armchair",
        img: "Product/Ảnh/12.png",
        price: "4.200.000 đ",
      },
    ],
    index: 0,

    init() {
      const img = document.getElementById("productImage");
      const price = document.getElementById("productPrice");
      const prev = document.getElementById("prevBtn");
      const next = document.getElementById("nextBtn");

      if (!img || !price) return;

      this.img = img;
      this.price = price;

      if (prev) {
        prev.addEventListener("click", () => {
          this.index =
            (this.index - 1 + this.products.length) % this.products.length;
          this.updateProduct();
        });
      }

      if (next) {
        next.addEventListener("click", () => {
          this.index = (this.index + 1) % this.products.length;
          this.updateProduct();
        });
      }

      this.updateProduct();
      console.log("✅ Product Slider initialized");
    },

    updateProduct() {
      if (this.img && this.price) {
        this.img.src = this.products[this.index].img;
        this.price.textContent = this.products[this.index].price;
      }
    },
  };

  // =========================================================
  // 15. SIMPLE SLIDER (DOTS)
  // =========================================================

  const SimpleSlider = {
    index: 0,

    init() {
      const slides = document.querySelectorAll(".slide");
      const dotsContainer = document.getElementById("dots");

      if (slides.length === 0 || !dotsContainer) return;

      this.slides = slides;
      this.dotsContainer = dotsContainer;

      // Create dots
      slides.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.style.cssText = `
          display: inline-block; width: 12px; height: 12px;
          margin: 0 5px; background: #bbb; border-radius: 50%;
          cursor: pointer; transition: background 0.3s;
        `;
        dot.addEventListener("click", () => this.showSlide(i));
        dotsContainer.appendChild(dot);
      });

      this.dots = dotsContainer.querySelectorAll("span");

      // Auto play
      setInterval(() => this.changeSlide(1), 4000);

      // Show first slide
      this.showSlide(0);

      // Make changeSlide available globally
      window.changeSlide = (n) => this.changeSlide(n);

      console.log("✅ Simple Slider initialized");
    },

    showSlide(i) {
      this.slides.forEach((s) => s.classList.remove("active"));
      this.dots.forEach((d) => {
        d.classList.remove("active");
        d.style.background = "#bbb";
      });

      this.slides[i].classList.add("active");
      this.dots[i].classList.add("active");
      this.dots[i].style.background = "#3b6d54";
      this.index = i;
    },

    changeSlide(n) {
      this.index = (this.index + n + this.slides.length) % this.slides.length;
      this.showSlide(this.index);
    },
  };

  // =========================================================
  // 16. INJECT GLOBAL STYLES
  // =========================================================

  const InjectStyles = {
    init() {
      const style = document.createElement("style");
      style.textContent = `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(400px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(400px); opacity: 0; }
        }
        .review-modal-close:hover {
          color: #333 !important;
        }
        .submit-review-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(59, 109, 84, 0.4);
        }
      `;
      document.head.appendChild(style);
      console.log("✅ Styles injected");
    },
  };

  // =========================================================
  // MASTER INITIALIZATION
  // =========================================================

  document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 Initializing Modern Product Page...");

    InjectStyles.init();
    ImageGallery.init();
    ColorManager.init();
    SizeManager.init();
    MaterialManager.init();
    QuantityManager.init();
    CartManager.init();
    WishlistManager.init();
    ShareManager.init();
    CompareManager.init();
    StickyCartBar.init();
    TabsManager.init();
    GallerySlider.init();
    ReviewsManager.init();
    ProductSlider.init();
    SimpleSlider.init();

    console.log("✅ Modern Product Page Fully Initialized!");
  });
})();
// =========================================================
// 17. REVIEW FORM MANAGER
// =========================================================

const ReviewFormManager = {
  selectedPhotos: [],

  init() {
    const openBtn = document.getElementById("openReviewFormBtn");
    const modal = document.getElementById("reviewModal");
    const closeBtn = document.getElementById("closeReviewModal");
    const cancelBtn = document.getElementById("cancelReviewBtn");
    const form = document.getElementById("reviewForm");

    if (!modal || !form) return;

    // Open modal
    openBtn?.addEventListener("click", () => {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });

    // Close modal
    const closeModal = () => {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    };

    closeBtn?.addEventListener("click", closeModal);
    cancelBtn?.addEventListener("click", closeModal);

    // Close on outside click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    // Close on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
      }
    });

    // Initialize form features
    this.initStarRating();
    this.initCharCounters();
    this.initPhotoUpload();
    this.initFormSubmit();

    console.log("✅ Review Form Manager initialized");
  },

  initStarRating() {
    const starInputs = document.querySelectorAll(".star-rating-input input");
    const ratingMessage = document.getElementById("ratingMessage");

    const messages = {
      5: "Excellent! 😍",
      4: "Good! 👍",
      3: "Average 😐",
      2: "Poor 👎",
      1: "Terrible 😞",
    };

    starInputs.forEach((input) => {
      input.addEventListener("change", function () {
        const rating = this.value;
        if (ratingMessage) {
          ratingMessage.textContent = messages[rating] || "Select a rating";
        }
      });
    });
  },

  initCharCounters() {
    const titleInput = document.getElementById("reviewTitle");
    const reviewText = document.getElementById("reviewText");
    const titleCount = document.getElementById("titleCharCount");
    const reviewCount = document.getElementById("reviewCharCount");

    titleInput?.addEventListener("input", function () {
      const count = this.value.length;
      titleCount.textContent = `${count}/100`;
      titleCount.style.color = count > 100 ? "#ef4444" : "#9ca3af";
    });

    reviewText?.addEventListener("input", function () {
      const count = this.value.length;
      reviewCount.textContent = `${count}/1000`;
      reviewCount.style.color = count > 1000 ? "#ef4444" : "#9ca3af";
    });
  },

  initPhotoUpload() {
    const photoInput = document.getElementById("reviewPhotos");
    const previewGrid = document.getElementById("photoPreviewGrid");

    photoInput?.addEventListener("change", (e) => {
      const files = Array.from(e.target.files);

      // Max 3 photos
      if (this.selectedPhotos.length + files.length > 3) {
        alert("Maximum 3 photos allowed");
        return;
      }

      files.forEach((file) => {
        if (file.size > 5 * 1024 * 1024) {
          alert(`${file.name} is too large (max 5MB)`);
          return;
        }

        this.selectedPhotos.push(file);
        this.addPhotoPreview(file);
      });
    });
  },

  addPhotoPreview(file) {
    const previewGrid = document.getElementById("photoPreviewGrid");
    const reader = new FileReader();

    reader.onload = (e) => {
      const div = document.createElement("div");
      div.className = "photo-preview-item";
      div.innerHTML = `
        <img src="${e.target.result}" alt="Preview">
        <button type="button" class="photo-remove-btn" data-file="${file.name}">×</button>
      `;

      div.querySelector(".photo-remove-btn").addEventListener("click", () => {
        this.removePhoto(file.name);
        div.remove();
      });

      previewGrid.appendChild(div);
    };

    reader.readAsDataURL(file);
  },

  removePhoto(fileName) {
    this.selectedPhotos = this.selectedPhotos.filter(
      (f) => f.name !== fileName
    );
  },

  initFormSubmit() {
    const form = document.getElementById("reviewForm");

    form?.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Validate
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Get form data
      const formData = new FormData(form);
      const reviewData = {
        rating: formData.get("rating"),
        name: formData.get("name"),
        email: formData.get("email"),
        title: formData.get("title"),
        review: formData.get("review"),
        verified: formData.get("verified") === "on",
        recommend: formData.get("recommend"),
        photos: this.selectedPhotos,
        productId: "sofa-001",
        date: new Date().toISOString(),
      };

      // Show loading
      const submitBtn = form.querySelector(".btn-submit");
      const btnText = submitBtn.querySelector(".btn-text");
      const btnLoader = submitBtn.querySelector(".btn-loader");

      submitBtn.disabled = true;
      btnText.style.display = "none";
      btnLoader.style.display = "inline";

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Save to localStorage (for demo)
        let reviews = JSON.parse(localStorage.getItem("userReviews")) || [];
        reviews.push(reviewData);
        localStorage.setItem("userReviews", JSON.stringify(reviews));

        // Add to page
        this.addReviewToPage(reviewData);

        // Success
        alert(
          "Thank you for your review! It will be published after moderation."
        );

        // Reset form
        form.reset();
        this.selectedPhotos = [];
        document.getElementById("photoPreviewGrid").innerHTML = "";
        document.getElementById("reviewModal").classList.remove("active");
        document.body.style.overflow = "";

        console.log("✅ Review submitted:", reviewData);
      } catch (error) {
        alert("Error submitting review. Please try again.");
        console.error("Review submission error:", error);
      } finally {
        submitBtn.disabled = false;
        btnText.style.display = "inline";
        btnLoader.style.display = "none";
      }
    });
  },

  addReviewToPage(reviewData) {
    const reviewsGrid = document.querySelector(".reviews-grid");
    if (!reviewsGrid) return;

    const reviewCard = document.createElement("div");
    reviewCard.className = "review-card";
    reviewCard.setAttribute("data-rating", reviewData.rating);

    const initials = reviewData.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
    const stars =
      "★".repeat(parseInt(reviewData.rating)) +
      "☆".repeat(5 - parseInt(reviewData.rating));

    reviewCard.innerHTML = `
      <div class="review-header">
        <div class="reviewer-info">
          <div class="reviewer-avatar">${initials}</div>
          <div class="reviewer-details">
            <h4 class="reviewer-name">${reviewData.name}</h4>
            <div class="review-meta">
              ${
                reviewData.verified
                  ? '<span class="verified-badge">✓ Verified Purchase</span>'
                  : ""
              }
              <span class="review-date">Just now</span>
            </div>
          </div>
        </div>
        <div class="review-rating">
          ${stars
            .split("")
            .map(
              (s) =>
                `<span class="star ${s === "★" ? "filled" : ""}">${s}</span>`
            )
            .join("")}
        </div>
      </div>
      <div class="review-content">
        <h5 class="review-title">${reviewData.title}</h5>
        <p class="review-text">${reviewData.review}</p>
      </div>
      <div class="review-footer">
        <button class="helpful-btn">
          <span class="icon">👍</span> Helpful (0)
        </button>
        <button class="report-btn">Report</button>
      </div>
    `;

    reviewsGrid.insertBefore(reviewCard, reviewsGrid.firstChild);
  },
};

// Add to initialization
document.addEventListener("DOMContentLoaded", () => {
  // ... existing code ...
  ReviewFormManager.init();
});
// =========================================================
// ✅ REVIEW FORM - SUBMIT & DISPLAY
const ReviewFormSubmit = {
  init() {
    const form = document.getElementById("reviewForm");
    const modal = document.getElementById("reviewModal");
    const closeBtn = document.getElementById("closeReviewModal");
    const cancelBtn = document.getElementById("cancelReviewBtn");

    if (!form || !modal) {
      console.error("❌ Review form or modal not found!");
      return;
    }

    // Close modal function
    const closeModal = () => {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    };

    // Close button click
    closeBtn?.addEventListener("click", closeModal);
    cancelBtn?.addEventListener("click", closeModal);

    // Close on outside click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    // Close on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
      }
    });

    // ✅ FORM SUBMIT
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Check if checkbox is checked
      const agreeTerms = document.getElementById("agreeTerms");
      if (!agreeTerms.checked) {
        Utils.showNotification(
          "❌ Please agree to the review guidelines",
          "warning"
        );
        return;
      }

      // Validate form
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Get form data
      const formData = {
        name: document.getElementById("reviewerName")?.value || "Anonymous",
        email: document.getElementById("reviewerEmail")?.value || "",
        title: document.getElementById("reviewTitle")?.value || "",
        review: document.getElementById("reviewText")?.value || "",
        rating:
          document.querySelector('input[name="rating"]:checked')?.value || "5",
        verified: document.getElementById("verifiedPurchase")?.checked || false,
        recommend:
          document.querySelector('input[name="recommend"]:checked')?.value ||
          "yes",
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };

      // ✅ ADD REVIEW TO PAGE NGAY LẬP TỨC
      this.addReviewToPage(formData);

      // Show success notification
      Utils.showNotification("✅ Review submitted successfully!", "success");

      // Reset form
      form.reset();

      // Close modal
      closeModal();

      // Scroll to reviews section
      const reviewsSection = document.querySelector(".reviews-grid");
      if (reviewsSection) {
        setTimeout(() => {
          reviewsSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 500);
      }

      console.log("✅ Review submitted:", formData);
    });

    console.log("✅ Review Form Submit initialized");
  },

  addReviewToPage(reviewData) {
    const reviewsGrid = document.querySelector(".reviews-grid");

    if (!reviewsGrid) {
      console.error("❌ Reviews grid not found!");
      return;
    }

    // Create stars
    const starsHTML = Array(5)
      .fill(0)
      .map((_, i) => {
        const isFilled = i < parseInt(reviewData.rating);
        return `<span class="star${isFilled ? " filled" : ""}">★</span>`;
      })
      .join("");

    // Get initials
    const initials = reviewData.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    // Create review card
    const reviewCard = document.createElement("div");
    reviewCard.className = "review-card";
    reviewCard.setAttribute("data-rating", reviewData.rating);

    reviewCard.innerHTML = `
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">${initials}</div>
                    <div>
                        <h4 class="reviewer-name">${reviewData.name}</h4>
                        <div style="font-size: 12px; color: #9ca3af;">
                            ${
                              reviewData.verified
                                ? "<span>✓ Verified Purchase</span>"
                                : ""
                            }
                            <span>${reviewData.date}</span>
                        </div>
                    </div>
                </div>
                <div class="review-rating">
                    ${starsHTML}
                </div>
            </div>
            <h5 class="review-title">${reviewData.title}</h5>
            <p class="review-text">${reviewData.review}</p>
            <div style="margin-top: 15px; font-size: 14px; color: #3b6d54; font-weight: 600;">
                ✓ Recommend: ${reviewData.recommend === "yes" ? "Yes" : "No"}
            </div>
        `;

    // Add to top
    reviewsGrid.insertBefore(reviewCard, reviewsGrid.firstChild);

    // Animate entrance
    reviewCard.style.opacity = "0";
    reviewCard.style.transform = "translateY(-20px)";

    setTimeout(() => {
      reviewCard.style.transition = "all 0.5s ease";
      reviewCard.style.opacity = "1";
      reviewCard.style.transform = "translateY(0)";
    }, 10);

    console.log("✅ Review added to page:", reviewData);
  },
};

// ✅ Initialize
document.addEventListener("DOMContentLoaded", () => {
  ReviewFormSubmit.init();
});

// Form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Check if checkbox is checked
  const agreeTerms = document.getElementById("agreeTerms");
  if (!agreeTerms.checked) {
    Utils.showNotification(
      "❌ Please agree to the review guidelines",
      "warning"
    );
    return;
  }

  // Validate form
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // ... rest of submit code
});
