// wait until the html is fully loaded before running any javascript
document.addEventListener("DOMContentLoaded", () => {
  // grab the hero tiny animation container by its id
  const heroScene = document.getElementById("heroTinyScene");

  // if the element does not exist on the page, stop running this code
  if (!heroScene) return;

  // check if the user prefers reduced motion (accessibility setting)
  const prefersReducedMotion = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)",
  )?.matches;

  // if the user prefers reduced motion, immediately apply the animation class
  if (prefersReducedMotion) {
    heroScene.classList.add("animate");
    return;
  }

  // add a small delay so the animation feels intentional after page load
  setTimeout(() => {
    heroScene.classList.add("animate");
  }, 250);
});

// - - - - - - - - - - - - - - -
// pop-in titles on scroll
// - - - - - - - - - - - - - - -

// select all elements that should "pop in" when scrolled into view
const popTitles = document.querySelectorAll(".pop-title");

// create an intersection observer to watch when elements enter the viewport
const titleObserver = new IntersectionObserver(
  (entries) => {
    // loop through every observed entry
    entries.forEach((entry) => {
      // if the element is visible on screen
      if (entry.isIntersecting) {
        // add the visible class to trigger css animation
        entry.target.classList.add("visible");
      }
    });
  },
  {
    // element must be at least 40% visible before triggering
    threshold: 0.4,
  },
);

// start observing each title element
popTitles.forEach((title) => titleObserver.observe(title));

// - - - - - - - - - - - - - - -
// start section tiny star animation
// - - - - - - - - - - - - - - -

document.addEventListener("DOMContentLoaded", () => {
  // grab the start section tiny animation container
  const startScene = document.getElementById("startTinyScene");

  // if the element does not exist, stop running this code
  if (!startScene) return;

  // check for reduced motion preference again
  const prefersReducedMotion = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)",
  )?.matches;

  // if reduced motion is preferred, animate immediately
  if (prefersReducedMotion) {
    startScene.classList.add("animate");
    return;
  }

  // create an observer to trigger animation when the section is visible
  const obs2 = new IntersectionObserver(
    ([entry]) => {
      // if the section enters the viewport
      if (entry.isIntersecting) {
        // add animation class
        startScene.classList.add("animate");

        // stop observing once animation has triggered
        obs2.disconnect();
      }
    },
    {
      // section must be 50% visible before triggering
      threshold: 0.5,
    },
  );

  // start observing the start scene element
  obs2.observe(startScene);
});

// - - - - - - - - - - - - - - -
// stats slideshow functionality
// - - - - - - - - - - - - - - -
(function () {
  const statsTrack = document.querySelector(".stats-track");
  const slides = document.querySelectorAll(".stat-slide");
  const dotsContainer = document.getElementById("statsDots");

  if (!statsTrack || !slides.length || !dotsContainer) return;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)",
  )?.matches;

  let currentSlide = 0;
  const totalSlides = slides.length;
  const slideInterval = 4000; // 4 seconds per slide
  let autoSlideTimer;

  // Create dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("button");
    dot.classList.add("dot");
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  const dots = document.querySelectorAll(".dot");

  function updateSlidePosition() {
    const offset = -currentSlide * 100;
    statsTrack.style.transform = `translateX(${offset}%)`;

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  function goToSlide(index) {
    currentSlide = index;
    updateSlidePosition();
    if (!prefersReducedMotion) {
      resetAutoSlide();
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlidePosition();
  }

  function startAutoSlide() {
    if (prefersReducedMotion) return; // Don't auto-advance if reduced motion
    autoSlideTimer = setInterval(nextSlide, slideInterval);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
  }

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  statsTrack.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true },
  );

  statsTrack.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true },
  );

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next slide
        currentSlide = (currentSlide + 1) % totalSlides;
      } else {
        // Swipe right - previous slide
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      }
      updateSlidePosition();
      if (!prefersReducedMotion) {
        resetAutoSlide();
      }
    }
  }

  // Start the slideshow (only if motion is okay)
  startAutoSlide();

  // Pause on hover (desktop) - only if auto-sliding
  if (!prefersReducedMotion) {
    statsTrack.addEventListener("mouseenter", () => {
      clearInterval(autoSlideTimer);
    });

    statsTrack.addEventListener("mouseleave", () => {
      startAutoSlide();
    });
  }
})();
