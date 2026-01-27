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


//navigation menu 
const toggle = document.querySelector('.menu-toggle');

const nav = document.querySelector('.navigation');

toggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});