// -- I M P O R T S
import { countTotalItemsInCart } from './components/nav.js';

// -- V A R I A B L E S
// DOM elements
const productsOutput = document.querySelector('.products');
const productOnPageCount = document.querySelector('#product-onpage-count');
const filterWrapper = document.querySelector('.product-page-filter');

// -- F U N C T I O N S
const renderProducts = (data) => {
  productsOutput.innerHTML = data.reduce((total, currentProduct) => {
    total += `
          <div class="product-item">
             <a href="productPage.html?id=${currentProduct._id}"> <img src="${currentProduct.image[0]}" alt="${currentProduct.title}" /></a>
              <div class="product-item-action-icons">
                <i  data-id=${currentProduct._id} class="far fa-heart add-to-wishlist"></i>
                <i data-id=${currentProduct._id}  class="fas fa-plus add-to-cart"></i>
              </div>
              <h4>${currentProduct.title}</h4>
              <p class="product-category">${currentProduct.category}</p>
              <p class="product-price">EUR ${currentProduct.price}</p>
          </div>
          `;
    return total;
  }, '');

  //add to cart button event
  const addToCartBtns = document.querySelectorAll('.add-to-cart');

  addToCartBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      saveToLocalStorage(e);
      countTotalItemsInCart();
    });
  });
};

// L o c a l  S t o r a g e
export const updateListOnLocalStorage = (products) => {
  localStorage.setItem('products', JSON.stringify(products));
};

export const getItemsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('products'));
};

export const saveToLocalStorage = (e) => {
  let arrayOfCartProducts = [];

  if (getItemsFromLocalStorage()) {
    arrayOfCartProducts = getItemsFromLocalStorage();
  }

  let product;
  let productImage =
    e.target.parentNode.parentNode.childNodes[1].firstElementChild.currentSrc;
  let productName = e.target.parentNode.parentNode.childNodes[5].innerText;
  let productPrice = e.target.parentNode.parentNode.childNodes[9].innerText;

  // check if product already exists in cart
  arrayOfCartProducts.forEach((cartProduct) => {
    if (cartProduct.name === productName) {
      product = cartProduct;
    }
  });
  // if product is found, use it
  // if product is not found, create new and add to localstorage
  if (!product) {
    product = {
      id: e.target.dataset.id,
      image: productImage,
      name: productName,
      price: productPrice,
      quantity: 0,
    };
    arrayOfCartProducts.push(product);
  }
  product.quantity++;

  updateListOnLocalStorage(arrayOfCartProducts);
};

//  P r o d u c t s  F i l t e r
const renderFilterBtns = (data) => {
  // -- getting and populating buttons by existing category
  const allCategories = data.map((item) => item.category);
  const uniqueCategoriesSet = new Set(allCategories);
  const uniqueCategoriesArray = [...uniqueCategoriesSet];

  filterWrapper.innerHTML = uniqueCategoriesArray.reduce(
    (total, currentCategory) => {
      total += `
      <button class="filter-by-category-btn btn-primary-dark" data-id=${currentCategory}>${currentCategory.toUpperCase()}</button>
      `;
      return total;
    },
    ''
  );

  // -- "show all" button creation + event
  const createShowAllBtn = document.createElement('button');
  createShowAllBtn.innerText = 'SHOW ALL';
  createShowAllBtn.setAttribute('id', 'showAllCategoriesBtn');
  createShowAllBtn.setAttribute('class', 'btn-primary-dark');
  filterWrapper.prepend(createShowAllBtn);

  createShowAllBtn.addEventListener('click', () => {
    renderProducts(data);
  });

  // -- filter by category button events
  const filterByCategoryBtns = document.querySelectorAll(
    '.filter-by-category-btn'
  );

  filterByCategoryBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      getProductsByCategory(e);
    });
  });
};

const getProductsByCategory = (e) => {
  let category = e.target.dataset.id;
  return fetch(`http://localhost:8000/api/productsByCategory/${category}`)
    .then((res) => res.json())
    .then((data) => {
      let reversedData = data.reverse();
      renderProducts(reversedData);
      productOnPageCount.innerText = reversedData.length;
    });
};

const getAllProducts = () => {
  fetch('http://localhost:8000/api/allProducts')
    .then((res) => res.json())
    .then((data) => {
      let reversedData = data.reverse();
      renderProducts(reversedData);
      renderFilterBtns(data);
      productOnPageCount.innerText = data.length;
    });
};

// -- E V E N T S
document.addEventListener('DOMContentLoaded', () => {
  getAllProducts();
});
