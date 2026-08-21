/**
 * EQQN Research Center - Main Script
 * Handles global navigation, UI state, and shared utilities.
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initGlobalData();
});

// Navigation Toggle for Mobile
function initNavigation() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.querySelector('#main-nav ul');

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    // Update Nav UI based on auth state
    updateNavAuthState();
}

// Global Auth State UI Update
function updateNavAuthState() {
    const loginBtn = document.getElementById('nav-login-btn');
    if (!loginBtn) return;

    const currentUser = JSON.parse(sessionStorage.getItem('eqqn_user'));

    if (currentUser) {
        loginBtn.textContent = 'Admin Dashboard';
        if(currentUser.role === 'researcher') {
            loginBtn.textContent = 'My Dashboard';
        }
        loginBtn.href = 'dashboard.html';
        loginBtn.classList.add('logged-in');
    }
}

// Fetch helper (ready for future backend)
async function fetchData(endpoint) {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        return null;
    }
}

// Initialize Global Data (for Homepage mostly)
async function initGlobalData() {
    const statsContainer = document.getElementById('stats-container');
    if (statsContainer) {
        loadHomepageStats();
    }
}

async function loadHomepageStats() {
    // In a real app, this would be a single API call to a /stats endpoint
    const researchers = await fetchData('data/researchers.json') || [];
    const research = await fetchData('data/research.json') || [];
    const publications = await fetchData('data/publications.json') || [];
    const news = await fetchData('data/news.json') || [];

    const statsContainer = document.getElementById('stats-container');
    if (!statsContainer) return;

    statsContainer.innerHTML = `
        <div class="stat-box"><span class="stat-number">${researchers.length}</span><span class="stat-label">Researchers</span></div>
        <div class="stat-box"><span class="stat-number">${publications.length}</span><span class="stat-label">Published Papers</span></div>
        <div class="stat-box"><span class="stat-number">${research.length}</span><span class="stat-label">Research Projects</span></div>
        <div class="stat-box"><span class="stat-number">${news.length}</span><span class="stat-label">Earthquake Reports</span></div>
    `;

    // Also trigger loading featured content if on homepage
    if(document.getElementById('featured-research-container')) {
        renderFeaturedResearch(research);
    }
    if(document.getElementById('featured-researchers-container')) {
        renderFeaturedResearchers(researchers);
    }
    if(document.getElementById('latest-news-container')) {
        renderLatestNews(news);
    }
}

function renderFeaturedResearch(researchData) {
    const container = document.getElementById('featured-research-container');
    if(!container) return;

    const featured = researchData.filter(r => r.featured).slice(0, 3);

    if(featured.length === 0) {
        container.innerHTML = '<p>No featured research at this time.</p>';
        return;
    }

    container.innerHTML = featured.map(r => `
        <div class="card">
            <span class="tag">${r.category}</span>
            <h4 class="card-title">${r.title}</h4>
            <div class="card-meta">By ${r.authors.join(', ')} | ${r.publicationDate}</div>
            <p class="card-desc">${r.abstract}</p>
            <a href="research.html" class="btn btn-secondary text-center mt-3">View Details</a>
        </div>
    `).join('');
}

function renderFeaturedResearchers(researchersData) {
    const container = document.getElementById('featured-researchers-container');
    if(!container) return;

    const featured = researchersData.slice(0, 3); // Just grab first 3 for demo

    container.innerHTML = featured.map(r => `
        <div class="card text-center">
            <h4 class="card-title">${r.name}</h4>
            <div class="card-meta">${r.title} | ${r.institution}</div>
            <p class="card-desc text-sm">${r.bio}</p>
            <div class="mt-3">
                ${r.specialization.slice(0,2).map(s => `<span class="tag">${s}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function renderLatestNews(newsData) {
    const container = document.getElementById('latest-news-container');
    if(!container) return;

    const latest = newsData.slice(0, 2);

    container.innerHTML = latest.map(n => `
        <div class="card">
            <div class="card-meta">${n.date} | ${n.author}</div>
            <h4 class="card-title">${n.title}</h4>
            <p class="card-desc">${n.summary}</p>
            <a href="news.html" class="btn btn-secondary text-center mt-3">Read Report</a>
        </div>
    `).join('');
}
