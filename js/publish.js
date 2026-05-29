/* ============================================
   Publish — Product registration form module
   Step-based wizard with live preview
   ============================================ */

import { currentLang, t, applyLanguage } from './i18n.js';
import {
    addProduct, updateProduct, getProduct,
    PRODUCT_TYPES, DELIVERY_METHODS,
    LICENSE_OPTIONS
} from './products.js';
import { renderProducts } from './showcase.js';

/* === Color Presets === */
const COLOR_PRESETS = [
    "#141416", "#1c1c1f", "#0f172a", "#1a1a2e",
    "#1b2838", "#2d1b2e", "#1e293b", "#1a0a0a",
    "#0a1a1a", "#1a1a0a", "#18181b", "#0c0a1d"
];

/* === State === */
let currentStep = 1;
let tags = [];
let isEditMode = false;
let editingProductId = null;

/* === Form Data Object === */
const formData = {
    title: "",
    type: "桌面端软件",
    tech: "", author: "",
    price: "", priceCurrency: "CNY",
    desc: "",
    color: "#141416",
    coverImage: null,
    deliveryMethod: "source",
    license: "MIT"
};

/* ================================================================
   Public API
   ================================================================ */

/**
 * Open the publish modal.
 */
function openPublishModal() {
    resetForm();
    document.getElementById('publishOverlay').classList.add('open');
    renderStep(1);
    refreshFormI18n();
}

/**
 * Open the publish modal in edit mode with pre-filled data.
 * @param {string} productId
 */
function openPublishEdit(productId) {
    const prod = getProduct(productId);
    if (!prod) return;

    isEditMode = true;
    editingProductId = productId;
    tags = [...(prod.tags || [])];

    // Pre-fill formData from existing product
    Object.assign(formData, {
        title: prod.title,
        type: prod.type,
        tech: prod.tech,
        author: prod.author,
        price: prod.price.replace(/[¥$ ]/g, ''),
        priceCurrency: prod.priceCurrency,
        desc: prod.desc,
        color: prod.color,
        coverImage: prod.coverImage,
        deliveryMethod: prod.deliveryMethod,
        license: prod.license
    });

    // Update header title to reflect edit mode
    const header = document.querySelector('.publish-header h2');
    if (header) header.innerText = '✏️ 编辑作品';

    document.getElementById('publishOverlay').classList.add('open');
    renderStep(1);
}

window.openPublishEdit = openPublishEdit;

/**
 * Close the publish modal.
 */
function closePublishModal() {
    document.getElementById('publishOverlay').classList.remove('open');
    // Restore header title
    const header = document.querySelector('.publish-header h2');
    if (header) header.innerText = '📤 登记新作品';
}
window.closePublishModal = closePublishModal;

/* ================================================================
   Step Navigation
   ================================================================ */

function goToStep(step) {
    if (!validateStep(currentStep)) return;
    collectStepData(currentStep);
    currentStep = step;
    renderStep(step);
    if (step === 3) updatePreview();
}

function renderStep(step) {
    currentStep = step;

    // Step indicators
    [1, 2, 3].forEach(s => {
        const el = document.getElementById(`pubStep${s}`);
        if (!el) return;
        el.classList.remove('active', 'done');
        if (s < step) el.classList.add('done');
        if (s === step) el.classList.add('active');
    });

    // Step content
    const content = document.getElementById('publishStepContent');
    if (!content) return;

    content.innerHTML = STEP_RENDERERS[step]();

    // Buttons
    const backBtn = document.getElementById('publishBackBtn');
    const nextBtn = document.getElementById('publishNextBtn');
    const submitBtn = document.getElementById('publishSubmitBtn');

    if (backBtn) backBtn.style.display = step > 1 ? 'inline-flex' : 'none';
    if (nextBtn) nextBtn.style.display = step < 3 ? 'inline-flex' : 'none';
    if (submitBtn) submitBtn.style.display = step === 3 ? 'inline-flex' : 'none';

    // Bind events for current step
    if (step === 1) setupStep1();
    if (step === 2) setupStep2();
    if (step === 3) { setupStep3(); updatePreview(); }

    // Apply i18n to dynamically rendered labels
    applyLanguage();
}

/* ================================================================
   Step Content Renderers
   ================================================================ */

const STEP_RENDERERS = {
    1: () => `
        <div class="publish-form">
            <div class="form-row single">
                <div class="form-group">
                    <label class="form-label" data-i18n="publish_label_name"><span class="required">*</span> 作品名称</label>
                    <input class="form-input" id="pubTitle" value="${esc(formData.title)}"
                           placeholder="${esc(t('publish_ph_name'))}" />
                    <span class="form-error-msg" id="errTitle"></span>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label" data-i18n="publish_label_type"><span class="required">*</span> 作品类型</label>
                    <select class="form-select" id="pubType">
                        ${PRODUCT_TYPES.zh.map(t => `<option value="${esc(t)}" ${formData.type === t ? 'selected' : ''}>${t}</option>`).join('')}
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label" data-i18n="publish_label_tech">技术栈</label>
                    <input class="form-input" id="pubTech" value="${esc(formData.tech)}"
                           placeholder="${esc(t('publish_ph_tech'))}" />
                </div>
                <div class="form-group">
                    <label class="form-label" data-i18n="publish_label_author">创作者署名</label>
                    <input class="form-input" id="pubAuthor" value="${esc(formData.author)}"
                           placeholder="${esc(t('publish_ph_author'))}" />
                </div>
            </div>
            <div class="form-row triple">
                <div class="form-group">
                    <label class="form-label" data-i18n="publish_label_price"><span class="required">*</span> 期望售价</label>
                    <input class="form-input" id="pubPrice" value="${esc(formData.price)}"
                           placeholder="${esc(t('publish_ph_price'))}" type="number" min="0" step="0.01" />
                    <span class="form-error-msg" id="errPrice"></span>
                </div>
                <div class="form-group">
                    <label class="form-label" data-i18n="publish_label_currency">币种</label>
                    <select class="form-select" id="pubCurrency">
                        <option value="CNY" ${formData.priceCurrency === 'CNY' ? 'selected' : ''}>¥ CNY</option>
                        <option value="USD" ${formData.priceCurrency === 'USD' ? 'selected' : ''}>$ USD</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label" data-i18n="publish_label_license">开源协议</label>
                    <select class="form-select" id="pubLicense">
                        ${LICENSE_OPTIONS.map(o => {
                            const label = currentLang === 'zh' ? (o.label_zh || o.label) : (o.label_en || o.label);
                            return `<option value="${o.value}" ${formData.license === o.value ? 'selected' : ''}>${label}</option>`;
                        }).join('')}
                    </select>
                </div>
            </div>
        </div>
    `,

    2: () => `
        <div class="publish-form">
            <div class="form-group full">
                <label class="form-label" data-i18n="publish_label_desc"><span class="required">*</span> 作品描述</label>
                <textarea class="form-textarea" id="pubDesc"
                          placeholder="${esc(t('publish_ph_desc'))}">${esc(formData.desc)}</textarea>
                <span class="form-error-msg" id="errDesc"></span>
            </div>
            <div class="form-group full">
                <label class="form-label" data-i18n="publish_label_tags">标签 / 关键词</label>
                <div class="tags-input-wrapper" id="tagsWrapper" onclick="document.getElementById('tagInput').focus()">
                    ${tags.map(tg => `<span class="tag-chip">${esc(tg)}<span class="tag-remove" data-tag="${esc(tg)}">&times;</span></span>`).join('')}
                    <input class="tags-input" id="tagInput" placeholder="${esc(t('publish_ph_tag'))}" maxlength="20" />
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label" data-i18n="publish_label_delivery">交付方式</label>
                    <select class="form-select" id="pubDelivery">
                        ${DELIVERY_METHODS.zh.map((m, i) => `<option value="${['source','binary','saas'][i]}" ${formData.deliveryMethod === ['source','binary','saas'][i] ? 'selected' : ''}>${m}</option>`).join('')}
                    </select>
                </div>
            </div>
        </div>
    `,

    3: () => `
        <div class="publish-body">
            <div class="publish-form-col">
                <div class="publish-form">
                    <div class="form-group full">
                        <label class="form-label"><span data-i18n="publish_label_cover">封面背景色</span></label>
                        <div class="color-presets" id="colorPresets">
                            ${COLOR_PRESETS.map(c => `
                                <div class="color-preset ${formData.color === c ? 'selected' : ''}"
                                     style="background:${c}" data-color="${c}" title="${c}"></div>
                            `).join('')}
                            <input type="color" class="color-custom-input" id="colorCustom"
                                   value="${formData.color}" title="自定义颜色" />
                        </div>
                    </div>
                    <div class="form-group full">
                        <label class="form-label"><span data-i18n="publish_label_image">上传封面图</span></label>
                        <div class="image-upload-zone ${formData.coverImage ? 'has-image' : ''}"
                             id="imageDropZone">
                            ${formData.coverImage
                                ? `<img class="image-preview-img" src="${formData.coverImage}" alt="Cover" />
                                   <button class="image-remove-btn" id="removeImageBtn">&times;</button>`
                                : `<div class="image-upload-hint">
                                    <span class="icon">🖼️</span>
                                    <span data-i18n="publish_image_hint">拖拽或点击上传，强制 3:4 比例，< 1MB</span>
                                   </div>`
                            }
                            <input type="file" id="imageFileInput" accept="image/*"
                                   style="display:none;" />
                        </div>
                        <div class="image-size-info" data-i18n="publish_image_crop">
                            上传后自动裁剪为 3:4
                        </div>
                    </div>
                </div>
            </div>
            <div class="publish-preview-col">
                <h4 data-i18n="publish_preview_title">📱 实时卡片预览</h4>
                <div class="preview-card-mini" id="previewCard"></div>
            </div>
        </div>
    `
};

/* ================================================================
   Step Setup (event binding)
   ================================================================ */

function setupStep1() {
    // No special setup needed — single type dropdown
}

function setupStep2() {
    // Tags input
    const tagInput = document.getElementById('tagInput');
    const tagsWrapper = document.getElementById('tagsWrapper');

    if (tagInput) {
        tagInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addTag(tagInput.value.trim());
                tagInput.value = '';
            }
            if (e.key === 'Backspace' && !tagInput.value && tags.length > 0) {
                tags.pop();
                renderTags(tagsWrapper, tagInput);
            }
        });
    }

    if (tagsWrapper) {
        tagsWrapper.addEventListener('click', (e) => {
            if (e.target.classList.contains('tag-remove')) {
                const tagVal = e.target.dataset.tag;
                tags = tags.filter(t => t !== tagVal);
                renderTags(tagsWrapper, tagInput);
            }
        });
    }

    renderTags(tagsWrapper, tagInput);
}

function setupStep3() {
    // Color presets
    document.querySelectorAll('.color-preset').forEach(el => {
        el.addEventListener('click', () => {
            document.querySelectorAll('.color-preset').forEach(e => e.classList.remove('selected'));
            el.classList.add('selected');
            formData.color = el.dataset.color;
            document.getElementById('colorCustom').value = formData.color;
            updatePreview();
        });
    });

    const colorCustom = document.getElementById('colorCustom');
    if (colorCustom) {
        colorCustom.addEventListener('input', () => {
            formData.color = colorCustom.value;
            document.querySelectorAll('.color-preset').forEach(e => e.classList.remove('selected'));
            updatePreview();
        });
    }

    // Image upload
    setupImageUpload();
}

/* ================================================================
   Tags Helper
   ================================================================ */

function addTag(val) {
    const cleaned = val.replace(/[,，\s]+/g, '').slice(0, 20);
    if (!cleaned || tags.includes(cleaned)) return;
    if (tags.length >= 8) return;
    tags.push(cleaned);
}

function renderTags(wrapper, input) {
    const chips = wrapper.querySelectorAll('.tag-chip');
    chips.forEach(c => c.remove());

    tags.forEach(tg => {
        const chip = document.createElement('span');
        chip.className = 'tag-chip';
        chip.innerHTML = `${esc(tg)}<span class="tag-remove" data-tag="${esc(tg)}">&times;</span>`;
        wrapper.insertBefore(chip, input);
    });
}

/* ================================================================
   Image Upload
   ================================================================ */

function setupImageUpload() {
    const zone = document.getElementById('imageDropZone');
    const fileInput = document.getElementById('imageFileInput');
    if (!zone || !fileInput) return;

    // Click to upload
    zone.addEventListener('click', (e) => {
        if (e.target.id === 'removeImageBtn') return;
        fileInput.click();
    });

    fileInput.addEventListener('change', () => handleImageFile(fileInput.files[0]));

    // Drag & drop
    zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('drag-over'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        if (e.dataTransfer.files.length) handleImageFile(e.dataTransfer.files[0]);
    });

    // Remove button
    const removeBtn = document.getElementById('removeImageBtn');
    if (removeBtn) {
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeImage();
        });
    }
}

function handleImageFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    if (file.size > 1024 * 1024) {
        alert(t('publish_err_image_size'));
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        // Crop to 3:4 ratio via canvas
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const targetRatio = 3 / 4;
            const imgRatio = img.width / img.height;

            let sx, sy, sw, sh;
            if (imgRatio > targetRatio) {
                // Image is wider → crop sides
                sw = img.height * targetRatio;
                sh = img.height;
                sx = (img.width - sw) / 2;
                sy = 0;
            } else {
                // Image is taller → crop top/bottom
                sw = img.width;
                sh = img.width / targetRatio;
                sx = 0;
                sy = (img.height - sh) / 2;
            }

            canvas.width = 600;
            canvas.height = 800;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, sx, sy, sw, sh, 0, 0, 600, 800);

            formData.coverImage = canvas.toDataURL('image/jpeg', 0.85);
            updateImagePreview();
            updatePreview();
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(file);
}

function removeImage() {
    formData.coverImage = null;
    updateImagePreview();
    updatePreview();
}

function updateImagePreview() {
    const zone = document.getElementById('imageDropZone');
    if (!zone) return;

    if (formData.coverImage) {
        zone.classList.add('has-image');
        zone.innerHTML = `
            <img class="image-preview-img" src="${formData.coverImage}" alt="Cover" />
            <button class="image-remove-btn" id="removeImageBtn">&times;</button>
        `;
        document.getElementById('removeImageBtn').addEventListener('click', (e) => {
            e.stopPropagation();
            removeImage();
        });
    } else {
        zone.classList.remove('has-image');
        zone.innerHTML = `
            <div class="image-upload-hint">
                <span class="icon">🖼️</span>
                <span data-i18n="publish_image_hint">拖拽或点击上传，强制 3:4 比例，< 1MB</span>
            </div>
        `;
    }
    // Re-bind click
    const fileInput = document.getElementById('imageFileInput');
    zone.addEventListener('click', (e) => {
        if (e.target.id === 'removeImageBtn') return;
        fileInput.click();
    });
}

/* ================================================================
   Live Preview
   ================================================================ */

function updatePreview() {
    collectStepData(3);

    const card = document.getElementById('previewCard');
    if (!card) return;

    const currencySymbol = formData.priceCurrency === 'CNY' ? '¥' : '$';
    const priceDisplay = formData.price ? `${currencySymbol} ${formData.price}` : '¥ 0';
    const zhType = formData.type || '桌面端软件';

    card.innerHTML = `
        <div class="preview-cover" style="background:${formData.color};">
            ${formData.coverImage
                ? `<img src="${formData.coverImage}" alt="Preview" />`
                : (formData.title
                    ? `<span>${esc(formData.title)}</span>`
                    : `<span style="opacity:0.4;">📷 3:4 Cover</span>`) }
        </div>
        <div class="preview-info">
            <div class="preview-title">${esc(formData.title) || '作品名称'}</div>
            <div class="preview-type">${esc(zhType)}</div>
            <div class="preview-footer">
                <span style="color:var(--color-price)">${esc(priceDisplay)}</span>
                <span style="color:var(--color-accent); font-size:12px;">查看详情 👁️</span>
            </div>
        </div>
    `;
}

/* ================================================================
   Validation
   ================================================================ */

function validateStep(step) {
    collectStepData(step);
    clearErrors();
    let valid = true;

    if (step === 1) {
        if (!formData.title.trim()) { showError('errTitle', t('publish_err_name')); valid = false; }
        if (!formData.price || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
            showError('errPrice', t('publish_err_price')); valid = false;
        }
    }

    if (step === 2) {
        if (!formData.desc.trim() || formData.desc.trim().length < 20) {
            showError('errDesc', t('publish_err_desc')); valid = false;
        }
    }

    return valid;
}

function clearErrors() {
    document.querySelectorAll('.form-error-msg').forEach(el => el.classList.remove('visible'));
    document.querySelectorAll('.form-input.error, .form-textarea.error').forEach(el => el.classList.remove('error'));
}

function showError(id, msg) {
    const el = document.getElementById(id);
    if (el) { el.innerText = msg; el.classList.add('visible'); }
    const inputId = id.replace('err', 'pub');
    const input = document.getElementById(inputId);
    if (input) input.classList.add('error');
}

/* ================================================================
   Data Collection
   ================================================================ */

function collectStepData(step) {
    if (step === 1 || step === 3) {
        const title    = document.getElementById('pubTitle');
        const type     = document.getElementById('pubType');
        const tech     = document.getElementById('pubTech');
        const author   = document.getElementById('pubAuthor');
        const price    = document.getElementById('pubPrice');
        const currency = document.getElementById('pubCurrency');
        const license  = document.getElementById('pubLicense');

        if (title)    formData.title    = title.value.trim();
        if (type)     formData.type     = type.value;
        if (tech)     formData.tech     = tech.value.trim();
        if (author)   formData.author   = author.value.trim();
        if (price)    formData.price    = price.value.trim();
        if (currency) formData.priceCurrency = currency.value;
        if (license)  formData.license  = license.value;
    }

    if (step === 2 || step === 3) {
        const desc     = document.getElementById('pubDesc');
        const delivery = document.getElementById('pubDelivery');

        if (desc)     formData.desc     = desc.value.trim();
        if (delivery) formData.deliveryMethod = delivery.value;
    }
}

/* ================================================================
   Submit
   ================================================================ */

function submitPublish() {
    if (!validateStep(3)) return;
    collectStepData(3);

    formData.tags = [...tags];

    if (isEditMode && editingProductId) {
        updateProduct(editingProductId, {
            title: formData.title,
            type: formData.type,
            tech: formData.tech,
            author: formData.author,
            price: formData.price,
            priceCurrency: formData.priceCurrency,
            desc: formData.desc,
            tags: formData.tags,
            color: formData.color,
            coverImage: formData.coverImage,
            deliveryMethod: formData.deliveryMethod,
            license: formData.license
        });
        closePublishModal();
        renderProducts();

        // Re-open detail modal after edit
        const savedId = editingProductId;
        setTimeout(() => {
            if (typeof window.openItemDetailByID === 'function') {
                window.openItemDetailByID(savedId);
            }
        }, 100);
    } else {
        addProduct(formData);
        closePublishModal();
        renderProducts();
        const currencySymbol = formData.priceCurrency === 'CNY' ? '¥' : '$';
        alert(`${t('publish_success')}\n\n${formData.title}\n${currencySymbol} ${formData.price}`);
    }
}

/* ================================================================
   i18n Refresh
   ================================================================ */

function refreshFormI18n() {
    // Re-render current step to pick up language changes
    if (document.getElementById('publishOverlay').classList.contains('open')) {
        renderStep(currentStep);
    }
}

/* ================================================================
   Helpers
   ================================================================ */

function esc(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function resetForm() {
    currentStep = 1;
    tags = [];
    isEditMode = false;
    editingProductId = null;
    Object.assign(formData, {
        title: "",
        type: "桌面端软件",
        tech: "", author: "",
        price: "", priceCurrency: "CNY",
        desc: "",
        color: "#141416",
        coverImage: null,
        deliveryMethod: "source",
        license: "MIT"
    });
}

/* ================================================================
   Exports & Window Binding
   ================================================================ */

window.openPublishModal   = openPublishModal;
window.closePublishModal  = closePublishModal;
window.goToStep           = goToStep;
window.submitPublish      = submitPublish;

// Expose currentStep for HTML onclick references
Object.defineProperty(window, 'pubCurrentStep', {
    get: () => currentStep
});

export { openPublishModal, refreshFormI18n };
