document.addEventListener('DOMContentLoaded', () => {
    fetch('data/past_predictions.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('past-predictions-container');
            if (!container) return;
            container.innerHTML = '';

            if (data.length === 0) {
                container.innerHTML = '<p>No past predictions recorded.</p>';
                return;
            }

            data.forEach(pred => {
                const statusClass = pred.status.includes('Successful') ? 'status-published' : 'status-rejected';
                const card = document.createElement('div');
                card.className = 'card prediction-card';
                card.innerHTML = `
                    <div class="card-header">
                        <span class="status-badge ${statusClass}">${pred.status}</span>
                        <span class="prediction-date">Made: ${pred.predictionDate}</span>
                    </div>
                    <div class="card-body">
                        <h3>${pred.targetRegion}</h3>
                        <p class="hypothesis"><strong>Hypothesis:</strong> ${pred.hypothesis}</p>
                        <div class="prediction-details">
                            <p><strong>Predicted Magnitude:</strong> ${pred.predictedMagnitude}</p>
                            <p><strong>Timeframe:</strong> ${pred.targetTimeframe}</p>
                        </div>
                        <p class="methodology mt-2"><strong>Methodology:</strong> ${pred.methodology}</p>
                        <div class="outcome-box mt-2" style="background: var(--bg-color); padding: 10px; border-left: 3px solid var(--text-light);">
                            <strong>Outcome:</strong> ${pred.outcome}
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });

            const statsContainer = document.getElementById('stats-container');
            if (statsContainer) {
                const boxes = statsContainer.querySelectorAll('.stat-number');
                if(boxes.length > 1) boxes[1].textContent = data.length;
            }
        })
        .catch(error => {
            console.error('Error loading past predictions:', error);
            const container = document.getElementById('past-predictions-container');
            if(container) container.innerHTML = '<p class="error-text">Failed to load past predictions.</p>';
        });
});
