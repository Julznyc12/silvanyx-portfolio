/* Silvanyx — minimal mobile navigation toggle.
   No dependencies. Isolated to nav open/close behavior. */
(function () {
  "use strict";

  var toggle = document.getElementById("navToggle");
  var panel = document.getElementById("mobileNav");

  if (!toggle || !panel) {
    return;
  }

  function closeMenu() {
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  }

  function openMenu() {
    panel.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
  }

  function isOpen() {
    return toggle.getAttribute("aria-expanded") === "true";
  }

  toggle.addEventListener("click", function () {
    if (isOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close the menu after a link inside it is chosen.
  panel.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
      closeMenu();
    }
  });

  // Escape closes the menu and returns focus to the toggle button.
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isOpen()) {
      closeMenu();
      toggle.focus();
    }
  });

  // Defensive: if the viewport is widened past the mobile breakpoint
  // while the menu is open, close it so state stays consistent.
  window.addEventListener("resize", function () {
    if (window.innerWidth > 900 && isOpen()) {
      closeMenu();
    }
  });
})();
