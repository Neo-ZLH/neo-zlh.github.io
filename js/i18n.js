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
        'terminal_welcome': '欢迎使用Neo Zhang的终端模拟器！',
        'terminal_help_tip': '输入 "help" 获取可用命令列表。',
        'terminal_command_not_found': '命令未找到: {0}. 输入 \'help\' 获取可用命令列表。',
        
        // 终端命令
        'cmd_available': '可用命令:',
        'cmd_help': '显示此帮助信息',
        'cmd_about': '关于Neo Zhang',
        'cmd_skills': '显示技能列表',
        'cmd_contact': '显示联系方式',
        'cmd_projects': '显示项目列表',
        'cmd_publications': '显示发表的论文',
        'cmd_clear': '清空终端',
        'cmd_echo': '显示文本',
        'cmd_date': '显示当前日期和时间',
        'cmd_github': '打开GitHub个人主页',
        'cmd_exit': '关闭终端',
        'cmd_matrix': '显示Matrix效果',
        'cmd_ascii': '显示ASCII艺术',
        'cmd_keyboard_shortcuts': '键盘快捷键:',
        'cmd_alt_t': '打开/关闭终端',
        'cmd_alt_g': '打开GitHub',
        'cmd_alt_h': '回到顶部',
        'cmd_alt_p': '跳转到项目部分',
        
        // 关于信息
        'about_name': '姓名: 张梁瀚 (Neo Zhang)',
        'about_school': '院校: 武汉大学计算机学院',
        'about_research': '研究方向: 数据治理，大数据与数据库，人工智能',
        'about_intro1': '我是一名热爱技术的计算机科学研究者，专注于数据科学和人工智能领域。',
        'about_intro2': '通过算法和系统设计，致力于解决复杂的数据问题，推动技术创新。',
        
        // 联系方式
        'contact_email': '邮箱: lianghan.zhang@whu.edu.cn',
        'contact_github': 'GitHub: https://github.com/Neo-ZLH',
        'contact_scholar': 'Google Scholar: https://scholar.google.com',
        'contact_message': '欢迎通过以上方式与我联系，探讨学术研究或技术合作。',
        
        // 项目和论文
        'projects_message1': '项目列表:',
        'projects_message2': '请访问网页中的"项目陈列室"部分查看详细信息。',
        'projects_message3': '或者输入 "github" 命令访问我的GitHub主页。',
        'publications_message1': '发表的论文:',
        'publications_message2': '请访问网页中的"学术成果墙"部分查看详细信息。',
        
        // 其他终端消息
        'github_opening': '正在打开GitHub...',
        
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
        'terminal_welcome': 'Welcome to Neo Zhang\'s Terminal Emulator!',
        'terminal_help_tip': 'Type "help" to see available commands.',
        'terminal_command_not_found': 'Command not found: {0}. Type \'help\' for available commands.',
        
        // Terminal Commands
        'cmd_available': 'Available commands:',
        'cmd_help': 'Display this help information',
        'cmd_about': 'About Neo Zhang',
        'cmd_skills': 'Display skills list',
        'cmd_contact': 'Show contact information',
        'cmd_projects': 'List projects',
        'cmd_publications': 'Show published papers',
        'cmd_clear': 'Clear terminal',
        'cmd_echo': 'Display text',
        'cmd_date': 'Show current date and time',
        'cmd_github': 'Open GitHub profile',
        'cmd_exit': 'Close terminal',
        'cmd_matrix': 'Display Matrix effect',
        'cmd_ascii': 'Show ASCII art',
        'cmd_keyboard_shortcuts': 'Keyboard shortcuts:',
        'cmd_alt_t': 'Open/close terminal',
        'cmd_alt_g': 'Open GitHub',
        'cmd_alt_h': 'Back to top',
        'cmd_alt_p': 'Jump to projects section',
        
        // About Information
        'about_name': 'Name: Lianghan Zhang (Neo Zhang)',
        'about_school': 'Institution: School of Computer Science, Wuhan University',
        'about_research': 'Research: Data Governance, Big Data & Databases, Artificial Intelligence',
        'about_intro1': 'I am a computer science researcher passionate about technology, focusing on data science and artificial intelligence.',
        'about_intro2': 'Through algorithm and system design, I am committed to solving complex data problems and driving technological innovation.',
        
        // Contact Information
        'contact_email': 'Email: lianghan.zhang@whu.edu.cn',
        'contact_github': 'GitHub: https://github.com/Neo-ZLH',
        'contact_scholar': 'Google Scholar: https://scholar.google.com',
        'contact_message': 'Feel free to contact me through the above channels to discuss academic research or technical collaboration.',
        
        // Projects and Publications
        'projects_message1': 'Project List:',
        'projects_message2': 'Please visit the "Project Showcase" section on the webpage for details.',
        'projects_message3': 'Or type "github" command to visit my GitHub profile.',
        'publications_message1': 'Published Papers:',
        'publications_message2': 'Please visit the "Academic Publications" section on the webpage for details.',
        
        // Other Terminal Messages
        'github_opening': 'Opening GitHub...',
        
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