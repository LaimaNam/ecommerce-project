import NewsletterEmail from '../models/newsletterEmailModel.js';

const getNewsletterEmails = async (req, res) => {
  let emails = await NewsletterEmail.find({});
  res.json(emails);
};

export default getNewsletterEmails;
