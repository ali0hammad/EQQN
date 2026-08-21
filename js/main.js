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
}

// Fetch helper
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
    const activePredictions = await fetchData('data/active_predictions.json') || [];
    const pastPredictions = await fetchData('data/past_predictions.json') || [];
    const earthquakes = await fetchData('data/earthquakes.json') || [];
    const news = await fetchData('data/news.json') || [];

    const statsContainer = document.getElementById('stats-container');
    if (!statsContainer) return;

    statsContainer.innerHTML = `
        <div class="stat-box"><span class="stat-number">${activePredictions.length}</span><span class="stat-label">Active Predictions</span></div>
        <div class="stat-box"><span class="stat-number">${pastPredictions.length}</span><span class="stat-label">Past Predictions</span></div>
        <div class="stat-box"><span class="stat-number">${earthquakes.length}</span><span class="stat-label">Historical Earthquakes</span></div>
        <div class="stat-box"><span class="stat-number">${news.length}</span><span class="stat-label">News Reports</span></div>
    `;

    if(document.getElementById('latest-news-container')) {
        renderLatestNews(news);
    }
}

function renderLatestNews(newsData) {
    const container = document.getElementById('latest-news-container');
    if(!container) return;

    const latest = newsData.slice(0, 3);

    container.innerHTML = latest.map(n => `
        <div class="card">
            <div class="card-meta">${n.date} | ${n.author}</div>
            <h4 class="card-title">${n.title}</h4>
            <p class="card-desc">${n.summary}</p>
            <a href="news.html" class="btn btn-secondary text-center mt-3">Read Report</a>
        </div>
    `).join('');
}
