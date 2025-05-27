/**
 * 主JavaScript文件
 * 负责网站的核心功能和交互
 */

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 初始化代码背景
    initCodeBackground();
    
    // 初始化移动端菜单
    initMobileMenu();
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 初始化键盘快捷键
    initKeyboardShortcuts();
    
    // 初始化PWA功能
    initPWA();
    
    // 处理404错误页面
    initErrorPage();
});

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
function initScrollAnimations() {
    // 添加fade-in类到需要动画的元素
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const heading = section.querySelector('h2');
        const content = section.querySelectorAll('p, .grid, .publications-timeline, .projects-container, .blog-container, .gallery-container');
        
        if (heading) heading.classList.add('fade-in');
        content.forEach(el => el.classList.add('fade-in'));
    });
    
    // 创建Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 如果元素已经显示，不再观察它
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // 当10%的元素可见时触发
        rootMargin: '0px 0px -50px 0px' // 提前50px触发
    });
    
    // 观察所有带有fade-in类的元素
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

/**
 * 初始化键盘快捷键
 */
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Alt+G: 打开GitHub
        if (e.altKey && e.key === 'g') {
            window.open('https://github.com/Neo-ZLH', '_blank');
        }
        
        // Alt+T: 打开/关闭终端
        if (e.altKey && e.key === 't') {
            toggleTerminal();
        }
        
        // Alt+H: 回到顶部
        if (e.altKey && e.key === 'h') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Alt+P: 跳转到项目部分
        if (e.altKey && e.key === 'p') {
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        }
    });
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