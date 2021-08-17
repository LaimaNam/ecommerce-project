import NewsletterEmail from '../models/newsletterEmailModel.js';

const postNewsletterEmail = (req, res) => {
  if (!req.body.email) {
    res.status(400).json({
      message: 'Please enter your email correctly!',
      success: false,
    });
    return;
  }

  const email = new NewsletterEmail(req.body);
  console.log(email);
  email
    .save()
    .then((data) => {
      res.json({
        message: 'You registered to our email list! Thank you!:)',
        success: true,
      });
    })
    .catch((err) => console.log(err));
};

export default postNewsletterEmail;
