// getting product id from query string
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const queryId = urlParams.get('id');
console.log(queryId);

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
    `;

  productDescription.innerHTML = `
    <p>${product.description}</p>
    `;
};

const getProduct = (id) => {
  return fetch(`http://localhost:8000/api/allProducts/${id}`)
    .then((res) => res.json())
    .then((product) => {
      console.log(product);
      renderProductPage(product);
    })
    .catch((err) => console.log(err));
};

document.addEventListener('DOMContentLoaded', () => {
  getProduct(queryId);
});

// https://www.sitepoint.com/get-url-parameters-with-javascript/
