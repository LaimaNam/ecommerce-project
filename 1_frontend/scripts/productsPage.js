// -- V A R I A B L E S
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
                <a><i class="far fa-heart"></i></a>
                <a><i class="fas fa-plus"></i></a>
              </div>
              <h4>${currentProduct.title}</h4>
              <p class="product-category">${currentProduct.category}</p>
              <p class="product-price">EUR ${currentProduct.price}</p>
          </div>
          `;
    return total;
  }, '');
};

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
      console.log(data);
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
