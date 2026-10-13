document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }
  
  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Toggle visibility of <br> tags for mobile view
   */
  function handleResize() {
    const brElements = document.querySelectorAll('br');
    if (window.innerWidth <= 1399) {
      brElements.forEach(br => br.style.display = 'none');
    } else {
      brElements.forEach(br => br.style.display = 'inline');
    }
  }
  
  window.addEventListener('resize', handleResize);
  window.addEventListener('load', handleResize);

  /**
   * Init swiper slider with 3 slides at once in desktop view
   */
  new Swiper('.slides-3', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    centeredSlides: false, 
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20 
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 25 
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 30 
      }
    }
  });

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });
  
  /**
   * Animation in hero
   */

  const itemWrappers = document.querySelectorAll('.hero-item-wrapper');

  const item1 = document.querySelector('.hero-item.item1');
  const item2 = document.querySelector('.hero-item.item2');
  const item3 = document.querySelector('.hero-item.item3');

  function setInitialStates() {
    if (window.innerWidth > 991) {
      item1.querySelector('.overlay').classList.add('overlay-active');
      item1.querySelector('.content').style.opacity = '1';
      item1.querySelector('.content').style.display = 'flex';

      item2.querySelector('.content').style.opacity = '0';
      item2.querySelector('.content').style.display = 'none';

      item3.querySelector('.content').style.opacity = '0';
      item3.querySelector('.content').style.display = 'none';

      item1.closest('.hero-item-wrapper').classList.add('col-lg-6');
    } else {
      itemWrappers.forEach(wrapper => {
        const content = wrapper.querySelector('.content');
        content.style.display = 'flex';
        content.style.opacity = '1';
      });
    }
  }

  function handleMouseover(item) {
    if (window.innerWidth > 991) {
      item1.querySelector('.overlay').classList.remove('overlay-active');
      
      itemWrappers.forEach(wrapper => {
        const content = wrapper.querySelector('.content');
        if (wrapper === item) {
          content.style.display = 'flex';
          content.style.opacity = '1';

          wrapper.classList.remove('col-lg-3');
          wrapper.classList.add('col-lg-6');
        } else {
          content.style.opacity = '0';
          content.style.display = 'none';

          wrapper.classList.remove('col-lg-6');
          wrapper.classList.add('col-lg-3');
        }
      });
    }
  }

  function handleMouseleave() {
    if (window.innerWidth > 991) {
      item1.querySelector('.overlay').classList.add('overlay-active');
      item1.querySelector('.content').style.display = 'flex';
      item1.querySelector('.content').style.opacity = '1';

      item2.querySelector('.content').style.opacity = '0';
      item2.querySelector('.content').style.display = 'none';

      item3.querySelector('.content').style.opacity = '0';
      item3.querySelector('.content').style.display = 'none';

      itemWrappers.forEach(wrapper => {
        wrapper.classList.remove('col-lg-6');
        wrapper.classList.add('col-lg-3');
      });

      item1.closest('.hero-item-wrapper').classList.add('col-lg-6');
    }
  }

  setInitialStates();

  window.addEventListener('resize', setInitialStates);

  itemWrappers.forEach(wrapper => {
    wrapper.addEventListener('mouseover', function() {
      handleMouseover(this);
    });

    wrapper.addEventListener('mouseleave', function() {
      handleMouseleave();
    });
  });

  /**
   * Animation on category
   */
  const firstCategoryItem = document.querySelectorAll('.category-item');
  if (firstCategoryItem.length > 0) {
      firstCategoryItem[0].classList.add('first-category-item');
  }

  function removeFirstCategoryClass() {
      const itemWithClass = document.querySelector('.first-category-item');
      if (itemWithClass) {
          itemWithClass.classList.remove('first-category-item');

          categoryItems.forEach(item => {
              item.removeEventListener('mouseover', removeFirstCategoryClass);
          });
      }
  }

  const categoryItems = document.querySelectorAll('.category-item');
  if (categoryItems.length > 0) {
      categoryItems.forEach(item => {
          item.addEventListener('mouseover', removeFirstCategoryClass);
      });
  }

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
    const glightbox = GLightbox({
      selector: '.glightbox'
    });

});