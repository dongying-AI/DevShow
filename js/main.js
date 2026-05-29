/* ============================================
   main.js — App entry point
   Orchestrates all modules and initializes the page
   ============================================ */

import { applyLanguage, t } from './i18n.js';
import { renderProducts, setupFilterTags } from './showcase.js';
import { refreshModalOnLangChange } from './modal.js';
import { setupCogOutsideClick } from './settings.js';
import { refreshCardLocks } from './header.js';
import { openPublishModal, refreshFormI18n } from './publish.js';
import './admin.js';  // Side-effect import: binds window.editProduct etc.

/**
 * Language switcher — called from HTML select onchange.
 */
function changeLang(lang) {
    applyLanguage(lang);
    refreshCardLocks();
    refreshModalOnLangChange();
    refreshFormI18n();
}
window.changeLang = changeLang;

/**
 * Publish handler — called from HTML button.
 */
function triggerPublish() {
    openPublishModal();
}
window.triggerPublish = triggerPublish;

/**
 * Bootstrap the application.
 */
function init() {
    applyLanguage('zh');
    renderProducts();
    setupFilterTags();
    setupCogOutsideClick();
    refreshCardLocks();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
