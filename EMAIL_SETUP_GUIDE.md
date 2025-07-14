# Email Setup Guide for Contact Form

## Option 1: EmailJS (Recommended - Free & Easy)

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Configure Email Service
1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down the **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template
1. Go to **Email Templates** in dashboard
2. Click **Create New Template**
3. Use this template:

```
Subject: New Contact Form Message: {{subject}}

From: {{from_name}} <{{from_email}}>
To: {{to_name}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Note down the **Template ID** (e.g., `template_xyz789`)

### Step 4: Get Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key** (e.g., `user_abcdef123456`)

### Step 5: Update Your Code
In `script.js`, replace these placeholders:
- `YOUR_PUBLIC_KEY` → Your actual public key
- `YOUR_SERVICE_ID` → Your service ID
- `YOUR_TEMPLATE_ID` → Your template ID

## Option 2: Formspree (Alternative)

### Step 1: Create Formspree Account
1. Go to [Formspree.io](https://formspree.io/)
2. Sign up for free account
3. Create a new form

### Step 2: Update HTML Form
Replace the form tag with:
```html
<form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Step 3: Update JavaScript
Replace the EmailJS code with basic form submission.

## Option 3: Netlify Forms (If hosting on Netlify)

### Step 1: Add netlify attribute to form
```html
<form id="contactForm" netlify>
```

### Step 2: Deploy to Netlify
Forms will automatically work on Netlify hosting.

## Option 4: Direct Email Links (Fallback)

If you prefer, you can also add direct contact links:

```html
<a href="mailto:jainnirdesh1@gmail.com?subject=Portfolio Contact&body=Hello Nirdesh,">
    Send Email Directly
</a>
```

## Recommended Setup: EmailJS

EmailJS is recommended because:
- ✅ Free for up to 200 emails/month
- ✅ No backend server required
- ✅ Works with static hosting
- ✅ Supports multiple email providers
- ✅ Easy to set up and maintain

## Testing Your Setup

1. Deploy your website
2. Fill out the contact form
3. Check your email for the message
4. Verify the sender information is correct

## Troubleshooting

- **Messages not sending**: Check console for errors
- **Wrong email format**: Verify template variables
- **Rate limiting**: EmailJS has daily limits on free plan
- **Spam folder**: Check if emails are going to spam

## Security Notes

- Public key is safe to expose in frontend
- Service ID and Template ID are also safe
- Never expose private keys in frontend code
- Consider adding reCAPTCHA for spam protection

---

Choose the option that works best for your hosting setup and requirements!
