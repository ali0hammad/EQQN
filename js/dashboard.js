/**
 * EQQN Research Center - Dashboard Script
 * Handles UI logic for different user roles.
 */

let currentUser = null;

document.addEventListener('DOMContentLoaded', () => {
    // Requires Auth (from auth.js)
    if (typeof requireAuth === 'function') {
        currentUser = requireAuth();
        if (currentUser) {
            initDashboard();
        }
    }
});

function initDashboard() {
    // Setup Sidebar
    document.getElementById('user-name-display').textContent = currentUser.name;
    document.getElementById('user-role-display').textContent = currentUser.role;

    const navResearcher = document.getElementById('nav-researcher');
    const navAdmin = document.getElementById('nav-admin');

    if (currentUser.role === 'admin') {
        navAdmin.style.display = 'block';
        loadView('admin-overview');
    } else {
        navResearcher.style.display = 'block';
        loadView('researcher-overview');
    }

    // Sidebar Toggles
    const menuToggle = document.getElementById('menu-toggle');
    const closeSidebar = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('dashboard-sidebar');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('show');
        });
    }

    if (closeSidebar) {
        closeSidebar.addEventListener('click', () => {
            sidebar.classList.remove('show');
        });
    }

    // Navigation Links
    document.querySelectorAll('.sidebar-nav a[data-view]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.sidebar-nav a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            if(window.innerWidth <= 992) {
                sidebar.classList.remove('show');
            }

            loadView(link.getAttribute('data-view'));
        });
    });

    // Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (typeof logout === 'function') logout();
        });
    }
}

function loadView(viewName) {
    const contentArea = document.getElementById('dashboard-content');
    const viewTitle = document.getElementById('view-title');

    // Title mapping
    const titles = {
        'admin-overview': 'Platform Overview',
        'researcher-overview': 'My Workspace',
        'submit-new': 'Submit Prediction',
        'manage-predictions': 'Active Predictions',
        'manage-past-predictions': 'Past Predictions',
        'pending-reviews': 'Pending Predictions'
    };

    viewTitle.textContent = titles[viewName] || viewName.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

    // Basic routing logic for demo
    if (viewName === 'admin-overview') {
        renderAdminOverview(contentArea);
    } else if (viewName === 'researcher-overview') {
        renderResearcherOverview(contentArea);
    } else if (viewName === 'submit-new') {
        renderSubmitForm(contentArea);
    } else {
        // Placeholder for other views
        contentArea.innerHTML = `
            <div class="card">
                <h3>${viewTitle.textContent}</h3>
                <p class="text-muted mt-3">This view is currently under development in the frontend demo.</p>
            </div>
        `;
    }
}

function renderAdminOverview(container) {
    container.innerHTML = `
        <div class="dashboard-stats">
            <div class="stat-card">
                <h3>Active Predictions</h3>
                <div class="value">2</div>
            </div>
            <div class="stat-card">
                <h3>Past Predictions</h3>
                <div class="value">2</div>
            </div>
            <div class="stat-card">
                <h3>Pending Reviews</h3>
                <div class="value text-warning">2</div>
            </div>
            <div class="stat-card">
                <h3>Recent News</h3>
                <div class="value">5</div>
            </div>
        </div>

        <div class="table-container">
            <div class="table-header">
                <h3>Pending Predictions</h3>
                <button class="btn btn-primary text-sm">View All</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Region</th>
                        <th>Author</th>
                        <th>Date Submitted</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Pacific Ring of Fire Sector 9</td>
                        <td>Dr. Sarah Jenkins</td>
                        <td>2024-03-01</td>
                        <td><span class="status pending">Pending</span></td>
                        <td><button class="btn btn-secondary text-sm">Review</button></td>
                    </tr>
                    <tr>
                        <td>Mediterranean Fault Zone</td>
                        <td>Prof. Elena Rossi</td>
                        <td>2024-02-28</td>
                        <td><span class="status pending">Pending</span></td>
                        <td><button class="btn btn-secondary text-sm">Review</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function renderResearcherOverview(container) {
    container.innerHTML = `
        <div class="card mb-3">
            <h3>Welcome back, ${currentUser.name}</h3>
            <p class="text-muted">Your profile is 85% complete. <a href="#">Complete profile</a></p>
        </div>

        <div class="dashboard-stats">
            <div class="stat-card">
                <h3>Active Predictions</h3>
                <div class="value">1</div>
            </div>
            <div class="stat-card">
                <h3>Drafts</h3>
                <div class="value">1</div>
            </div>
            <div class="stat-card">
                <h3>In Review</h3>
                <div class="value text-warning">1</div>
            </div>
        </div>

        <div class="table-container">
            <div class="table-header">
                <h3>My Recent Submissions</h3>
                <button class="btn btn-primary text-sm" onclick="loadView('submit-new')">Submit New</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Region</th>
                        <th>Timeframe</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Pacific Ring of Fire Sector 9</td>
                        <td>Next 14 Days</td>
                        <td>2024-03-01</td>
                        <td><span class="status pending">In Review</span></td>
                    </tr>
                    <tr>
                        <td>Draft: Fault zone Alpha</td>
                        <td>Next 30 Days</td>
                        <td>2024-02-15</td>
                        <td><span class="status draft">Draft</span></td>
                    </tr>
                    <tr>
                        <td>Mediterranean Fault Zone</td>
                        <td>Next 14 Days</td>
                        <td>2023-10-15</td>
                        <td><span class="status published">Published</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function renderSubmitForm(container) {
    container.innerHTML = `
        <div class="card">
            <h3 class="mb-3">Submit New Prediction</h3>
            <div class="disclaimer-box warning-box mb-3 text-sm">
                This is a UI demo. Form submissions are disabled in this static version.
            </div>
            <form class="standard-form" onsubmit="event.preventDefault(); alert('Submission workflow demo completed.'); loadView('researcher-overview');">
                <div class="form-group">
                    <label>Target Region</label>
                    <input type="text" required>
                </div>
                <div class="form-group">
                    <label>Predicted Magnitude</label>
                    <input type="text" required>
                </div>
                <div class="form-group">
                    <label>Timeframe</label>
                    <input type="text" required>
                </div>
                <div class="form-group">
                    <label>Hypothesis</label>
                    <textarea rows="2" required></textarea>
                </div>
                <div class="form-group">
                    <label>Methodology</label>
                    <textarea rows="4" required></textarea>
                </div>
                <div style="display:flex; gap:1rem;">
                    <button type="button" class="btn btn-secondary" onclick="loadView('researcher-overview')">Save Draft</button>
                    <button type="submit" class="btn btn-primary">Submit for Review</button>
                </div>
            </form>
        </div>
    `;
}
