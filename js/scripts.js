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

  // Color Theme support and theme switching - Basic Example
  // const colorTheme = () => {
  //   // 1. Get current theme data attribute
  //   const documentEl = document.documentElement;
  //   const currentTheme = documentEl.getAttribute("data-theme");

  //   // 2. Get toggle button
  //   const toggleBtn = document.getElementById("theme-input");

  //   // 3. Function to handle toggle event
  //   const switchTheme = (event) => {
  //     if (event.target.checked) {
  //       documentEl.setAttribute("data-theme", "dark");
  //     } else {
  //       documentEl.setAttribute("data-theme", "light");
  //     }
  //   };

  //   // 4. Add event listener to toggle color theme
  //   if (toggleBtn) {
  //     toggleBtn.addEventListener("change", switchTheme);
  //   }
  // };

  // Color Theme support and theme switching
  // that will persist user settings
  const colorTheme = () => {
    // 1. Get current theme from Local Storage
    const documentEl = document.documentElement;
    const currentTheme = localStorage.getItem("theme");

    // 2. Get toggle button
    const toggleInput = document.getElementById("theme-input");

    // 3. Check user preferences for darkmode support
    // if they prefer darkmode and theme hasn't been set,
    // let's set this automatically
    const prefersDarkmode = window.matchMedia("(prefers-color-scheme: dark)")
      .matches;

    if (!currentTheme && prefersDarkmode) {
      documentEl.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }

    // 4. Check if theme is set in Local Storage
    // if it is, update the data-theme attribute
    if (currentTheme) {
      documentEl.setAttribute("data-theme", currentTheme);

      if (currentTheme === "dark") {
        toggleInput.checked = true;
      }
    }

    // 5. Function to handle toggle event
    // and save current state to Local Storage
    const switchTheme = (event) => {
      if (event.target.checked) {
        documentEl.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      } else {
        documentEl.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      }
    };

    // 6. Add event listener to toggle color theme
    if (toggleInput) {
      toggleInput.addEventListener("change", switchTheme);
    }
  };

  // All function initialization goes here
  const init = () => {
    testForJS();
    navToggle();
    updateCurrentYear();
    colorTheme();
  };

  // Call initialization function
  init();
})();
