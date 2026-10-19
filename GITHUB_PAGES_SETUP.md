# Homework 3 — Publish my portfolio on GitHub Pages

The portfolio already contains five connected pages, eight JSON-generated
projects, category filtering, keyword search, theme switching, and project
detail dialogs. Publishing gives the instructor a live website to grade.

## 1. Create the repository

1. Sign in to https://github.com/ with your own account.
2. Open https://github.com/new.
3. Enter `will-dibo-portfolio` as the repository name.
4. Choose **Public** so GitHub Pages works with a free GitHub account.
5. Turn **Add README** on and create the repository.

If that repository name already exists, open your existing portfolio repository
or choose a new name. The published URL will use the repository name you choose.

## 2. Upload the extracted website

1. Extract `Will_Dibo_Portfolio_GitHubPages.zip` on your computer.
2. Open the extracted folder until you can see `index.html` alongside the four
   other HTML pages and the `css`, `js`, `data`, `images`, and `downloads` folders.
3. In your GitHub repository, choose **Add file → Upload files**.
4. Select all files and folders INSIDE that extracted folder and drag them into
   the upload area. Upload the individual website contents, rather than the
   enclosing folder or the ZIP file.
5. Use a commit message such as `Publish interactive personal portfolio` and
   choose **Commit changes**.
6. Confirm `index.html` appears directly in the repository's main file list.
   Keep the `downloads` folder intact; its ZIP files are project source downloads.

## 3. Enable Pages

1. Open the repository's **Settings** tab.
2. Choose **Pages** from the sidebar.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose the **main** branch and the **/(root)** folder.
5. Click **Save**.
6. Allow up to 10 minutes for deployment. Refresh **Settings → Pages**, then
   select **Visit site** when GitHub displays the published address.

For the recommended repository name, the expected address format is:

```text
https://YOUR-GITHUB-USERNAME.github.io/will-dibo-portfolio/
```

Use your own GitHub username. This example is a format, not an already
published address. Copy the actual URL from **Visit site**.

## 4. Check the live website

- Open Home, Skills, Experience, Projects, and Contact through the navbar.
- On Projects, confirm eight cards appear. Web and Programming should each
  show four cards when filtered.
- Under Web, search `Bootstrap`; two projects should appear. Reset the results.
- Open a project detail dialog, then close it.
- Change the theme and navigate to another page to check it persists.
- Check the menu on a phone or narrow browser window.
- Test a coursework download and the contact profile links.

Bootstrap loads from a CDN, so an internet connection is required.
The site's relative paths support GitHub project URLs with a repository subpath.

## 5. Submit on Canvas

Homework 3 uses a text entry. Paste the complete live GitHub Pages website URL
that you copied from **Visit site**. The URL should open the portfolio homepage.

Example format only:

```text
https://YOUR-GITHUB-USERNAME.github.io/will-dibo-portfolio/
```

## Troubleshooting

**404 immediately after publishing:** wait for the deployment to finish, then
check the **Actions** tab for a successful Pages build and deployment.

**README appears instead of the portfolio:** confirm `index.html` is at the
repository root and Pages uses **main / (root)**.

**Home loads but projects do not:** confirm `data/projects.json` and
`js/script.js` were uploaded with their exact lowercase folder and file names.

**CSS or mobile navigation does not load:** confirm the `css` folder was
uploaded and the browser can access the Bootstrap CDN.

**Future edits:** upload the changed files to the same repository and commit
them. GitHub Pages will publish updates from the selected branch.

Official references:
- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
