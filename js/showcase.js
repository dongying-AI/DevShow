/* ============================================
   Showcase — Product card rendering & filter
   ============================================ */

import { products, getProducts } from './products.js';
import { currentLang, t } from './i18n.js';
import { isLoggedIn } from './header.js';
import { openModal } from './modal.js';

/**
 * Render all product cards into the showcase grid.
 */
function renderProducts(filter) {
    const grid = document.getElementById('showcaseGrid');
    if (!grid) return;

    const list = getProducts(filter);
    const actionKey = isLoggedIn ? 'action_view_unlock' : 'action_view_lock';
    const actionText = t(actionKey);

    grid.innerHTML = list.map((prod) => {
        const data = prod[currentLang];
        return `
            <div class="showcase-card" onclick="window.openItemDetailByID('${prod.id}')">
                <div class="cover-wrapper">
                    ${prod.coverImage
                        ? `<img class="cover-img" src="${prod.coverImage}" alt="${prod.title}" />`
                        : `<svg class="cover-img" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
                            <rect width="100%" height="100%" fill="${prod.color}" />
                            <text x="50%" y="50%" fill="#f97316" font-size="20" font-weight="bold" text-anchor="middle">
                                ${prod.title}
                            </text>
                        </svg>`
                    }
                    <span class="img-size-badge">3:4 Ratio &lt; 1MB</span>
                </div>
                <div class="card-info">
                    <div class="card-header">
                        <h3 class="card-title">${prod.title}</h3>
                        <span class="card-type">${data.type}</span>
                    </div>
                    <div class="card-footer">
                        <span class="card-price">${prod.price}</span>
                        <span class="view-action">${actionText}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Open product detail by ID — exposed to window for HTML onclick.
 */
function openItemDetailByID(id) {
    if (!isLoggedIn) {
        alert(t('alert_unlogged'));
        return;
    }
    openModal(id);
}
window.openItemDetailByID = openItemDetailByID;

/**
 * Handle filter tag click.
 */
function setupFilterTags() {
    const tags = document.querySelectorAll('.filter-tags span');
    const filterMap = {
        "最新Top 20展示面": "all",
        "Web网站/SaaS": "web",
        "移动端App": "app",
        "微信/原生小程序": "mini",
        "桌面端软件": "pc",
        "浏览器插件/脚本": "plugin"
    };

    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            tags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            const filterKey = filterMap[tag.innerText.trim()] || "all";
            renderProducts(filterKey);
        });
    });
}

export { renderProducts, setupFilterTags };
