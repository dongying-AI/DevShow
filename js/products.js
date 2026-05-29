/* ============================================
   Products — Data model, CRUD, mock seed data

   Schema (extensible):
   {
       id: string,
       zh: { title, type, tech, author, desc, tags[] },
       en: { title, type, tech, author, desc, tags[] },
       price: string,
       priceCurrency: "CNY" | "USD",
       color: string,           // cover background color
       coverImage: string|null, // Data URL or null → SVG fallback
       deliveryMethod: string,  // "source" | "binary" | "saas"
       license: string,
       status: "published" | "draft" | "archived",
       createdAt: string,
       updatedAt: string
   }
   ============================================ */

let _pidCounter = 3;
let products = [
    {
        id: "prod_1",
        zh: {
            title: "MindFlow AI 沉浸式知识库记事本",
            type: "桌面端软件",
            tech: "Rust / Tailwind",
            author: "Alex_🚀 (美国)",
            desc: "专为隐私设计的本地大模型 Markdown 笔记本。采用 Rust 重构打造极致响应速度，帮助用户在完全断网的环境下将碎片文字整理为互联的网状知识图谱，绝无数据泄露风险。",
            tags: ["AI", "笔记", "隐私"]
        },
        en: {
            title: "MindFlow AI Knowledge Workspace",
            type: "Desktop Software",
            tech: "Rust / Tailwind",
            author: "Alex_🚀 (USA)",
            desc: "A privacy-first Markdown notebook powered by local LLM. Built with Rust for maximum performance. It helps users structure raw text into interconnected node maps entirely offline without data leakage.",
            tags: ["AI", "Notes", "Privacy"]
        },
        price: "$ 29",
        priceCurrency: "USD",
        color: "#141416",
        coverImage: null,
        deliveryMethod: "source",
        license: "MIT",
        status: "published",
        createdAt: "2026-03-15T08:00:00Z",
        updatedAt: "2026-03-15T08:00:00Z"
    },
    {
        id: "prod_2",
        zh: {
            title: "PixelPerfect 像素绝对测量插件",
            type: "浏览器插件/脚本",
            tech: "JavaScript / Chrome API",
            author: "木子李 (中国)",
            desc: "专为前端和UI设计师研发的动态像素对齐工具。支持将UI设计稿以半透明形式直接覆盖于浏览器开发的网页之上，一键智能测量各元素间距差异。",
            tags: ["前端", "设计", "Chrome"]
        },
        en: {
            title: "PixelPerfect Pixel Measurement Extension",
            type: "Extension/Script",
            tech: "JavaScript / Chrome API",
            author: "Muzi Li (China)",
            desc: "A precision alignment extension built for frontend engineers and UI designers. It overlays transparent target mocks onto real-time web instances to measure absolute pixel differences in one click.",
            tags: ["Frontend", "Design", "Chrome"]
        },
        price: "¥ 49",
        priceCurrency: "CNY",
        color: "#1c1c1f",
        coverImage: null,
        deliveryMethod: "binary",
        license: "Apache-2.0",
        status: "published",
        createdAt: "2026-04-01T10:00:00Z",
        updatedAt: "2026-04-01T10:00:00Z"
    }
];

/* ---- Product Type Registry (extensible) ---- */
const PRODUCT_TYPES = {
    zh: ["Web网站/SaaS", "移动端App", "微信/原生小程序", "桌面端软件", "浏览器插件/脚本", "API/后端服务", "AI模型/数据集", "游戏/互动体验", "设计资源/模板", "开发工具/SDK"],
    en: ["Web/SaaS", "Mobile App", "Mini-Program", "Desktop Software", "Extension/Script", "API/Backend Service", "AI Model/Dataset", "Game/Interactive", "Design Assets/Template", "Dev Tool/SDK"]
};

const DELIVERY_METHODS = {
    zh: ["完整源码交付", "可执行二进制", "SaaS 在线服务"],
    en: ["Full Source Code", "Executable Binary", "SaaS Online Service"]
};

const LICENSE_OPTIONS = [
    { value: "MIT",      label: "MIT" },
    { value: "Apache-2.0", label: "Apache 2.0" },
    { value: "GPL-3.0",  label: "GPL 3.0" },
    { value: "BSD-3",    label: "BSD 3-Clause" },
    { value: "proprietary", label_zh: "专有许可", label_en: "Proprietary" },
    { value: "none",     label_zh: "暂无", label_en: "None" }
];

/* ---- CRUD ---- */

function addProduct(data) {
    const now = new Date().toISOString();
    const product = {
        id: "prod_" + (_pidCounter++),
        zh: {
            title: data.zhTitle || "",
            type: data.zhType || "",
            tech: data.tech || "",
            author: data.author || "",
            desc: data.zhDesc || "",
            tags: data.tags || []
        },
        en: {
            title: data.enTitle || "",
            type: data.enType || "",
            tech: data.tech || "",
            author: data.author || "",
            desc: data.enDesc || "",
            tags: data.tags || []
        },
        price: data.price || "¥ 0",
        priceCurrency: data.priceCurrency || "CNY",
        color: data.color || "#141416",
        coverImage: data.coverImage || null,
        deliveryMethod: data.deliveryMethod || "source",
        license: data.license || "MIT",
        status: "published",
        createdAt: now,
        updatedAt: now
    };
    products.unshift(product);
    return product;
}

function updateProduct(id, data) {
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    const p = products[idx];

    if (data.zhTitle !== undefined) p.zh.title = data.zhTitle;
    if (data.enTitle !== undefined) p.en.title = data.enTitle;
    if (data.zhType !== undefined)   p.zh.type = data.zhType;
    if (data.enType !== undefined)   p.en.type = data.enType;
    if (data.tech !== undefined)     { p.zh.tech = data.tech; p.en.tech = data.tech; }
    if (data.author !== undefined)   { p.zh.author = data.author; p.en.author = data.author; }
    if (data.zhDesc !== undefined)   p.zh.desc = data.zhDesc;
    if (data.enDesc !== undefined)   p.en.desc = data.enDesc;
    if (data.tags !== undefined)     { p.zh.tags = data.tags; p.en.tags = data.tags; }
    if (data.price !== undefined)    p.price = data.price;
    if (data.priceCurrency !== undefined) p.priceCurrency = data.priceCurrency;
    if (data.color !== undefined)    p.color = data.color;
    if (data.coverImage !== undefined) p.coverImage = data.coverImage;
    if (data.deliveryMethod !== undefined) p.deliveryMethod = data.deliveryMethod;
    if (data.license !== undefined)  p.license = data.license;
    if (data.status !== undefined)   p.status = data.status;

    p.updatedAt = new Date().toISOString();
    return p;
}

function deleteProduct(id) {
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return false;
    products.splice(idx, 1);
    return true;
}

function getProduct(id) {
    return products.find(p => p.id === id) || null;
}

function getProducts(filter) {
    if (!filter || filter === "all") return [...products];
    const typeMap = {
        "web": "Web网站/SaaS", "app": "移动端App", "mini": "微信/原生小程序",
        "pc": "桌面端软件", "plugin": "浏览器插件/脚本"
    };
    const targetZhType = typeMap[filter];
    if (!targetZhType) return [...products];
    return products.filter(p => p.zh.type === targetZhType);
}

export {
    products,
    PRODUCT_TYPES,
    DELIVERY_METHODS,
    LICENSE_OPTIONS,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getProducts
};
