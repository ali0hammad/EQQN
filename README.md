# EQQN — Earthquake Quick News Research Center

A professional, modern research-center website designed to be hosted completely free using GitHub Pages.

## 1. Project Structure

The project is structured entirely using static web technologies to ensure compatibility with GitHub Pages:

```
EQQN/
├── index.html           # Homepage
├── about.html           # About organization
├── research.html        # Directory of research projects
├── publications.html    # Directory of publications/datasets
├── researchers.html     # Researcher directory
├── news.html            # Earthquake news and analysis
├── predictions.html     # Historical predictions archive
├── contact.html         # Contact/Application form (UI only)
├── login.html           # Demo login page
├── dashboard.html       # Role-based dashboard UI
│
├── css/                 # Vanilla CSS
│   ├── style.css        # Main stylesheet
│   ├── responsive.css   # Media queries
│   └── dashboard.css    # Dashboard specific styles
│
├── js/                  # Vanilla JavaScript
│   ├── main.js          # Shared logic & data fetching
│   ├── auth.js          # Demo authentication logic
│   ├── dashboard.js     # Dashboard UI switching
│   ├── research.js      # Research page logic
│   ├── researchers.js   # Researchers page logic
│   ├── publications.js  # Publications page logic
│   ├── news.js          # News page logic
│   └── predictions.js   # Predictions page logic
│
├── data/                # Mock JSON data (Pre-Backend)
│   ├── researchers.json
│   ├── research.json
│   ├── publications.json
│   ├── news.json
│   ├── earthquakes.json
│   └── predictions.json
│
└── assets/              # Images, icons, and logos (empty folders initialized)
```

## 2. How to run the website locally

Because the site uses JavaScript `fetch()` to load JSON data, you must run it through a local web server (opening the file directly in the browser via `file://` will cause CORS errors).

If you have Python installed, open your terminal in the project root and run:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

Alternatively, if you use VS Code, you can install the "Live Server" extension and click "Go Live".

## 3. How to upload it to GitHub

1. Create a new repository on GitHub (e.g., named `eqqn-research`).
2. Initialize git in this project directory:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for EQQN"
   ```
3. Link to your GitHub repository and push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/eqqn-research.git
   git push -u origin main
   ```

## 4. How to enable GitHub Pages

1. Go to your repository on GitHub.
2. Click on **Settings**.
3. In the left sidebar, click on **Pages**.
4. Under "Build and deployment", select **Deploy from a branch**.
5. Choose the `main` branch and the `/ (root)` folder.
6. Click **Save**.
7. In a few minutes, your site will be live at `https://YOUR-USERNAME.github.io/eqqn-research/`.

## 5. How researchers should contribute

In this current static version, researchers should primarily contribute by providing data formatted for the JSON files located in the `data/` directory.

- Add a new researcher by appending an object to `data/researchers.json`.
- Add a new paper to `data/research.json`.
- Researchers **do not** need to edit the HTML, CSS, or JS files to publish content. The JavaScript automatically renders the interface based on the JSON files.

## 6. Difference between Admin and Researcher

The portal uses two distinct roles (demonstrated via `login.html` and `dashboard.html`):

- **Admin (Platform Host):** Has full control. The dashboard conceptualizes features to manage researchers, approve research papers, manage news, and review pending submissions.
- **Researcher (Contributor):** Has limited scope. Can manage their own profile, submit new research drafts, and view the status of their submissions.

*Note: In this static version, the dashboard is a UI demonstration. To test the views, log in using the username `admin` or `researcher` (any password works).*

## 7. Current limitations of static hosting

GitHub Pages is a static hosting provider. This means:
- There is no server-side database (e.g., SQL/NoSQL). Data is read from static `.json` files.
- Forms (like Contact or "Submit Research") cannot securely process data.
- The authentication system (`auth.js`) is purely a frontend demonstration using `sessionStorage`. **It is not secure** and should not be used for real passwords.

## 8. What needs to be added for real authentication

To make the login secure, you will need a backend server. This involves:
- A database to store user credentials securely (using password hashing like bcrypt).
- An authentication service (e.g., JWT, OAuth, or sessions managed by Node.js/Python).
- Protected API endpoints that verify the user's token before returning sensitive data or accepting submissions.

## 9. How the project can later be connected to a database/backend

The JavaScript architecture is designed to be easily transitioned:
- In `js/main.js`, all data is fetched using a centralized `fetchData()` function pointing to relative paths like `data/research.json`.
- Once a backend is built, you simply change the endpoint URLs from `data/research.json` to your new API routes, e.g., `https://api.eqqn.org/v1/research`.
- The frontend UI rendering functions will continue to work exactly as they do now, provided the API returns the same JSON structure.

## 10. How to connect a custom domain such as `eqqn.org`

1. Purchase a domain from a registrar (e.g., Namecheap, Google Domains).
2. In your GitHub repository **Settings > Pages**, enter `eqqn.org` in the **Custom domain** field and click Save. (This creates a `CNAME` file in your repository).
3. Go to your domain registrar's DNS settings and create:
   - A `CNAME` record pointing `www.eqqn.org` to `YOUR-USERNAME.github.io`.
   - `A` records pointing `eqqn.org` to GitHub's IP addresses (as specified in their official documentation).
4. GitHub will automatically provision a free SSL certificate for HTTPS.
