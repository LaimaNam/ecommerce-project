import renderNavigation from './scripts/nav.js';
import { renderNewsletterForm, renderFooter } from './scripts/footer.js';
// -- V A R I A B L E S

// -- F U N C T I O N S

// -- E V E N T S
document.addEventListener('DOMContentLoaded', () => {
  // location.href.includes('pages') ? console.log('') : saleCounter();

  renderNavigation();
  renderNewsletterForm();
  renderFooter();
});
