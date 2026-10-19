# Will Dibo — Interactive Personal Portfolio

MIS 4013 · Homework 2 + Homework 3 (GitHub Pages)

A five-page personal portfolio built with HTML, custom CSS, JavaScript, JSON,
and Bootstrap 5.3.3. There is no build step, package installation, or backend.

## Run the website

Extract the ZIP first. Open the folder containing `index.html`.
Use a local HTTP server so JavaScript can fetch the project JSON.

### Option 1: VS Code Live Server

1. Open the `Will_Dibo_Portfolio` folder in Visual Studio Code.
2. Install the **Live Server** extension if it is not already installed.
3. Right-click `index.html` and choose **Open with Live Server**.
4. Visit **Projects** through the navigation menu.

### Option 2: Python on Windows

If Python is installed, double-click `start-server.bat`, then visit
**http://127.0.0.1:8000/**. Keep the server window open while using the site.
Press Ctrl+C in that window to stop it.

You can also open a terminal in this folder and run:

```text
py -3 -m http.server 8000 --bind 127.0.0.1
```

On macOS/Linux, the equivalent command is:

```text
python3 -m http.server 8000 --bind 127.0.0.1
```

If port 8000 is in use, change it to 8001 and visit that port instead.

**Do not test by double-clicking `projects.html`.** A `file://` address can block
`fetch()`. The address should start with `http://127.0.0.1` or `http://localhost`.

**Bootstrap needs an internet connection.** Its CSS and bundled JavaScript load
from the same pinned jsDelivr CDN version used in the supplied class exercise.
The portfolio's own CSS, scripts, JSON, avatar, favicon, and source downloads
are all included. No remote font or stock photo is needed.

## Repository structure

```text
Will_Dibo_Portfolio/
├── index.html                 Home, biography, career interests, selected work
├── skills.html                Categorized technical and professional skills
├── experience.html            Three experiences and education history
├── projects.html              JSON-generated cards, filters, search, details
├── contact.html               Real social profile links; no submission form
├── css/
│   └── style.css               Shared custom design and responsive styles
├── js/
│   ├── theme-init.js           Restores a saved theme before the page paints
│   └── script.js               All shared interactions and project rendering
├── data/
│   └── projects.json           Eight project objects
├── images/
│   ├── will-dibo-avatar.svg    Original WD monogram avatar
│   └── favicon.svg             Original WD favicon
├── downloads/
│   ├── campus-connections.zip
│   ├── campus-bites.zip
│   ├── student-website.zip
│   └── business-programming.zip
├── start-server.bat
├── THIRD_PARTY_NOTICES.md
└── README.md
```

The `downloads` files preserve the supplied earlier coursework. They are
optional project evidence, not dependencies of the portfolio. The C# source
download contains all four business programming exercises in one solution.
The class examples may contain illustrative content; the portfolio labels
them as coursework rather than production services.

## How the required JavaScript works

1. `fetch("data/projects.json")` requests the data file.
2. `await response.json()` converts the response into JavaScript objects.
3. The script checks the fields and loops through the project objects.
4. `document.createElement()` builds Bootstrap card elements. `textContent`
   inserts project text without treating it as HTML.
5. The **All projects**, **Web**, and **Programming** buttons update the current
   category, then JavaScript renders only matching projects on the same page.
6. Keyword search works together with the active category. It searches the
   title, description, category, and technologies without case sensitivity.
7. **Explore project** fills and opens a Bootstrap modal using the selected
   JSON object. Home's three featured links open the corresponding detail view.
8. The navigation's theme button switches light/dark mode and remembers the
   preference across pages with `localStorage`. Storage blocking does not stop
   the rest of the site.

Failed requests show a useful error with a retry button. A zero-result search
shows a reset option. Other pages safely skip project-specific JavaScript.

## Assignment requirement map

| Requirement | Implementation |
| --- | --- |
| Five separate pages | `index.html`, `skills.html`, `experience.html`, `projects.html`, `contact.html` |
| Name, 3–5 sentence biography, avatar, goals, project link | Home page: five-sentence About section, WD avatar, goals and project buttons |
| At least 5–7 categorized skills | Skills page: web development, programming/data, tools, and working style |
| 2–3 experiences plus education | Three academic/athletic experiences; OU, Memphis, and Vienna education |
| At least five JSON projects | Eight objects in `data/projects.json` |
| `fetch()`, JSON objects, loop, dynamic cards | `loadProjects()`, `validateProjects()`, `renderProjects()`, `makeProjectCard()` |
| Category, description, title, technologies | Each generated project card |
| JavaScript category filtering | All projects / Web / Programming buttons |
| Additional JavaScript feature | Persistent theme toggle, keyword search, and project detail modals |
| Meaningful Bootstrap | Responsive navbar, grid, cards, buttons, badges, list groups, modal |
| External CSS and JS | `css/style.css`, `js/theme-init.js`, `js/script.js` |
| Consistent navigation and styling | Same five-link navbar and shared assets on every page |
| Professional contact without a fake form | Confirmed Instagram and TikTok profiles |
| Local server compatibility | Relative file paths and local-server launch instructions |

## Quick browser check before submission

1. Open the site through Live Server or the included server launcher.
2. Navigate through all five pages and confirm the active page marker changes.
3. On Projects, confirm eight cards appear; Web and Programming each show four.
4. Search `Bootstrap` under Web: two cards should appear. Search `C#` under
   Programming: four should appear.
5. Search a nonsense word, then use **Show all projects** to reset the results.
6. Open and close a detail modal with its buttons and the Escape key. Follow
   a source download and check that it opens the appropriate ZIP.
7. Switch themes, then navigate to another page. The selected theme should stay.
8. Narrow the window below 992px. Open the navigation with the menu button and
   check the cards stack into fewer columns without horizontal scrolling.
9. Tab through links, filters, and buttons to check the visible focus indicator.

## Updating the portfolio

- Edit biography and career interests in `index.html`.
- Update skills in `skills.html` and dates in `experience.html` as needed.
- Add your real professional email, LinkedIn, or GitHub link to `contact.html`
  when you want those details to be public. No email address or account URL
  has been guessed.
- Add or edit projects in `data/projects.json`; do not manually duplicate cards
  in HTML. Keep all the fields used by existing objects and give every project
  a unique `id`.
- Use `Web` or `Programming` for the current filter buttons. If a new category
  is needed, add its button to `projects.html` using the same `data-category`
  value as the JSON.
- `source` can be an empty string or a bundled `downloads/name.zip` path.
- The light and dark colors are centralized at the top of `css/style.css`.

## Publish with GitHub Pages (Homework 3)

Follow **GITHUB_PAGES_SETUP.md** for the complete publishing steps.

Recommended repository name: `will-dibo-portfolio`.
Upload the contents of this folder so `index.html` is at the repository root.
In **Settings → Pages**, select **Deploy from a branch**, **main**, and **/(root)**,
then select **Save**. This static website needs no build command or backend.

After GitHub finishes deployment, open **Settings → Pages → Visit site**.
Copy that live website URL into the Canvas Homework 3 text entry.

The URL will normally follow this pattern:

```text
https://YOUR-GITHUB-USERNAME.github.io/will-dibo-portfolio/
```

Replace `YOUR-GITHUB-USERNAME` with the account that owns the repository.
Use the exact address shown by **Visit site** for submission.

Official GitHub instructions:
- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
