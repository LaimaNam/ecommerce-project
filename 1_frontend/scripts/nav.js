//variables
const headerTop = document.querySelector('header');

const navigationShopLinksToggler = document.querySelector(
  '.navigation-shop-link'
);
const shopLinks = document.querySelector('.shop-hover-links-wrapper');
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
// document.addEventListener('DOMContentLoaded', renderTopNavigation);
