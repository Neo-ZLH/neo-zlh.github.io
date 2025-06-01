/**
 * 多媒体空间脚本
 * 负责加载和展示图片内容
 */

// 移除DOMContentLoaded事件监听器，因为已经在main.js中调用了initGallery函数

/**
 * 初始化图片瀑布流
 */
function initGallery() {
    const galleryContainer = document.querySelector('.gallery-container');
    if (!galleryContainer) return;
    
    console.log('Initializing gallery...');
    
    // 获取图片数据
    fetchImages()
        .then(images => {
            console.log('Images loaded:', images);
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
    console.log('Fetching images...');
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // 示例图片数据
    const images = [
        {
            id: 1,
            title: '参加VLDB2024-广州',
            description: '实验室成员于2024年8月参加VLDB2024-广州',
            url: './photos/VLDB24.jpg', // 使用相对路径
            tags: ['学术会议', '学术交流'],
            date: '2024-8-27',
            width: 400,
            height: 300
        },
        {
            id: 2,
            title: 'SIGMOD 2023研讨会',
            description: '在SIGMOD 2023会议上展示我们的最新研究成果',
            url: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22300%22%20viewBox%3D%220%200%20400%20300%22%3E%3Crect%20fill%3D%22%23222%22%20width%3D%22400%22%20height%3D%22300%22%2F%3E%3Ctext%20fill%3D%22%2300FF00%22%20font-family%3D%22monospace%22%20font-size%3D%2230%22%20x%3D%22100%22%20y%3D%22150%22%3ESIGMOD%3C%2Ftext%3E%3C%2Fsvg%3E',
            tags: ['学术会议', '研究成果'],
            date: '2023-6-15',
            width: 400,
            height: 300
        },
        {
            id: 3,
            title: '实验室团建活动',
            description: '2023年夏季实验室团队建设活动',
            url: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22300%22%20viewBox%3D%220%200%20400%20300%22%3E%3Crect%20fill%3D%22%23222%22%20width%3D%22400%22%20height%3D%22300%22%2F%3E%3Ctext%20fill%3D%22%2300FF00%22%20font-family%3D%22monospace%22%20font-size%3D%2230%22%20x%3D%2280%22%20y%3D%22150%22%3E团队活动%3C%2Ftext%3E%3C%2Fsvg%3E',
            tags: ['团队活动', '实验室生活'],
            date: '2023-7-20',
            width: 400,
            height: 300
        },
        {
            id: 4,
            title: '数据库系统实现课程',
            description: '2023年秋季学期数据库系统实现课程实践环节',
            url: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22300%22%20viewBox%3D%220%200%20400%20300%22%3E%3Crect%20fill%3D%22%23222%22%20width%3D%22400%22%20height%3D%22300%22%2F%3E%3Ctext%20fill%3D%22%2300FF00%22%20font-family%3D%22monospace%22%20font-size%3D%2225%22%20x%3D%2280%22%20y%3D%22150%22%3E数据库课程%3C%2Ftext%3E%3C%2Fsvg%3E',
            tags: ['教学', '课程实践'],
            date: '2023-10-15',
            width: 400,
            height: 300
        },
        {
            id: 5,
            title: '学术论文获奖',
            description: '我们的论文《基于深度学习的大规模数据治理框架》获得最佳论文奖',
            url: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22300%22%20viewBox%3D%220%200%20400%20300%22%3E%3Crect%20fill%3D%22%23222%22%20width%3D%22400%22%20height%3D%22300%22%2F%3E%3Ctext%20fill%3D%22%2300FF00%22%20font-family%3D%22monospace%22%20font-size%3D%2225%22%20x%3D%2280%22%20y%3D%22150%22%3E论文奖项%3C%2Ftext%3E%3C%2Fsvg%3E',
            tags: ['学术成果', '获奖'],
            date: '2023-12-10',
            width: 400,
            height: 300
        }
    ];
    
    console.log('Images data prepared:', images);
    return images;
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
    card.className = 'masonry-item fade-in visible'; // 添加visible类
    card.dataset.tags = image.tags.join(',');
    
    // 计算宽高比例，设置合适的高度
    // 默认使用1:1的比例，如果有有效的宽度和高度，则使用实际比例
    let aspectRatio = 1;
    if (image.width && image.height && image.width > 0 && image.height > 0) {
        aspectRatio = image.height / image.width;
    }
    
    // 构建卡片内容
    card.innerHTML = `
        <div class="image-card" data-id="${image.id}">
            <div class="image-container">
                <img src="${image.url}" alt="${image.title}" loading="lazy" onload="this.style.opacity='1'" style="opacity: 0; transition: opacity 0.3s ease;">
            </div>
            <div class="image-info">
                <h3 class="image-title">${image.title}</h3>
                <p class="image-date">${formatDate(image.date)}</p>
            </div>
        </div>
    `;
    
    // 添加图片加载错误处理
    const img = card.querySelector('img');
    img.onerror = function() {
        console.error('Error loading image:', image.url);
        this.src = './images/icon.svg'; // 使用相对路径
        this.alt = 'Image not found';
        this.style.opacity = '1';
    };
    
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
            // 先设置display为block，然后添加fade-in类
            item.style.display = 'block';
            setTimeout(() => {
                item.classList.add('fade-in');
                item.classList.add('visible'); // 添加visible类使其显示
            }, 10);
        } else {
            const itemTags = item.dataset.tags.split(',');
            if (itemTags.includes(tag)) {
                // 先设置display为block，然后添加fade-in类
                item.style.display = 'block';
                setTimeout(() => {
                    item.classList.add('fade-in');
                    item.classList.add('visible'); // 添加visible类使其显示
                }, 10);
            } else {
                // 先移除visible类，然后设置display为none
                item.classList.remove('visible');
                // 等待过渡动画完成后再隐藏元素
                setTimeout(() => {
                    item.classList.remove('fade-in');
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
    console.log('Initializing lightbox...');
    // 简单实现，实际项目中可以使用更复杂的图片查看器
    // 这里只是为了避免函数未定义错误
}

/**
 * 打开图片查看器
 */
function openLightbox(image) {
    console.log('Opening lightbox for image:', image);
    // 简单实现，实际项目中可以使用更复杂的图片查看器
    window.open(image.url, '_blank');
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
    // 检查日期字符串格式
    if (!dateString) return '';
    
    try {
        // 尝试解析日期字符串
        const date = new Date(dateString);
        
        // 检查日期是否有效
        if (isNaN(date.getTime())) {
            console.error('Invalid date:', dateString);
            return dateString; // 返回原始字符串
        }
        
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('zh-CN', options);
    } catch (error) {
        console.error('Error formatting date:', error);
        return dateString; // 出错时返回原始字符串
    }
}