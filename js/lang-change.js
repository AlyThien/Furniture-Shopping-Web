//Nhóm 9: Phần thay đổi ngôn ngữ
let currentLang = 'en';
let translations = {};

// Tự động phát hiện đường dẫn gốc dựa trên vị trí file HTML
function getBasePath() {
    // Đếm số thư mục từ file HTML hiện tại đến root
    // Bằng cách đếm số lần "../" trong đường dẫn script
    const scriptTags = document.querySelectorAll('script[src*="lang-change.js"]');
    if (scriptTags.length > 0) {
        const scriptSrc = scriptTags[0].getAttribute('src');
        const depth = (scriptSrc.match(/\.\.\//g) || []).length;
        return depth > 0 ? '../'.repeat(depth) : '';
    }
    return '';
}

async function loadTranslation(page, lang) {
    try {
        const basePath = getBasePath();
        // Tải đồng thời file common,json và file json của trang hiện tại
        const [commonRes, pageRes] = await Promise.all([
            fetch(`${basePath}json-lang/common.json`),
            fetch(`${basePath}json-lang/${page}.json`)
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
        
        // Lưu ngôn ngữ đã chọn vào localStorage: để khi chuyển sang trang khác vẫn giữ ngôn ngữ mong muốn
        localStorage.setItem('selectedLanguage', lang);

    } catch (err) {
        console.error("Lỗi tải ngôn ngữ:", err);
        alert("Không thể tải ngôn ngữ. Vui lòng kiểm tra kết nối hoặc file JSON.");
    }
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        
        if (translations[key] !== undefined) {
            // Input placeholder
            if (el.hasAttribute('placeholder')) {
                el.setAttribute('placeholder', translations[key]);
            } 
            // Kiểm tra nếu có data-i18n-html="true"
            else if (el.getAttribute('data-i18n-html') === 'true') {
                el.innerHTML = translations[key];  // ← Giữ HTML
            }
            // Text thuần
            else {
                el.textContent = translations[key];
            }
        }
    });
}


//Nhóm 9: Hàm thay đổi ngôn ngữ khi người dùng chọn radio button
function changeLanguage(lang) {
    const page = document.body.dataset.page || 'home';
    loadTranslation(page, lang);
}

//Nhóm 9: Khởi động khi trang tải xong
document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page || 'home';

    // Lấy ngôn ngữ đã lưu từ localStorage, mặc định là 'en'
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    
    // Cập nhật trạng thái radio button theo ngôn ngữ đã lưu
    const langRadio = document.getElementById(`lang-${savedLang}`);
    if (langRadio) {
        langRadio.checked = true;
    }
    
    // Tải ngôn ngữ đã lưu
    loadTranslation(page, savedLang);
});