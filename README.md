# G-NEXT

A self-contained recruitment operating system prototype based on the supplied Excel brief.

## Run

Open `index.html` in a browser. For best results, serve the folder with any local static server.

## Host online

### GitHub Pages

1. Create a new public repository at https://github.com/new
2. Extract `G-NEXT-GitHub-Pages.zip`
3. In the repository, choose **Add file → Upload files**
4. Upload the extracted files, including `index.html`, `app.js`, and `styles.css`
5. Commit the files to the `main` branch
6. Open **Settings → Pages**
7. Under **Build and deployment**, select **Deploy from a branch**
8. Select `main`, choose `/ (root)`, and click **Save**
9. GitHub will provide the website address after deployment

The address will normally be:

`https://YOUR-GITHUB-USERNAME.github.io/REPOSITORY-NAME/`

### Netlify

This folder also remains ready for static hosting on Netlify through https://app.netlify.com/drop.

This prototype stores changes in each browser's local storage. Online hosting makes the app publicly accessible, but it does not synchronize data between different devices or real user accounts. Shared production data requires a backend, authentication, and database.

## Demo accounts

- Admin: `admin@gnext.ai`
- Client: `client@gnext.ai`
- Recruiter: `recruiter@gnext.ai`
- Candidate: `candidate@gnext.ai`

The login screen pre-fills access for every role. Data changes are stored in browser local storage.

## Simulation data

The app initializes a shared, linked simulation dataset:

- 100 candidates
- 24 jobs
- 64 interviews
- 97 user accounts
- 10 clients
- 40 sales leads
- 30 documents

Jobs, candidates, interviews, offers, clients, reports, and dashboard totals use the same records. Updates made in one role are persisted and reflected in the linked Admin, Client, Recruiter, and Candidate views.
