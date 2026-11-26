# Eliya Bujilima: Portfolio

Static site built with HTML, CSS and vanilla JavaScript. No build step.

```
my-portfolio/
├── index.html
├── thank-you.html
├── css/style.css
├── js/script.js
├── images/profile.jpg      <- placeholder, replace with your photo
├── assets/favicon.png
└── README.md
```

## 1. Preview locally
Open `index.html` in a browser. The contact form only works once the site is on a real web address (Netlify), not from a local file.

## 2. Replace the profile photo
1. Pick a clear, well-lit portrait. Portrait orientation (4:5) works best.
2. Resize it to about 800 x 1000 px and compress it (squoosh.app is free). Aim for under 200 KB.
3. Save it as `images/profile.jpg`, replacing the placeholder. Keep the same name and nothing else needs to change.

## 3. Add or edit projects
Open `index.html`, find the `project-grid` section and copy one `<article class="project-card">` block.
- `data-category` controls the filters. Use any of: `data-science`, `analytics`, `machine-learning`, `zindi`, `web`. Separate several with spaces.
- Fill in the title, description, technologies and your contribution.
- Replace the grey "Link coming soon" span with a real button:
  `<a class="btn btn-small btn-primary" href="YOUR-LINK" target="_blank" rel="noopener noreferrer">View project</a>`
- Remove `is-placeholder` from the card's class once it is complete.
- Fill the `[Add dates]` and `[Add years]` lines in the Experience section when you have them confirmed.

## 4. Upload to GitHub
First time:
1. On github.com click New repository. Name it `portfolio`, leave it empty, click Create.
2. On the empty repository page choose "uploading an existing file".
3. Unzip this folder and drag in all its contents (index.html, css, js, images, assets...). Commit.

Updating later:
- Easiest: open the repository, click Add file > Upload files, drop the changed files (keep folder names the same) and commit.
- With Git:
  ```
  git add .
  git commit -m "Update portfolio"
  git push
  ```

## 5. Deploy on Netlify (free)
1. Sign up at netlify.com with your GitHub account.
2. Add new site > Import an existing project > GitHub, and choose the `portfolio` repository.
3. Leave the build command empty and set the publish directory to `/` (the root). Click Deploy.
4. Netlify gives you an address like `something.netlify.app`. Site configuration > Change site name lets you pick a cleaner one, for example `eliya-bujilima`.
5. Every push to GitHub redeploys the site automatically.
6. In `index.html`, replace `YOUR-SITE.netlify.app` in the two Open Graph lines with your real address, then push again. This makes link previews work when you share the site.

## 6. Activate the contact form (FormSubmit)
The form posts to `https://formsubmit.co/eliyabujilima9@gmail.com`.
1. Once the site is live, open it and send one test message through the form.
2. FormSubmit emails eliyabujilima9@gmail.com an activation message. Check Spam if you do not see it.
3. Click the confirmation link in that email. This is a one-time step.
4. Send a second test message. It should arrive in your inbox and you are redirected to the thank-you page.
5. Until step 3 is done, the form shows the "message was not sent" notice. That is expected.

The form includes a hidden honeypot field (`_honey`) for spam. Nothing is stored in the browser.

## 7. Custom domain later
1. Buy a domain from any registrar.
2. In Netlify: Domain management > Add a domain, then follow the DNS instructions (either use Netlify DNS or add the records at your registrar).
3. Netlify issues the HTTPS certificate automatically.
4. Update the two Open Graph URLs in `index.html` to the new domain.

## 8. Checks before you share the link
- Click every menu item on desktop and on your phone.
- Open and close the mobile menu.
- Send a test message and confirm it arrives.
- Make sure no `[placeholder]` text remains on cards you want visitors to see.
