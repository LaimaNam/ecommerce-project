//imports
import { countTotalItemsInCart } from './components/nav.js';

//variables
//DOM Elements
const emptyCartMsn = document.querySelector('.empty-cart-message');
const cartMainContent = document.querySelector('#cart-main');
const cartItemsOutput = document.querySelector('.cart-output-wrapper');
const totalPriceOutput = document.querySelector('#total-price');

// -- LOCAL STORAGE
const getItemsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('products'));
};
const updateListOnLocalStorage = (products) => {
  localStorage.setItem('products', JSON.stringify(products));
};

// -- FUNCTIONS
const renderCartProducts = () => {
  const products = getItemsFromLocalStorage();

  cartItemsOutput.innerHTML = products.reduce((total, item) => {
    total += `
    <div class="cart-single-item">
        <div class="cart-single-item__img">
        <img src="${item.image}" alt="${item.name}" /> 
        </div>
        <div class="cart-single-item__details">
            <div class="cart-single-tiem__remove">
                <i id=${item.id}  class="fas fa-times remove-item"></i>
                <span>REMOVE</span>
            </div>
            <div class="cart-single-item__info">
                <p class="item-brand">${item.name}</p>
                <div class="cart-counter-wrapper">
                  <i id=${item.id} class="fas fa-minus"></i>
                  <span id="cart-counter">${item.quantity}</span>
                  <i id=${item.id} class="fas fa-plus"></i>
                </div>
                <p>EUR ${(item.price.slice(4) * item.quantity).toFixed(2)}</p>
            </div>
            

        </div>
    </div>
      `;
    // console.log(total);
    return total;
  }, '');

  // events on cart buttons (-, +)
  const increaseItemQuantityBtns = document.querySelectorAll('.fa-plus');
  increaseItemQuantityBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      increaseCartItemsQuantity(e.target.id);
    });
  });

  const decreaceItemQuantityBtns = document.querySelectorAll('.fa-minus');
  decreaceItemQuantityBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      decreaseCartItemsQuantity(e.target.id);
    });
  });

  //remove from cart button event
  const removeItemFromCartBtns = document.querySelectorAll('.remove-item');

  removeItemFromCartBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      removeFromCart(e.target.id);
    });
  });
};

// increase item quantity in the cart
const increaseCartItemsQuantity = (id) => {
  //get all items added to cart from local storage
  const itemsInCart = getItemsFromLocalStorage();
  //find item by id
  const itemToIncrease = itemsInCart.find((item) => item.id === id);
  //item quantity ++
  itemToIncrease.quantity++;

  // update
  updateListOnLocalStorage(itemsInCart);
  renderCartProducts();
  countTotalItemsInCart();
  countTotalPrice();
};
// decrease item quantity in the cart (also you can remove item by decreasing until < 1)
const decreaseCartItemsQuantity = (id) => {
  const itemsInCart = getItemsFromLocalStorage();
  let indexOfItemToRemove;

  // -- getting index of item to delete
  itemsInCart.forEach((item, index) => {
    if (item.id === id) {
      indexOfItemToRemove = index;
    }
  });

  // -- getting product to update according to index
  const productToUpdate = itemsInCart[indexOfItemToRemove];
  // -- updating product quantity on click
  productToUpdate.quantity--;
  // -- deleting item from cart if quantity is less than 1
  if (productToUpdate.quantity < 1) {
    itemsInCart.splice(indexOfItemToRemove, 1);
  }

  // update
  updateListOnLocalStorage(itemsInCart);
  renderCartProducts();
  countTotalItemsInCart();
  countTotalPrice();
  checkCartStatus();
};
// remove product from cart
const removeFromCart = (id) => {
  const itemsInCart = getItemsFromLocalStorage();
  let indexOfItemToRemove;

  // -- getting index of item to delete
  itemsInCart.forEach((item, index) => {
    if (item.id === id) {
      indexOfItemToRemove = index;
    }
  });

  itemsInCart.splice(indexOfItemToRemove, 1);

  //update
  updateListOnLocalStorage(itemsInCart);
  renderCartProducts();
  countTotalItemsInCart();
  countTotalPrice();
  checkCartStatus();
};

//check if there is items in the cart, if not - show the message, not the cart
const checkCartStatus = () => {
  console.log(getItemsFromLocalStorage());
  if (!getItemsFromLocalStorage().length < 1 || !getItemsFromLocalStorage()) {
    emptyCartMsn.setAttribute('class', 'display-none');
    cartMainContent.removeAttribute('class', 'display-none');
  } else {
    emptyCartMsn.removeAttribute('class', 'display-none');
    cartMainContent.setAttribute('class', 'display-none');
  }
};

//counting order total amount
const countTotalPrice = () => {
  const products = getItemsFromLocalStorage();

  const totalSum = products.reduce(
    (total, item) => (total += +item.price.slice(4) * item.quantity),
    0
  );

  totalPriceOutput.innerText = (totalSum + 20).toFixed(2);
};

// -- EVENTS
document.addEventListener('DOMContentLoaded', () => {
  checkCartStatus();
  renderCartProducts();
  countTotalPrice();
});
