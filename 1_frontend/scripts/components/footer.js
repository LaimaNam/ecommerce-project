// -- creating newsletter form
const renderNewsletterForm = () => {
  const newsletterFormSection = document.querySelector(
    '.singup-newsletter-form-wrapper'
  );
  const form = document.createElement('form');
  form.setAttribute('id', 'signupToNewsletterForm');

  const label = document.createElement('label');
  label.setAttribute('for', 'emailForNewsletter');
  label.innerText = 'Sign up to our mailing list';

  const inputsDiv = document.createElement('div');
  inputsDiv.setAttribute('class', 'sign-up-inputs');

  const emailInput = document.createElement('input');
  emailInput.setAttribute('type', 'email');
  emailInput.setAttribute('placeholder', 'Sign up now');
  emailInput.setAttribute('id', 'newsletterEmailInput');

  const signUpNewsletterBtn = document.createElement('button');
  signUpNewsletterBtn.setAttribute('class', 'btn-primary-dark');
  signUpNewsletterBtn.innerText = 'Sign up';

  inputsDiv.append(emailInput, signUpNewsletterBtn);

  form.append(label, inputsDiv);
  newsletterFormSection.append(form);

  const newsletterForm = document.querySelector('#signupToNewsletterForm');
  const EMAILS_URI = 'http://localhost:8000/api/newsletterEmails';

  newsletterForm.addEventListener('submit', (e) => {
    sendEmailToDB(e, EMAILS_URI, newsletterForm);
  });
};

// POST newsletter email to DB
const sendEmailToDB = (e, emailsUri, newsletterForm) => {
  e.preventDefault();

  let email = {
    email: e.target.newsletterEmailInput.value,
  };

  return fetch(emailsUri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(email),
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
      newsletterForm.reset();
    })
    .catch((err) => console.log(err));
};

// -- creating footer bottom
const renderFooter = () => {
  const footerBottomSection = document.querySelector('.footer-bootom-section');

  footerBottomSection.innerHTML = `
  <div class="footer-top-wrapper">
    <div class="follow-us-wrapper">
          <h3>Follow us</h3>
          <div class="social-media-icons">
            <a href=""><i class="fab fa-facebook"></i></a>
            <a href=""><i class="fab fa-pinterest"></i></a>
            <a href=""><i class="fab fa-instagram"></i></a>
            <a href=""><i class="fab fa-youtube"></i></a>
          </div>
          <div class="contacts">
          <h3>Contact us</h3>
          <div class="contact-us-wrapper">
              <span class="email"
                ><i class="far fa-envelope"></i>mail@shop.io</span
              >
              <span class="phone"
                ><i class="fas fa-mobile-alt"></i>+1 800 800 00
              </span>
            </div>
          </div>
    </div>

    <div class="map-wrapper">
          <h3>Find us</h3>
          <div style="width: 100%">
            <iframe
              width="100%"
              
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(Luxury%20tables)&amp;t=p&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            ></iframe>
          </div>
    </div>
  </div>     
    <div class="all-rights-reserved">
          <span>${new Date().getFullYear()}</span>
          <i class="far fa-copyright"></i>
          <span>All rights reserved</span>
    </div>
    `;
};

export { renderNewsletterForm, renderFooter };
