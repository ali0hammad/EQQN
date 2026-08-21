/**
 * EQQN Research Center - Researchers Page Script
 */

document.addEventListener('DOMContentLoaded', () => {
    initResearchersPage();
});

let allResearchersData = [];

async function initResearchersPage() {
    const container = document.getElementById('researchers-container');
    if (!container) return;

    allResearchersData = await fetchData('data/researchers.json') || [];

    renderResearchers(allResearchersData);
    setupResearcherFilters();
}

function renderResearchers(data) {
    const container = document.getElementById('researchers-container');
    if (!container) return;

    if (data.length === 0) {
        container.innerHTML = '<p class="loading-text">No researchers found.</p>';
        return;
    }

    container.innerHTML = data.map(r => `
        <div class="card text-center">
            <h4 class="card-title">${r.name}</h4>
            <div class="card-meta" style="margin-bottom:0.25rem;"><strong>${r.title}</strong></div>
            <div class="card-meta">${r.degree} | ${r.institution}</div>

            <div class="mt-3 mb-3">
                ${r.specialization.map(s => `<span class="tag">${s}</span>`).join('')}
            </div>

            <p class="card-desc text-sm">${r.bio}</p>

            <div style="margin-top:auto; padding-top:1rem; border-top:1px solid #e2e8f0; display:flex; justify-content:center; gap:1rem;">
                ${r.email ? `<a href="mailto:${r.email}" class="text-sm" title="Email">Email</a>` : ''}
                ${r.orcid && r.orcid !== "" ? `<a href="#" class="text-sm" title="ORCID">ORCID</a>` : ''}
            </div>
        </div>
    `).join('');
}

function setupResearcherFilters() {
    const searchInput = document.getElementById('search-researchers');

    if (!searchInput) return;

    searchInput.addEventListener('input', () => {
        const term = searchInput.value.toLowerCase();

        const filtered = allResearchersData.filter(r => {
            return r.name.toLowerCase().includes(term) ||
                   r.institution.toLowerCase().includes(term) ||
                   r.specialization.some(s => s.toLowerCase().includes(term));
        });

        renderResearchers(filtered);
    });
}
