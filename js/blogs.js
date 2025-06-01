/**
 * 技术博客聚合脚本
 * 负责加载和展示博客文章
 */

// 注释掉DOMContentLoaded事件监听器，由main.js统一管理初始化
// document.addEventListener('DOMContentLoaded', () => {
//     // 初始化博客聚合
//     initBlogs();
// });

/**
 * 初始化博客聚合
 */
function initBlogs() {
    const blogsContainer = document.querySelector('.blogs-container');
    if (!blogsContainer) return;
    
    console.log('Initializing blogs...');
    
    // 获取博客数据
    fetchBlogs()
        .then(blogs => {
            console.log('Blogs fetched successfully:', blogs);
            // 清空加载提示
            blogsContainer.innerHTML = '';
            
            // 创建博客卡片
            blogs.forEach(blog => {
                const blogCard = createBlogCard(blog);
                blogsContainer.appendChild(blogCard);
            });
            
            // 初始化标签云
            initTagCloud(blogs);
        })
        .catch(error => {
            console.error('Error loading blogs:', error);
            blogsContainer.innerHTML = `<div class="text-center text-red-500 py-8">加载博客数据时出错</div>`;
        });
}

/**
 * 获取博客数据
 * 在实际应用中，可以从API或静态JSON文件获取
 */
async function fetchBlogs() {
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // 示例博客数据
    const blogs = [
        {
            id: 1,
            title: '分布式系统中的一致性协议：Raft与Paxos比较',
            summary: '本文深入分析了Raft和Paxos两种主流分布式一致性协议的设计理念、实现机制和性能特点，并通过实验数据对比了它们在不同场景下的表现。',
            date: '2023-11-15',
            tags: ['分布式系统', '一致性协议', 'Raft', 'Paxos'],
            readTime: 12,
            url: '#',
            image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22120%22%20viewBox%3D%220%200%20200%20120%22%3E%3Crect%20fill%3D%22%23222%22%20width%3D%22200%22%20height%3D%22120%22%2F%3E%3Ctext%20fill%3D%22%2300FF00%22%20font-family%3D%22monospace%22%20font-size%3D%2220%22%20x%3D%2250%22%20y%3D%2260%22%3ERaft%3C%2Ftext%3E%3C%2Fsvg%3E'
        },
        {
            id: 2,
            title: '深度学习在知识图谱构建中的应用',
            summary: '探讨了如何利用最新的深度学习技术自动从非结构化文本中抽取实体和关系，构建大规模知识图谱，并介绍了几种实用的图神经网络模型。',
            date: '2023-09-28',
            tags: ['深度学习', '知识图谱', '自然语言处理', '图神经网络'],
            readTime: 15,
            url: '#',
            image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22120%22%20viewBox%3D%220%200%20200%20120%22%3E%3Crect%20fill%3D%22%23222%22%20width%3D%22200%22%20height%3D%22120%22%2F%3E%3Ctext%20fill%3D%22%2300FF00%22%20font-family%3D%22monospace%22%20font-size%3D%2220%22%20x%3D%2230%22%20y%3D%2260%22%3EKnowledge%3C%2Ftext%3E%3C%2Fsvg%3E'
        },
        {
            id: 3,
            title: '高性能数据库索引设计：从B+树到LSM树',
            summary: '分析了传统关系型数据库中B+树索引与NoSQL数据库中LSM树索引的工作原理，讨论了它们在读写性能、空间利用率和实现复杂度方面的权衡。',
            date: '2023-08-05',
            tags: ['数据库', '索引', 'B+树', 'LSM树', '性能优化'],
            readTime: 10,
            url: '#',
            image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22120%22%20viewBox%3D%220%200%20200%20120%22%3E%3Crect%20fill%3D%22%23222%22%20width%3D%22200%22%20height%3D%22120%22%2F%3E%3Ctext%20fill%3D%22%2300FF00%22%20font-family%3D%22monospace%22%20font-size%3D%2220%22%20x%3D%2250%22%20y%3D%2260%22%3EB%2BTree%3C%2Ftext%3E%3C%2Fsvg%3E'
        },
        {
            id: 4,
            title: '量子计算在密码学中的挑战与机遇',
            summary: '讨论了量子计算对现有密码系统的威胁，特别是Shor算法对RSA等公钥密码体系的破解能力，同时介绍了后量子密码学的最新研究进展。',
            date: '2023-06-20',
            tags: ['量子计算', '密码学', '后量子密码', '信息安全'],
            readTime: 18,
            url: '#',
            image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22120%22%20viewBox%3D%220%200%20200%20120%22%3E%3Crect%20fill%3D%22%23222%22%20width%3D%22200%22%20height%3D%22120%22%2F%3E%3Ctext%20fill%3D%22%2300FF00%22%20font-family%3D%22monospace%22%20font-size%3D%2220%22%20x%3D%2240%22%20y%3D%2260%22%3EQuantum%3C%2Ftext%3E%3C%2Fsvg%3E'
        },
        {
            id: 5,
            title: '大规模分布式追踪系统的设计与实现',
            summary: '介绍了如何设计和实现一个低开销、高可扩展性的分布式追踪系统，用于监控和诊断微服务架构中的性能问题，包括采样策略、数据收集和可视化分析。',
            date: '2023-05-12',
            tags: ['分布式系统', '微服务', '可观测性', '性能监控'],
            readTime: 14,
            url: '#',
            image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22120%22%20viewBox%3D%220%200%20200%20120%22%3E%3Crect%20fill%3D%22%23222%22%20width%3D%22200%22%20height%3D%22120%22%2F%3E%3Ctext%20fill%3D%22%2300FF00%22%20font-family%3D%22monospace%22%20font-size%3D%2220%22%20x%3D%2230%22%20y%3D%2260%22%3ETracing%3C%2Ftext%3E%3C%2Fsvg%3E'
        }
    ];
    
    console.log('Blogs data prepared:', blogs);
    return blogs;
}

/**
 * 创建博客卡片
 */
function createBlogCard(blog) {
    const card = document.createElement('div');
    card.className = 'blog-card fade-in';
    
    // 标签HTML
    const tagsHtml = blog.tags.map(tag => 
        `<span class="blog-tag">${tag}</span>`
    ).join('');
    
    // 构建卡片内容
    card.innerHTML = `
        <div class="blog-image">
            <img src="${blog.image}" alt="${blog.title}" loading="lazy">
        </div>
        <div class="blog-content">
            <div class="blog-date">${formatDate(blog.date)} · ${blog.readTime} min read</div>
            <h3 class="blog-title">${blog.title}</h3>
            <p class="blog-summary">${blog.summary}</p>
            <div class="blog-tags">
                ${tagsHtml}
            </div>
        </div>
    `;
    
    // 添加点击事件，跳转到博客详情页
    card.addEventListener('click', () => {
        window.location.href = blog.url;
    });
    
    return card;
}

/**
 * 初始化标签云
 */
function initTagCloud(blogs) {
    const tagCloudContainer = document.querySelector('.tag-cloud');
    if (!tagCloudContainer) return;
    
    // 收集所有标签并计数
    const tagCounts = {};
    blogs.forEach(blog => {
        blog.tags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
    });
    
    // 清空容器
    tagCloudContainer.innerHTML = '';
    
    // 创建标签元素
    Object.entries(tagCounts).forEach(([tag, count]) => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag-item';
        tagElement.textContent = `${tag} (${count})`;
        
        // 根据出现频率设置字体大小
        const fontSize = 0.8 + (count / blogs.length) * 0.8;
        tagElement.style.fontSize = `${fontSize}rem`;
        
        // 添加点击事件，筛选相关博客
        tagElement.addEventListener('click', () => {
            filterBlogsByTag(tag);
        });
        
        tagCloudContainer.appendChild(tagElement);
    });
}

/**
 * 按标签筛选博客
 */
function filterBlogsByTag(tag) {
    const blogsContainer = document.querySelector('.blogs-container');
    if (!blogsContainer) return;
    
    // 获取所有博客卡片
    const blogCards = blogsContainer.querySelectorAll('.blog-card');
    
    // 遍历所有卡片，显示或隐藏
    blogCards.forEach(card => {
        const cardTags = Array.from(card.querySelectorAll('.blog-tag')).map(el => el.textContent);
        
        if (cardTags.includes(tag)) {
            card.style.display = 'flex';
            // 添加高亮动画
            card.classList.add('highlight-card');
            setTimeout(() => {
                card.classList.remove('highlight-card');
            }, 1000);
        } else {
            card.style.display = 'none';
        }
    });
    
    // 更新标签云中的选中状态
    const tagElements = document.querySelectorAll('.tag-item');
    tagElements.forEach(el => {
        if (el.textContent.startsWith(tag)) {
            el.classList.add('tag-selected');
        } else {
            el.classList.remove('tag-selected');
        }
    });
    
    // 添加重置按钮（如果不存在）
    let resetButton = document.querySelector('.reset-filter');
    if (!resetButton) {
        resetButton = document.createElement('button');
        resetButton.className = 'reset-filter';
        resetButton.textContent = '显示全部';
        resetButton.addEventListener('click', resetBlogFilter);
        blogsContainer.parentNode.insertBefore(resetButton, blogsContainer);
    }
    resetButton.style.display = 'block';
}

/**
 * 重置博客筛选
 */
function resetBlogFilter() {
    // 显示所有博客卡片
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        card.style.display = 'flex';
        card.classList.add('fade-in');
    });
    
    // 重置标签云选中状态
    const tagElements = document.querySelectorAll('.tag-item');
    tagElements.forEach(el => {
        el.classList.remove('tag-selected');
    });
    
    // 隐藏重置按钮
    const resetButton = document.querySelector('.reset-filter');
    if (resetButton) {
        resetButton.style.display = 'none';
    }
}

/**
 * 格式化日期
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('zh-CN', options);
}

/**
 * 从RSS源获取博客文章
 * 在实际应用中可以使用此函数从个人博客RSS获取文章
 */
async function fetchBlogsFromRSS(rssUrl) {
    try {
        // 注意：浏览器可能会阻止跨域请求，需要使用代理或CORS
        const response = await fetch(rssUrl);
        if (!response.ok) throw new Error('Failed to fetch RSS feed');
        
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'application/xml');
        
        // 解析RSS XML
        const items = xml.querySelectorAll('item');
        const blogs = [];
        
        items.forEach((item, index) => {
            // 提取RSS项中的数据
            const title = item.querySelector('title')?.textContent || '';
            const link = item.querySelector('link')?.textContent || '#';
            const description = item.querySelector('description')?.textContent || '';
            const pubDate = item.querySelector('pubDate')?.textContent || '';
            
            // 从描述中提取图片（如果有）
            let image = 'default-image.svg';
            const imgMatch = description.match(/<img[^>]+src="([^"]+)"[^>]*>/i);
            if (imgMatch && imgMatch[1]) {
                image = imgMatch[1];
            }
            
            // 从描述中提取纯文本摘要
            const div = document.createElement('div');
            div.innerHTML = description;
            const summary = div.textContent.substring(0, 200) + '...';
            
            // 估算阅读时间（假设平均阅读速度为每分钟200字）
            const wordCount = div.textContent.split(/\s+/).length;
            const readTime = Math.max(1, Math.round(wordCount / 200));
            
            // 添加到博客列表
            blogs.push({
                id: index + 1,
                title,
                summary,
                date: new Date(pubDate).toISOString().split('T')[0],
                tags: ['博客'], // RSS通常没有标签信息，可以从内容分析或使用默认标签
                readTime,
                url: link,
                image
            });
        });
        
        return blogs;
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        return [];
    }
}