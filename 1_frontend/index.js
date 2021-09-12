// -- I M P O R T S
import { renderNavigation } from "./scripts/components/nav.js";
import {
  renderNewsletterForm,
  renderFooter,
} from "./scripts/components/footer.js";

// -- V A R I A B L E S

// -- F U N C T I O N S
// creating Swal script tag in each html page
const addSwalScript = () => {
  const s = document.createElement("script");
  s.setAttribute("src", "https://unpkg.com/sweetalert/dist/sweetalert.min.js");
  document.body.appendChild(s);
};

// -- E V E N T S
document.addEventListener("DOMContentLoaded", () => {
  renderNavigation();
  renderNewsletterForm();
  renderFooter();
  addSwalScript();
});
