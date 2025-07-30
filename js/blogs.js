/**
 * 博客功能模块 - 重构版
 * 负责从blog_md文件夹加载Markdown博文并显示
 * 作者: Neo Zhang
 * 最后更新: 2024-01-01
 */

// 博客数据缓存
let blogCache = null;

/**
 * 初始化博客区域
 * 加载并显示最新的3篇博客文章
 */
async function initBlogs() {
    console.log('=== 开始初始化博客区域 ===');
    const blogsContainer = document.querySelector('#blog-container');
    
    if (!blogsContainer) {
        console.error('找不到博客容器元素 #blog-container');
        return;
    }
    
    console.log('找到博客容器元素:', blogsContainer);
    
    // 显示加载状态
    blogsContainer.innerHTML = '<div class="text-center text-gray-500 py-8 md:col-span-3">博客文章加载中...</div>';
    
    try {
        // 获取所有博客数据
        const blogs = await loadAllBlogs();
        console.log(`成功加载 ${blogs.length} 篇博客`);
        
        // 清空容器
        blogsContainer.innerHTML = '';
        
        if (blogs.length === 0) {
            blogsContainer.innerHTML = '<div class="text-center text-gray-500 py-8 md:col-span-3">暂无博客文章</div>';
            return;
        }
        
        // 显示最新的3篇博客
        const recentBlogs = blogs.slice(0, 3);
        recentBlogs.forEach(blog => {
            const blogCard = createBlogCard(blog);
            blogsContainer.appendChild(blogCard);
        });
        
        // 添加"查看所有博文"按钮
        if (blogs.length > 3) {
            const viewAllButton = createViewAllButton();
            blogsContainer.appendChild(viewAllButton);
        }
        
        console.log('=== 博客初始化完成 ===');
        
    } catch (error) {
        console.error('=== 加载博客失败 ===', error);
        blogsContainer.innerHTML = '<div class="text-center text-red-500 py-8 md:col-span-3">加载博客失败，请稍后再试</div>';
    }
}

/**
 * 加载所有博客文章
 * 从blog_md文件夹扫描所有.md文件并解析
 * @returns {Promise<Array>} 博客数据数组
 */
async function loadAllBlogs() {
    if (blogCache) {
        console.log('使用缓存的博客数据');
        return blogCache;
    }
    
    console.log('开始扫描blog_md文件夹...');
    
    // 已知的博客文件列表（实际项目中可以通过API获取）
    const blogFiles = [
        'hello_world.md',
        'ai_ethics.md', 
        'data_science.md',
        'zlh_blog.md'
    ];
    
    const blogs = [];
    
    for (const filename of blogFiles) {
        try {
            console.log(`正在加载: ${filename}`);
            const blog = await loadBlogFromFile(filename);
            if (blog) {
                blogs.push(blog);
            }
        } catch (error) {
            console.warn(`加载博客文件 ${filename} 失败:`, error);
        }
    }
    
    // 按日期排序（最新的在前）
    blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // 缓存结果
    blogCache = blogs;
    
    console.log(`成功加载 ${blogs.length} 篇博客`);
    return blogs;
}

/**
 * 从单个Markdown文件加载博客数据
 * @param {string} filename 文件名
 * @returns {Promise<Object|null>} 博客数据对象
 */
async function loadBlogFromFile(filename) {
    try {
        const response = await fetch(`blog_md/${filename}`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const content = await response.text();
        return parseBlogContent(filename, content);
        
    } catch (error) {
        console.error(`加载文件 ${filename} 失败:`, error);
        return null;
    }
}

/**
 * 解析博客内容，提取元数据
 * @param {string} filename 文件名
 * @param {string} content 文件内容
 * @returns {Object} 博客数据对象
 */
function parseBlogContent(filename, content) {
    const lines = content.split('\n');
    
    // 提取标题（第一个#标题）
    let title = filename.replace('.md', '').replace(/_/g, ' ');
    const titleMatch = content.match(/^#\s+(.+)$/m);
    if (titleMatch) {
        title = titleMatch[1];
    }
    
    // 提取标签（文件末尾的"标签:"行）
    let tags = ['未分类'];
    const tagMatch = content.match(/标签[：:]\s*(.+)$/m);
    if (tagMatch) {
        tags = tagMatch[1].split(/[,，]/).map(tag => tag.trim()).filter(tag => tag);
    }
    
    // 生成摘要（取前200个字符，去除Markdown标记）
    let summary = content
        .replace(/^#+\s+.+$/gm, '') // 移除标题
        .replace(/\*\*(.+?)\*\*/g, '$1') // 移除粗体标记
        .replace(/\*(.+?)\*/g, '$1') // 移除斜体标记
        .replace(/`(.+?)`/g, '$1') // 移除代码标记
        .replace(/\[(.+?)\]\(.+?\)/g, '$1') // 移除链接，保留文本
        .replace(/^\s*[-*+]\s+/gm, '') // 移除列表标记
        .replace(/^\s*\d+\.\s+/gm, '') // 移除数字列表标记
        .replace(/\n\s*\n/g, ' ') // 合并多个换行
        .trim()
        .substring(0, 200);
    
    if (summary.length === 200) {
        summary += '...';
    }
    
    // 估算日期（基于文件修改时间的模拟，实际项目中应该从文件元数据或Git获取）
    const dateMap = {
        'hello_world.md': '2024-01-01',
        'ai_ethics.md': '2024-01-15', 
        'data_science.md': '2024-01-10',
        'zlh_blog.md': '2024-01-05'
    };
    
    const date = dateMap[filename] || '2024-01-01';
    
    return {
        id: filename.replace('.md', ''),
        title,
        summary,
        tags,
        date,
        filename,
        content
    };
}

/**
 * 创建博客卡片元素
 * @param {Object} blog 博客数据
 * @returns {HTMLElement} 博客卡片DOM元素
 */
function createBlogCard(blog) {
    const card = document.createElement('div');
    card.className = 'blog-card bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-green-500 transition-all duration-300 cursor-pointer';
    
    // 添加点击事件
    card.addEventListener('click', (e) => {
        e.preventDefault();
        openBlogDetail(blog);
    });
    
    card.innerHTML = `
        <div class="flex flex-col h-full">
            <h3 class="text-xl font-bold text-white mb-3 hover:text-green-400 transition-colors">
                ${escapeHtml(blog.title)}
            </h3>
            <div class="flex flex-wrap gap-2 mb-4">
                ${blog.tags.map(tag => 
                    `<span class="px-2 py-1 bg-gray-700 text-green-400 text-sm rounded">${escapeHtml(tag)}</span>`
                ).join('')}
            </div>
            <div class="text-sm text-gray-400">
                发布日期: ${blog.date}
            </div>
        </div>
    `;
    
    return card;
}

/**
 * 创建"查看所有博文"按钮
 * @returns {HTMLElement} 按钮DOM元素
 */
function createViewAllButton() {
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'md:col-span-3 text-center mt-8';
    
    const button = document.createElement('button');
    button.className = 'bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition-colors duration-300 font-medium';
    button.textContent = '查看所有博文';
    
    button.addEventListener('click', (e) => {
        e.preventDefault();
        openBlogList();
    });
    
    buttonContainer.appendChild(button);
    return buttonContainer;
}

/**
 * 打开博客详情页
 * @param {Object} blog 博客数据
 * @param {boolean} fromList 是否从博客列表页进入
 */
function openBlogDetail(blog, fromList = false) {
    console.log('打开博客详情:', blog.title);
    
    // 构建可读性URL
    const readableUrl = `#blogs/${blog.id}`;
    
    // 更新URL但不刷新页面
    window.history.pushState({ type: 'blog', id: blog.id, fromList: fromList }, blog.title, readableUrl);
    
    // 渲染博客详情页
    renderBlogDetail(blog, fromList);
}

/**
 * 打开博客列表页
 */
async function openBlogList() {
    console.log('打开博客列表页');
    
    // 构建可读性URL
    const readableUrl = '#blogs';
    
    // 更新URL但不刷新页面
    window.history.pushState({ type: 'blogList' }, '所有博文', readableUrl);
    
    // 渲染博客列表页
    const blogs = await loadAllBlogs();
    renderBlogList(blogs);
}

/**
 * 渲染博客详情页
 * @param {Object} blog 博客数据
 * @param {boolean} fromList 是否从博客列表页进入
 */
function renderBlogDetail(blog, fromList = false) {
    const mainContent = document.querySelector('main');
    if (!mainContent) return;
    
    // 确定返回按钮的文字和行为
    const backButtonText = fromList ? '返回目录' : '返回首页';
    
    // 渲染博客详情
    mainContent.innerHTML = `
        <div class="container mx-auto px-4 py-8">
            <div class="max-w-4xl mx-auto">
                <!-- 返回按钮 -->
                <button id="back-button" class="mb-6 text-green-400 hover:text-green-300 transition-colors flex items-center gap-2">
                    <span>←</span> ${backButtonText}
                </button>
                
                <!-- 博客内容 -->
                <article class="bg-gray-800 border border-gray-700 rounded-lg p-8">
                    <header class="mb-8">
                        <h1 class="text-3xl font-bold text-white mb-4">${escapeHtml(blog.title)}</h1>
                        <div class="flex flex-wrap gap-4 text-sm text-gray-400">
                            <span>发布日期: ${blog.date}</span>
                            <div class="flex flex-wrap gap-2">
                                ${blog.tags.map(tag => 
                                    `<span class="px-2 py-1 bg-gray-700 text-green-400 rounded">${escapeHtml(tag)}</span>`
                                ).join('')}
                            </div>
                        </div>
                    </header>
                    
                    <div class="prose prose-invert prose-green max-w-none">
                        <div id="blog-content" class="text-gray-300 leading-relaxed">
                            ${formatMarkdownContent(blog.content)}
                        </div>
                    </div>
                </article>
            </div>
        </div>
    `;
    
    // 绑定返回按钮事件
    document.getElementById('back-button').addEventListener('click', () => {
        if (fromList) {
            // 返回博客列表
            window.history.pushState({ type: 'blogList' }, '', '#blogs');
            openBlogList();
        } else {
            // 返回首页
            window.history.replaceState({}, '', window.location.pathname);
            // 重新加载页面以恢复首页状态
            location.reload();
        }
    });
}

/**
 * 渲染博客列表页
 * @param {Array} blogs 博客数据数组
 */
function renderBlogList(blogs) {
    const mainContent = document.querySelector('main');
    if (!mainContent) return;
    
    // 渲染博客列表
    mainContent.innerHTML = `
        <div class="container mx-auto px-4 py-8">
            <div class="max-w-6xl mx-auto">
                <!-- 返回按钮 -->
                <button id="back-to-home" class="mb-6 text-green-400 hover:text-green-300 transition-colors flex items-center gap-2">
                    <span>←</span> 返回首页
                </button>
                
                <!-- 页面标题 -->
                <h1 class="text-3xl font-bold text-white mb-8">所有博文</h1>
                
                <!-- 博客列表 -->
                <div class="space-y-4">
                    ${blogs.map(blog => `
                        <div class="blog-list-item bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-green-500 transition-all duration-300 cursor-pointer flex items-center justify-between" data-blog-id="${blog.id}">
                            <div class="flex-1">
                                <h3 class="text-lg font-bold text-white hover:text-green-400 transition-colors">
                                    ${escapeHtml(blog.title)}
                                </h3>
                                <div class="flex items-center gap-4 mt-2">
                                    <span class="text-sm text-gray-400">发布日期: ${blog.date}</span>
                                    <div class="flex flex-wrap gap-1">
                                        ${blog.tags.slice(0, 3).map(tag => 
                                            `<span class="px-2 py-1 bg-gray-700 text-green-400 text-xs rounded">${escapeHtml(tag)}</span>`
                                        ).join('')}
                                        ${blog.tags.length > 3 ? '<span class="text-xs text-gray-500">...</span>' : ''}
                                    </div>
                                </div>
                            </div>
                            <div class="text-green-400 ml-4">
                                →
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    // 绑定返回按钮事件
    document.getElementById('back-to-home').addEventListener('click', () => {
        // 清除hash并返回首页
        window.history.replaceState({}, '', window.location.pathname);
        // 重新加载页面以恢复首页状态
        location.reload();
    });
    
    // 绑定博客列表项点击事件
    document.querySelectorAll('.blog-list-item').forEach(item => {
        item.addEventListener('click', () => {
            const blogId = item.dataset.blogId;
            const blog = blogs.find(b => b.id === blogId);
            if (blog) {
                // 从列表页进入详情页，标记fromList为true
                window.history.pushState({ type: 'blog', id: blogId, fromList: true }, '', `#blogs/${blogId}`);
                renderBlogDetail(blog, true);
            }
        });
    });
}

/**
 * 简单的Markdown内容格式化
 * @param {string} content Markdown内容
 * @returns {string} 格式化后的HTML
 */
function formatMarkdownContent(content) {
    return content
        // 标题
        .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-white mt-6 mb-3">$1</h3>')
        .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-white mt-8 mb-4">$1</h2>')
        .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-white mt-8 mb-6">$1</h1>')
        // 粗体和斜体
        .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
        .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
        // 代码
        .replace(/`(.+?)`/g, '<code class="bg-gray-700 text-green-400 px-1 py-0.5 rounded text-sm">$1</code>')
        // 链接
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-green-400 hover:text-green-300 underline" target="_blank">$1</a>')
        // 列表
        .replace(/^- (.+)$/gm, '<li class="ml-4 mb-1">• $1</li>')
        .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 mb-1 list-decimal">$1</li>')
        // 段落
        .replace(/\n\n/g, '</p><p class="mb-4">')
        .replace(/^/, '<p class="mb-4">')
        .replace(/$/, '</p>');
}

/**
 * HTML转义函数
 * @param {string} text 需要转义的文本
 * @returns {string} 转义后的文本
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * 处理浏览器前进后退
 */
window.addEventListener('popstate', (event) => {
    if (event.state) {
        if (event.state.type === 'blog') {
            // 重新加载博客详情
            loadAllBlogs().then(blogs => {
                const blog = blogs.find(b => b.id === event.state.id);
                if (blog) {
                    renderBlogDetail(blog, event.state.fromList || false);
                }
            });
        } else if (event.state.type === 'blogList') {
            // 重新加载博客列表
            loadAllBlogs().then(blogs => {
                renderBlogList(blogs);
            });
        }
    } else {
        // 返回首页
        location.reload();
    }
});

// 导出函数供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initBlogs,
        loadAllBlogs,
        openBlogDetail,
        openBlogList
    };
}