# Pridus Global Website - Simple Static Version

This is a simple static website that can be easily uploaded to GoDaddy hosting via FTP.

## Files Included

```
static-website/
├── index.html          (Home page)
├── services.html       (Services page)
├── about.html          (About page)
├── contact.html        (Contact page)
├── css/
│   └── styles.css      (All styling)
└── js/
    └── main.js         (Mobile menu, FAQ, smooth scroll)
```

## How to Upload to GoDaddy

### Step 1: Download All Files
Download all the files in the `static-website` folder to your computer.

### Step 2: Access GoDaddy File Manager
1. Log in to your GoDaddy account
2. Go to "My Products"
3. Find your hosting account for www.pridusglobal.com
4. Click "Manage" next to Web Hosting
5. Under "Files", click "File Manager"

### Step 3: Upload Files
1. In File Manager, navigate to the `public_html` folder (this is your website root)
2. Delete any existing default files (like `index.html` or `coming-soon.html`)
3. Upload all files maintaining the folder structure:
   - Upload `index.html`, `services.html`, `about.html`, `contact.html` to the root
   - Create a `css` folder and upload `styles.css` into it
   - Create a `js` folder and upload `main.js` into it

### Alternative: Using FTP Client (Recommended for easier management)

1. Download an FTP client like FileZilla (free): https://filezilla-project.org/
2. Get your FTP credentials from GoDaddy:
   - In GoDaddy Dashboard, go to your hosting
   - Look for "FTP" or "File Access" section
   - Note your FTP hostname, username, and password
3. Connect FileZilla to your GoDaddy hosting:
   - Host: Your FTP hostname (usually ftp.yourdomain.com)
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21
4. Once connected, navigate to the `public_html` folder
5. Drag and drop all website files from your computer to the `public_html` folder

## Features

✅ **4 Pages**: Home, Services, About, Contact
✅ **Contact Form**: Uses Formspree (free service) to send emails to nithin@pridusglobal.com
✅ **Responsive Design**: Works perfectly on mobile, tablet, and desktop
✅ **SEO Optimized**: Meta tags included for better search engine visibility
✅ **Professional Design**: Grey and white color scheme with smooth animations
✅ **No Database Needed**: Pure HTML/CSS/JavaScript
✅ **Fast Loading**: Static files load instantly

## Contact Form Setup

The contact form uses Formspree (a free service that doesn't require backend setup):
- When someone submits the form, you'll receive an email at nithin@pridusglobal.com
- First submission will require email verification from Formspree
- After verification, all submissions will be forwarded to your email

### To Set Up Your Own Formspree:
1. Go to https://formspree.io (free account)
2. Sign up with your email
3. Create a new form
4. Copy your form endpoint URL
5. In `contact.html`, replace the form action:
   ```html
   <form action="YOUR_FORMSPREE_ENDPOINT" method="POST">
   ```

## Updating Content

To update any content:
1. Open the HTML file in any text editor (Notepad, VS Code, etc.)
2. Find the text you want to change
3. Edit and save
4. Re-upload the file to GoDaddy

## Support

If you need help with:
- **GoDaddy FTP Access**: Contact GoDaddy Support at 1-480-505-8877
- **Website Changes**: Email the developer or edit HTML files directly

## Website Preview

After uploading, your website will be live at:
- https://www.pridusglobal.com

---

**Built with ❤️ for Pridus Global**
