// Mobile Menu Enhancement - Ensure Get started button is accessible

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
  } else {
    initMobileMenu();
  }

  function initMobileMenu() {
    const navButton = document.querySelector('.nav_mobile-menu-button, .w-nav-button');
    const navMenu = document.querySelector('.w-nav-menu');
    const navContainer = document.querySelector('.nav_container');
    const getStartedButton = document.querySelector('.nav_right > .button-group.margin-top_none');
    
    if (!navButton || !navMenu) return;

    // Clone Get started button for mobile menu
    function addGetStartedToMenu() {
      if (!getStartedButton) return;
      
      const clonedButton = getStartedButton.cloneNode(true);
      clonedButton.classList.add('mobile-menu-cta');
      clonedButton.style.display = 'none';
      
      // Check if already added
      if (navMenu.querySelector('.mobile-menu-cta')) {
        return;
      }
      
      navMenu.appendChild(clonedButton);
    }

    // Handle menu open/close
    function handleMenuToggle() {
      const isOpen = navMenu.classList.contains('w--open');
      const clonedButton = navMenu.querySelector('.mobile-menu-cta');
      
      if (isOpen) {
        // Show cloned button in menu
        if (clonedButton) {
          clonedButton.style.display = 'flex';
        }
        // Hide original button
        if (getStartedButton) {
          getStartedButton.style.display = 'none';
        }
        // Prevent body scroll
        document.body.classList.add('w-nav-open');
      } else {
        // Hide cloned button
        if (clonedButton) {
          clonedButton.style.display = 'none';
        }
        // Show original button
        if (getStartedButton) {
          getStartedButton.style.display = 'flex';
        }
        // Allow body scroll
        document.body.classList.remove('w-nav-open');
      }
    }

    // Initial setup
    addGetStartedToMenu();

    // Listen for menu state changes
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class') {
          handleMenuToggle();
        }
      });
    });

    observer.observe(navMenu, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Handle menu button click
    navButton.addEventListener('click', function() {
      setTimeout(handleMenuToggle, 100);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (navMenu.classList.contains('w--open')) {
        if (!navContainer.contains(e.target) && !navMenu.contains(e.target)) {
          navButton.click();
        }
      }
    });

    // Handle resize - ensure proper state
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if (window.innerWidth > 991 && navMenu.classList.contains('w--open')) {
          navButton.click();
        }
        handleMenuToggle();
      }, 250);
    });

    // Initial state check
    handleMenuToggle();
  }
})();

