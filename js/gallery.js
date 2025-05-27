/**
 * 多媒体空间脚本
 * 负责加载和展示图片内容
 */

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 初始化图片瀑布流
    initGallery();
});

/**
 * 初始化图片瀑布流
 */
function initGallery() {
    const galleryContainer = document.querySelector('.gallery-container');
    if (!galleryContainer) return;
    
    // 获取图片数据
    fetchImages()
        .then(images => {
            // 清空加载提示
            galleryContainer.innerHTML = '';
            
            // 创建图片瀑布流
            createMasonry(galleryContainer, images);
            
            // 初始化图片查看器
            initLightbox();
        })
        .catch(error => {
            console.error('Error loading images:', error);
            galleryContainer.innerHTML = `<div class="text-center text-red-500 py-8">加载图片数据时出错</div>`;
        });
}

/**
 * 获取图片数据
 * 在实际应用中，可以从API或静态JSON文件获取
 */
async function fetchImages() {
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // 示例图片数据 - 使用占位图
    return [
        {
            id: 1,
            title: '数据可视化研究',
            description: '基于大规模数据集的高维数据可视化研究成果',
            url: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22300%22%20viewBox%3D%220%200%20400%20300%22%3E%3Crect%20fill%3D%22%23222%22%20width%3D%22400%22%20height%3D%22300%22%2F%3E%3Ctext%20fill%3D%22%2300FF00%22%20font-family%3D%22monospace%22%20font-size%3D%2220%22%20x%3D%22120%22%20y%3D%22150%22%3EData%20Viz%3C%2Ftext%3E%3C%2Fsvg%3E',
            tags: ['数据可视化', '研究成果'],
            date: '2023-10-15',
            width: 400,
            height: 300
        },
        {
            id: 2,
            title: '分布式系统架构',
            description: '高可用分布式系统架构设计图',
            url: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22400%22%20viewBox%3D%220%200%20300%20400%22%3E%3Crect%20fill%3D%22%23222%22%20width%3D%22300%22%20height%3D%22400%22%2F%3E%3Ctext%20fill%3D%22%2300FF00%22%20font-family%3D%22monospace%22%20font-size%3D%2220%22%20x%3D%2270%22%20y%3D%22200%22%3EDistributed%3C%2Ftext%3E%3C%2Fsvg%3E',
            tags: ['分布式系统', '架构设计'],
            date: '2023-09-20',
            width: 300,
            height: 400
        },
        {
            id: 3,
            title: '机器学习模型',
            description: '深度学习模型结构示意图',
            url: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22500%22%20height%3D%22300%22%20viewBox%3D%220%200%20500%20300%22%3E%3Crect%20fill%3D%22%23222%22%20width%3D%22500%22%20height%3D%22300%22%2F%3E%3Ctext%20fill%3D%22%2300FF00%22%20font-family%3D%22monospace%22%20font-size%3D%2220%22%20x%3D%22150%22%20y%3D%22150%22%3EML%20Model%3C%2Ftext%3E%3C%2Fsvg%3E',
            tags: ['机器学习', '深度学习', '模型'],
            date: '2023-08-05',
            width: 500,
            height: 300
        },
        {
            id: 4,
            title: '算法复杂度分析',
            description: '高效算法的时间和空间复杂度分析图表',
            url: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%3E%3Crect%20fill%3D%22%23222%22%20width%3D%22400%22%20height%3D%22400%22%2F%3E%3Ctext%20fill%3D%22%2300FF00%22%20font-family%3D%22monospace%22%20font-size%3D%2220%22%20x%3D%22120%22%20y%3D%22200%22%3EAlgorithm%3C%2Ftext%3E%3C%2Fsvg%3E',
            tags: ['算法', '复杂度分析'],
            date: '2023-07-12',
            width: 400,
            height: 400
        },
        {
            id: 5,
            title: '数据库优化',
            description: '数据库查询优化与索引设计示意图',
            url: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22350%22%20height%3D%22250%22%20viewBox%3D%220%200%20350%20250%22%3E%3Crect%20fill%3D%22%23222%22%20width%3D%22350%22%20height%3D%22250%22%2F%3E%3Ctext%20fill%3D%22%2300FF00%22%20font-family%3D%22monospace%22%20font-size%3D%2220%22%20x%3D%2290%22%20y%3D%22125%22%3EDatabase%3C%2Ftext%3E%3C%2Fsvg%3E',
            tags: ['数据库', '性能优化', '索引'],
            date: '2023-06-30',
            width: 350,
            height: 250
        },
        {
            id: 6,
            title: '网络安全架构',
            description: '企业级网络安全防护体系架构图',
            url: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22450%22%20height%3D%22300%22%20viewBox%3D%220%200%20450%20300%22%3E%3Crect%20fill%3D%22%23222%22%20width%3D%22450%22%20height%3D%22300%22%2F%3E%3Ctext%20fill%3D%22%2300FF00%22%20font-family%3D%22monospace%22%20font-size%3D%2220%22%20x%3D%22130%22%20y%3D%22150%22%3ESecurity%3C%2Ftext%3E%3C%2Fsvg%3E',
            tags: ['网络安全', '架构设计'],
            date: '2023-05-18',
            width: 450,
            height: 300
        }
    ];
}

/**
 * 创建瀑布流布局
 */
function createMasonry(container, images) {
    // 创建瀑布流容器
    const masonryGrid = document.createElement('div');
    masonryGrid.className = 'masonry-grid';
    container.appendChild(masonryGrid);
    
    // 添加图片到瀑布流
    images.forEach(image => {
        const imageCard = createImageCard(image);
        masonryGrid.appendChild(imageCard);
    });
    
    // 初始化过滤功能
    initFilter(images);
}

/**
 * 创建图片卡片
 */
function createImageCard(image) {
    const card = document.createElement('div');
    card.className = 'masonry-item fade-in';
    card.dataset.tags = image.tags.join(',');
    
    // 计算宽高比例，设置合适的高度
    const aspectRatio = image.height / image.width;
    
    // 构建卡片内容
    card.innerHTML = `
        <div class="image-card" data-id="${image.id}">
            <div class="image-container">
                <img src="${image.url}" alt="${image.title}" loading="lazy" style="aspect-ratio: ${aspectRatio}">
            </div>
            <div class="image-info">
                <h3 class="image-title">${image.title}</h3>
                <p class="image-date">${formatDate(image.date)}</p>
            </div>
        </div>
    `;
    
    // 添加点击事件，打开图片查看器
    card.addEventListener('click', () => {
        openLightbox(image);
    });
    
    return card;
}

/**
 * 初始化图片过滤功能
 */
function initFilter(images) {
    const filterContainer = document.querySelector('.gallery-filter');
    if (!filterContainer) return;
    
    // 收集所有标签
    const allTags = new Set();
    images.forEach(image => {
        image.tags.forEach(tag => allTags.add(tag));
    });
    
    // 清空容器
    filterContainer.innerHTML = '';
    
    // 添加"全部"选项
    const allButton = document.createElement('button');
    allButton.className = 'filter-button active';
    allButton.textContent = '全部';
    allButton.addEventListener('click', () => {
        filterImages('all');
        setActiveFilter(allButton);
    });
    filterContainer.appendChild(allButton);
    
    // 添加标签过滤按钮
    Array.from(allTags).sort().forEach(tag => {
        const button = document.createElement('button');
        button.className = 'filter-button';
        button.textContent = tag;
        button.addEventListener('click', () => {
            filterImages(tag);
            setActiveFilter(button);
        });
        filterContainer.appendChild(button);
    });
}

/**
 * 设置活动过滤器按钮
 */
function setActiveFilter(activeButton) {
    const buttons = document.querySelectorAll('.filter-button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    activeButton.classList.add('active');
}

/**
 * 按标签过滤图片
 */
function filterImages(tag) {
    const items = document.querySelectorAll('.masonry-item');
    
    items.forEach(item => {
        if (tag === 'all') {
            item.style.display = 'block';
            setTimeout(() => {
                item.classList.add('fade-in');
            }, 10);
        } else {
            const itemTags = item.dataset.tags.split(',');
            if (itemTags.includes(tag)) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.classList.add('fade-in');
                }, 10);
            } else {
                item.classList.remove('fade-in');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        }
    });
}

/**
 * 初始化图片查看器
 */
function initLightbox() {
    // 检查是否已存在灯箱元素
    if (document.querySelector('.lightbox')) return;
    
    // 创建灯箱元素
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <div class="lightbox-image-container">
                <img class="lightbox-image" src="" alt="">
            </div>
            <div class="lightbox-details">
                <h3 class="lightbox-title"></h3>
                <p class="lightbox-description"></p>
                <div class="lightbox-tags"></div>
            </div>
        </div>
    `;
    
    // 添加关闭事件
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', event => {
        if (event.target === lightbox) closeLightbox();
    });
    
    // 添加键盘事件
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeLightbox();
    });
    
    // 添加到文档
    document.body.appendChild(lightbox);
}

/**
 * 打开图片查看器
 */
function openLightbox(image) {
    const lightbox = document.querySelector('.lightbox');
    if (!lightbox) return;
    
    // 设置图片和详情
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    lightboxImage.src = image.url;
    lightboxImage.alt = image.title;
    
    lightbox.querySelector('.lightbox-title').textContent = image.title;
    lightbox.querySelector('.lightbox-description').textContent = image.description;
    
    // 设置标签
    const tagsContainer = lightbox.querySelector('.lightbox-tags');
    tagsContainer.innerHTML = '';
    image.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'lightbox-tag';
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
    });
    
    // 显示灯箱
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // 防止背景滚动
}

/**
 * 关闭图片查看器
 */
function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (!lightbox) return;
    
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // 恢复背景滚动
}

/**
 * 格式化日期
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('zh-CN', options);
}