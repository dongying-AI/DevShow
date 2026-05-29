/* ============================================
   i18n — Multi-language dictionary & engine
   ============================================ */

const langDict = {
    zh: {
        doc_title: "DevShow | 全球独立数字化成果交易与直连橱窗",
        btn_publish: "➕ 登记我的作品",
        status_unlogged: "未登录 (仅限浏览首页Top20)",
        status_logged: "已登录 (已全面解锁橱窗)",
        btn_login_mock: "模拟登录平台",
        btn_logout_mock: "退出登录",
        hero_title: "全球独立数字化成果展示大厅",
        hero_desc: "零中介费、全生态直连。未登录用户仅可公开预览最新 Top 20 创新展品的封面形态。",
        visitor_tip: "⚠️ 提示：您当前尚未登录，点击任何卡片都无法查看产品详情和内置翻译留言框。",
        tag_top20: "最新Top 20展示面",
        tag_web: "Web网站/SaaS",
        tag_app: "移动端App",
        tag_mini: "微信/原生小程序",
        tag_pc: "桌面端软件",
        tag_plugin: "浏览器插件/脚本",
        img_specification: "全站严格遵循 3:4 < 1MB 限制",
        action_view_lock: "详情 🔒",
        action_view_unlock: "查看详情 👁️",
        review_title: "来自 <span>全球创作者与买家</span> 的真实反馈",
        review_user1_sub: "SaaS Boilerplate | 🇺🇸 美国",
        review_user1_content: '"在对话中隐藏联系方式后，通过平台自动翻译私信，我居然成功把代码资产转让给了一位中国买家。无界交流的体验太棒了！"',
        review_user2_name: "老齐 (个人创作者)",
        review_user2_sub: "自动化同步脚本 | 🇨🇳 中国",
        review_user2_content: '"平台的 3:4 瀑布流封面视觉极具高级感。最让人安心的是未登录时隐藏全部核心数据，防自动化爬虫效果拉满！"',
        review_user3_sub: "资产独立采购商 | 🇯🇵 日本",
        review_user3_content: '"虽然看中的工具作者是中国人，但我直接写日语询盘，对方在系统后台收到后无缝沟通，非常赞的技术媒介！"',
        promo_box1_title: "为什么全面隐藏私人联系方式？",
        promo_box1_desc: "将微信或公开邮箱暴露在互联网公网上，往往会给独立创作者招致无穷无尽的定向广告和爬虫。内置留信箱提供绝佳的安全隔离：",
        promo_box1_li1: "📌 <strong>高效防噪</strong>：只有对你展出功能存在明确合作意向的用户才能发起首次留信。",
        promo_box1_li2: "📌 <strong>全时防漏</strong>：信息云端存储，无论对方处于何种时区，上线即可统一在后台查收。",
        promo_box2_title: "AI 实时翻译：让好作品走向全球",
        promo_box2_desc: "优秀的成果与代码从来都不分国界，但琐碎的语种隔阂往往让跨国协作夭折。DevShow 打通了无感知翻译管道：",
        promo_box2_li1: "📌 <strong>一键跨国看懂</strong>：面对海外开发者的优秀成品，轻点一下，即可无损转化为你的母语陈述。",
        promo_box2_li2: "📌 <strong>双向母语留信</strong>：海外买家使用英文输入意向，你的收件箱会自动为您备好完美的中文译文。",
        modal_price_label: "创作者期望售价",
        modal_delivery_tag: "成品交付 / 附源码",
        modal_param_tech: "技术栈: ",
        modal_param_author: "创作者署名: ",
        modal_form_title: "🌐 快捷发送询盘留言 (支持机器互译)",
        modal_form_placeholder: "输入你想咨询的合作方向...",
        modal_btn_submit: "发送加密询盘",
        modal_desc_header: "📄 功能陈述详情长页",
        admin_bar_title: "🛠️ 资产管理特权控制组：",
        admin_btn_edit: "编辑修改",
        admin_btn_delist: "下架",
        admin_btn_relist: "上架",
        admin_btn_delete: "删除",
        setting_theme_title: "🎨 界面主题切换",
        setting_lang_title: "🌐 语言显示切换",
        opt_theme_dark: "🌙 极客暗黑 (Dark)",
        opt_theme_light: "☀️ 复古浅色 (Light)",
        footer_copyright: "© 2026 DevShow 独立作品橱窗. 让全球的代码资产无界连接.",
        footer_disclaimer: "<strong>平台重要合规声明：</strong> DevShow 仅充当数字化成品的功能展示与多语言留言翻译的技术媒介。平台**不是**担保交易中介，本身不介入任何线下资金链。买卖双方通过平台留言建立信任后，请自行审慎评估后续的软件交付、定制流程及支付方式，并自行承担全部交易风险。",
        alert_unlogged: "🔒 访问受限\n为了防止自动化爬虫和骚扰，请先点击页面右上角的【模拟登录平台】按钮解锁详情。",
        alert_publish: "✨ 唤醒本地代码注册骨架：\n图片比例已强制锁定3:4，文件体积极限限制在 1MB 之内，符合平台防噪音与高速度规范。",
        alert_inquiry_ok: "留言成功投入对方加密收件箱！",
        /* ---- Publish Form ---- */
        publish_title: "📤 登记新作品",
        publish_step1: "基本信息",
        publish_step2: "作品描述",
        publish_step3: "视觉确认",
        publish_label_name: "作品名称",
        publish_label_type: "作品类型",
        publish_label_tech: "技术栈",
        publish_label_author: "创作者署名",
        publish_label_price: "期望售价",
        publish_label_currency: "币种",
        publish_label_desc: "作品描述",
        publish_label_tags: "标签 / 关键词",
        publish_label_cover: "封面背景色",
        publish_label_image: "上传封面图",
        publish_label_license: "开源协议",
        publish_label_delivery: "交付方式",
        publish_ph_name: "例：智能代码审查助手",
        publish_ph_tech: "例：Python / FastAPI / React",
        publish_ph_author: "例：张三 (中国)",
        publish_ph_price: "例：49",
        publish_ph_desc: "详细描述作品功能、适用场景、技术亮点……",
        publish_ph_tag: "输入后回车添加…",
        publish_image_hint: "拖拽或点击上传，强制 3:4 比例，< 1MB",
        publish_image_crop: "上传后自动裁剪为 3:4",
        publish_btn_next: "下一步 →",
        publish_btn_back: "← 上一步",
        publish_btn_submit: "✅ 提交登记",
        publish_btn_cancel: "取消",
        publish_preview_title: "📱 实时卡片预览",
        publish_err_name: "请输入作品名称",
        publish_err_desc: "请输入作品描述（至少 20 字）",
        publish_err_price: "请输入有效价格",
        publish_err_image_size: "图片大小不能超过 1MB",
        publish_success: "🎉 作品登记成功！\n已展示在首页橱窗中。",
        publish_edit_title: "✏️ 编辑作品",
        admin_delist_ok: "✅ 作品已下架",
        admin_relist_ok: "✅ 作品已上架",
        admin_delete_confirm: "⚠️ 确定要永久删除作品吗？此操作不可恢复。",
        admin_delete_ok: "🗑️ 作品已删除"
    },
    en: {
        doc_title: "DevShow | Global Indie Products Connection Showcase",
        btn_publish: "➕ Register My Product",
        status_unlogged: "Visitor Mode (Top 20 Covers Only)",
        status_logged: "Logged In (Full Showcase Unlocked)",
        btn_login_mock: "Simulate Login",
        btn_logout_mock: "Sign Out",
        hero_title: "Global Indie Products Connection Hub",
        hero_desc: "Zero middleman fees, global direct matching. Non-logged-in visitors can only preview the 3:4 aspect ratio covers of Top 20 creative works.",
        visitor_tip: "⚠️ Alert: You are currently browsed as a visitor. Click action cannot view specifications or send machine-translated inquiries.",
        tag_top20: "Latest Top 20 Showcase",
        tag_web: "Web/SaaS",
        tag_app: "Mobile App",
        tag_mini: "Mini-Program",
        tag_pc: "Desktop Software",
        tag_plugin: "Extension/Script",
        img_specification: "Strict 3:4 & < 1MB Image Limit Enforced",
        action_view_lock: "Detail 🔒",
        action_view_unlock: "View Detail 👁️",
        review_title: "Trusted by <span>Global Creators & Buyers</span>",
        review_user1_sub: "SaaS Boilerplate | 🇺🇸 United States",
        review_user1_content: '"After hiding direct channels, the built-in system auto-translated the inquiries perfectly. I sold my tool stack to an overseas buyer smoothly. Incredible barrier-free experience!"',
        review_user2_name: "Lao Qi (Indie Developer)",
        review_user2_sub: "Automation Sync Script | 🇨🇳 China",
        review_user2_content: '"The 3:4 waterfall cover grid looks premium. The best security logic is hiding core metadata from unlogged requests—absolute shield against automatic crawlers!"',
        review_user3_sub: "Asset Acquisition Lead | 🇯🇵 Japan",
        review_user3_content: '"Even though the target author was from China, I sent the inquiry directly in Japanese, and the backend translation bridged the workflow completely. Brilliant technology pipeline."',
        promo_box1_title: "Why Hide Direct Contact Channels?",
        promo_box1_desc: "Exposing personal messenger IDs or raw emails publicly invites endless spam and malicious scrapers. The built-in query vault ensures maximum privacy isolation:",
        promo_box1_li1: "📌 <strong>Anti-Spam Filter</strong>: Inbound messages can only be initialized by users who have verified intentions regarding your active product features.",
        promo_box1_li2: "📌 <strong>Zero Leakage</strong>: All inquiries are safely cached in the encrypted cloud storage. Review all global leads uniformly regardless of time zones.",
        promo_box2_title: "Real-time AI Translation: Code Speaks Global",
        promo_box2_desc: "Brilliant digital solutions know no boundaries, yet trivial language friction often ruins potential synergy. DevShow embeds frictionless translation nodes:",
        promo_box2_li1: "📌 <strong>One-Click Read</strong>: Instantly translate intricate technical copy from foreign creators into your native language with zero layout loss.",
        promo_box2_li2: "📌 <strong>Bidirectional Delivery</strong>: When overseas buyers submit leads in English, your notification channel prepares translated native text automatically.",
        modal_price_label: "Expected Valuation",
        modal_delivery_tag: "Full Codebase Included",
        modal_param_tech: "Tech Stack: ",
        modal_param_author: "Creator Name: ",
        modal_form_title: "🌐 Drop Instant Inquiry Box (Auto Cross-Translated)",
        modal_form_placeholder: "Type your cooperation goals or requirements...",
        modal_btn_submit: "Send Encrypted Inquiry",
        modal_desc_header: "📄 Deep Technical Specifications Documentation",
        admin_bar_title: "🛠️ Creator Administrative Privilege Dashboard:",
        admin_btn_edit: "Modify Specs",
        admin_btn_delist: "Shelve Asset",
        admin_btn_relist: "Relist",
        admin_btn_delete: "Hard Delete",
        setting_theme_title: "🎨 Interface Theme",
        setting_lang_title: "🌐 Switch Language",
        opt_theme_dark: "🌙 Dark Mode",
        opt_theme_light: "☀️ Light Mode",
        footer_copyright: "© 2026 DevShow Showcase. Connecting global software assets with absolute efficiency.",
        footer_disclaimer: "<strong>Critical Compliance Disclaimer:</strong> DevShow only acts as a technical showcase pipeline and multilingual machine translation medium. The platform is **NOT** an escrow transaction broker and never handles client funding. Users must independently evaluate software deployment, source authenticity, and custom workflows at their own transaction risks.",
        alert_unlogged: "🔒 Restricted Access\nTo block aggressive automation scrapers, please click [Simulate Login] on the top-right navigation to unlock asset details.",
        alert_publish: "✨ Initializing Local Form Engine:\nImage aspect ratio is forced to 3:4, with file sizes strictly limited to < 1MB under anti-bloat performance rules.",
        alert_inquiry_ok: "Inquiry successfully dropped into the creator's encrypted mailbox!",
        /* ---- Publish Form ---- */
        publish_title: "📤 Register New Product",
        publish_step1: "Basic Info",
        publish_step2: "Description",
        publish_step3: "Visual Preview",
        publish_label_name: "Product Name",
        publish_label_type: "Product Type",
        publish_label_tech: "Tech Stack",
        publish_label_author: "Creator Name",
        publish_label_price: "Expected Price",
        publish_label_currency: "Currency",
        publish_label_desc: "Description",
        publish_label_tags: "Tags / Keywords",
        publish_label_cover: "Cover Color",
        publish_label_image: "Upload Cover Image",
        publish_label_license: "License",
        publish_label_delivery: "Delivery Method",
        publish_ph_name: "e.g. Smart Code Review Assistant",
        publish_ph_tech: "e.g. Python / FastAPI / React",
        publish_ph_author: "e.g. John Doe (USA)",
        publish_ph_price: "e.g. 49",
        publish_ph_desc: "Describe features, use cases, tech highlights...",
        publish_ph_tag: "Type and press Enter to add...",
        publish_image_hint: "Drag & drop or click to upload, 3:4 ratio, < 1MB",
        publish_image_crop: "Auto-cropped to 3:4 ratio after upload",
        publish_btn_next: "Next →",
        publish_btn_back: "← Back",
        publish_btn_submit: "✅ Submit Registration",
        publish_btn_cancel: "Cancel",
        publish_preview_title: "📱 Live Card Preview",
        publish_err_name: "Product name is required",
        publish_err_desc: "Description required (min 20 chars)",
        publish_err_price: "Please enter a valid price",
        publish_err_image_size: "Image must be under 1MB",
        publish_success: "🎉 Product registered successfully!\nNow visible in the showcase.",
        publish_edit_title: "✏️ Edit Product",
        admin_delist_ok: "✅ Product delisted",
        admin_relist_ok: "✅ Product relisted",
        admin_delete_confirm: "⚠️ Are you sure you want to permanently delete this product? This cannot be undone.",
        admin_delete_ok: "🗑️ Product deleted"
    }
};

let currentLang = "zh";

/**
 * Apply the current language to all [data-i18n] elements in the DOM.
 * @param {string} [lang] - Language code; defaults to currentLang.
 */
function applyLanguage(lang) {
    if (lang) currentLang = lang;
    document.documentElement.setAttribute('data-lang', currentLang);

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (!langDict[currentLang][key]) return;

        const text = langDict[currentLang][key];
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.setAttribute('placeholder', text);
        } else if (key.includes('desc') || key.includes('li') || key.includes('disclaimer') || key.includes('review_title')) {
            element.innerHTML = text;
        } else {
            element.innerText = text;
        }
    });
}

/**
 * Get a translated string by key.
 * @param {string} key
 * @returns {string}
 */
function t(key) {
    return langDict[currentLang]?.[key] ?? key;
}

export { currentLang, langDict, applyLanguage, t };
