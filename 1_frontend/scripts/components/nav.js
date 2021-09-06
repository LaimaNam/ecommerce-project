const renderNavigation = () => {
  // -- variables
  const header = document.querySelector('header');

  header.innerHTML = `
  <div class="header-top">
        <div class="header-top-left">
          <a href="${
            location.href.includes('pages') ? '../index.html' : './index.html'
          }"><img src=${
    location.href.includes('pages')
      ? '../assets/shop-logo.png'
      : './assets/shop-logo.png'
  } alt="" /></a>
        </div>
        <div class="header-top-right">
          <div class="header-top-right-phone">
            <i class="fas fa-mobile-alt"></i>
            <span>+1 800 800 00</span>
          </div>
          <div class="header-top-right-email">
            <i class="far fa-envelope"></i>
            <span>mail@shop.io</span>
          </div>
          <div class="header-top-right-cart">
          <a href="${
            location.href.includes('pages')
              ? './cartPage.html'
              : './pages/cartPage.html'
          }"><i class="fas fa-shopping-cart"></i></a>
            <span class="cart-items"
              ><span id="cart-items-count">0</span>
            </span>
          </div>
        </div>
      </div>

    
      <div class="navigation-toggler">
        <i class="fas fa-bars"></i>
      </div>
      <nav>
        <a href=${
          location.href.includes('pages') ? '../index.html' : './index.html'
        }>Home</a>
        <a href="" class="nav-shop-link"
          >Shop <i class="fas fa-angle-down"></i
        ></a>
        <div class="shop-links-wrapper">
          <ul class="shop-links-list">
            <li><a href=${
              location.href.includes('pages')
                ? './productsPage.html'
                : './pages/productsPage.html'
            }>All</a></li>
            <li><a href="">Accessories</a></li>
            <li><a href="">Jewelry</a></li>
            <li><a href="">Bags</a></li>
            <li><a href="">Clothes</a></li>
          </ul>
        </div>
        <a href="">Whishlist</a>
      </nav>
  `;
  const mainNavigationTogglerBtn = document.querySelector(
    '.navigation-toggler '
  );
  const navigation = document.querySelector('nav');

  const shopLinksToggler = document.querySelector('.nav-shop-link');
  const shopLinks = document.querySelector('.shop-links-wrapper');

  // -- navigation button events
  mainNavigationTogglerBtn.addEventListener('click', () => {
    navigation.classList.toggle('active');
  });

  shopLinksToggler.addEventListener('click', (e) => {
    e.preventDefault();

    shopLinks.classList.toggle('shopLinksActive');
  });
};

// -- set number of cart items
const setCartItems = (number) => {
  const cart = document.querySelector('#cart-items-count');
};

export default renderNavigation;
