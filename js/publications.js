/**
 * EQQN Research Center - Publications Page Script
 */

document.addEventListener('DOMContentLoaded', () => {
    initPublicationsPage();
});

let allPublications = [];

async function initPublicationsPage() {
    const container = document.getElementById('publications-container');
    if (!container) return;

    allPublications = await fetchData('data/publications.json') || [];

    renderPublications(allPublications);
    setupPubFilters();
}

function renderPublications(data) {
    const container = document.getElementById('publications-container');
    if (!container) return;

    if (data.length === 0) {
        container.innerHTML = '<p class="loading-text">No publications found matching your criteria.</p>';
        return;
    }

    container.innerHTML = data.map(p => `
        <div class="list-item">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 0.5rem;">
                <h4 style="margin:0;">${p.title}</h4>
                <span class="tag" style="margin:0;">${p.type}</span>
            </div>
            <div class="card-meta">
                ${p.authors.join(', ')} | ${p.journal} | ${p.publicationDate}
            </div>
            <p class="card-desc">${p.abstract}</p>

            <div class="card-meta mt-3" style="background:#f7fafc; padding:0.5rem; border-left:3px solid var(--primary-light);">
                <strong>Citation:</strong> ${p.citation}
            </div>

            <div class="mt-3" style="display:flex; gap:0.5rem;">
                ${p.doi ? `<span class="text-sm text-muted" style="align-self:center;">DOI: ${p.doi}</span>` : ''}
            </div>
        </div>
    `).join('');
}

function setupPubFilters() {
    const searchInput = document.getElementById('search-publications');
    const typeFilter = document.getElementById('filter-pub-type');

    if (!searchInput || !typeFilter) return;

    const applyFilters = () => {
        const term = searchInput.value.toLowerCase();
        const type = typeFilter.value;

        const filtered = allPublications.filter(p => {
            const matchesSearch = p.title.toLowerCase().includes(term) ||
                                  p.authors.some(a => a.toLowerCase().includes(term)) ||
                                  (p.keywords && p.keywords.some(k => k.toLowerCase().includes(term)));

            const matchesType = type === 'all' || p.type === type;

            return matchesSearch && matchesType;
        });

        renderPublications(filtered);
    };

    searchInput.addEventListener('input', applyFilters);
    typeFilter.addEventListener('change', applyFilters);
}
