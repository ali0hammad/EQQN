/**
 * EQQN Research Center - Earthquake News Script
 */

document.addEventListener('DOMContentLoaded', () => {
    initNewsPage();
});

async function initNewsPage() {
    const newsContainer = document.getElementById('news-container');
    if (!newsContainer) return;

    // We can fetch both news and real-time earthquake data
    const newsData = await fetchData('data/news.json') || [];
    const eqData = await fetchData('data/earthquakes.json') || [];

    renderNewsPage(newsData, eqData, newsContainer);
}

function renderNewsPage(news, earthquakes, container) {
    let html = '';

    // Render Recent Earthquakes Table (Official Data Source Representation)
    if (earthquakes.length > 0) {
        html += `
            <div class="mb-3">
                <h3 style="color:var(--primary-dark); margin-bottom:1rem;">Recent Significant Seismic Events</h3>
                <div style="overflow-x:auto;">
                    <table style="width:100%; border-collapse:collapse; background:white; border:1px solid var(--border-color);">
                        <thead>
                            <tr style="background:var(--bg-light); text-align:left; border-bottom:2px solid var(--border-color);">
                                <th style="padding:1rem;">Date/Time</th>
                                <th style="padding:1rem;">Magnitude</th>
                                <th style="padding:1rem;">Location</th>
                                <th style="padding:1rem;">Depth</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${earthquakes.map(eq => `
                                <tr style="border-bottom:1px solid var(--border-color);">
                                    <td style="padding:1rem;">${eq.date}<br><span class="text-sm text-muted">${eq.time}</span></td>
                                    <td style="padding:1rem;"><strong style="color:var(--primary-color);">${eq.magnitude}</strong></td>
                                    <td style="padding:1rem;">${eq.location}</td>
                                    <td style="padding:1rem;">${eq.depth}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            <hr style="margin: 3rem 0; border:none; border-top:1px solid var(--border-color);">
        `;
    }

    // Render News/Analysis Articles
    html += `<h3 style="color:var(--primary-dark); margin-bottom:1.5rem;">Research & Analysis Reports</h3>`;

    if (news.length === 0) {
        html += '<p>No recent reports published.</p>';
    } else {
        html += news.map(n => `
            <div class="list-item">
                <div class="card-meta">${n.date} | By ${n.author}</div>
                <h4 style="margin:0.5rem 0;">${n.title}</h4>
                <p class="card-desc">${n.summary}</p>
                <div class="mt-3">
                    <button class="btn btn-secondary text-sm" onclick="alert('Demo: View full article')">Read Full Report</button>
                </div>
            </div>
        `).join('');
    }

    container.innerHTML = html;
}
