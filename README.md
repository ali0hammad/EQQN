# EQQN — Earthquake Quick News Research Center

A professional, modern research-center website designed to be hosted securely and completely free using GitHub Pages.

## 1. Project Structure

The project is structured entirely using static web technologies to ensure compatibility with GitHub Pages:

```
EQQN/
├── index.html           # Homepage highlighting predictions
├── about.html           # About organization
├── news.html            # Earthquake news and analysis
├── predictions.html     # Active predictions
├── past-predictions.html# Historical predictions archive
├── contact.html         # Contact page (UI only)
├── contribute.html      # Instructions for GitHub-based workflow
│
├── css/                 # Vanilla CSS
│   ├── style.css        # Main stylesheet
│   └── responsive.css   # Media queries
│
├── js/                  # Vanilla JavaScript
│   ├── main.js          # Shared logic & data fetching
│   ├── news.js          # News page logic
│   ├── predictions.js   # Active predictions page logic
│   └── past-predictions.js # Past predictions page logic
│
├── data/                # JSON data (The Database)
│   ├── news.json
│   ├── earthquakes.json
│   ├── active_predictions.json
│   └── past_predictions.json
│
└── assets/              # Images, icons, and logos
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

1. Create a new repository on GitHub.
2. Initialize git in this project directory:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for EQQN"
   ```
3. Link to your GitHub repository and upload your code.

## 4. How to enable GitHub Pages

1. Go to your repository on GitHub.
2. Click on **Settings**.
3. In the left sidebar, click on **Pages**.
4. Under "Build and deployment", select **Deploy from a branch**.
5. Choose the `main` branch and the `/ (root)` folder.
6. Click **Save**.
7. In a few minutes, your site will be live at `https://YOUR-USERNAME.github.io/eqqn/`.

## 5. How researchers should contribute

In this static architecture, the **GitHub Pull Request workflow** acts as the backend and Content Management System.

Researchers do not edit the HTML directly. Instead, they edit the JSON files located in the `data/` directory via GitHub:
- To add a new active prediction, append an object to `data/active_predictions.json`.
- Edit the file, commit the change, and open a Pull Request.

Once the Administrator merges the Pull Request, GitHub Pages will automatically rebuild and the live website will instantly reflect the new data.

## 6. Difference between Admin and Contributor

The platform uses a secure Git-based roles system instead of vulnerable web passwords:

- **Admin (Platform Host):** Has "Admin" or "Maintainer" privileges on the GitHub repository. They review Pull Requests for scientific integrity, approve them, and merge them into the `main` branch.
- **Researcher (Contributor):** Has "Read" or "Write" access (or acts via forks). They can submit new data (JSON) via Pull Requests but cannot publish directly to the live site.

## 7. Current limitations of static hosting

GitHub Pages is a static hosting provider. This means:
- Forms (like Contact) cannot securely process data on their own.
- If the repository is made Private, you must have a paid GitHub plan (Pro/Team) to keep the GitHub Pages live. If you are on the free tier, making the repo private will unpublish the site.

## 8. Security Note on JSON files

Even if your repository is private (using a paid GitHub plan), remember that the `.json` files inside the `data/` folder are downloaded to the visitor's browser so the website can render them.

**Never put real passwords, API keys, or sensitive user personal data into the JSON files or Javascript.**

## 9. How the project can later be connected to a database/backend

The JavaScript architecture is designed to be easily transitioned if you ever outgrow the Git-based workflow:
- In `js/main.js`, data is fetched using a centralized `fetchData()` function pointing to relative paths like `data/active_predictions.json`.
- Once a backend is built, you simply change the endpoint URLs to your new API routes, e.g., `https://api.eqqn.org/v1/predictions/active`.
- The frontend UI rendering functions will continue to work exactly as they do now, provided the API returns the same JSON structure.

## 10. How to connect a custom domain such as `eqqn.org`

1. Purchase a domain from a registrar (e.g., Namecheap, Google Domains).
2. In your GitHub repository **Settings > Pages**, enter `eqqn.org` in the **Custom domain** field and click Save. (This creates a `CNAME` file in your repository).
3. Go to your domain registrar's DNS settings and create:
   - A `CNAME` record pointing `www.eqqn.org` to `YOUR-USERNAME.github.io`.
   - `A` records pointing `eqqn.org` to GitHub's IP addresses (as specified in their official documentation).
4. GitHub will automatically provision a free SSL certificate for HTTPS.
