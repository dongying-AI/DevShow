/* ============================================
   Settings — Floating cog panel (theme & language)
   ============================================ */

/**
 * Toggle the cog popover visibility.
 */
function toggleCogPopover(event) {
    event.stopPropagation();
    const popover = document.getElementById('cogPopover');
    const btn = document.getElementById('cogBtn');
    const isShow = popover.classList.toggle('show');
    btn.classList.toggle('active', isShow);
}
window.toggleCogPopover = toggleCogPopover;

/**
 * Close popover on outside click.
 */
function setupCogOutsideClick() {
    document.addEventListener('click', () => {
        const popover = document.getElementById('cogPopover');
        const btn = document.getElementById('cogBtn');
        if (popover) popover.classList.remove('show');
        if (btn) btn.classList.remove('active');
    });
}

/**
 * Switch theme between dark/light.
 */
function changeTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}
window.changeTheme = changeTheme;

export { setupCogOutsideClick };
