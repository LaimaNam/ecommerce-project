import saleCounter from './components/timeCounter.js';

//DOM elements
const carouselInnerDiv = document.querySelector('.carousel-inner');
const carouselCaptions = document.querySelector('#carouselCaptions');

const getData = () => {
  fetch('http://localhost:8000/api/allProducts')
    .then((res) => res.json())
    .then((data) => {
      renderCarousselItems(data.slice(0, 3));
    });
};

const renderCarousselItems = (reversedData) => {
  carouselInnerDiv.innerHTML = reversedData.reduce((total, product) => {
    total += `
    <div class="carousel-item">
                <img
                  src="${product.image[0]}"
                  class="d-block w-100"
                  alt="${product.title}"
                  onclick="document.location.href='./pages/productPage.html?id=${product._id}'"
                />
                <div class="d-md-block">
                  <h5>${product.title}</h5>
                  <p class="product-category">
                    ${product.category}
                  </p>
                  <p class="product-price">
                  EUR ${product.price}
                </p>
                </div>
              </div>
    `;
    return total;
  }, '');

  carouselInnerDiv.firstElementChild.setAttribute(
    'class',
    'carousel-item active'
  );
};

document.addEventListener('DOMContentLoaded', () => {
  // saleCounter();
  getData();
});
