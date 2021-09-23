//Variables
//DOM elements
const form = document.querySelector('form');
const customerName = document.querySelector('#inputName4');
const surname = document.querySelector('#inputSurname4');
const address = document.querySelector('#inputAddress');
const address2 = document.querySelector('#inputAddress2');
const city = document.querySelector('#inputCity');
const state = document.querySelector('#inputState');
const zip = document.querySelector('#inputZip');
const email = document.querySelector('#inputEmail4');
const newsEmailCheckbox = document.querySelector('#gridCheck');
const totalPriceOutput = document.querySelector('.order-total');
// -- LOCAL STORAGE
const getItemsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('products'));
};

//functions
const orderHandler = (e) => {
  e.preventDefault();

  if (
    !customerName.value ||
    !surname.value ||
    !address.value ||
    !address2.value ||
    !city.value ||
    !state.value ||
    !zip.value ||
    !email.value
  )
    swal('Error', 'Please fill all the fields', 'error');

  let order = {
    customerName: customerName.value,
    customerSurname: surname.value,
    customerAddress: `${address.value} ${address2.value} ${city.value} ${state.value} ${zip.value}`,
    customerEmail: email.value,
    order: getItemsFromLocalStorage(),
    priceSubtotal: countTotalPrice(),
  };

  return fetch('http://localhost:8000/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        swal({
          title: 'Thank you!',
          text: data.message,
          icon: 'success',
          button: 'Ok!',
        });
      } else {
        swal('Error', data.message, 'error');
      }
      form.reset();
    })
    .catch((err) => console.log(err));
};

const handleNewsletterCheckbox = () => {
  if (newsEmailCheckbox.checked) {
    console.log('handleNewsletterCheckbox: checked!');
  }
};

const countTotalPrice = () => {
  const products = getItemsFromLocalStorage();

  const totalSum = products.reduce(
    (total, item) => (total += +item.price.slice(4) * item.quantity),
    0
  );

  totalPriceOutput.innerText = (totalSum + 20).toFixed(2);
  return +totalPriceOutput.innerText;
};

document.addEventListener('DOMContentLoaded', () => {
  countTotalPrice();
  form.addEventListener('submit', (e) => {
    orderHandler(e);
    handleNewsletterCheckbox();
  });
});
