// Wrap our logic in a Self-Invoking Anonymous Function
// This prevents our vars and funcs to leak into global scope
(function () {
  // A function that removes JS disabled banner if this
  // funcation can execute (meaning JS is enabled by client)
  const testForJS = () => {
    // 1. Get the body DOM element
    //  Note: getElementsByTagName returns a list of nodes (ie: an Array)
    //        Therefore, we need to get the first element in that array to access the DOM node
    const body = document.getElementsByTagName("body")[0];

    // 2. Remove the `no-js` class name from the body element
    //    Our CSS rules will hide the notification banner if .no-js is removed
    body.classList.remove("no-js");
  };

  // Logic for mobile menu drawer
  const navToggle = () => {
    // 1. Get DOM elements for menu container, hamburger button, and close button
    const menu = document.querySelector(".js-nav");
    const hamburgerBtn = document.querySelector(".js-hamburger");
    const closeBtn = document.querySelector(".js-nav-close");
    const activeClass = "nav-main--mobile-show";

    // if there isn't a menu, return out of the function
    if (!menu) {
      return;
    }

    // 2. Toggle mobile nav visibility class to show/hide menu
    const toggleNav = () => {
      menu.classList.toggle(activeClass);
    };

    // 3. Listen for click event on hamburder and close buttons if they exist
    if (hamburgerBtn) {
      hamburgerBtn.addEventListener("click", toggleNav);
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", toggleNav);
    }
  };

  // Update text with current year
  const updateCurrentYear = () => {
    // 1. Get all elements that need to be updated
    const elements = document.querySelectorAll(".js-current-year");

    // if we don't have any elements, skip everthing else
    if (elements.length === 0) return;

    // 2. Create a Date object for the current year
    const currentYear = new Date().getFullYear();

    // 3. Loop through each element and update inner html to current year
    elements.forEach((element) => {
      element.innerHTML = currentYear;

      // If the element has a datetime attribute, update that as well
      if (element.hasAttribute("datetime")) {
        element.setAttribute("datetime", currentYear);
      }
    });
  };

  // All function initialization goes here
  const init = () => {
    testForJS();
    navToggle();
    updateCurrentYear();
  };

  // Call initialization function
  init();
})();
