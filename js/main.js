/**
 * 主JavaScript文件
 * 负责网站的核心功能和交互
 */

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    console.log('=== INITIALIZING MAIN SCRIPT ===');
    
    // 初始化终端
    initTerminal();
    
    // 初始化ASCII艺术
    initAsciiArt();
    
    // 初始化项目展示
    initProjects();
    
    // 初始化学术成果墙
    initPublications();
    
    // 初始化博客聚合
    initBlogs();
    
    // 初始化图库
    initGallery();
    
    // 初始化国际化
    initI18n();
    
    // 设置当前年份
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // 初始化导航栏交互
    initNavigation();
    
    // 初始化移动端菜单
    initMobileMenu();
    
    // 初始化代码背景
    initCodeBackground();
    
    // 初始化摘要切换按钮
    initAbstractToggles();
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 添加终端按钮
    addTerminalButton();
    
    // 初始化PWA
    initPWA();
    
    // 初始化错误页面
    initErrorPage();
});

/**
 * 初始化滚动动画
 * 确保所有fade-in元素能够正确显示
 */
function initScrollAnimations() {
    console.log('Initializing scroll animations...');
    
    // 等待一小段时间确保DOM完全加载
    setTimeout(() => {
        const fadeElements = document.querySelectorAll('.fade-in');
        console.log(`Found ${fadeElements.length} fade-in elements`);
        
        // 立即显示所有fade-in元素
        fadeElements.forEach((element, index) => {
            // 延迟显示，创建渐进效果
            setTimeout(() => {
                element.classList.add('visible');
                console.log(`Made element ${index + 1} visible:`, element);
            }, index * 150);
        });
        
        // 设置滚动监听器用于后续动态添加的元素
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });
        
        // 观察所有fade-in元素
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }, 100);
}

/**
 * 初始化摘要切换按钮
 */
function initAbstractToggles() {
    console.log('Initializing abstract toggles');
    const toggleButtons = document.querySelectorAll('.abstract-toggle');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 找到最近的摘要内容
            const abstractContent = button.closest('div').nextElementSibling;
            if (abstractContent && abstractContent.classList.contains('abstract-content')) {
                // 切换显示/隐藏
                if (abstractContent.style.display === 'none' || !abstractContent.style.display) {
                    abstractContent.style.display = 'block';
                    button.textContent = 'Hide Abstract';
                } else {
                    abstractContent.style.display = 'none';
                    button.textContent = 'Abstract';
                }
            }
        });
    });
}

/**
 * 初始化代码背景
 * 创建Matrix风格的代码雨效果
 */
function initCodeBackground() {
    const codeBackground = document.createElement('div');
    codeBackground.className = 'code-bg';
    document.body.appendChild(codeBackground);
    
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$#@%&*(){}[]<>=+-/\\|';
    const codeSnippets = [
        'function getData() {',
        '  return fetch("/api/data")',
        '    .then(res => res.json())',
        '    .catch(err => console.error(err));',
        '}',
        'class DataProcessor {',
        '  constructor(data) {',
        '    this.data = data;',
        '  }',
        '  process() {',
        '    return this.data.map(item => item.value);',
        '  }',
        '}',
        'const result = await processData();',
        'if (result.status === 200) {',
        '  renderUI(result.data);',
        '}'
    ];
    
    // 创建20条代码线
    for (let i = 0; i < 20; i++) {
        const line = document.createElement('div');
        line.className = 'code-line';
        
        // 随机选择代码片段或生成随机字符
        if (Math.random() > 0.5) {
            line.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        } else {
            let text = '';
            const length = 20 + Math.floor(Math.random() * 30);
            for (let j = 0; j < length; j++) {
                text += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            line.textContent = text;
        }
        
        // 随机位置和动画时间
        const left = Math.random() * 100;
        const duration = 10 + Math.random() * 20;
        const delay = Math.random() * 10;
        
        line.style.left = `${left}%`;
        line.style.animationDuration = `${duration}s`;
        line.style.animationDelay = `${delay}s`;
        
        codeBackground.appendChild(line);
    }
}

/**
 * 初始化导航栏交互
 */
function initNavigation() {
    // 平滑滚动到锚点
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 高亮当前导航项
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // 移除所有活动状态
                navLinks.forEach(link => link.classList.remove('active'));
                // 添加当前活动状态
                const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });
}

/**
 * 初始化移动端菜单
 */
function initMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // 点击菜单项后关闭菜单
        const menuItems = mobileMenu.querySelectorAll('a');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

/**
 * 初始化滚动动画
 * 使用Intersection Observer API实现元素进入视口时的动画
 */
/**
 * 初始化滚动动画
 * 为带有fade-in类的元素添加可见性检测
 */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // 立即显示视口内的元素
    fadeElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        
        if (isVisible) {
            element.classList.add('visible');
        }
    });
    
    // 创建Intersection Observer观察滚动中出现的元素
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 一旦元素可见，不再观察它
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // 当元素10%可见时触发
        rootMargin: '0px 0px -50px 0px' // 提前50px触发
    });
    
    // 观察所有尚未可见的元素
    fadeElements.forEach(element => {
        if (!element.classList.contains('visible')) {
            observer.observe(element);
        }
    });
}

/**
 * 初始化键盘快捷键
 */
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // 在Mac上，altKey对应Option键，但有时可能不被正确识别
        // 添加一个直接的按钮来打开终端
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        
        // Alt/Option+G: 打开GitHub
        if (e.altKey && e.key === 'g') {
            window.open('https://github.com/Neo-ZLH', '_blank');
        }
        
        // Alt/Option+T: 打开/关闭终端
        if (e.altKey && e.key === 't') {
            toggleTerminal();
        }
        
        // Alt/Option+H: 回到顶部
        if (e.altKey && e.key === 'h') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Alt/Option+P: 跳转到项目部分
        if (e.altKey && e.key === 'p') {
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // 添加一个可见的终端按钮
    addTerminalButton();
}

/**
 * 切换终端显示状态
 */
function toggleTerminal() {
    const terminal = document.getElementById('terminal');
    if (terminal) {
        const isVisible = terminal.style.transform === 'translateY(0px)';
        terminal.style.transform = isVisible ? '' : 'translateY(0px)';
    }
}

/**
 * 初始化PWA功能
 */
function initPWA() {
    // 检查是否支持Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('ServiceWorker registered: ', registration.scope);
                })
                .catch(error => {
                    console.log('ServiceWorker registration failed: ', error);
                });
        });
    }
    
    // 处理安装提示
    let deferredPrompt;
    const installPrompt = document.createElement('div');
    installPrompt.className = 'install-prompt';
    installPrompt.innerHTML = `
        <p>将此网站添加到您的主屏幕？</p>
        <div class="prompt-buttons">
            <button class="install-button">安装</button>
            <button class="dismiss-button">稍后再说</button>
        </div>
    `;
    document.body.appendChild(installPrompt);
    
    window.addEventListener('beforeinstallprompt', (e) => {
        // 阻止Chrome 67及更早版本自动显示安装提示
        e.preventDefault();
        // 保存事件以便稍后触发
        deferredPrompt = e;
        // 显示自定义安装提示
        installPrompt.style.display = 'block';
    });
    
    // 安装按钮点击事件
    const installButton = installPrompt.querySelector('.install-button');
    if (installButton) {
        installButton.addEventListener('click', () => {
            // 隐藏提示
            installPrompt.style.display = 'none';
            // 显示安装提示
            if (deferredPrompt) {
                deferredPrompt.prompt();
                // 等待用户响应
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('用户接受安装');
                    } else {
                        console.log('用户拒绝安装');
                    }
                    deferredPrompt = null;
                });
            }
        });
    }
    
    // 关闭按钮点击事件
    const dismissButton = installPrompt.querySelector('.dismiss-button');
    if (dismissButton) {
        dismissButton.addEventListener('click', () => {
            installPrompt.style.display = 'none';
        });
    }
}

/**
 * 初始化404错误页面
 */
function initErrorPage() {
    const errorPage = document.getElementById('error-page');
    const errorBackButton = document.getElementById('error-back');
    
    if (errorBackButton) {
        errorBackButton.addEventListener('click', () => {
            errorPage.classList.add('hidden');
        });
    }
    
    // 监听无效链接点击
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.getAttribute('href') === '#404') {
            e.preventDefault();
            errorPage.classList.remove('hidden');
        }
    });
}

/**
 * 辅助函数：生成随机颜色
 */
function getRandomColor(baseColor, variation = 30) {
    // 解析基础颜色
    const r = parseInt(baseColor.slice(1, 3), 16);
    const g = parseInt(baseColor.slice(3, 5), 16);
    const b = parseInt(baseColor.slice(5, 7), 16);
    
    // 添加随机变化
    const newR = Math.max(0, Math.min(255, r + (Math.random() * variation * 2 - variation)));
    const newG = Math.max(0, Math.min(255, g + (Math.random() * variation * 2 - variation)));
    const newB = Math.max(0, Math.min(255, b + (Math.random() * variation * 2 - variation)));
    
    // 转换回十六进制
    return `#${Math.round(newR).toString(16).padStart(2, '0')}${Math.round(newG).toString(16).padStart(2, '0')}${Math.round(newB).toString(16).padStart(2, '0')}`;
}

/**
 * 辅助函数：格式化日期
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * 辅助函数：截断文本
 */
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}

/**
 * 添加终端按钮
 * 在页面右下角添加一个固定的按钮，点击后打开终端
 */
function addTerminalButton() {
    // 创建按钮元素
    const terminalButton = document.createElement('button');
    terminalButton.id = 'terminal-button';
    terminalButton.className = 'fixed bottom-4 right-4 bg-darker-bg border border-cyber-green/30 text-cyber-green rounded-full w-12 h-12 flex items-center justify-center shadow-lg z-30 hover:bg-gray-800 transition-colors';
    terminalButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3" /></svg>';
    terminalButton.title = '打开终端 (Alt+T)';
    
    // 添加点击事件
    terminalButton.addEventListener('click', () => {
        toggleTerminal();
    });
    
    // 添加到页面
    document.body.appendChild(terminalButton);
}