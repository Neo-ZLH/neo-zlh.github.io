/**
 * 国际化支持文件
 * 提供中英文切换功能
 */

// 语言配置
const translations = {
    'zh': {
        // 导航
        'nav_home': 'Home',
        'nav_publications': 'Publications',
        'nav_projects': 'Projects',
        'nav_blog': 'Blog',
        'nav_gallery': 'Gallery',
        
        // 个人信息
        'slogan': '探索数据的边界，连接智能的未来',
        'info_name': '姓名：',
        'info_name_value': '张梁瀚 Lianghan Zhang（Neo-Zhang）',
        'info_school': '院校：',
        'info_school_value': '武汉大学计算机学院',
        'info_research': '方向：',
        'info_research_value': '数据治理，大数据与数据库，人工智能',
        'info_github': 'GitHub：',
        'info_email': '邮箱：',
        
        // 部分标题
        'publications_title': '学术成果墙',
        'publications_subtitle': '数字矩阵中的知识结晶',
        'projects_title': '项目陈列室',
        'projects_subtitle': '代码构建的数字世界',
        'blog_title': '技术博客',
        'blog_subtitle': '思考与探索的记录',
        'tags_title': '文章标签',
        'activity_title': '活跃度',
        'gallery_title': '多媒体空间',
        'gallery_subtitle': '数字与现实的交汇',
        
        // 加载提示
        'loading_publications': '论文数据加载中...',
        'loading_projects': '项目数据加载中...',
        'loading_blogs': '博客文章加载中...',
        'loading_gallery': '图片加载中...',
        
        // 终端
        'terminal_title': '终端',
        'terminal_placeholder': '输入 \'help\' 获取命令列表...',
        
        // 404页面
        '404_title': '404 - 页面未找到',
        '404_message': 'SYSTEM_PAGE_FAULT_IN_NONPAGED_AREA',
        '404_tech_info': '技术信息:',
        '404_back': '返回主页',
        
        // 页脚
        'footer_built': '使用 HTML, CSS, JavaScript 和 ❤️ 构建',
       
        // 语言切换
        'language_switch': '英文'
    },
    'en': {
        // Navigation
        'nav_home': 'Home',
        'nav_publications': 'Publications',
        'nav_projects': 'Projects',
        'nav_blog': 'Blog',
        'nav_gallery': 'Gallery',
        
        // Personal Info
        'slogan': 'Exploring the boundaries of data, connecting the future of intelligence',
        'info_name': 'Name:',
        'info_name_value': 'Lianghan Zhang 张梁瀚(Neo-Zhang)',
        'info_school': 'Institution:',
        'info_school_value': 'School of Computer Science, Wuhan University',
        'info_research': 'Research:',
        'info_research_value': 'Data Governance, Big Data & Databases, Artificial Intelligence',
        'info_github': 'GitHub:',
        'info_email': 'Email:',
        
        // Section Titles
        'publications_title': 'Academic Publications',
        'publications_subtitle': 'Knowledge crystals in the digital matrix',
        'projects_title': 'Project Showcase',
        'projects_subtitle': 'Digital worlds built with code',
        'blog_title': 'Technical Blog',
        'blog_subtitle': 'Records of thoughts and explorations',
        'tags_title': 'Article Tags',
        'activity_title': 'Activity',
        'gallery_title': 'Media Gallery',
        'gallery_subtitle': 'Where digital meets reality',
        
        // Loading Messages
        'loading_publications': 'Loading publications...',
        'loading_projects': 'Loading projects...',
        'loading_blogs': 'Loading blog posts...',
        'loading_gallery': 'Loading images...',
        
        // Terminal
        'terminal_title': 'Terminal',
        'terminal_placeholder': 'Type \'help\' for command list...',
        
        // 404 Page
        '404_title': '404 - Page Not Found',
        '404_message': 'SYSTEM_PAGE_FAULT_IN_NONPAGED_AREA',
        '404_tech_info': 'Technical Information:',
        '404_back': 'Back to Home',
        
        // Footer
        'footer_built': 'Built with HTML, CSS, JavaScript and ❤️',
        
        // Language Switch
        'language_switch': 'Chinese'
    }
};

// 当前语言
let currentLang = 'en';

// 获取翻译文本
function t(key) {
    return translations[currentLang][key] || key;
}

// 切换语言
function switchLanguage() {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    updatePageContent();
    // 更新HTML的lang属性
    document.documentElement.lang = currentLang;
    // 保存语言偏好到localStorage
    localStorage.setItem('preferred_language', currentLang);
    // 更新语言切换按钮文本
    updateLanguageSwitchButton();
}

// 更新页面内容
function updatePageContent() {
    // 更新导航链接
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key) {
            if (el.tagName === 'INPUT' && el.getAttribute('placeholder')) {
                el.setAttribute('placeholder', t(key));
            } else {
                el.textContent = t(key);
            }
        }
    });
}

// 更新语言切换按钮文本
function updateLanguageSwitchButton() {
    const langBtn = document.getElementById('language-switch');
    if (langBtn) {
        langBtn.textContent = t('language_switch');
    }
}

// 初始化国际化
function initI18n() {
    // 检查是否有保存的语言偏好
    const savedLang = localStorage.getItem('preferred_language');
    if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
        currentLang = savedLang;
        document.documentElement.lang = currentLang;
    }
    
    // 初始更新页面内容
    updatePageContent();
    updateLanguageSwitchButton();
}

// 导出函数
window.i18n = {
    t,
    switchLanguage,
    initI18n
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initI18n);