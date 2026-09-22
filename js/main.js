/* =====================================================
   JP Tadduni, LLC — Shared JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
      const icon = menuBtn.querySelector('i');
      if (mobileNav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // Close mobile menu when clicking a link
    mobileNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileNav.classList.remove('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    });
  }

  // Active nav link highlighting
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-desktop a, .mobile-nav a');

  navLinks.forEach(function(link) {
    const href = link.getAttribute('href');
    if (href) {
      const linkPage = href.split('/').pop();
      if (linkPage === currentPage ||
          (currentPage === '' && linkPage === 'index.html') ||
          (currentPage === 'index.html' && linkPage === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });

  // Header shadow on scroll
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.12)';
      } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
      }
    });
  }

  // Contact form handling (prevent default, show alert)
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    });
  }

  // Gallery lightbox
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-label', 'Gallery image viewer');
    lightbox.innerHTML =
      '<button class="lightbox-close" aria-label="Close"><i class="fas fa-times"></i></button>' +
      '<button class="lightbox-prev" aria-label="Previous image"><i class="fas fa-chevron-left"></i></button>' +
      '<img src="" alt="" />' +
      '<div class="lightbox-caption"><h4></h4><p></p></div>' +
      '<button class="lightbox-next" aria-label="Next image"><i class="fas fa-chevron-right"></i></button>';
    document.body.appendChild(lightbox);

    const img = lightbox.querySelector('img');
    const capTitle = lightbox.querySelector('.lightbox-caption h4');
    const capText = lightbox.querySelector('.lightbox-caption p');
    let current = 0;

    function show(index) {
      current = (index + galleryItems.length) % galleryItems.length;
      const item = galleryItems[current];
      const source = item.querySelector('img').src;
      const caption = item.querySelector('.gallery-caption');
      img.src = source;
      img.alt = item.querySelector('img').alt;
      capTitle.textContent = caption ? caption.querySelector('h4').textContent : '';
      capText.textContent = caption ? caption.querySelector('p').textContent : '';
    }

    function open(index) {
      show(index);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    galleryItems.forEach(function(item, index) {
      item.addEventListener('click', function() { open(index); });
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', close);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', function() { show(current - 1); });
    lightbox.querySelector('.lightbox-next').addEventListener('click', function() { show(current + 1); });

    // Click the dark backdrop (not the image) to close
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox || e.target.classList.contains('lightbox-caption')) close();
    });

    document.addEventListener('keydown', function(e) {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }
});
