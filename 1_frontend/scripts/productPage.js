// getting product id from query string
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const queryId = urlParams.get('id');
console.log(queryId);

// imports
import { countTotalItemsInCart } from './components/nav.js';

//DOM elements
const productItemWrapper = document.querySelector('.product-item');
const productDescription = document.querySelector('.item-description');

const renderProductPage = (product) => {
  productItemWrapper.innerHTML = `
        <a href=""> <img src="${product.image[0]}" alt="${product.title}" /></a>
        <div class="product-item-info">
            <h4>${product.title}</h4>
            <p class="product-category">${product.category}</p>
            <p class="product-price">EUR ${product.price}</p>
        </div>
        <div class="product-page-buttons">
          <button class="btn-primary-dark product-item-page-btn add-to-cart">ADD TO SHOPPING CART</button>
          <button class="btn-primary-light product-item-page-btn add-to-wishlist">ADD TO DREAM BOX </button>
        </div>
    `;

  productDescription.innerHTML = `
    <p>${product.description}</p>
    `;

  const addToCartBtn = document.querySelector('.add-to-cart');

  addToCartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    saveToLocalStorage(e);
    countTotalItemsInCart();
    console.log(
      e.target.parentNode.parentNode.childNodes[1].firstElementChild.currentSrc
    );
    console.log(
      e.target.parentNode.parentNode.childNodes[3].childNodes[1].innerText
    );
    console.log(
      e.target.parentNode.parentNode.childNodes[3].childNodes[5].innerText
    );
  });
};

// L o c a l  S t o r a g e
const updateListOnLocalStorage = (products) => {
  localStorage.setItem('products', JSON.stringify(products));
};

const getItemsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('products'));
};

const saveToLocalStorage = (e) => {
  let arrayOfCartProducts = [];

  if (getItemsFromLocalStorage()) {
    arrayOfCartProducts = getItemsFromLocalStorage();
  }

  let product;
  let productImage =
    e.target.parentNode.parentNode.childNodes[1].firstElementChild.currentSrc;
  let productName =
    e.target.parentNode.parentNode.childNodes[3].childNodes[5].innerText;
  let productPrice =
    e.target.parentNode.parentNode.childNodes[3].childNodes[5].innerText;

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

const getProduct = (id) => {
  return fetch(`http://localhost:8000/api/allProducts/${id}`)
    .then((res) => res.json())
    .then((product) => {
      renderProductPage(product);
    })
    .catch((err) => console.log(err));
};

document.addEventListener('DOMContentLoaded', () => {
  getProduct(queryId);
});

// https://www.sitepoint.com/get-url-parameters-with-javascript/
