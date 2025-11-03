let currentLang = 'en';
let translations = {};

async function loadTranslation(page, lang) {
    try {
        // Tải đồng thời common + trang hiện tại
        const [commonRes, pageRes] = await Promise.all([
            fetch(`json-lang/common.json`),
            fetch(`json-lang/${page}.json`)
        ]);

        if (!commonRes.ok || !pageRes.ok) throw new Error("File not found");

        const [commonData, pageData] = await Promise.all([
            commonRes.json(),
            pageRes.json()
        ]);

        // Gộp: trang hiện tại ghi đè lên common nếu trùng key
        translations = {
            ...commonData[lang],
            ...pageData[lang]
        };

        applyTranslations();
        currentLang = lang;

    } catch (err) {
        console.error("Lỗi tải ngôn ngữ:", err);
        alert("Không thể tải ngôn ngữ. Vui lòng kiểm tra kết nối hoặc file JSON.");
    }
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key] !== undefined) {
            el.textContent = translations[key];
        }
    });
}

function changeLanguage(lang) {
    const page = document.body.dataset.page || 'home';
    loadTranslation(page, lang);
}

// Khởi động khi trang tải xong
document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page || 'home';

    // Tải tiếng Anh mặc định
    loadTranslation(page, 'en');
    
});