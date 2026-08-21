/**
 * EQQN Research Center - Auth Script
 * STATIC FRONTEND DEMO ONLY. NOT SECURE.
 * Provides conceptual role separation for GitHub Pages deployment.
 */

document.addEventListener('DOMContentLoaded', () => {
    initLoginForm();
});

function initLoginForm() {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value; // Ignored in demo

        // Mock Authentication
        let user = null;

        if (username === 'admin') {
            user = {
                id: 'admin-001',
                name: 'Platform Administrator',
                role: 'admin'
            };
        } else if (username === 'researcher') {
            user = {
                id: 'researcher-001',
                name: 'Dr. Sarah Jenkins', // Maps to sample data
                role: 'researcher'
            };
        }

        if (user) {
            // Store session
            sessionStorage.setItem('eqqn_user', JSON.stringify(user));
            // Redirect
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid credentials');
        }
    });
}

// Utility to check auth on protected pages
function requireAuth(allowedRoles = []) {
    const userJson = sessionStorage.getItem('eqqn_user');

    if (!userJson) {
        window.location.href = 'login.html';
        return null;
    }

    const user = JSON.parse(userJson);

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        alert('Unauthorized access. Redirecting...');
        window.location.href = 'index.html';
        return null;
    }

    return user;
}

function logout() {
    sessionStorage.removeItem('eqqn_user');
    window.location.href = 'index.html';
}
