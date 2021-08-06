//variables
const headerTop = document.querySelector('header');

const navigationShopLinksToggler = document.querySelector(
  '.navigation-toggler '
);
const shopLinks = document.querySelector('.navigation-links-wrapper');
const sectionShopLinks = document.querySelector('.navigation-shop-link');
const shopLinksWrapper = document.querySelector('.shop-hover-links-wrapper');

//functions
// const renderTopNavigation = () => {};

//events
navigationShopLinksToggler.addEventListener('click', (e) => {
  e.preventDefault();

  if (shopLinks.style.display === 'none') {
    shopLinks.style.display = 'block';
    shopLinks.style.top = '25px';
  } else {
    shopLinks.style.display = 'none';
  }
});
sectionShopLinks.addEventListener('click', (e) => {
  e.preventDefault();

  if (shopLinksWrapper.style.display === 'none') {
    shopLinksWrapper.style.display = 'block';
  } else {
    shopLinksWrapper.style.display = 'none';
  }
});

// document.addEventListener('DOMContentLoaded', renderTopNavigation);
