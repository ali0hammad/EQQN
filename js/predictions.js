/**
 * EQQN Research Center - Historical Predictions Script
 */

document.addEventListener('DOMContentLoaded', () => {
    initPredictionsPage();
});

async function initPredictionsPage() {
    const container = document.getElementById('predictions-container');
    if (!container) return;

    const predictionsData = await fetchData('data/predictions.json') || [];

    renderPredictions(predictionsData, container);
}

function renderPredictions(data, container) {
    if (data.length === 0) {
        container.innerHTML = '<p class="loading-text">No historical prediction data available.</p>';
        return;
    }

    container.innerHTML = data.map(p => `
        <div class="card" style="border-left: 4px solid var(--text-muted);">
            <div style="display:flex; justify-content:space-between;">
                <span class="tag" style="background:#e2e8f0; color:#4a5568;">${p.status}</span>
                <span class="text-sm text-muted">Archived: ${p.predictionDate}</span>
            </div>
            <h4 class="card-title mt-3">${p.hypothesis}</h4>

            <div class="card-meta mt-3 mb-3">
                <strong>Target Region:</strong> ${p.targetRegion}<br>
                <strong>Timeframe:</strong> ${p.targetTimeframe}<br>
                <strong>Expected Magnitude:</strong> ${p.predictedMagnitude}
            </div>

            <div style="background:var(--bg-light); padding:1rem; border-radius:4px; margin-bottom:1rem;">
                <strong class="text-sm">Methodology Overview:</strong>
                <p class="text-sm" style="margin-top:0.25rem;">${p.methodology}</p>
            </div>

            <div style="background:#fff5f5; border:1px solid #fed7d7; padding:1rem; border-radius:4px;">
                <strong class="text-sm" style="color:#c53030;">Historical Outcome:</strong>
                <p class="text-sm" style="color:#c53030; margin-top:0.25rem;">${p.outcome}</p>
            </div>
        </div>
    `).join('');
}
