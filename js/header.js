/* ============================================
   Header — Login / Logout state management
   ============================================ */

import { currentLang, applyLanguage, t } from './i18n.js';

let isLoggedIn = false;

/**
 * Toggle login state and update header UI.
 */
function toggleLogin() {
    isLoggedIn = !isLoggedIn;

    const statusLabel = document.getElementById('loginStatusLabel');
    const authBtn = document.getElementById('authBtn');
    const visitorTip = document.getElementById('visitorTip');
    const publishBtn = document.getElementById('publishBtn');

    if (isLoggedIn) {
        statusLabel.setAttribute('data-i18n', 'status_logged');
        authBtn.setAttribute('data-i18n', 'btn_logout_mock');
        visitorTip.style.display = "none";
        publishBtn.style.display = "inline-block";
        statusLabel.classList.add('logged-in');
    } else {
        statusLabel.setAttribute('data-i18n', 'status_unlogged');
        authBtn.setAttribute('data-i18n', 'btn_login_mock');
        visitorTip.style.display = "block";
        publishBtn.style.display = "none";
        statusLabel.classList.remove('logged-in');
    }

    applyLanguage(); // refresh all dynamic texts
    refreshCardLocks();
}

/**
 * Update lock/unlock badges on cards based on login state.
 */
function refreshCardLocks() {
    const viewActions = document.querySelectorAll('.view-action');
    viewActions.forEach(el => {
        const key = isLoggedIn ? 'action_view_unlock' : 'action_view_lock';
        el.setAttribute('data-i18n', key);
        el.innerText = t(key);
    });
}

/** Expose to global scope for HTML onclick handlers */
window.toggleLogin = toggleLogin;

export { isLoggedIn, toggleLogin, refreshCardLocks };
