/**
 * EQQN Research Center - Research Page Script
 */

document.addEventListener('DOMContentLoaded', () => {
    initResearchPage();
});

let allResearch = [];

async function initResearchPage() {
    const container = document.getElementById('research-container');
    if (!container) return; // Not on the research page

    // Uses fetchData from main.js
    allResearch = await fetchData('data/research.json') || [];

    renderResearchCards(allResearch);
    setupFilters();
}

function renderResearchCards(data) {
    const container = document.getElementById('research-container');
    if (!container) return;

    if (data.length === 0) {
        container.innerHTML = '<p class="loading-text">No research found matching your criteria.</p>';
        return;
    }

    container.innerHTML = data.map(r => `
        <div class="card">
            <div class="card-meta" style="display:flex; justify-content:space-between;">
                <span class="tag">${r.category}</span>
                <span>${r.publicationDate}</span>
            </div>
            <h4 class="card-title mt-3">${r.title}</h4>
            <div class="card-meta"><strong>Authors:</strong> ${r.authors.join(', ')}</div>
            <p class="card-desc">${r.abstract}</p>
            <div class="mb-3">
                ${r.keywords ? r.keywords.map(k => `<span class="tag" style="background:#edf2f7; color:#4a5568;">${k}</span>`).join('') : ''}
            </div>
            <div style="margin-top:auto; display:flex; gap:0.5rem; flex-wrap:wrap;">
                <a href="${r.url}" class="btn btn-primary text-sm" onclick="event.preventDefault(); alert('Demo: View full research page');">View Details</a>
                ${r.doi ? `<span class="btn btn-secondary text-sm" style="border:none; padding-left:0;">DOI: ${r.doi}</span>` : ''}
            </div>
        </div>
    `).join('');
}

function setupFilters() {
    const searchInput = document.getElementById('search-research');
    const categoryFilter = document.getElementById('filter-category');

    if (!searchInput || !categoryFilter) return;

    const applyFilters = () => {
        const term = searchInput.value.toLowerCase();
        const category = categoryFilter.value;

        const filtered = allResearch.filter(r => {
            const matchesSearch = r.title.toLowerCase().includes(term) ||
                                  r.abstract.toLowerCase().includes(term) ||
                                  r.authors.some(a => a.toLowerCase().includes(term));

            const matchesCategory = category === 'all' || r.category === category;

            return matchesSearch && matchesCategory;
        });

        renderResearchCards(filtered);
    };

    searchInput.addEventListener('input', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);
}
