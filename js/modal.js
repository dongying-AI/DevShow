/* ============================================
   Modal — Product detail with gallery, specs, inquiry
   ============================================ */

import { getProduct } from './products.js';
import { currentLang, t, applyLanguage } from './i18n.js';

let activeColor = "#141416";
let lastOpenedProductId = null;

/**
 * Open the detail modal for a product ID.
 */
function openModal(productId) {
    const prod = getProduct(productId);
    if (!prod) return;

    lastOpenedProductId = productId;
    activeColor = prod.color;

    refreshModalContent(prod);
    renderGalleryImages(prod);
    switchModalThumb(0);

    document.getElementById('ownerAdminZone').style.display = "flex";
    updateAdminBarStatus(prod);
    document.getElementById('detailModal').classList.add('open');
}

/**
 * Refresh modal text based on current language & product data.
 */
function refreshModalContent(prod) {
    const data = prod[currentLang];

    // 1. Re-apply all [data-i18n] fixed labels inside the modal
    applyLanguage();

    // 2. Update product-specific dynamic fields
    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalType').innerText = data.type;
    document.getElementById('modalPrice').innerText = prod.price;
    document.getElementById('modalTech').innerText = data.tech;
    document.getElementById('modalAuthor').innerText = data.author;
    document.getElementById('modalDesc').innerText = data.desc;
    document.getElementById('modalTextarea').setAttribute('placeholder', t('modal_form_placeholder'));

    // 3. Update admin bar (i18n-aware)
    updateAdminBarStatus(prod);
}

/**
 * Generate gallery thumbnails from product images or SVG placeholders.
 */
function renderGalleryImages(prod) {
    for (let i = 0; i < 5; i++) {
        const thumb = document.getElementById(`thumb${i}`);
        if (thumb) {
            const opacity = (1 - i * 0.12).toFixed(2);
            if (prod.coverImage && i === 0) {
                thumb.innerHTML = `<img src="${prod.coverImage}" style="width:100%;height:100%;object-fit:cover;" />`;
            } else {
                thumb.innerHTML = `
                    <svg viewBox="0 0 300 400" width="100%" height="100%">
                        <rect width="100%" height="100%" fill="${activeColor}" opacity="${opacity}"/>
                    </svg>
                `;
            }
        }
    }
}

/**
 * Switch active thumbnail and main preview.
 */
function switchModalThumb(index) {
    const thumbs = document.querySelectorAll('.thumb-item');
    thumbs.forEach((el, idx) => el.classList.toggle('active', idx === index));

    const mainHolder = document.getElementById('mainModalImgHolder');
    if (!mainHolder) return;

    const prod = getProduct(lastOpenedProductId);
    if (!prod) return;

    if (prod.coverImage && index === 0) {
        mainHolder.innerHTML = `<img src="${prod.coverImage}" style="width:100%;height:100%;object-fit:cover;border-radius:4px;" />`;
    } else {
        const opacity = (1 - index * 0.12).toFixed(2);
        mainHolder.innerHTML = `
            <svg viewBox="0 0 300 400" style="width:100%; height:100%;">
                <rect width="100%" height="100%" fill="${activeColor}" opacity="${opacity}"/>
                <text x="50%" y="50%" fill="#fff" font-size="14" text-anchor="middle">
                    Spec Image (${index + 1}/5)
                </text>
            </svg>
        `;
    }
}
window.switchModalThumb = switchModalThumb;

/**
 * Close the modal.
 */
function closeModal() {
    document.getElementById('detailModal').classList.remove('open');
    lastOpenedProductId = null;
}
window.closeModal = closeModal;

/**
 * Refresh detail modal in-place (used after admin actions like delist).
 */
function refreshDetailModal() {
    if (!lastOpenedProductId) return;
    const prod = getProduct(lastOpenedProductId);
    if (!prod) return;
    refreshModalContent(prod);
    renderGalleryImages(prod);
    updateAdminBarStatus(prod);
}

/**
 * Update the delist button label based on product status.
 */
function updateAdminBarStatus(prod) {
    const delistBtn = document.getElementById('adminDelistBtn');
    if (delistBtn) {
        const isArchived = prod.status === 'archived';
        const key = isArchived ? 'admin_btn_relist' : 'admin_btn_delist';
        delistBtn.setAttribute('data-i18n', key);
        delistBtn.innerText = t(key);
        delistBtn.style.background = isArchived ? 'var(--color-success)' : '#b45309';
    }
}

/**
 * Re-render modal when language changes while open.
 */
function refreshModalOnLangChange() {
    if (lastOpenedProductId !== null && document.getElementById('detailModal').classList.contains('open')) {
        const prod = getProduct(lastOpenedProductId);
        if (prod) {
            refreshModalContent(prod);
            renderGalleryImages(prod);
        }
    }
}

/**
 * Submit inquiry handler.
 */
function triggerSubmitInquiry() {
    alert(t('alert_inquiry_ok'));
    document.getElementById('modalTextarea').value = "";
}
window.triggerSubmitInquiry = triggerSubmitInquiry;
window.refreshDetailModal = refreshDetailModal;
window.getLastOpenedProductId = () => lastOpenedProductId;

export { openModal, refreshModalOnLangChange, lastOpenedProductId };
