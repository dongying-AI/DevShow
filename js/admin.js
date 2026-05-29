/* ============================================
   Admin — Product management: edit, delist, delete
   ============================================ */

import {
    getProduct, updateProduct, deleteProduct as removeProduct,
    products
} from './products.js';
import { renderProducts } from './showcase.js';

/* ================================================================
   Edit — Open publish form pre-filled with product data
   ================================================================ */

/**
 * Launch the publish modal in edit mode for a specific product.
 * Relies on publish.js having an edit-mode entry point.
 */
function editProduct(productId) {
    const prod = getProduct(productId);
    if (!prod) return;

    // Close the detail modal first
    if (typeof window.closeModal === 'function') {
        window.closeModal();
    }

    // Delegate to publish module's edit mode
    if (typeof window.openPublishEdit === 'function') {
        window.openPublishEdit(productId);
    } else {
        alert('Edit mode not available — publish module not loaded.');
    }
}

/* ================================================================
   Delist — Toggle product status between published / archived
   ================================================================ */

function toggleDelist(productId) {
    const prod = getProduct(productId);
    if (!prod) return;

    const newStatus = prod.status === 'published' ? 'archived' : 'published';
    const action = newStatus === 'archived' ? '下架' : '上架';

    updateProduct(productId, { status: newStatus });
    renderProducts();

    // Also refresh the detail modal if it's showing this product
    if (window.refreshDetailModal && window.getLastOpenedProductId() === productId) {
        window.refreshDetailModal();
    }

    alert(`✅ 作品已${action}`);
}

/* ================================================================
   Delete — Confirm and remove product
   ================================================================ */

function confirmDeleteProduct(productId) {
    const prod = getProduct(productId);
    if (!prod) return;

    const title = prod.zh?.title || prod.en?.title || 'Untitled';
    if (!confirm(`⚠️ 确定要永久删除「${title}」吗？\n\n此操作不可恢复。`)) return;

    removeProduct(productId);
    renderProducts();

    // Close the detail modal
    if (typeof window.closeModal === 'function') {
        window.closeModal();
    }

    alert(`🗑️「${title}」已删除`);
}

/* ================================================================
   Window binding
   ================================================================ */

window.editProduct = editProduct;
window.toggleDelist = toggleDelist;
window.confirmDeleteProduct = confirmDeleteProduct;

export { editProduct, toggleDelist, confirmDeleteProduct };
