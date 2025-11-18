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
      const openFormBtn = document.getElementById("openReviewFormBtn");
      const openModal = () => {
        const modal = document.getElementById("reviewModal");
        if (modal) {
          modal.classList.add("active");
          document.body.style.overflow = "hidden";
        } else {
          console.error("❌ Review modal not found in HTML!");
        }
      };
      if (writeReviewBtn) {
        writeReviewBtn.addEventListener("click", () => this.openReviewModal());
      }
      if (openFormBtn) {
        openFormBtn.addEventListener("click", () => this.openReviewModal());
      }
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
  // 14. REVIEW FORM SUBMIT
  // =========================================================

  const ReviewFormSubmit = {
    selectedPhotos: [],

    init() {
      const form = document.getElementById("reviewForm");
      const modal = document.getElementById("reviewModal");
      const closeBtn = document.getElementById("closeReviewModal");
      const cancelBtn = document.getElementById("cancelReviewBtn");
      const openBtn = document.getElementById("openReviewFormBtn");
      const writeReviewBtn = document.querySelector(".write-review-btn-modern");

      if (!form || !modal) {
        console.error("❌ Review form or modal not found!");
        return;
      }

      // Open modal handlers
      if (openBtn) {
        openBtn.addEventListener("click", () => this.openModal());
      }
      if (writeReviewBtn) {
        writeReviewBtn.addEventListener("click", () => this.openModal());
      }

      // Close modal function
      const closeModal = () => {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      };

      closeBtn?.addEventListener("click", closeModal);
      cancelBtn?.addEventListener("click", closeModal);

      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
          closeModal();
        }
      });

      this.initStarRating();
      this.initCharCounters();
      this.initPhotoUpload();
      this.initFormSubmit(form, closeModal);

      console.log("✅ Review Form Submit initialized");
    },

    openModal() {
      const modal = document.getElementById("reviewModal");
      if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    },

    initStarRating() {
      const starInputs = document.querySelectorAll(
        '.star-rating-input input[name="rating"]'
      );
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
        if (titleCount) {
          titleCount.textContent = `${count}/100`;
          titleCount.style.color = count > 100 ? "#ef4444" : "#9ca3af";
        }
      });

      reviewText?.addEventListener("input", function () {
        const count = this.value.length;
        if (reviewCount) {
          reviewCount.textContent = `${count}/1000`;
          reviewCount.style.color = count > 1000 ? "#ef4444" : "#9ca3af";
        }
      });
    },

    initPhotoUpload() {
      const photoInput = document.getElementById("reviewPhotos");
      const previewGrid = document.getElementById("photoPreviewGrid");

      photoInput?.addEventListener("change", (e) => {
        const files = Array.from(e.target.files);

        if (this.selectedPhotos.length + files.length > 3) {
          Utils.showNotification("Maximum 3 photos allowed", "warning");
          return;
        }

        files.forEach((file) => {
          if (file.size > 5 * 1024 * 1024) {
            Utils.showNotification(
              `${file.name} is too large (max 5MB)`,
              "warning"
            );
            return;
          }

          this.selectedPhotos.push(file);
          this.addPhotoPreview(file);
        });
      });
    },

    addPhotoPreview(file) {
      const previewGrid = document.getElementById("photoPreviewGrid");
      if (!previewGrid) return;

      const reader = new FileReader();

      reader.onload = (e) => {
        const div = document.createElement("div");
        div.className = "photo-preview-item";
        div.style.cssText = `
          position: relative; display: inline-block;
          margin: 5px; width: 80px; height: 80px;
        `;

        div.innerHTML = `
          <img src="${e.target.result}" alt="Preview" style="
            width: 100%; height: 100%; object-fit: cover;
            border-radius: 8px; border: 2px solid #3b6d54;
          ">
          <button type="button" class="photo-remove-btn" data-file="${file.name}" style="
            position: absolute; top: -8px; right: -8px;
            width: 24px; height: 24px; border-radius: 50%;
            background: #ef4444; color: white; border: none;
            cursor: pointer; font-size: 16px; line-height: 1;
          ">×</button>
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

    initFormSubmit(form, closeModal) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const agreeTerms = document.getElementById("agreeTerms");
        if (agreeTerms && !agreeTerms.checked) {
          Utils.showNotification(
            "Please agree to the review guidelines",
            "warning"
          );
          return;
        }

        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        const formData = {
          name: document.getElementById("reviewerName")?.value || "Anonymous",
          email: document.getElementById("reviewerEmail")?.value || "",
          title: document.getElementById("reviewTitle")?.value || "",
          review: document.getElementById("reviewText")?.value || "",
          rating:
            document.querySelector('input[name="rating"]:checked')?.value ||
            "5",
          verified:
            document.getElementById("verifiedPurchase")?.checked || false,
          recommend:
            document.querySelector('input[name="recommend"]:checked')?.value ||
            "yes",
          date: "Just now",
          images: this.selectedPhotos.map((file) => URL.createObjectURL(file)),
        };

        const submitBtn = form.querySelector(".btn-submit");
        if (submitBtn) {
          const originalText = submitBtn.innerHTML;
          submitBtn.disabled = true;
          submitBtn.innerHTML = "<span>⏳ Submitting...</span>";

          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
          }, 1500);
        }

        try {
          let reviews = JSON.parse(localStorage.getItem("userReviews")) || [];
          reviews.push(formData);
          localStorage.setItem("userReviews", JSON.stringify(reviews));
        } catch (error) {
          console.error("Error saving to localStorage:", error);
        }

        this.addReviewToPage(formData);
        Utils.showNotification("✅ Review submitted successfully!", "success");

        form.reset();
        this.selectedPhotos = [];
        const previewGrid = document.getElementById("photoPreviewGrid");
        if (previewGrid) previewGrid.innerHTML = "";

        const ratingMessage = document.getElementById("ratingMessage");
        if (ratingMessage) ratingMessage.textContent = "Select a rating";

        const titleCount = document.getElementById("titleCharCount");
        const reviewCount = document.getElementById("reviewCharCount");
        if (titleCount) titleCount.textContent = "0/100";
        if (reviewCount) reviewCount.textContent = "0/1000";

        closeModal();

        setTimeout(() => {
          const reviewsSection = document.querySelector(".reviews-grid");
          if (reviewsSection) {
            reviewsSection.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 500);

        console.log("✅ Review submitted:", formData);
      });
    },

    addReviewToPage(reviewData) {
      const reviewsGrid = document.querySelector(".reviews-grid");

      if (!reviewsGrid) {
        console.error("❌ Reviews grid not found!");
        return;
      }

      const starsHTML = Array(5)
        .fill(0)
        .map((_, i) => {
          const isFilled = i < parseInt(reviewData.rating);
          return `<span class="star${isFilled ? " filled" : ""}">★</span>`;
        })
        .join("");

      const initials = reviewData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

      const reviewCard = document.createElement("div");
      reviewCard.className = "review-card";
      reviewCard.setAttribute("data-scroll", "scale-up");
      reviewCard.setAttribute("data-rating", reviewData.rating);

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
                <span class="review-date">${reviewData.date}</span>
              </div>
            </div>
          </div>
          <div class="review-rating">
            ${starsHTML}
          </div>
        </div>

        <div class="review-content">
          <h5 class="review-title">${reviewData.title}</h5>
          <p class="review-text">
            ${reviewData.review}
          </p>
        </div>

        ${
          reviewData.images && reviewData.images.length > 0
            ? `
          <div class="review-images">
            ${reviewData.images
              .map(
                (img) => `
              <img src="${img}" alt="Customer photo" class="review-img" />
            `
              )
              .join("")}
          </div>
        `
            : ""
        }

        <div class="review-footer">
          <button class="helpful-btn">
            <span class="icon">👍</span>
            Helpful (0)
          </button>
          <button class="report-btn">Report</button>
        </div>
      `;

      reviewsGrid.insertBefore(reviewCard, reviewsGrid.firstChild);

      reviewCard.style.opacity = "0";
      reviewCard.style.transform = "translateY(-20px)";

      setTimeout(() => {
        reviewCard.style.transition = "all 0.5s ease";
        reviewCard.style.opacity = "1";
        reviewCard.style.transform = "translateY(0)";
      }, 10);

      this.attachReviewCardEvents(reviewCard);

      console.log("✅ Review added to page:", reviewData);
    },

    attachReviewCardEvents(reviewCard) {
      const helpfulBtn = reviewCard.querySelector(".helpful-btn");
      if (helpfulBtn) {
        helpfulBtn.addEventListener("click", function () {
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
          }
        });
      }

      const reportBtn = reviewCard.querySelector(".report-btn");
      if (reportBtn) {
        reportBtn.addEventListener("click", function () {
          if (confirm("Report this review as inappropriate?")) {
            Utils.showNotification(
              "Review has been reported. Thank you!",
              "info"
            );
            this.disabled = true;
            this.textContent = "Reported";
            this.style.opacity = "0.5";
          }
        });
      }

      const reviewImages = reviewCard.querySelectorAll(".review-img");
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
    ReviewFormSubmit.init();

    console.log("✅ Modern Product Page Fully Initialized!");
  });
})();
