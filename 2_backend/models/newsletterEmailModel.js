import mongoose from 'mongoose';

const newsletterEmailSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const NewsletterEmail = mongoose.model(
  'newsletter_email',
  newsletterEmailSchema
);

export default NewsletterEmail;
